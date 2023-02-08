const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "../users.json");
console.log(fileName);
exports.userDataRead = () => {
  const jsonData = fs.readFileSync(fileName);
  return JSON.parse(jsonData);
};
