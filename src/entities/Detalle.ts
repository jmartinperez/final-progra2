import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from './Factura';
import { Products } from './Product';

@Entity()
export class DetalleFactura {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Factura, factura => factura.productos)
    @JoinColumn()
    factura: Factura;

    @ManyToOne(() => Products, producto => producto.facturas)
    @JoinColumn()
    producto: Products;
}
