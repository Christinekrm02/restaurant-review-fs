//Routes go here
import express from "express";
import RestaurantsController from "../controllers/restaurants.controller.js";
import RestaurantReviewController from "../controllers/restaurants.reviews.controller.js";
const router = express.Router();

//Returns all restaurants or restaurants by search query
router.route("/").get(RestaurantsController.apiGetRestaurants);
//Allows for edit, delete or post to restaurant reviews
router
  .route("/review")
  .post(RestaurantReviewController.apiPostReview)
  .put(RestaurantReviewController.apiUpdateReview)
  .delete(RestaurantReviewController.apiDeleteReview);

export default router;
