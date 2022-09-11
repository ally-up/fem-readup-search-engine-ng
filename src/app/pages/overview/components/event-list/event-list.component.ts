import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Event} from "../../../../core/event/model/event";

/**
 * Displays a event list
 */
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnChanges {

  /** Map of projects */
  @Input() eventsMap = new Map<string, Event>();

  /** Event emitter indicating event being clicked */
  @Output() eventClickedEventEmitter = new EventEmitter<string>();

  /** Events to be displayed */
  events: Event[] = [];

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-changes lifecycle phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeEvents();
  }

  //
  // Initialization
  //

  /**
   * Initializes projects
   */
  private initializeEvents() {
    this.events = Array.from(this.eventsMap.values());
  }

  //
  // Actions
  //

  /**
   * Handles click on event card
   * @param event event name
   */
  onEventClicked(event: string | null) {
    if (event != null) {
      this.eventClickedEventEmitter.emit(event);
    }
  }

  //
  // Helpers
  //

  identify(index: number, item: Event){
    return item.id;
  }
}
