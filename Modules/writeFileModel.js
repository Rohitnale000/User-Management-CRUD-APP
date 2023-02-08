const fs = require("fs");
exports.userDataWrite=(userJSON)=>{
    let data = JSON.stringify(userJSON)
    fs.writeFileSync("./users.json",data);
}