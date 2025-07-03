const { response } = require("express");
var express = require("express");
const app = express();
var router = express.Router();
let bodyParser = require("body-parser");
app.use(bodyParser.json());

const {
  readTopic,
  getReadTopics,
} = require("../helper/readTopic-helper");

router.post("/create", readTopic);
router.get("/:id", getReadTopics);
module.exports = router;
