const { response } = require("express");
var express = require("express");
const app = express()
var router = express.Router();
let bodyParser = require("body-parser");
const { createFormulaSheet, getFormulaSheet } = require("../helper/formulaSheet-helper");
app.use(bodyParser.json());



router.post("/create", createFormulaSheet) 
router.get("/get", getFormulaSheet) 




module.exports=router;