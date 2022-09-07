import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

/**
 * Displays search panel
 */
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnChanges {

  /** Map of categories */
  @Input() categoriesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
  /** Start date */
  @Input() startDate: Date | null = null;
  /** End date */
  @Input() endDate: Date | null = null;

  /** Background color for goal tags */
  @Input() categoriesBackgroundColor = 'transparent';

  /** Event emitter indicating filter value being changed */
  @Output() categoriesSelectedEmitter = new EventEmitter<Map<string, [string, boolean, boolean]>>();
  /** Event emitter indicating filter value being changed */
  @Output() startDateSelectedEmitter = new EventEmitter<Date | null>();
  /** Event emitter indicating filter value being changed */
  @Output() endDateSelectedEmitter = new EventEmitter<Date | null>();

  /** Date picker range */
  range = new UntypedFormGroup({
    start: new UntypedFormControl(null),
    end: new UntypedFormControl(null),
  });

  /** Number */
  num = Number;

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-changes lifecycle phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeRange(this.startDate, this.endDate);
  }

  //
  //  Initialization
  //

  /**
   * Initializes range
   */
  private initializeRange(startDate: Date | null, endDate: Date | null) {
    this.range = new UntypedFormGroup({
      start: new UntypedFormControl(startDate),
      end: new UntypedFormControl(endDate),
    });
  }

  /**
   * Handles selection of categories
   * @param event map of categories
   */
  onCategoriesSelected(event: Map<string, [string, boolean, boolean]>) {
    this.categoriesSelectedEmitter.emit(event);
  }

  /**
   * Handles selection of start date
   * @param event datepicker event
   */
  onStartDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.startDateSelectedEmitter.emit(event.value);
    }
  }

  /**
   * Handles selection of end date
   * @param event datepicker event
   */
  onEndDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.endDateSelectedEmitter.emit(event.value);
    }
  }

  /**
   * Handles click on past-events button
   */
  onPastEventsClicked() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.initializeRange(null, yesterday);
    this.startDateSelectedEmitter.emit(null);
    this.endDateSelectedEmitter.emit(yesterday);
  }

  /**
   * Handles click on upcoming-seven-days button
   */
  onUpcomingSevenDaysClicked() {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 7);

    this.initializeRange(today, endDate);
    this.startDateSelectedEmitter.emit(today);
    this.endDateSelectedEmitter.emit(endDate);
  }

  /**
   * Handles click on upcoming-thirty-days button
   */
  onUpcomingThirtyDaysClicked() {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 31);

    this.initializeRange(today, endDate)
    this.startDateSelectedEmitter.emit(today);
    this.endDateSelectedEmitter.emit(endDate);
  }

  /**
   * Handles click on time-range-reset button
   */
  onTimeRangeResetClicked() {
    const today = new Date();
    const endDate = null;

    this.initializeRange(today, endDate);
    this.startDateSelectedEmitter.emit(today);
    this.endDateSelectedEmitter.emit(endDate);
  }
}
