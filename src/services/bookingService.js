import db from "../models/index";
require("dotenv").config();
import _, { create } from "lodash";
import emailService from "./emailService";

let postBookingByUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.coachId || !data.timeType) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let mail = await emailService.sendSimpleEmail({
          type: "confirm",
          email: data.email,
          title: "Confim booking",
          firstname: data.firstname,
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender,
          },
        });

        if (user && user[0]) {
          console.log("------user----, ", user[0]);
          await db.Booking.findOrCreate({
            where: {
              userId: user[0].id,
              date: new Date(data.date),
              timeType: data.timeType,
              coachId: data.coachId,
            },
            defaults: {
              statusId: "S1",
              coachId: data.coachId,
              userId: user[0].id,
              date: new Date(data.date),
              timeType: data.timeType,
            },
          });
        }

        resolve({
          errCode: 0,
          message: "Done!",
          mail: mail,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookingByUser: postBookingByUser,
};
