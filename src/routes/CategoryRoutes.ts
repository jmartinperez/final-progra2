import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRoutes = Router()
const categoryController = new CategoryController()

categoryRoutes.get("/category", categoryController.handleListCategory)
categoryRoutes.get("/addCategory", (request, response) => {
    response.render("category/addcategory");
  });
categoryRoutes.post("/add-category", categoryController.handleCreateCategory);
categoryRoutes.get("/searchCategory", categoryController.handleSearchCategory);
categoryRoutes.post("/edit-category", categoryController.handleUpdateCategory);
categoryRoutes.get("/editCategory", categoryController.handleGetCategoryData);
categoryRoutes.post("/delete-category", categoryController.handleDeleteCategory);

export { categoryRoutes }
