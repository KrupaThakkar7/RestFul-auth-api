const { check, validationResult } = require('express-validator');

//an array of middlewares that will be applied to the route
const validateResetPassword = [

  //Each check() is a middleware, and we'll also add a final custom middleware to handle the errors.
  check('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .trim()
    .escape(),

  check('password')
    .isLength({ min: 6 }).withMessage('Old password must be at least 6 characters')
    .trim()
    .escape(),

  check('newPassword')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
    // Prevents users from using "password" as their new password
    .not().equals('password').withMessage('New password should not be "password"')
    .trim()
    .escape(),

  // Middleware to catch validation errors
  (req, res, next) => {
    const errors = validationResult(req);

    //If there are any errors, return them immediately with 422 Unprocessable Entity.
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //If there are no errors, proceed to the next middleware or route controller (resetPassword).
    next();
  }
];

module.exports = { validateResetPassword }
