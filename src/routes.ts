import { request, response, Router } from "express";
import { ProductController } from "./controllers/ProductController";


const productRouter = Router();

const productController = new ProductController();

productRouter.get("/", (request, response) => {
  response.render("./login/signin");
});

productRouter.get("/home", (request, response) => {
  response.render("home")
})

productRouter.get("/products",productController.handleListProducts);

productRouter.get("/addProduct", productController.handleAddProduct);
productRouter.post("/add-product", productController.handleCreateProduct);
productRouter.get("/searchProduct", productController.handleSearchProduct);
productRouter.get("/editProduct", productController.handleGetProductData)
productRouter.post("/edit-product", productController.handleUpdateProduct);
productRouter.post("/delete-product", productController.handleDeleteProduct);

export { productRouter };

