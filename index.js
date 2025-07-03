
const express = require("express");
const app = express()
const user = require('./routes/user')
const formulaSheet = require('./routes/formula-sheet')
const modules = require('./routes/modules')
const topics = require('./routes/topics')
const quiz = require('./routes/quiz')
const readTopics = require('./routes/readTopics')
const dotenv = require("dotenv"); 
dotenv.config({path:'../.env'});
let bodyParser = require("body-parser");
app.use(bodyParser.json());
let cors = require("cors");
app.use(cors());
app.use(express.static(__dirname + "/media/quizImages"));
 app.use(express.static(__dirname + "/documents/word-document"));
 app.use(express.static(__dirname + "/documents/pdf-document"));
app.use('/',user)
app.use('/formula-sheet',formulaSheet)
app.use('/modules',modules)
app.use('/modules/topics',topics)
app.use('/modules/quiz',quiz)
app.use('/modules/read-topics',readTopics)
app.get("/", (req, res) => {
    res.send("Web API");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`server running on ${PORT}`));