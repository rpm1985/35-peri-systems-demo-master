const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const mongoose = require("mongoose");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    Role.find({ name: req.body.roles }, (err, returnedRoles) => {
        if (!err) {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync("password", 8),
                roles: returnedRoles
            });

            user.save((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (req.body.roles && req.body.roles.length !== 0) {
                    let mockRoles = ["admin"];
                    Role.find(
                        {
                            name: { $in: req.body.roles }
                            // name: { $in: mockRoles }
                        },
                        (err, roles) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            user.roles = roles.map(role => role._id);
                            user.save(err => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                res.send({ message: "User was registered successfully!" });
                            });
                        }
                    );
                } else {
                    Role.findOne({ name: "designer" }, (err, role) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        user.roles = [role._id];
                        user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            res.send({ message: "User was registered successfully!" });
                        });
                    });
                }
            });
        }
    })

};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};

exports.saveuser = (req, res) => {
    let toBeAdded = new User();
    toBeAdded.role = Role.findOne({ name: "designer" }, (err, role) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //toBeAdded.role = [role._id]
        toBeAdded.firstname = "req.body.firstname";
        toBeAdded.lastname = "req.body.lastname";
        toBeAdded.email = "req.body.email";
        toBeAdded.password = "req.body.password";
        toBeAdded.save((err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    });
};

exports.deleteUser = (req, res) => {
    console.log("p: ", req.params)
    User.find({ email: req.params.email }, (err, docs) => {
        if (docs.length <= 0) {
            return res.status(500).send({ message: 'User cannot be found' })
        } else {
            User.deleteOne({ email: req.params.email }, (err => {
                return err === true
                    ? res.status(500).send({ message: 'This user exists, database error occurred' })
                    : res.status(200).send({ message: 'User deleted' })
            }))
        }
    })
}

exports.updateUser = (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, roles } = req.body
    console.log(firstname, lastname, email, roles)
    // First get the role objects
    Role.find({ name: roles }, (err, data) => {
        if (!err) {
            // Then find the user which corresponds to the email
            User.find({ email: req.params.email }, (err, docs) => {
                if (docs.length <= 0) {
                    return res.status(500).send({ message: 'User cannot be found' })
                } else {
                    User.updateOne({ email: req.params.email }, { firstname, lastname, email, roles: data }, ((err) => {
                        return err === true
                            ? res.status(500).send({ message: 'This user exists, database error occurred' })
                            : res.status(200).send({ message: 'User updated' })
                    }))
                }
            })
        }
    })

}