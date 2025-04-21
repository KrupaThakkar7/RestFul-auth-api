const nodemailer = require("nodemailer");
require("dotenv").config();

//create Transporter

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        //Keys should be 'user' & 'pass' only , as they have special meaning.
    },
});

const mailer = async ({ to, subject, plainText, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"KT-devs" <${process.env.EMAIL}>`,
            to,
            subject,
            text: plainText,
            html,
        });
        console.log("Email sent successfully!", info.response);
    } catch (error) {
        console.log("Error sending email!", error);
    }
};

module.exports = mailer;