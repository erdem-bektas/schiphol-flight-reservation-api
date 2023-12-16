import express from "express";
import { connectToDatabase } from "./lib/database";
import setupRoutes from "./routes";
import config from "./config/configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);

connectToDatabase().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
});
