import { PaymentCreatedEvent, Publisher, Subjects } from '@mlvtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
