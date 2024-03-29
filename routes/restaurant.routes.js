const { Router } = require('express');
const { check } = require('express-validator');
const {
  createRestaurant,
  findRestaurants,
  findRestaurant,
  updateRestaurant,
  createReview,
  updateReview,
  deleteReview,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');
const {
  validRestaurantById,
  validReviewId,
  validExistsReview,
} = require('../middlewares/restaurant.middleware');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/user.middleware');
const {
  validateFields,
  createRestaurantValidation,
  createReviewValidation,
} = require('../middlewares/validateFields.middleware');

const router = Router();

router.get('/', findRestaurants);

router.get('/:id', validRestaurantById, findRestaurant);

router.use(protect);

router.post('/', createRestaurantValidation, validateFields, createRestaurant);

router.patch('/:id', validRestaurantById, updateRestaurant);

router.delete('/:id', validRestaurantById, deleteRestaurant);

router.post(
  '/reviews/:id',
  createReviewValidation,
  validateFields,
  validRestaurantById,
  createReview
);
router.patch(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validReviewId,
  validExistsReview,
  protectAccountOwner,
  updateReview
);

router.delete('/reviews/:restaurantId/:id', validExistsReview, deleteReview);

module.exports = {
  restaurantRouter: router,
};
