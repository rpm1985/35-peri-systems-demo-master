const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

urlencodedParser = bodyParser.urlencoded({extended: false});
jsonParser = bodyParser.json();

router.get("/", (req, res) => {
    res.send("Server is up and running");
});

module.exports = router;