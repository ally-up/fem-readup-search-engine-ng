import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MediaService} from "../../../../core/ui/services/media.service";
import {Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";

/**
 * Displays toolbar for details page
 */
@Component({
  selector: 'app-details-toolbar',
  templateUrl: './details-toolbar.component.html',
  styleUrls: ['./details-toolbar.component.scss']
})
export class DetailsToolbarComponent {

  /** Title */
  @Input() title: string | null = null;
  /** Event emitter indicating menu item being clicked */
  @Output() menuItemEventEmitter = new EventEmitter<string>();

  /** App title */
  appTitle = environment.app_title;

  /** Navigator */
  nav = navigator;

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param mediaService media service
   */
  constructor(private mediaService: MediaService) {
  }

  //
  // Actions
  //

  /**
   * Handles click on back button
   */
  onBackClicked() {
    this.menuItemEventEmitter.emit('back');
  }

  /**
   * Handles click on share button
   */
  onShareClicked() {
    this.menuItemEventEmitter.emit('share');
  }
}
