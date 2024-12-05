import { Order } from '../models/Order';

export abstract class Observer {
    abstract update(order: Order): void;
}
