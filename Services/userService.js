
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {userDataRead}= require("../Modules/readFileModule.js");
const { userDataWrite } = require("../Modules/writeFileModel");

exports.addUserService = (bodyData) => {
  
  const existUser = userDataRead();
  const findExist = existUser.find((user) => user.email === bodyData.email);

  if (
    bodyData.firstName.trim() === "" ||
    !validator.isAlpha(bodyData.firstName) ||
    bodyData.lastName.trim() === "" ||
    !validator.isAlpha(bodyData.lastName) ||
    !validator.isEmail(bodyData.email)
  ) {
    return { success: false, error: "enter valid data" };
  } else if (findExist) {
    return { success: false, error: "already user exist" };
  } else {
    const hash = bcrypt.hashSync(bodyData.password, 10);

    const id = uuidv4();
    let userObject = {
      id: id,
      firstName: bodyData.firstName,
      middleName: bodyData.middleName,
      lastName: bodyData.lastName,
      gender: bodyData.gender,
      dateOfBirth: bodyData.dateOfBirth,
      email: bodyData.email,
      password: hash,
      address: bodyData.address,
    };
    existUser.push(userObject);
  
    userDataWrite(existUser)
  
    return {
      success: true,
      body: "Thank You For The Registration"+ `${bodyData.firstName}`,
    };
  }
};


exports.displayUserDataService = () => {
  return userDataRead()
};

exports.deleteAllUserService = () => {
  const existUser = userDataRead();
  existUser.length = 0;
  if (existUser.length == 0) {
    userDataWrite(existUser)
    return { success: true, body: `delete all users successfully` };
  }
};

exports.updateSingleUserService = (userid, bodyData) => {
  const existUser = userDataRead();

  let id = userid;
  let firstName = bodyData.firstName;
  let middleName = bodyData.middleName;
  let lastName = bodyData.lastName;
  let gender = bodyData.gender;
  let dateOfBirth = bodyData.dateOfBirth;
  let email = bodyData.email;
  let password = bodyData.password;
  let address = bodyData.address;

  if (
    !validator.isEmail(bodyData.email) ||
    bodyData.firstName.trim() === "" ||
    !validator.isAlpha(bodyData.firstName) ||
    bodyData.lastName.trim() === "" ||
    !validator.isAlpha(bodyData.lastName)
  ) {
    return { success: false, error: "enter valid data" };
  } else {
    let index = existUser.findIndex((userObject) => {
      return userObject.id === id;
    });
    if (index >= 0) {
      let user = existUser[index];
      user.firstName = firstName;
      user.middleName = middleName;
      user.lastName = lastName;
      user.gender = gender;
      user.dateOfBirth = dateOfBirth;
      user.email = email;
      user.password = password;
      user.address = address;
    } else {
      return { success: false, body: "record not found" };
    }
    userDataWrite(existUser);
    return { success: true, body: `users updated successfully` };
  }
};

exports.displaySingleUserDataService = (userid) => {
  const existUser = userDataRead();
  let id = userid;
  let index = existUser.findIndex((userObject) => {
    return userObject.id === id;
  });
  if (index >= 0) {
    let singleUser = existUser[index];
    //res.send(singleUser);
    return singleUser;
  } else {
    //res.send("Data Not found");
    return { success: false, body: "data not found" };
  }
};

exports.deleteSingleUserService = (userid) => {
  const existUser = userDataRead();
  let id = userid;

  const filterData = existUser.filter((ele)=>ele.id !== id);
  if(existUser.length===filterData.length){
    return{success:false,body:"User does not exist"}
  }else{
    userDataWrite(filterData)
    return{success:true,body:"User remove successfully"}
  }
 
};
