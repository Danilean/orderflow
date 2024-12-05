import { Observer } from '../observers/Observer';

export class Order {
    private observers: Observer[] = [];

    constructor(
        public order_id: string,
        public state: string,
        public customer_name: string = "",
        public customer_email: string = ""
    ) {}

    set_state(state: string): void {
        this.state = state;
        console.log(`O estado do pedido ${this.order_id} foi atualizado para: ${this.state}`);
        this.notify_observers();
    }

    add_observer(observer: Observer): void {
        this.observers.push(observer);
    }

    private notify_observers(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
        console.log(`Notificações enviadas para os observadores.`);
    }
}
