const Order = require('../models/order.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.validOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  if (!order) {
    return next(new AppError('The order does not exist', 404));
  }
  req.order = order;
  next();
});
