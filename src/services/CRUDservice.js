import db from "../models/index";
import bcrypt from "bcryptjs";
import { reject } from "bcrypt/promises";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswprdFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswprdFromBcrypt,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });

      resolve();
    } catch (error) {
      console.log("false");
      reject(error);
    }
  });
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let Users = await db.User.findAll({
        raw: true,
      });
      resolve(Users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserById = (UserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await db.User.findOne({
        where: { id: UserId },
        row: true,
      });
      if (User) {
        resolve(User);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstname = data.firstname;
        user.lastname = data.lastname;

        await user.save();
        let allUser = await db.User.findAll({
          row: true,
        });
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (error) {
      console.log(error);
    }
  });
};

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
        let allUser = await db.User.findAll({
          row: true,
        });
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

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
