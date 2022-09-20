/**
 * Extends language by attributes to make it selectable
 */
export class SelectableLanguage {
  /** Whether the language is selected */
  selected = false;
  /** Whether the language is selectable */
  disabled = false;

  /**
   * Constructor
   * @param name name
   */
  constructor(public name: string) {
  }
}
