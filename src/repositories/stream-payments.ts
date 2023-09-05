import { streamPayments } from "../models/stream-payments";
import { EntityRepository, FindManyOptions, Repository } from "typeorm";
import { flatten, groupBy, map, merge } from "lodash";

@EntityRepository(streamPayments)
export class streamPaymentsRepository extends Repository<streamPayments> {
    public async findByCartId(cartId: string): Promise<streamPayments> {
        return await this.findOne({
            where: {
                cart_id: cartId,
            },
        }
        );
    }
}