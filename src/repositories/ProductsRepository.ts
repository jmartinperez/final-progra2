import { Repository, EntityRepository } from "typeorm";
import { Products } from "../entities/Products";

@EntityRepository(Products)
class ProductsRepository extends Repository<Products>{ }

export { ProductsRepository };