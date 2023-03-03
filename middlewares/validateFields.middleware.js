const { validationResult, check } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: errors.mapped(),
    });
  }
  next();
};

exports.signupValidations = [
  check('name', 'The name is  required').not().isEmpty(),
  check('email', 'The email is  required').not().isEmpty(),
  check('email', 'The email must have a correct format').isEmail(),
  check('password', 'The password is  required').not().isEmpty(),
];
exports.loginValidations = [
  check('email', 'The email is  required').not().isEmpty(),
  check('email', 'The email must have a correct format').isEmail(),
  check('password', 'The password is  required').not().isEmpty(),
];
exports.updateUserValidations = [
  check('name', 'The name is  required').not().isEmpty(),
  check('email', 'The email is  required').not().isEmpty(),
  check('email', 'The email must have a correct format').isEmail(),
];
exports.createRestaurantValidation = [
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number').isInt(),
];

exports.createReviewValidation = [
  check('comment', 'The comment is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number').isInt(),
];
