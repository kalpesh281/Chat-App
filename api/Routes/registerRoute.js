const express = require("express");
const { register } = require("../Controller/registerController");
const router = express.Router();


router.route("/register").post(register);

module.exports = router;