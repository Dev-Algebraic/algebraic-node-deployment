const { response } = require("express");
var express = require("express");
const app = express()
var router = express.Router();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
const { createTopic, getTopicsByModuleId, getTopicsById, updateTopic} = require("../helper/topic-helper");


router.post("/create", createTopic) 
router.get("/:id", getTopicsByModuleId) 

router.get("/read/:id", getTopicsById) 
router.post("/update/:id", updateTopic) 
module.exports=router;