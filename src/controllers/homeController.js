import db from "../models/index";
import CRUDservices from "../services/CRUDservice";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let mess = await CRUDservices.createNewUser(req.body);
  console.log(mess);
  return res.send("post crud from server");
};

let displayGetCrud = async (req, res) => {
  let data = await CRUDservices.getAllUser();
  console.log("---------");
  console.log(data);
  return res.render("displayCRUD.ejs", {
    data: data,
  });
};

let getEditCRUD = async (req, res) => {
  let UserId = req.query.id;
  if (UserId) {
    let userdata = await CRUDservices.getUserById(UserId);
    return res.render("getEditCRUD.ejs", {
      data: userdata,
    });
  } else {
    return res.send("Fail");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDservices.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    data: allUser,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let allUser = await CRUDservices.deleteUserById(data);
    return res.render("displayCRUD.ejs", {
      data: allUser,
    });
  } else {
    return res.send("Fail");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCrud: displayGetCrud,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD,
  deleteCRUD,
};
