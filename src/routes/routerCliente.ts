import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";

const clienteRouter = Router()
const clienteController = new ClienteController()

clienteRouter.get("/clientes", clienteController.handleListClientes);

clienteRouter.get("/addCliente", (request, response) => {
  response.render("cliente/add")
});

clienteRouter.post("/add-cliente", clienteController.handleCreateCliente);
clienteRouter.get("/editCliente", clienteController.handleGetClienteData);
clienteRouter.post("/edit-cliente", clienteController.handleUpdateCliente);
clienteRouter.post("/delete-cliente", clienteController.handleDeleteCliente);
clienteRouter.get("/searchCliente", clienteController.handleSearchCliente);

export { clienteRouter }