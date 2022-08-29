import {Injectable} from '@angular/core';
import {Event} from '../model/event';
import {SelectableCategory} from "../model/selectable-category";

/**
 * Handles filtering
 */
@Injectable({
  providedIn: 'root'
})
export class FilterService {

  /**
   * Filters a event based on a list of criteria
   * @param event event
   * @param selectableCategoriesMap selectable categories map
   */
  filterEvent(event: Event,
              selectableCategoriesMap = new Map<string, SelectableCategory>()) {

    const matchesCategory = this.checkCategoryMatch(event, selectableCategoriesMap);

    return matchesCategory;
  }

  /**
   * Checks if the given event contains any of the categories selected in the filter
   * @param event event
   * @param selectableCategoriesMap selectable categories map
   */
  private checkCategoryMatch(event: Event, selectableCategoriesMap: Map<string, SelectableCategory>): boolean {
    let matchesCategories = true;

    if (FilterService.isAnyCategorieselected(selectableCategoriesMap)) {
      matchesCategories = Array.from(selectableCategoriesMap.values()).some(selectableCategory => {
          return selectableCategory.selected && selectableCategory.name === event.category;
      });
    }

    return matchesCategories;
  }

  //
  // Helpers
  //

  /**
   * Checks if any category filter is set
   * @param selectableCategoriesMap selectable categories map
   */
  private static isAnyCategorieselected(selectableCategoriesMap: Map<string, SelectableCategory>) {
    return Array.from(selectableCategoriesMap.values()).some(category => {
      return category.selected;
    });
  }
}
