import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Event} from "../model/event"
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

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
   * @param date date
   */
  fetchEventsAfterDate(date: string) {
    this.firestore.collection("event", ref =>
      ref
        .where("start_date", ">", date)
        .orderBy("start_date"))
      .valueChanges().subscribe(documents => {
      this.eventsSubject.next(documents as Event[]);
    });
  }

  /**
   * Fetches event items via Firebase
   * @param date date
   */
  fetchEventsBeforeDate(date: string) {
    this.firestore.collection("event", ref =>
      ref
        .where("end_date", "<", date)
        .orderBy("end_date")
        .orderBy("start_date"))
      .valueChanges().subscribe(documents => {
      this.eventsSubject.next(documents as Event[]);
    });
  }

  /**
   * Fetches event items via Firebase
   */
  fetchEvents() {
    this.firestore.collection("event", ref => ref
      .orderBy("start_date"))
      .valueChanges().pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(documents => {
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
