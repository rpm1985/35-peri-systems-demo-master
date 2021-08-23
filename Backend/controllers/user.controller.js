exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.designerBoard = (req, res) => {
    res.status(200).send("Designer Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.technicalBoard = (req, res) => {
    res.status(200).send("Technical Content.");
};