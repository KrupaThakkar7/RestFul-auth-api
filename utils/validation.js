const express = require('express');

const validateUser = function (email, pswd) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var validEmail = emailRegex.test(email);

    let pswdLength = pswd.length;

    if (!validEmail || (pswdLength < 8)) {
        return false;
    } else {
        return true;
    }

}

module.exports = validateUser;