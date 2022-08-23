import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../../core/event/model/event";

/**
 * Displays event list item
 */
@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit {

  /** Event to be displayed */
  @Input() event: Event = new Event();

  ngOnInit(): void {
    console.log(`FOO ${this.event.id} ${this.event.image}`);
  }
}
