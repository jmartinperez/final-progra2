import { Router } from "express";
import { UserController } from "../controllers/UserController";
import auth from "../lib/auth";

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/users",  userController.handleListUsers);

userRoutes.get("/addUser",  (request, response) => {
    response.render("user/add");
  });
userRoutes.post("/add-user", userController.handleCreateUser);
userRoutes.get("/search", auth.isLoggedIn, userController.handleSearchUser);
userRoutes.post("/edit-user", userController.handleUpdateUser);
userRoutes.get("/editUser", auth.isLoggedIn, userController.handleGetUserData);
userRoutes.post("/delete-user", userController.handleDeleteUser);

export { userRoutes }
