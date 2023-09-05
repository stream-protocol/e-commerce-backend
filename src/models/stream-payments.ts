// Import necessary dependencies and modules
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Payment } from "./models/stream-payments"; // Import the Payment model if you have one

// Define the Stream Payment entity
@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  // Add more fields specific to Stream Payment model

  // Define the relationship with Payment if applicable
  @OneToMany(() => Payment, (payment) => payment.streamPayment)
  payments: Payment[];

  // Define any methods or custom logic related to StreamPayment
}
