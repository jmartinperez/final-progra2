import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/users",userController.handleListUsers);

userRoutes.get("/addUser", (request, response) => {
    response.render("user/add");
  });
userRoutes.post("/add-user", userController.handleCreateUser);
userRoutes.get("/search", userController.handleSearchUser);
userRoutes.post("/edit-user", userController.handleUpdateUser);
userRoutes.get("/editUser", userController.handleGetUserData);
userRoutes.post("/delete-user", userController.handleDeleteUser);

export { userRoutes }
