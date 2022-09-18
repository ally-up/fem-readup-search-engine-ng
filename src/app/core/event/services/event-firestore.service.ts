import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Event} from "../model/event"
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  where
} from "@angular/fire/firestore/lite";

/**
 * Loads events via Firebase
 */
@Injectable({
  providedIn: 'root'
})
export class EventFirestoreService {

  /** Collection name */
  collectionName = "event";

  /** Events subject */
  eventsSubject = new Subject<Event[]>();

  /**
   * Constructor
   * @param firestore firestore
   */
  constructor(private firestore: Firestore) {
  }

  /**
   * Fetches event items via Firebase
   * @param date date
   */
  fetchEventsAfterDate(date: string) {
    // return onSnapshot(query(collection(this.firestore, this.collectionName),
    //   where("start_date", ">", date),
    //   orderBy("start_date")
    // ), (querySnapshot) => {
    //   const events: DocumentData[] = [];
    //   querySnapshot.forEach((doc) => {
    //     events.push(doc.data());
    //   });
    //   this.eventsSubject.next(events as Event[]);
    // });

    getDocs(query(collection(this.firestore, this.collectionName),
      where("start_date", ">", date),
      orderBy("start_date")
    )).then((querySnapshot) => {
      const events: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      this.eventsSubject.next(events as Event[]);
    });
  }

  /**
   * Fetches event items via Firebase
   * @param date date
   */
  fetchEventsBeforeDate(date: string) {
    // return onSnapshot(query(collection(this.firestore, this.collectionName),
    //   where("end_date", "<", date),
    //   orderBy("end_date"),
    //   orderBy("start_date")
    // ), (querySnapshot) => {
    //   const events: DocumentData[] = [];
    //   querySnapshot.forEach((doc) => {
    //     events.push(doc.data());
    //   });
    //   this.eventsSubject.next(events as Event[]);
    // });

    getDocs(query(collection(this.firestore, this.collectionName),
      where("end_date", "<", date),
      orderBy("end_date"),
      orderBy("start_date")
    )).then((querySnapshot) => {
      const events: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      this.eventsSubject.next(events as Event[]);
    });
  }

  /**
   * Fetches event items via Firebase
   */
  fetchEvents() {
    // return onSnapshot(query(collection(this.firestore, this.collectionName),
    //   orderBy("start_date"),
    // ), (querySnapshot) => {
    //   const events: DocumentData[] = [];
    //   querySnapshot.forEach((doc) => {
    //     events.push(doc.data());
    //   });
    //   this.eventsSubject.next(events as Event[]);
    // });

    getDocs(query(collection(this.firestore, this.collectionName),
      orderBy("start_date")
    )).then((querySnapshot) => {
      const events: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      this.eventsSubject.next(events as Event[]);
    });
  }

  /**
   * Fetches event item via Firebase
   */
  fetchEvent(id: string) {
    // return onSnapshot(doc(this.firestore, this.collectionName, id), (doc) => {
    //   this.eventsSubject.next([doc.data() as Event]);
    // });

    getDoc(doc(this.firestore, this.collectionName, id)).then((querySnapshot) => {
      this.eventsSubject.next([querySnapshot.data() as Event]);
    });
  }
}
