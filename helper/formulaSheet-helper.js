const express = require("express");
const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
const asyncHandler = require("express-async-handler");
const { fetchFormulaSheet, getFormulaSheetData, createFormulaSheetData } = require("./Query/formulaSheet-Query");

const createFormulaSheet = asyncHandler(async (req, res) => {
  const { content, createdBy } = req.body;

  let createdDate = new Date();

  const formualaSheet = await createFormulaSheetData(
    content,
    createdBy,
    createdDate
  );

  if (!formualaSheet) {
    return res.json({ error: "Failed to create Formula-Sheet" });
  } else {
    const formulaSheetData = await fetchFormulaSheet(formualaSheet.insertId);
    if (formulaSheetData.length === 0) {
      return res.json({ error: "Failed to retrieve Formula-Sheet details" });
    }

    return res.json({ data: formulaSheetData });
  }
  // } else {
  //   return res.json({ error: "please fill the valid fields " });
  // }
});

const getFormulaSheet = asyncHandler(async (req, res) => {

  const getFormulaResult = await getFormulaSheetData();
  if (getFormulaResult.length > 0) {
    return res.json({ data: getFormulaResult });
  } else {
    return res.json({ data: [] });
  }
});


module.exports = {
createFormulaSheet,
getFormulaSheet

};
