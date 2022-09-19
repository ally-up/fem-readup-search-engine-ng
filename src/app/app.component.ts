import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../environments/environment";
import {MaterialColorService} from "./core/ui/services/material-color.service";

/**
 * Displays app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Constructor
   * @param iconRegistry icon registry
   * @param materialColorService material color service
   * @param sanitizer sanitizer
   */
  constructor(private iconRegistry: MatIconRegistry,
              public materialColorService: MaterialColorService,
              private sanitizer: DomSanitizer) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.materialColorService.initializeTheme(environment.theme);
  }
}
