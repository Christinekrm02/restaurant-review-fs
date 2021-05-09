import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import restaurantsDAO from "./DAO/restaurantsDAO.js";
//configure dotenv to load environment variables
dotenv.config();
//access client from mongodb
const MongoClient = mongodb.MongoClient;
//we use process.env to access the variables in the .env file
const port = process.env.PORT || 3001;

//connect to db
//see mongodb configuration for more
MongoClient.connect(process.env.RESTAURANT_REVIEWS_DB_URI, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
})
  .catch(error => {
    console.error(error.stack);
    process.exit(1);
  })
  .then(async client => {
    //PLACE REFERENCE TO CONNECT TO DB HERE
    await restaurantsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
