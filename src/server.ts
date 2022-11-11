import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { productRouter } from "./routes";
import { userRoutes } from "./routes/userRoutes";
import { categoryRoutes } from "./routes/CategoryRoutes";
import { routerAuth } from "./routes/LoginRouters";
import "./database";
import session from "express-session";
import flash from "connect-flash"

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./lib/passport')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash())

//Variables Globales
app.use((request, response, next) => {
  app.locals.succes = request.flash("succes");
  app.locals.error = request.flash("error");

  next()
});

//Routes
app.use(productRouter);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(routerAuth);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
