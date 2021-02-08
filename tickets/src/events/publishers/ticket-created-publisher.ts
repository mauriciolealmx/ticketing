import { Publisher, Subjects, TicketCreatedEvent } from '@mlvtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
