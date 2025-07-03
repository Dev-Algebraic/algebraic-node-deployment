const asyncHandler = require("express-async-handler");
const db = require("../../config/db");

const CreateQuizScore = asyncHandler(async (userId, moduleId, score,quizAttempt,totalQuestion,createdDate) => {
    return await db.query(
    "INSERT INTO user_score(user_fk, module_fk,score,quiz_attempt,total_questions,created_date) VALUES (?,?,?,?,?,?)",
    [userId, moduleId, score,quizAttempt,totalQuestion,createdDate]
  );
});




  const verifyQuizResult = asyncHandler(async (userId,moduleId) => {
    return await db.query(
         `SELECT user_fk,module_fk,score,quiz_attempt,total_questions FROM user_score WHERE user_fk=? AND module_fk=? `,
    [userId,moduleId]
    );
  });

  
const updateQuizCount = asyncHandler(async (userId,moduleId,score,count,totalQuestion) => {
    return await db.query(
    `UPDATE user_score SET score=?,quiz_attempt=?,total_questions=? WHERE user_fk=? AND module_fk=?`,
    [score,count,totalQuestion,userId,moduleId]
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



  module.exports = {
    CreateQuizScore,getQuizResultById,verifyQuizResult,updateQuizCount,fetchQuizScore
    };