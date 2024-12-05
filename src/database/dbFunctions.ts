import db from './db';
import { Order } from '../models/Order';

export const createOrderInDb = (order: Order): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO orders (id, state, customer_name, customer_email) VALUES (?, ?, ?, ?)',
            [order.order_id, order.state, order.customer_name, order.customer_email],
            function (err) {
                if (err) {
                    console.error("Erro ao inserir o pedido", err);
                    reject(err);
                } else {
                    console.log(`Pedido com ID ${order.order_id} inserido com sucesso.`);
                    resolve();
                }
            }
        );
    });
};

export const getAllOrdersFromDb = (): Promise<Order[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM orders', [], (err, rows: any[]) => {  // 'rows' tipado como 'any[]'
            if (err) {
                reject(err);
            } else {
                const orders: Order[] = rows.map(row => new Order(
                    row.id,
                    row.state,
                    row.customer_name,
                    row.customer_email
                ));
                resolve(orders);
            }
        });
    });
};

export const updateOrderStateInDb = (order_id: string, newState: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE orders SET state = ? WHERE id = ?',
            [newState, order_id],
            (err) => {
                if (err) reject(err);
                resolve();
            }
        );
    });
};
