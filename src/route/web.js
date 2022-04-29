import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import coachController from "../controllers/coachController";
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
  router.get("/api/top-doctor-home", coachController.getTopCoachHome);
  router.get("/api/allDoctor", coachController.getAllCoach);
  router.post("/api/save-infor-doctor", coachController.postInforCoach);
  router.get("/api/get-detail-doctor", coachController.getDetailCoachById);
  router.post("/api/save-schedule-doctor", coachController.saveScheduleCoach);
  router.get("/api/get-schedule-doctor", coachController.getScheduleCoach);
  router.get("/api/get-profile-coach", coachController.getProfileCoach);
  router.get("/api/get-list-booking", coachController.getListBooking);
  router.post(
    "/api/confirm-booking-by-coach",
    coachController.confirmBookingByCoach
  );
  router.get("/api/get-all-coach", coachController.getAllCoach);

  router.post("/api/booking-user", bookingController.postBookingUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
