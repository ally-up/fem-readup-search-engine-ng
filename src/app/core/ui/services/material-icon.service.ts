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
    iconRegistry.addSvgIcon('arrow-left', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/arrow-left.svg'));

    iconRegistry.addSvgIcon('currency-eur', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/currency-eur.svg'));
    iconRegistry.addSvgIcon('map-marker-outline', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/map-marker-outline.svg'));
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/magnify.svg'));
    iconRegistry.addSvgIcon('filter-off-outline', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/filter-off-outline.svg'));

    iconRegistry.addSvgIcon('web', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/web.svg'));
    iconRegistry.addSvgIcon('phone', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/phone.svg'));
    iconRegistry.addSvgIcon('email-outline', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/email-outline.svg'));
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
