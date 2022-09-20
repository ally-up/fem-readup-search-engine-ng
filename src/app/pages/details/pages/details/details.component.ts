import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {MaterialColorService} from '../../../../core/ui/services/material-color.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Event} from "../../../../core/event/model/event";
import {MaterialIconService} from "../../../../core/ui/services/material-icon.service";
import {ContactBottomSheetComponent} from "../../components/contact-bottom-sheet/contact-bottom-sheet.component";
import {EventFirestoreService} from "../../../../core/event/services/event-firestore.service";
import {environment} from "../../../../../environments/environment";

/**
 * Displays details page
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  /** ID passed as an argument */
  id: string | null = "";

  /** Event to be displayed */
  event: Event = new Event();

  /** Map of events */
  eventsMap: Map<string, Event> = new Map<string, Event>();

  /** Default image URL */
  defaultImageUrl = environment.defaultImageUrl;

  /** Helper subject used to finish other subscriptions */
  public unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param bottomSheet bottom sheet
   * @param materialColorService material color service
   * @param materialIconService material icon service
   * @param eventFirestoreService event Firestore service
   * @param route route
   * @param router router
   */
  constructor(private bottomSheet: MatBottomSheet,
              private materialColorService: MaterialColorService,
              private materialIconService: MaterialIconService,
              private eventFirestoreService: EventFirestoreService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeSubscriptions();

    this.route.params.subscribe(() => {
      if (this.route.snapshot != null) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.findEntities();
      }
    });
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
      this.onEventsUpdated(value[0] as Event);
    });
  }

  /**
   * Initializes events
   * @param event event
   */
  private initializeEvents(event: Event) {
    if (event != null && event.id != null) {
      this.eventsMap.set(event.id, event);
      this.eventsMap = new Map(this.eventsMap);
    }
  }

  /**
   * Initializes event
   */
  private initializeEvent(eventsMap: Map<string, Event>) {
    if (this.id != null && eventsMap.has(<string>this.id)) {
      this.event = <Event>eventsMap.get(this.id);
    }
  }

  //
  // Actions
  //

  /**
   * Handles click on menu item
   * @param menuItem menu item
   */
  onMenuItemClicked(menuItem: string) {
    switch (menuItem) {
      case 'back': {
        this.router.navigate(['/overview']).then(() => {
        });
        break;
      }
      case 'share': {
        if (this.event != null && this.event.title != null) {
          navigator.share({
            title: environment.app_title,
            text: this.event.title,
            url: this.router.url,
          });
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * Handles click on details button
   * @param event event
   */
  onDetailsClicked(event: Event) {
    if (event != null && event.url != null) {
      window.open(event.url, '_blank')
    }
  }

  /**
   * Handles click on calendar button
   * @param event event
   */
  onCalendarButtonClicked(event: Event) {
    const filename = `${event.id}.ics`
    const blob = new Blob([DetailsComponent.buildIcsFile(event)], {type: 'text/calendar'});
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
  }

  /**
   * Handles click on contact button
   */
  onContactClicked() {
    this.bottomSheet.open(ContactBottomSheetComponent, {
      data: {
        contactPerson: this.event.contact_person,
        url: this.event.url,
        phone: this.event.contact_phone,
        mail: this.event.contact_mail,
      }
    });
  }

  /**
   * Handles events being loaded
   * @param event event
   */
  onEventsUpdated(event: Event) {
    this.initializeEvents(event);
    this.initializeEvent(this.eventsMap);
  }

  //
  // Storage
  //

  /**
   * Finds entities
   * @param forceReload force reload
   */
  private findEntities(forceReload = false) {
    this.eventFirestoreService.fetchEvent(this.id!);
  }

  //
  // Helpers
  //

  /**
   * Builds ics file
   * @param event event
   */
  private static buildIcsFile(event: Event) {
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ZContent.net//ZapCalLib 1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${event.title != undefined ? event.title : ""}
DTSTART${event.start_date?.toString().includes("T") ? "" : ";VALUE=DATE"}:${event.start_date?.toString()
      .replace(".000", "")
      .replace(/-/g, "")
      .replace(/:/g, "")
    }
DTEND${event.start_date?.toString().includes("T") ? "" : ";VALUE=DATE"}:${event.end_date?.toString()
      .replace(".000", "")
      .replace(/-/g, "")
      .replace(/:/g, "")
    }
UID:${event.id != undefined ? event.id : ""}@fem-readup.web.app
DTSTAMP:${event.updated?.toString()
      .replace(".000", "")
      .replace(/-/g, "")
      .replace(/:/g, "")
    }
DESCRIPTION:${event.subtitle != undefined ? event.subtitle : ""}
LOCATION:${event.location_street != undefined ? event.location_street : ""} ${event.location_city != undefined ? event.location_city : ""}
END:VEVENT
END:VCALENDAR`
  }

  /**
   * Formats start and end date
   * @param value value
   */
  formatSingleDate(value: string) {
    const startDate = new Date(value.replace("Z", ""));
    return startDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
      startDate.getDate() + ". " +
      startDate.toLocaleString('de-de', {month: 'short'}) + " " +
      startDate.getFullYear() + " " +
      this.toTwoDigits(startDate.getHours()) + ":" + this.toTwoDigits(startDate.getMinutes()) + " Uhr";
  }

  /**
   * Formats start and end date
   * @param startValue start value
   * @param endValue end value
   */
  formatDate(startValue: string | null, endValue: string | null) {
    if (startValue == null || endValue == null) {
      return "";
    }

    const startDate = new Date(startValue.replace("Z", ""));
    const endDate = new Date(endValue.replace("Z", ""));

    const containsTime = startValue.includes("T");
    const containsMultipleDays = startDate.getDate() != endDate.getDate() || startDate.getMonth() != endDate.getMonth();

    // Single day with time
    if (!containsMultipleDays && containsTime) {
      return startDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
        startDate.getDate() + ". " +
        startDate.toLocaleString('de-de', {month: 'short'}) + " " +
        startDate.getFullYear() + " " +
        this.toTwoDigits(startDate.getHours()) + ":" + this.toTwoDigits(startDate.getMinutes()) + " - " +
        this.toTwoDigits(endDate.getHours()) + ":" + this.toTwoDigits(endDate.getMinutes()) + " Uhr";
    }

    // Multiple days with time
    if (containsMultipleDays && containsTime) {
      return startDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
        startDate.getDate() + ". " +
        startDate.toLocaleString('de-de', {month: 'short'}) + " " +
        this.toTwoDigits(startDate.getHours()) + ":" + this.toTwoDigits(startDate.getMinutes()) + " Uhr - " +
        endDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
        endDate.getDate() + ". " +
        endDate.toLocaleString('de-de', {month: 'short'}) + " " +
        endDate.getFullYear() + " " +
        this.toTwoDigits(endDate.getHours()) + ":" + this.toTwoDigits(endDate.getMinutes()) + " Uhr ";
    }

    // Multiple days without time
    if (containsMultipleDays && !containsTime) {
      return startDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
        startDate.getDate() + ". " +
        startDate.toLocaleString('de-de', {month: 'short'}) + " - " +
        endDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
        endDate.getDate() + ". " +
        endDate.toLocaleString('de-de', {month: 'short'}) + " " +
        endDate.getFullYear();
    }

    return "";
  }

  /**
   * Turns numeric value into tow-digit string
   * @param value value
   */
  toTwoDigits(value: number) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  }
}
