import { reject } from "bcrypt/promises";
import db from "../models/index";
import _ from "lodash";
import emailService from "./emailService";

let getTopCoachHome = (limit) => {
  return new Promise(async (resole, reject) => {
    try {
      let users = await db.User.findAll({
        // limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["value"],
          },
        ],
        raw: true,
        nest: true,
      });

      resole({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCoach = () => {
  return new Promise(async (resole, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resole({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveDetailInforCoach = (data) => {
  return new Promise(async (resole, reject) => {
    try {
      if (!data.coachId || !data.contentHTML || !data.contentMarkdown) {
        resole({
          errCode: -2,
          message: "Missing parameter",
        });
      } else {
        let doctorMarkdown = await db.Markdown.findOne({
          where: { coachId: data.coachId },
          raw: false,
        });
        if (!doctorMarkdown) {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            coachId: data.coachId,
          });
        } else {
          doctorMarkdown.contentHTML = data.contentHTML;
          doctorMarkdown.contentMarkdown = data.contentMarkdown;
          doctorMarkdown.description = data.description;
          doctorMarkdown.coachId = data.coachId;

          await doctorMarkdown.save();
        }

        let doctorPrice = await db.Coach_info.findOne({
          where: { coachId: data.coachId },
          raw: false,
        });

        let price = parseInt(data.price);

        if (!doctorPrice) {
          await db.Coach_info.create({
            coachId: data.coachId,
            price: data.price,
          });
        } else {
          doctorPrice.price = data.price;
          await doctorPrice.save();
        }

        resole({
          errCode: 0,
          message: "Save info doctor success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailCoachById = (id) => {
  return new Promise(async (resole, reject) => {
    try {
      if (!id) {
        resole({
          errCode: -2,
          message: "Missing Id",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Coach_info,
              attributes: ["price"],
            },
          ],
          raw: true,
          nest: true,
        });

        if (data) {
          if (data.image) {
            data.image = new Buffer(data.image, "base64").toString("binary");
          }
          resole({
            errCode: 0,
            message: "Get info doctor success!",
            data: data,
          });
        } else {
          resole({
            errCode: -1,
            message: "Not found!",
            data: [],
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let saveScheduleCoachService = (data) => {
  return new Promise(async (resole, reject) => {
    try {
      if (data && data.length > 0) {
        let axistData = await db.Schedule.findAll({
          where: { coachId: data[0].coachId, date: new Date(data[0].date) },
          attributes: ["date", "coachId", "timeType", "maxNumber"],
        });

        if (axistData && axistData.length > 0) {
          await db.Schedule.destroy({
            where: { coachId: data[0].coachId, date: new Date(data[0].date) },
          });

          await db.Schedule.bulkCreate(data);
        } else {
          await db.Schedule.bulkCreate(data);
        }

        resole({
          errCode: 0,
          message: "Save done!",
        });
      } else {
        resole({
          errCode: -2,
          message: "Missing data",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleCoach = (coachId, date) => {
  return new Promise(async (resole, reject) => {
    try {
      if (coachId && date) {
        let dataSchedule = await db.Schedule.findAll({
          where: { coachId: +coachId, date: new Date(+date) },
          attributes: ["date", "coachId", "timeType", "maxNumber"],
          include: [
            {
              model: db.Allcode,
              attributes: ["value"],
            },
          ],
          raw: true,
          nest: true,
        });

        resole({
          errCode: 0,
          message: "Save done!",
          data: dataSchedule,
        });
      } else {
        resole({
          errCode: -2,
          message: "Missing data",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileCoachById = (inputId) => {
  return new Promise(async (resole, reject) => {
    try {
      if (!inputId) {
        resole({
          errCode: -2,
          message: "Missing Id",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description"],
            },
            {
              model: db.Coach_info,
              attributes: ["price"],
            },
          ],
          raw: true,
          nest: true,
        });

        if (data) {
          if (data.image) {
            data.image = new Buffer(data.image, "base64").toString("binary");
          }
          resole({
            errCode: 0,
            message: "Get info doctor success!",
            data: data,
          });
        } else {
          resole({
            errCode: -1,
            message: "Not found!",
            data: [],
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListBookingService = (coachId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!coachId || !date) {
        resolve({
          errCode: -2,
          message: "Missing Id",
        });
      } else {
        let data = await db.Booking.findAll({
          where: { coachId: coachId, date: new Date(+date) },
          include: [
            {
              model: db.Allcode,
              as: "statusData",
              attributes: ["value"],
            },
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["value"],
            },
            {
              model: db.User,
              as: "userData",
              attributes: [
                "email",
                "firstname",
                "lastname",
                "phonenumber",
                "address",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["value"],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data) {
          resolve({
            errCode: 0,
            data: data,
          });
        } else {
          resolve({
            errCode: -1,
            data: [],
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let confirmBookingByCoach = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: -2,
          message: "Missing parameter",
        });
      } else {
        let booking = await db.Booking.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (booking) {
          booking.statusId = "S2";
          await booking.save();
          resolve({
            errCode: 0,
            message: "Done!",
          });

          await emailService.sendSimpleEmail({
            type: "confirmed",
            email: data.email,
            title: "Confim booking",
            firstname: data.firstname,
          });
        } else {
          resolve({
            errCode: -2,
            message: "Not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCoachService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCoach = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: ["id", "email", "firstname", "lastname"],
      });
      if (allCoach) {
        resolve({
          errCode: 0,
          data: allCoach,
        });
      } else {
        resolve({
          errCode: -1,
          message: "Not found!",
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopCoachHome: getTopCoachHome,
  getAllCoach: getAllCoach,
  saveDetailInforCoach: saveDetailInforCoach,
  getDetailCoachById: getDetailCoachById,
  saveScheduleCoachService: saveScheduleCoachService,
  getScheduleCoach: getScheduleCoach,
  getProfileCoachById: getProfileCoachById,
  getListBookingService: getListBookingService,
  confirmBookingByCoach: confirmBookingByCoach,
  getAllCoachService: getAllCoachService,
};
