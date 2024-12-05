import { Observer } from './Observer';
import { Order } from '../models/Order';

export class EmailNotification extends Observer {
    update(order: Order): void {
        console.log(`Notificação por Email: O pedido ${order.order_id} agora está no estado: ${order.state}`);
    }
}
