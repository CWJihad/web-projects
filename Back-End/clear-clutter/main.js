const fs = require("fs");
const path = require("path");

const folderPath = path.dirname(__filename);

const read = fs.readdirSync(folderPath); // read existed file and folder and return a object
console.log("all are ok!!!");

// console.log(typeof read);

for (let i = 0; i < read.length; i++) {
  let fileExt = path.extname(read[i]).slice(1);
  let dirPath = path.join(folderPath, fileExt);
  let oldFilePath = path.join(folderPath, read[i]);
  let baseName = path.basename(oldFilePath)
  let newFilePath = path.join(folderPath, fileExt, read[i])

if (baseName === 'main.js') {
  continue;
}
if (fs.lstatSync(oldFilePath).isDirectory()) continue; // 'lstatSync' tell us. Is this file or folder

if (!fileExt) { // if not an extension
  continue
}
  fs.mkdirSync(dirPath, { recursive: true }); // recursive will handle exist folder

  if (path.basename(path.dirname(oldFilePath)) === fileExt) continue; // checking already file is existing in right folder or not
  else {
    try {
        fs.renameSync(oldFilePath, newFilePath) // move file
    } catch (error) {
        console.error("Error: ", error);
    }
  }
}
