import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Cart } from "@medusajs/medusa";
  
  @Entity()
  export class StreamPayment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cart_id: string;
  
    @Column({ type: "numeric", precision: 10, scale: 2 })
    total_amount: number;
  
    // Add other properties related to Stream Payments
  
    @ManyToOne(() => Cart)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart: Cart;
  }
  