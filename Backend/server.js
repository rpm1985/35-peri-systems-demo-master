require("dotenv").config();

const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 8081;

const app = express();
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

var corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5000"
    ],
};

// routes
const router = require("./routes/router");
const projectRouter = require("./routes/projectRoutes");
const usersRouter = require("./routes/usersRoutes");
const mailSender = require("./routes/mailSender");

//node mailer
app.use(morgan("dev"));
app.use(express.json());

//middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose
const MONGODB_URI =
    "mongodb+srv://periGroup:password2021@pericluster.vn1i8.mongodb.net/periGroup?retryWrites=true&w=majority";

const mongoose = require("mongoose");
const db = require("./models");
const Role = db.role;
const Customer = db.customer;

db.mongoose
    .connect(MONGODB_URI || "mongodb://localhost/peri_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!");
});

mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
);

app.use(router);
app.use(usersRouter);
app.use(projectRouter);
app.use(mailSender);

require("./routes/auth.routes")(app);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "designer",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'designer' to roles collection");
            });

            new Role({
                name: "technical",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'technical' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });

    Customer.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Customer({
                name: "sepehr",
                email: "sepehr2000.sn@gmail.com",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added customer to collection");
            });

            new Customer({
                name: "cardiff",
                email: "sepehr2000.sn@gmail.com",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added customer to collection");
            });
        }
    });
}

module.exports = app;
