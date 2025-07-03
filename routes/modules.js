const { response } = require("express");
var express = require("express");
const app = express()
var router = express.Router();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
const { createModuleData,getAllModules } = require("../helper/modules-helper");
const { createQuizScore, getScoreData } = require("../helper/userScore-helper");


router.post("/create", createModuleData) 
router.get("/get/:userid", getAllModules) 

router.post("/score/create", createQuizScore) 
router.get("/score/:id", getScoreData) 


module.exports=router;