import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
  @Input() startDate = null;
  /** End date */
  @Input() endDate = null;

  /** Background color for goal tags */
  @Input() categoriesBackgroundColor = 'transparent';

  /** Event emitter indicating filter value being changed */
  @Output() categoriesSelectedEmitter = new EventEmitter<Map<string, [string, boolean, boolean]>>();
  /** Event emitter indicating filter value being changed */
  @Output() startDateSelectedEmitter = new EventEmitter<Date>();
  /** Event emitter indicating filter value being changed */
  @Output() endDateSelectedEmitter = new EventEmitter<Date>();

  /** Date picker range */
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
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
    this.range = new FormGroup({
      start: new FormControl(this.startDate),
      end: new FormControl(this.endDate),
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
}
