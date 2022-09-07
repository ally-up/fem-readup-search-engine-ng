import {Component, Input} from '@angular/core';
import {Event} from "../../../../core/event/model/event";

/**
 * Displays event list item
 */
@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent {

  /** Event to be displayed */
  @Input() event: Event | null = null;

  /** Default image URL */
  defaultImageUrl = "/assets/images/hanson-lu-RIImWnZkoog-unsplash.webp";

  //
  // Helpers
  //

  /**
   * Checks of date is in the past
   * @param value
   */
  isInThePast(value: string | null) {
    return value != null ? new Date(value.replace("Z", "")) < new Date() : null;
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
