import { Order } from "src/order/entities/order.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:string

    @Column()
    name:string

    @Column()
    username:string

    @Column({ type: 'varchar', unique: true })
    email:string

    @Column()
    password:string

    @Column()
    role:string

    @OneToMany(()=>Order,(order)=>order.user)
    orders:Order[]


}
