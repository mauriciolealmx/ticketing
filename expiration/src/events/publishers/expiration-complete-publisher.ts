import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@mlvtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
