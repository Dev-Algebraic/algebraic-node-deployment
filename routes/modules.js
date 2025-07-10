import express, { response } from 'express';
import bodyParser from 'body-parser';
import { createModuleData, getAllModules } from '../helper/modules-helper.js';
import { createQuizScore, getScoreData, getScoreDataByModuleId } from '../helper/userScore-helper.js';

const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.post("/create", createModuleData) 
router.get("/get/:userid", getAllModules) 

router.post("/score/create", createQuizScore) 
router.get("/score/:id", getScoreData)
router.get("/score/module/:id/:userId", getScoreDataByModuleId)

export default router;