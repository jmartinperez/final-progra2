import { getCustomRepository } from "typeorm";
import { Products } from "../entities/Products";
import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProducts {
    id?:string
    productsname: string;
    precio: number;
    
  }

  class ProductsService {

    async create({ productsname, precio }: IProducts) {
      if (!productsname || !precio) {
        throw new Error("Por favor rellene todos los campos.");
      }
  
      const productsRepository = getCustomRepository(ProductsRepository);
  
      const productsnameAlreadyExists = await productsRepository.findOne({ productsname });
  
      if (productsnameAlreadyExists) {
        throw new Error("El usuario ya creado");
      }
  
      
  
      const products = productsRepository.create({ productsname, precio });
      console.log(products)
  
      await productsRepository.save(products);
  
      return products;
  
    }

    async delete(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository
          .createQueryBuilder()
          .delete()
          .from(Products)
          .where("id = :id", { id })
          .execute();
    
        return products;
    
      }
    
      async getData(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository.findOne(id);
    
        return products;
      }
    
      async list() {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository.find();
    
        return products;
      }
    
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor rellene todos los campos");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository
          .createQueryBuilder()
          .where("productsname like :search", { search: `%${search}%` })
          
          .getMany();
    
        return products;
    
      }
    
      async update({ id, productsname, precio }: IProducts) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository
          .createQueryBuilder()
          .update(Products)
          .set({ productsname, precio })
          .where("id = :id", { id })
          .execute();
    
        return products;
    
      }
    }
    
    export { ProductsService };