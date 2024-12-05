import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createOrderInDb, getAllOrdersFromDb, updateOrderStateInDb } from './database/dbFunctions';
import { OrderFactory } from './factories/OrderFactory';
import { EmailNotification } from './observers/EmailNotification';
import { SMSNotification } from './observers/SMSNotification';
import { PushNotification } from './observers/PushNotification';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const orderFactory = new OrderFactory();

app.post('/orders', async (req, res) => {
    try {
        const { order_id, state, customer_name, customer_email } = req.body;

        const order = orderFactory.create_order(order_id, state);
        order.customer_name = customer_name;
        order.customer_email = customer_email;

        await createOrderInDb(order);

        const emailNotifier = new EmailNotification();
        const smsNotifier = new SMSNotification();
        const pushNotifier = new PushNotification();

        order.add_observer(emailNotifier);
        order.add_observer(smsNotifier);
        order.add_observer(pushNotifier);

        res.status(201).send({ message: 'Pedido criado com sucesso', order });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar pedido', error });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await getAllOrdersFromDb();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter pedidos', error });
    }
});

app.put('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;

        await updateOrderStateInDb(id, state);

        res.status(200).send({ message: `Pedido ${id} atualizado para ${state}` });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar pedido', error });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
