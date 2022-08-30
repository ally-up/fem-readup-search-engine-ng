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
   * @param startDate start date
   * @param endDate end date
   */
  filterEvent(event: Event, selectableCategoriesMap = new Map<string, SelectableCategory>(),
              startDate: Date | null, endDate: Date | null) {
    const matchesCategory = this.checkCategoryMatch(event, selectableCategoriesMap);
    const matchesDate = this.checkDateMatch(event, startDate, endDate);

    return matchesCategory && matchesDate;
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

  /**
   * Checks if event is between a given start date and end date
   * @param event event
   * @param startDate start date
   * @param endDate end date
   */
  private checkDateMatch(event: Event, startDate: Date | null, endDate: Date | null): boolean {
    if (startDate != null && endDate != null) {
      const endDateIncreased = new Date(endDate);
      endDateIncreased.setDate(endDate.getDate() + 1);

      return (event.start_date == null || startDate < new Date(event.start_date.replace("Z", ""))) &&
        (event.end_date == null || endDateIncreased > new Date(event.end_date.replace("Z", "")));
    } else {
      return true;
    }
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
