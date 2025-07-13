import asyncHandler from 'express-async-handler';
import db from '../../config/db.js';

const CreateQuizScore = asyncHandler(async (userId, moduleId, score, quizAttempt, totalQuestion, createdDate) => {
    return await db.query(
    `
    INSERT INTO user_score(user_fk, module_fk,score,quiz_attempt,total_questions,created_date) VALUES (?,?,?,?,?,?);
    INSERT INTO quiz_attempts(user_fk, module_fk, score, attempt_num) VALUES (?,?,?,?);
    `,
    [userId, moduleId, score,quizAttempt,totalQuestion,createdDate, userId,moduleId,score,quizAttempt]
  );
});

const verifyQuizResult = asyncHandler(async (userId, moduleId) => {
    return await db.query(
         `SELECT user_fk,module_fk,score,quiz_attempt,total_questions FROM user_score WHERE user_fk=? AND module_fk=? `,
    [userId,moduleId]
    );
  });

const updateQuizCount = asyncHandler(async (userId, moduleId, score, count, totalQuestion) => {
    return await db.query(
    `
    UPDATE user_score SET score = CASE WHEN ? > score THEN ? ELSE score END,quiz_attempt=?,total_questions=? WHERE user_fk=? AND module_fk=?;
    INSERT INTO quiz_attempts(user_fk, module_fk, score, attempt_num) VALUES (?,?,?,?);
    `,
    [score,score,count,totalQuestion,userId,moduleId,score, userId,moduleId,score,count]
    );
  });

  const fetchQuizScore = asyncHandler(async (Id) => {
    return await db.query(
         `SELECT user_fk,module_fk,score,quiz_attempt,total_questions FROM user_score WHERE id=?`,
    [Id]
    );
  });

  const getQuizResultById = asyncHandler(async (userId) => {
    return await db.query(
    `SELECT module_fk,score,quiz_attempt,total_questions FROM user_score WHERE user_fk=?`,
    [userId]
    );
  });

  const getQuizResultByModuleId = asyncHandler(async (moduleId, userId) => {
    return await db.query(
    `SELECT module_fk,score,quiz_attempt,total_questions FROM user_score WHERE module_fk=? AND user_fk=?`,
    [moduleId, userId]
    );
  });

  export {
    CreateQuizScore,getQuizResultById,verifyQuizResult,updateQuizCount,fetchQuizScore, getQuizResultByModuleId
    };