const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        return handleRefresh();
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return handleRefresh();
        } else {
            return res.redirect('/login');
        }
    }

    function handleRefresh() {
        if (!refreshToken) {
            return res.redirect('/login');
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: '1h' }
            );

            // Set new access token cookie
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                sameSite: 'Strict',
                secure: process.env.NODE_ENV === 'production'
            });

            req.user = decoded; // From refreshToken
            return next();
        } catch (refreshErr) {
            return res.redirect('/login');
        }
    }
};

module.exports = verifyUser;
