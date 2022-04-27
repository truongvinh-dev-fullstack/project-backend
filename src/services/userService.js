import db from "../models/index";
import bcrypt from "bcryptjs";
import { reject } from "bcrypt/promises";
var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstname",
            "lastname",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User is not exist!";
          resolve(userData);
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your's email is not found!";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId && userId == "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your email is already is used!",
        });
      }
      let hashPasswprdFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswprdFromBcrypt,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender,
        roleId: data.roleId,
        image: data.image,
      });

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (error) {
      console.log("false");
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!data.id || !data.roleId || !data.gender) {
        resolve({
          errCode: 2,
          message: "Missing parameter!",
        });
      }
      if (user) {
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.address = data.address;
        user.roleId = data.roleId;
        user.gender = data.gender;
        user.image = data.image;
        user.phonenumber = data.phonenumber;

        await user.save();
        resolve({
          errCode: 0,
          message: "Update done!",
        });
      } else {
        resolve({
          errcode: 2,
          message: "User is not found!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (user) {
        await user.destroy();
        resolve({
          errCode: 0,
          message: "Delete User successly!",
        });
      } else {
        resolve({
          errCode: 2,
          message: "User is not exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodeService = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = {};
      let allCode = await db.Allcode.findAll({
        where: { type: type },
      });
      res.errCode = 0;
      res.data = allCode;
      resolve(res);
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllCodeService: getAllCodeService,
};
