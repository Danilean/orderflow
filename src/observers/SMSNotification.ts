import { Observer } from './Observer';
import { Order } from '../models/Order';

export class SMSNotification extends Observer {
    update(order: Order): void {
        console.log(`Notificação por SMS: O pedido ${order.order_id} agora está no estado: ${order.state}`);
    }
}
