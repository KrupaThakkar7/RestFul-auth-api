const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const mailer = require('../utils/mailer');

const resetPassword = async function (req, res) {
    try {
        const { email, password, newPassword } = req.body;

        const user = await userModel.findOne({ email }).lean();
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid Credentials!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.updateOne({ email }, { $set: { password: newPassword } });

        await mailer({
            to: email,
            subject: "Reset Password",
            plainText: "Password has been changed!",
            html: `<p>Your password has been changed successfully , If it's not you, <a href="#">Check Activity</a></p>`
        })

        res.status(200).json({ msg: "Password Reset Successfully!" });


    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack });
    }
}

module.exports = { resetPassword }