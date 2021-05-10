import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let reviews;

export default class RestaurantReviewsDAO {
  //establish connection to db when server runs
  static async injectDb(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.RESTAURANT_REVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async assReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectId(restaurantId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        //checkpoints are if the userId and reviewId belong to the person who created the review
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
