const asyncHandler = require("express-async-handler");
const db = require("../../config/db");

const createFormulaSheetData = asyncHandler(
  async (content,createdBy, createdDate) => {
    return await db.query(
      "INSERT INTO formula_sheet (content,created_by,created_date) VALUES (?,?,?)",
      [content, createdBy, createdDate]
    );
  }
);

const fetchFormulaSheet = asyncHandler(async (id) => {
  return await db.query(
    "SELECT content,created_by,created_date FROM formula_sheet WHERE id=? ",
    [id]
  );
});

const getFormulaSheetData = asyncHandler(async () => {
  return await db.query("SELECT content FROM formula_sheet ");
});

module.exports = {
    createFormulaSheetData,
  fetchFormulaSheet,
  getFormulaSheetData,
};
