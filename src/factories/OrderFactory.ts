import { Order } from '../models/Order';

export class OrderFactory {
    create_order(order_id: string, state: string): Order {
        return new Order(order_id, state);
    }
}
