const express = require('express');
const jwt = require('jsonwebtoken');

const fetchRefreshToken = (req, res) => {
    const token = req.cookies['refresh-token'];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access!" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);

        const refreshedAccessedToken = jwt.sign({ id: payload.userId, email: payload.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });

        res.cookie('access-token', refreshedAccessedToken, { httponly: true, secure: false, sameSite: 'strict', maxAge: 60 * 60 * 1000 });

        res.json({ message: "Access token refreshed !" });
    } catch (error) {
        return res.status(403).json({ message: 'error' });
    }
}

module.exports = {
    fetchRefreshToken
}