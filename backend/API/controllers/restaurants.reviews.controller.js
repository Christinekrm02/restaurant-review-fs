import ReviewsDAO from "../../DAO/restaurant.reviewsDAO.js";

export default class RestaurantReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await RestaurantReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //check if length of characters in review has changed
  //length check signifies an updated review
  static async UpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const text = request.body.text;
      const date = new Date();
      //get user_id to ensure that the one who created the review is the one updating the review
      const reviewResponse = await RestaurantReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        text,
        date
      );

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //see other ways to create delete requests
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query._id;
      //checks if user doing the deleting is the one who created the review
      const userId = req.body.user_id;
      console.log(reviewId);
      const reviewResponse = await RestaurantReviewsDAO.deleteReview(
        reviewId,
        userId
      );
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
