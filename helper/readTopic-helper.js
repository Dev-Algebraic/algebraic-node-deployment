const express = require("express");
const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
const asyncHandler = require("express-async-handler");
const { verifyIsReadTopic, createReadTopic, fetchCreatedReadTopic, getAllReadTopics } = require("./Query/readTopicQuery");




const readTopic = asyncHandler(async (req, res) => {
    const { topicId, userId} = req.body;
  
    // if ( name.trim().length > 0 && orderNo.trim().length > 0 && moduleId.trim().length > 0)
    // {
      const existingReadTopic = await verifyIsReadTopic(topicId,userId);
      if (existingReadTopic.length > 0) {
        return res.json({
          error:
            "Topic is already covered",
          data: [],
        });
      }
  
      let createdDate = new Date();
  
      const readtopicResult = await createReadTopic(
        topicId,
        userId,
        createdDate
      );
     
      if (!readtopicResult) {
        return res.json({ error: "Failed to create Topic" });
      } else {
        const topicResultData = await fetchCreatedReadTopic(readtopicResult.insertId);
        if (topicResultData.length === 0) {
          return res.json({ error: "Failed to retrieve Topic details" });
        }
  
        return res.json({ data: topicResultData });
      }
    // } else {
    //   return res.json({ error: "please fill the valid fields " });
    // }
  });
  
  //get All read Topics
  
  const getReadTopics = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const getAllTopics = await getAllReadTopics(userId);
    if (getAllTopics.length > 0) {
      return res.json({ data: getAllTopics });
    } else {
      return res.json({ data: []});
    }
  });

  
module.exports = {
    readTopic,
    getReadTopics,
  };
  