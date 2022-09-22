import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Products")
class Products {

  @PrimaryColumn()
  id: string;

  @Column()
  productsname: string;

  @Column()
  precio: number;

  

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Products };