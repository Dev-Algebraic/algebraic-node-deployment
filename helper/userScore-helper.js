import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
import asyncHandler from 'express-async-handler';

import {
  CreateQuizScore,
  updateQuizCount,
  getQuizResultById,
  fetchQuizScore,
  verifyQuizResult,
  getQuizResultByModuleId
} from './Query/user-ScoreQuery.js';

const createQuizScore = asyncHandler(async (req, res) => {
  const { userId, moduleId, score, totalQuestion } = req.body;
  let createdDate = new Date();

  // if ( name.trim().length > 0 && orderNo.trim().length > 0 && moduleId.trim().length > 0)
  // {

  let verifyUserData = await verifyQuizResult(userId, moduleId);
  if (verifyUserData.length > 0) {
    const userData = verifyUserData[0];
    const count = userData.quiz_attempt +1;
    const quizUpdated = await updateQuizCount(
      userId,
      moduleId,
      score,
      count,
      totalQuestion,
  
    );
 
    if (!quizUpdated) {
      return res.json({ error: "Failed to update count" });
    } else {
      const fetchQuizResult = await getQuizResultById(
        userId
      );
      if (fetchQuizResult.length > 0) {
        return res.json({ data: fetchQuizResult });
      } else {
        return res.json({ error: "Failed " });
      }
    }
  } else {
    let quizAttempt = 1;
    const quizCreated = await CreateQuizScore(
      userId,
      moduleId,
      score,
      quizAttempt,
      totalQuestion,
      createdDate
    );

    if (!quizCreated) {
      return res.json({ error: "Failed to create Quiz Score" });
    } else {
      const fetchQuizScoreData = await fetchQuizScore(quizCreated.insertId);
      if (fetchQuizScoreData.length === 0) {
        return res.json({ error: "Failed to retrieve QuizScore details" });
      }

      return res.json({ data: fetchQuizScoreData });
    }
  }

  // } else {
  //   return res.json({ error: "please fill the valid fields " });
  // }
});

const getScoreData = asyncHandler(async (req, res) => {

  const userId = req.params.id;

  const quizScore = await getQuizResultById(userId);
  if (quizScore.length > 0) {
    return res.json({ data: quizScore });
  } else {
    return res.json({ error: "invalid user" });
  }
});

const getScoreDataByModuleId = asyncHandler(async (req, res) => {

  const moduleId = req.params.id;

  const quizScore = await getQuizResultById(moduleId);
  if (quizScore.length > 0) {
    return res.json({ data: quizScore });
  } else {
    return res.json({ error: "invalid user" });
  }
});

export {
  createQuizScore,
  getScoreData,
  getScoreDataByModuleId,
};
