import { Category } from "src/category/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string

    @Column()
    des:string

    @Column()
    price:number

    @OneToMany(()=>Category,(cat)=>cat.products)
    cat:Category

    @OneToMany(()=>Order,(order)=>order.product)
    order:Order

}
