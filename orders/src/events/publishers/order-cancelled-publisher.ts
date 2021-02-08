import { Publisher, OrderCancelledEvent, Subjects } from '@mlvtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
