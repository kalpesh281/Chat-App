const express = require("express");
const { register, login, logout, getOtherUsers } = require("../Controller/registerController");
const authMiddleware = require("../Middleware/AuthMiddleware");
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route('/').get(authMiddleware,getOtherUsers)


module.exports = router;