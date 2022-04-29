import coachService from "../services/coachService";

let getTopCoachHome = async (req, res) => {
  let limit = req.query.limit;
  if (limit) limit = 10;
  try {
    let response = await coachService.getTopCoachHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllCoachDetail = async (req, res) => {
  try {
    let response = await coachService.getAllCoach();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let postInforCoach = async (req, res) => {
  try {
    let response = await coachService.saveDetailInforCoach(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetailCoachById = async (req, res) => {
  try {
    let info = await coachService.getDetailCoachById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let saveScheduleCoach = async (req, res) => {
  try {
    let response = await coachService.saveScheduleCoachService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getScheduleCoach = async (req, res) => {
  try {
    let response = await coachService.getScheduleCoach(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getProfileCoach = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: -2,
        message: "Missing Id",
      });
    } else {
      let message = await coachService.getProfileCoachById(req.query.id);
      return res.status(200).json(message);
    }
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getListBooking = async (req, res) => {
  try {
    let message = await coachService.getListBookingService(
      req.query.coachId,
      req.query.date
    );
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let confirmBookingByCoach = async (req, res) => {
  try {
    let message = await coachService.confirmBookingByCoach(req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllCoach = async (req, res) => {
  try {
    let message = await coachService.getAllCoachService();
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

module.exports = {
  getTopCoachHome: getTopCoachHome,
  getAllCoachDetail: getAllCoachDetail,
  postInforCoach: postInforCoach,
  getDetailCoachById: getDetailCoachById,
  saveScheduleCoach: saveScheduleCoach,
  getScheduleCoach: getScheduleCoach,
  getProfileCoach: getProfileCoach,
  getListBooking: getListBooking,
  confirmBookingByCoach: confirmBookingByCoach,
  getAllCoach: getAllCoach,
};
