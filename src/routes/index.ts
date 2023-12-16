import express from "express";
import flightRoute from "./flightRoute";
import userRoute from "./userRoute";

const setupRoutes = (app: express.Application) => {

    app.use("/flight", flightRoute);
    app.use("/user", userRoute);

    app.use((req, res) => {
        res.status(404).send('Sorry, page not found!');
    });

};

export default setupRoutes;
