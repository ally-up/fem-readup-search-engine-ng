/**
 * Extends category by attributes to make it selectable
 */
export class SelectableCategory {
  /** Whether the category is selected */
  selected = true;
  /** Whether the category is selectable */
  disabled = false;

  /**
   * Constructor
   * @param name name
   */
  constructor(public name: string) {
  }
}
