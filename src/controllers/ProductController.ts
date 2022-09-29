import { Request, Response } from "express";
import { ProductService } from "../services/ProductService"

class ProductController{
    async handleCreateProduct(request: Request, response: Response) {
        const { nombre, marca, precio } = request.body;
    
        const createProductService = new ProductService();
    
        try {
          await createProductService.create({
            nombre,
            marca,
            precio
          }).then(() => {
            response.render("products/message", {
              message: "Producto creado con éxito."
            });
          });
        } catch (err) {
          response.render("products/message", {
            message: `Error al crear producto: ${err.message}`
          });
        }
    
    }
    async handleDeleteProduct(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new ProductService();
    
        try {
          await deleteProductService.delete(id).then(() => {
            response.render("products/message", {
              message: "Producto creado con éxito."
            });
          });
        } catch (err) {
          response.render("products/message", {
            message: `Error al crear producto: ${err.message}`
          });
        }
    }
    async handleGetProductData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getProductDataService = new ProductService();
  
      const product = await getProductDataService.getData(id);
  
      return response.render("products/editproduct", {
        product: product
      });
    }
    async handleListProducts(request: Request, response: Response) {
      const listProductsService = new ProductService();
  
      const products = await listProductsService.list();
  
      return response.render("products/index", {
        products: products
      });
    }
    async handleSearchProduct(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchProductService = new ProductService();
  
      try {
        const products = await searchProductService.search(search);
        response.render("products/searchproduct", {
          products: products,
          search: search
        });
      } catch (err) {
        response.render("products/message", {
          message: `Error al buscar producto: ${err.message}`
        });
      }
    }
    async handleUpdateProduct(request: Request, response: Response) {
      const { nombre, marca, precio } = request.body;
  
      const updateProductService = new ProductService();
  
      try {
        await updateProductService.update({ nombre, marca, precio }).then(() => {
          response.render("products/message", {
            message: "Producto creado con éxito."
          });
        });
      } catch (err) {
        response.render("products/message", {
          message: `Error al crear producto: ${err.message}`
        });
      }
  
    }  
}
export {ProductController};
