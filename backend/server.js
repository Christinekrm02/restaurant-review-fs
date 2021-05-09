import express from "express";
import cors from "cors";
import restaurants from "./API-routes/restaurants.route.js";

const app = express();
//apply cors middleware to app to allow for browser to browser requests
app.use(cors());
//express.json() remove the need to use bodyParser
//server will be able to accept JSON in the body of the request
app.use(express.json());

app.use("/api/v1/restaurants", restaurants);
//404 error route
app.use("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

export default app;
