import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllDoctor = async (req, res) => {
  try {
    let response = await doctorService.getAllDoctor();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let saveScheduleDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveScheduleDoctorService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getScheduleDoctor = async (req, res) => {
  try {
    let response = await doctorService.getScheduleDoctor(
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
      let message = await doctorService.getProfileCoachById(req.query.id);
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
    let message = await doctorService.getListBookingService(
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
    let message = await doctorService.confirmBookingByCoach(req.body);
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
    let message = await doctorService.getAllCoachService();
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  saveScheduleDoctor: saveScheduleDoctor,
  getScheduleDoctor: getScheduleDoctor,
  getProfileCoach: getProfileCoach,
  getListBooking: getListBooking,
  confirmBookingByCoach: confirmBookingByCoach,
  getAllCoach: getAllCoach,
};
