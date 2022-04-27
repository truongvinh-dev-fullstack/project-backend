import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import bookingController from "../controllers/bookingController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCrud);
  router.get("/getEditCRUD", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.post("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  router.get("/api/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/allDoctor", doctorController.getAllDoctor);
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctorById);
  router.post("/api/save-schedule-doctor", doctorController.saveScheduleDoctor);
  router.get("/api/get-schedule-doctor", doctorController.getScheduleDoctor);
  router.get("/api/get-profile-coach", doctorController.getProfileCoach);
  router.get("/api/get-list-booking", doctorController.getListBooking);
  router.post(
    "/api/confirm-booking-by-coach",
    doctorController.confirmBookingByCoach
  );
  router.get("/api/get-all-coach", doctorController.getAllCoach);

  router.post("/api/booking-user", bookingController.postBookingUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
