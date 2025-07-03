const fs = require("fs");
const officeToPDF = require('office-to-pdf');
const path = require('path');



module.exports.saveImage = (path, file_name, data) => {

  const randomFilename =
    Date.now() + "-" + Math.round(Math.random() * 1000) + file_name;

  fs.writeFile(path + randomFilename, data, (err) => {
    if (err) {
      throw err;
    }
  });
  return randomFilename;
};



module.exports.saveDocument = (path, file_name, data) => {

  return new Promise(function(resolve, reject) {
    fs.writeFile(path + file_name, data, function(err) {
        if (err) reject(err);
        else resolve(file_name);
    });
});
};

module.exports.saveToPdf = (wordFileName,pdfFilename) =>{

  const wordDirPath='./documents/word-document/'
  const pdfDirPath= './documents/pdf-document/'
  
  if(fs.existsSync(wordDirPath+wordFileName)){
    var wordBuffer =fs.readFileSync(wordDirPath+wordFileName)
    officeToPDF(wordBuffer).then(
    (pdfBuffer) => {
      fs.writeFileSync(pdfDirPath+pdfFilename+'.pdf', pdfBuffer)
    }, (err) => {
      console.log(err)
    }
  )
  }
 
return pdfFilename+'.pdf';
}

