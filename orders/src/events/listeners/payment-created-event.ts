import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from '@mlvtickets/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/orders';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // TODO: Maybe publish a order:updated event?
    // no other service should needed after this point
    // not just to save time
    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
