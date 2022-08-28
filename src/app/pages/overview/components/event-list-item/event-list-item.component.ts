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

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
  }

  //
  // Helpers
  //

  formatDate(identifier: string, startValue: string, endValue: string) {
    const startDate = new Date(startValue.replace("Z", ""));
    const endDate = new Date(endValue.replace("Z", ""));

    const containsMinutes = startValue.includes("T");
    const spansMultipleDays = startDate.getDate() != endDate.getDate() || startDate.getMonth() != endDate.getMonth();

    let result = startDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
      (startDate.getDate()) + ". " +
      startDate.toLocaleString('de-de', {month: 'short'}) + " ";

    if (!spansMultipleDays) {
      result += startDate.getFullYear() + " ";
    }

    if (containsMinutes) {
      result += this.toTwoDigits(startDate.getHours()) + ":" + this.toTwoDigits(startDate.getMinutes());
    }

    if (containsMinutes && !spansMultipleDays) {
      result += " - " + this.toTwoDigits(endDate.getHours()) + ":" + this.toTwoDigits(endDate.getMinutes()) + " Uhr ";
    }

    if (spansMultipleDays) {
      result += " - " + endDate.toLocaleString('de-de', {weekday: 'long'}) + ", " +
        (endDate.getDate()) + ". " +
        endDate.toLocaleString('de-de', {month: 'short'}) + " " +
        endDate.getFullYear() + " ";
    }

    if (containsMinutes && spansMultipleDays) {
      result += this.toTwoDigits(endDate.getHours()) + ":" + this.toTwoDigits(endDate.getMinutes()) + " Uhr ";
    }

    return result;
  }

  toTwoDigits(value: number) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  }
}
