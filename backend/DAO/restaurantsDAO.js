//restaurants will be used to store a reference to database
let restaurants;

//This method allows us to connect to the db and will be called when the server starts
export default class restaurantsDAO {
  //if restaurant information is already provided then return information
  static async injectDB(connection) {
    if (restaurants) {
      return;
    }
    //if information is not already filled, then connect to restaurant db using information provided
    try {
      restaurants = await connection
        .db(process.env.RESTAURANT_REVIEWS_NS)
        //sample_restaurants has two collections,
        //we are specifically trying to access the restaurants collection
        .collection("restaurants");
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${error}`
      );
    }
  }

  //This method allows us to get a list of all the restaurants
  static async getRestaurants({
    //declare variables to use for filtering on page
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    //query stays empty unless we use a filter to get restaurants
    //filters will be based on queries below
    let query;
    if (filters) {
      //eg. we can search restaurant by name, etc
      if ("name" in filters) {
        //searches text in db for particular name
        //functionality will be set up in mongodb atlas (online)
        //there is no db field for this query
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        //"if cuisine equals cuisine name that is searched"
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    let cursor;
    //returns all restaurants if we do not specify a query value
    try {
      cursor = await restaurants.find(query);
    } catch (error) {
      console.error(`Unable to issue command, ${error}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    //if no error, return restaurants but with a certain amount per page
    //use skip method to get a page number
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (error) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: , ${error}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
}
