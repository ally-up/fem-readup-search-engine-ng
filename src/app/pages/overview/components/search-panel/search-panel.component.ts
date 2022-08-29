import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Displays search panel
 */
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

  /** Map of categories */
  @Input() categoriesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
  /** Background color for goal tags */
  @Input() categoriesBackgroundColor = 'transparent';

  /** Event emitter indicating filter value being changed */
  @Output() categoriesSelectedEmitter = new EventEmitter<Map<string, [string, boolean, boolean]>>();

  /** Number */
  num = Number;

  /**
   * Handles selection of categories
   * @param event map of categories
   */
  onCategoriesSelected(event: Map<string, [string, boolean, boolean]>) {
    this.categoriesSelectedEmitter.emit(event);
  }
}
