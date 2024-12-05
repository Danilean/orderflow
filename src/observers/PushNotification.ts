import { Observer } from './Observer';
import { Order } from '../models/Order';

export class PushNotification extends Observer {
    update(order: Order): void {
        console.log(`Notificação Push: O pedido ${order.order_id} agora está no estado ${order.state}`);
    }
}
