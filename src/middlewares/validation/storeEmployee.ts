var {check, validationResult} = require('express-validator');

exports.storeEmployee = [
    check('name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .bail(),
    check('age')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Age must be a number')
      .bail(),
    check('companyId')
      .not()
      .isEmpty()
      .isUUID()
      .withMessage('companyId must be in UUID format')
      .bail(),
    check('reviewed')
      .optional()
      .isBoolean()
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];
