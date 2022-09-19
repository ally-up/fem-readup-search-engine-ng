import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

/**
 * Handles material icons
 */
@Injectable({
  providedIn: 'root'
})
export class MaterialIconService {

  /**
   * Initializes icons
   *
   * @param iconRegistry icon registry
   * @param sanitizer sanitizer
   */
  public initializeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/magnify.svg'));
  }

  /**
   * Retrieves icon
   * @param value value
   */
  getCategoriesIcon(value: string) {
    switch (value) {
      default:
        return "";
    }
  }
}
