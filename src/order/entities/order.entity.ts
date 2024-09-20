import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
  
     @PrimaryGeneratedColumn()   
    id:string

    @Column()
    name:string

    @Column()
    price:number

    @Column()
    orderdate: string;

    @ManyToOne(()=>User,(user)=>user.orders)
    user:User

    @ManyToOne(()=>Product,(product)=>product.order)
    product:Product
}
