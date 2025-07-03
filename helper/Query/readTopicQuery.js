const asyncHandler = require("express-async-handler");
const db = require("../../config/db");

//readTopicsQuery 

      
    const createReadTopic = asyncHandler(async (topicId,userId,createdDate) => {
    return await db.query(
    "INSERT INTO covered_topics (topic_fk,user_fk,created_date) VALUES (?,?,?)",
    [topicId,userId,createdDate]
  );
});

  const verifyIsReadTopic = asyncHandler(async (topicId,userId) => {
    return await db.query(
    "SELECT topic_fk,user_fk FROM covered_topics WHERE topic_fk=? AND user_fk =?",
    [topicId,userId]
  );
  });
  const fetchCreatedReadTopic = asyncHandler(async (id) => {
    return await db.query(
    "SELECT topic_fk,user_fk FROM covered_topics WHERE id=? ",
    [id]
  );
  });

  const getAllReadTopics = asyncHandler(async (userId) => {
    return await db.query(
    `SELECT topic_fk,user_fk FROM covered_topics WHERE user_fk=?`,
    [userId]
    );
  });

  module.exports = {
    verifyIsReadTopic,createReadTopic,fetchCreatedReadTopic,getAllReadTopics
    };