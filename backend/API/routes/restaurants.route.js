//Routes go here
import express from "express";
import RestaurantsController from "../controllers/restaurants.controller.js";

const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);

export default router;
