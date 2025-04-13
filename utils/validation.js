const express = require('express');

const validateUser = function(email ,pswd){

    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    var validEmail = emailRegex.test(email); 

    let pswdLength = pswd.length;
    
    if(!validEmail || (pswdLength<8)){
        return false;
    }else{
        return true;
    }

}

module.exports = validateUser;