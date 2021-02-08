import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from '@mlvtickets/common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    /** Using findOne to search using version.
     * It is not needed at the moment.
     * Could be user for something like an order:updated event */
    const order = await Order.findOne({
      // NOTE: Model is saved with _id but the toJSON
      // fn transforms it to not include it when fetching.
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
