import { EntityRepository, Repository } from "typeorm";
import { StreamPayments } from "../models/stream-payments"; // Import StreamPayments model

@EntityRepository(StreamPayments)
export class StreamPaymentsRepository extends Repository<StreamPayments> {
  // You can define custom repository methods here if needed
  // For example, finding payments by a specific criteria, aggregations, etc.
}
