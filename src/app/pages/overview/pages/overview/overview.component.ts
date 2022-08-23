import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {filter, takeUntil} from "rxjs/operators";
import {EventFirestoreService} from "../../../../core/event/services/event-firestore.service";
import {Event} from "../../../../core/event/model/event"

/**
 * Displays overview page
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  /** Map of events */
  public eventsMap = new Map<string, Event>();

  /** Helper subject used to finish other subscriptions */
  public unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param dialog dialog
   * @param eventFirestoreService event Firestore service
   * @param iconRegistry icon registry
   * @param router router
   * @param sanitizer sanitizer
   */
  constructor(private dialog: MatDialog,
              private eventFirestoreService: EventFirestoreService,
              private iconRegistry: MatIconRegistry,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeSubscriptions();

    this.findEntities();
  }

  /**
   * Handles on-destroy lifecycle phase
   */
  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  //
  // Initialization
  //

  /**
   * Initializes subscriptions
   */
  private initializeSubscriptions() {
    this.eventFirestoreService.eventsSubject.pipe(
      takeUntil(this.unsubscribeSubject),
      filter(value => value != null)
    ).subscribe(value => {
      this.onEventsUpdated(value as Event);
    });
  }

  /**
   * Initializes events
   * @param event event
   */
  private initializeEvents(event: Event) {
    this.eventsMap.set(event.id, event);
    this.eventsMap = new Map(this.eventsMap);
  }

  //
  // Events
  //

  /**
   * Handles events being loaded
   * @param event event
   */
  onEventsUpdated(event: Event) {
    this.initializeEvents(event);
  }

  /**
   * Handles event being clicked
   * @param event event name
   */
  onEventClicked(event: string) {
    this.router.navigate([`/details/${event}`]);
  }

  //
  // Storage
  //

  /**
   * Finds entities
   * @param forceReload force reload
   */
  private findEntities(forceReload = false) {
    this.eventFirestoreService.fetchEvents();
  }
}
