import restaurantsDAO from "../../DAO/restaurantsDAO.js";

export default class RestaurantsController {
  //allows for queried searches per restaurant name(duh)
  static async apiGetRestaurants(req, res, next) {
    //query string 1
    //restaurantsPerPage will either be the custom search entered in the url, if it exists
    //then the custom search will be converted to an integer
    //if the cusom query does not exist, then the default ampunt of restaurants will be 20
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    //arguments passed in will return a restaurant list and the total number of restaurants
    const { restaurantsList, totalNumRestaurants } =
      await restaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };
    res.json(response);
  }
}
