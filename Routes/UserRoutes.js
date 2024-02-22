const express = require("express")
const router = express.Router()
const {SignUp, Login, EditAcc,DeleteUser} = require("../Controllers/UserController")
const VerifyToken = require("../Middlewares/VerifyToken")

router.post("/sign-up", SignUp)
router.post("/login", Login)
// Private Route
// router.post("/editAcc", verifyToken, editacc)
router.post("/editProfile", VerifyToken, EditAcc)
router.post("/delUser",  DeleteUser)
module.exports = router

