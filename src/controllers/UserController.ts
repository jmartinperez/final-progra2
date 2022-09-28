import { Request, Response } from "express";
import { UserService } from "../services/UserService"

class UserController{
    async handleCreateUser(request: Request, response: Response) {
        const { username, email, telefono, provincia, ciudad } = request.body;
    
        const createUserService = new UserService();
    
        try {
          await createUserService.create({
            username,
            email,
            telefono,
            provincia,
            ciudad
          }).then(() => {
            response.render("user/message", {
              message: "Usuario creado con éxito."
            });
          });
        } catch (err) {
          response.render("user/message", {
            message: `Error al crear usuario: ${err.message}`
          });
        }
    
    }
    async handleDeleteUser(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UserService();
    
        try {
          await deleteUserService.delete(id).then(() => {
            response.render("user/message", {
              message: "Usuario eliminado con éxito."
            });
          });
        } catch (err) {
          response.render("user/message", {
            message: `Error al crear usuario: ${err.message}`
          });
        }
    }
    async handleGetUserData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getUserDataService = new UserService();
  
      const user = await getUserDataService.getData(id);
  
      return response.render("user/edit", {
        user: user
      });
    }
    async handleListUsers(request: Request, response: Response) {
      const listUsersService = new UserService();
  
      const users = await listUsersService.list();
  
      return response.render("user/index", {
        users: users
      });
    }
    async handleSearchUser(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchUserService = new UserService();
  
      try {
        const users = await searchUserService.search(search);
        response.render("user/search", {
          users: users,
          search: search
        });
      } catch (err) {
        response.render("user/message", {
          message: `Error al buscar usuario: ${err.message}`
        });
      }
    }
    async handleUpdateUser(request: Request, response: Response) {
      const { id, username, email, telefono, provincia, ciudad } = request.body;
  
      const updateUserService = new UserService();
  
      try {
        await updateUserService.update({ id, username, email, telefono, provincia, ciudad }).then(() => {
          response.render("user/message", {
            message: "Usuario creado con éxito."
          });
        });
      } catch (err) {
        response.render("user/message", {
          message: `Error al crear usuario: ${err.message}`
        });
      }
  
    }  
}
export {UserController};