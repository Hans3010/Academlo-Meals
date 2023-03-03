const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { orderRouter } = require('../routes/order.routes');
const { mealRouter } = require('../routes/meal.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { userRouter } = require('../routes/user.routes');
const initModel = require('./initModel');
const AppError = require('../utils/app.Error');
const globalErrorHandler = require('../controllers/error.controller');
const morgan = require('morgan');

class Server {
  /**
   * This function is called when the server is started, it sets up the server, connects to the
   * database, sets up the middlewares and routes.
   */
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.restaurant, restaurantRouter);
    this.app.use(this.paths.meal, mealRouter);
    this.app.use(this.paths.order, orderRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`)
      );
    });
    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port', this.port);
    });
  }
}

module.exports = Server;
