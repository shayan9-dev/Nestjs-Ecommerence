import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    des:string
    
    @ManyToOne(()=>Product,(product)=>product.cat)
    products:Product[]

}
