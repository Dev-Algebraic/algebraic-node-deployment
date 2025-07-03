const { response } = require("express");
var express = require("express");
const app = express()
var router = express.Router();
let bodyParser = require("body-parser");
const { createQuiz, getQuizByModuleId } = require("../helper/quiz-helper");
app.use(bodyParser.json());



router.post("/create", createQuiz) 
router.get("/:id", getQuizByModuleId) 

 
module.exports=router;