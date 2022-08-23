import {Component} from '@angular/core';
import {environment} from "../../../../../environments/environment";

/**
 * Displays logo
 */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  /** App title */
  appTitle = environment.app_title;
}
