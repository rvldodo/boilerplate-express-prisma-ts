import bodyParser from "body-parser";
import express from "express";
import router from "./router";
import errorHandler from "./middlewares/error.middleware";
import passport from "./utils/passportStrategy";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api", router);

app.use(errorHandler);

export default app;
