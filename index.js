import express from 'express';
import user from './routes/user.js';
import formulaSheet from './routes/formula-sheet.js';
import modules from './routes/modules.js';
import topics from './routes/topics.js';
import quiz from './routes/quiz.js';
import readTopics from './routes/readTopics.js';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
// Get current directory path
const __dirname = path.dirname(__filename);


import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
import cors from 'cors';
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