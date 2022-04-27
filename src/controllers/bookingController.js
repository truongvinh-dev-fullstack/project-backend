import bookingService from "../services/bookingService";

let postBookingUser = async (req, res) => {
  try {
    let message = await bookingService.postBookingByUser(req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

module.exports = {
  postBookingUser: postBookingUser,
};
