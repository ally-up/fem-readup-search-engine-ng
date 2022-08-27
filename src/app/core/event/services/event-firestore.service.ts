import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Event} from "../model/event"

/**
 * Loads events via Firebase
 */
@Injectable({
  providedIn: 'root'
})
export class EventFirestoreService {

  /** Events subject */
  eventsSubject = new Subject<Event>();

  /**
   * Constructor
   * @param firestore firestore
   */
  constructor(private firestore: AngularFirestore) {
  }

  /**
   * Fetches event items via Firebase
   */
  fetchEvents() {
    this.firestore.collection("event").valueChanges().subscribe(documents => {
      documents.forEach((document: any) => {
        const event = EventFirestoreService.preProcessEvent(document as Event);

        this.eventsSubject.next(event);
      });
    });
  }

  /**
   * Fetches event item via Firebase
   */
  fetchEvent(id: string) {
    this.firestore.doc<Event>(`event/${id}`).valueChanges().subscribe(document => {
      const event = EventFirestoreService.preProcessEvent(document as Event);

      this.eventsSubject.next(event);
    });
  }

  //
  // Helpers
  //

  /**
   * Pre-processes event item
   * @param event event item
   */
  private static preProcessEvent(event: Event): Event {
    event.fees = +event.fees;

    return event;
  }
}
