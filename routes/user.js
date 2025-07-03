const { response } = require("express");
var express = require("express");
const app = express()
var router = express.Router();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
const {doSignUp, doLogin, getData, forgotPassword} = require("../helper/user-helper");


router.post("/signup", doSignUp) 
router.post("/login", doLogin) 
//router.get("/data", getData) 
 router.post("/forgot-password",forgotPassword) 
module.exports=router;