import { Router } from "express";
import { FacturaController } from "../controllers/FacturaController";

const facturaRouter = Router();
const facturaController = new FacturaController();

facturaRouter.get("/facturas", facturaController.list);
facturaRouter.get("/addFactura", facturaController.add)
facturaRouter.post("/add-factura", facturaController.create);
facturaRouter.get("/editfactura", facturaController.get);
//facturaRouter.post("/edit-factura", facturaController.update);
facturaRouter.post("/delete-factura", facturaController.delete);

export { facturaRouter };