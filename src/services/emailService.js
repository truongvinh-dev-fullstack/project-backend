require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  if (dataSend.type == "confirm") {
    let info = await transporter.sendMail({
      from: '"Trương Vinh" <truongvinh1892k@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: dataSend.title, // Subject line
      text: "Hello world?", // plain text body
      html: `<h1>Hello ${dataSend.firstname}</h1>
           <p>Thanks for booking fitness session at our center</p>
           `, // html body
    });
  }

  if (dataSend.type == "confirmed") {
    let info = await transporter.sendMail({
      from: '"Trương Vinh" <truongvinh1892k@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: dataSend.title, // Subject line
      html: `<h1>Hello ${dataSend.firstname}</h1>
           <p>Confirmation of successful fitness session registration</p>
           `, // html body
    });
  }
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
