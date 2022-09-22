import { Request, Response } from "express";
import { ProductsService } from "../services/ProductsService";


class ProductsController{
    async handleCreateProducts(request: Request, response: Response) {
        const { productsname, precio } = request.body;
    
        const createProductsService = new ProductsService();
    
        try {
          await createProductsService.create({
            productsname,
            precio
          }).then(() => {
            response.render("message", {
              message: "Producto creado con éxito."
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al crear producto: ${err.message}`
          });
        }
    
    }
    async handleDeleteProducts(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductsService = new ProductsService();
    
        try {
          await deleteProductsService.delete(id).then(() => {
            response.render("message", {
              message: "Producto creado con éxito."
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al crear producto: ${err.message}`
          });
        }
    }
    async handleGetProductsData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getProductsDataService = new ProductsService();
  
      const products = await getProductsDataService.getData(id);
  
      return response.render("edit", {
        products: products
      });
    }
    async handleListProducts(request: Request, response: Response) {
      const listProductsService = new ProductsService();
  
      const products = await listProductsService.list();
  
      return response.render("index", {
        products: products
      });
    }
    async handleSearchProducts(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchProductsService = new ProductsService();
  
      try {
        const products = await searchProductsService.search(search);
        response.render("search", {
            products: products,
          search: search
        });
      } catch (err) {
        response.render("message", {
          message: `Error al buscar el producto: ${err.message}`
        });
      }
    }
    async handleUpdateProducts(request: Request, response: Response) {
      const { id, productsname, precio } = request.body;
  
      const updateProductsService = new ProductsService();
  
      try {
        await updateProductsService.update({ id, productsname, precio}).then(() => {
          response.render("message", {
            message: "Producto creado con éxito."
          });
        });
      } catch (err) {
        response.render("message", {
          message: `Error al crear producto: ${err.message}`
        });
      }
  
    }  
}
export {ProductsController};