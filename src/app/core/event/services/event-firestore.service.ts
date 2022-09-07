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
  eventsSubject = new Subject<Event[]>();

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
      this.eventsSubject.next(documents as Event[]);
    });
  }

  /**
   * Fetches event item via Firebase
   */
  fetchEvent(id: string) {
    this.firestore.doc<Event>(`event/${id}`).valueChanges().subscribe(document => {
      this.eventsSubject.next([document as Event]);
    });
  }
}
