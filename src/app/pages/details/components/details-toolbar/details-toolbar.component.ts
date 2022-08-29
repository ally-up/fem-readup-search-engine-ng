import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {filter, takeUntil} from "rxjs/operators";
import {MediaService} from "../../../../core/ui/services/media.service";
import {Media} from "../../../../core/ui/model/media.enum";
import {Subject} from "rxjs";

/**
 * Displays toolbar for details page
 */
@Component({
  selector: 'app-details-toolbar',
  templateUrl: './details-toolbar.component.html',
  styleUrls: ['./details-toolbar.component.scss']
})
export class DetailsToolbarComponent implements OnInit {

  /** Title */
  @Input() title = '';
  /** Event emitter indicating menu item being clicked */
  @Output() menuItemEventEmitter = new EventEmitter<string>();

  /** Enum of media types */
  public mediaType = Media;
  /** Current media */
  public media: Media = Media.UNDEFINED;

  /** Helper subject used to finish other subscriptions */
  private unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param mediaService media service
   */
  constructor(private mediaService: MediaService) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeMedia();
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
   * Initializes media
   */
  initializeMedia() {
    this.mediaService.mediaSubject.pipe(
      takeUntil(this.unsubscribeSubject),
      filter(value => value != null)
    ).subscribe(media => {
      this.media = media;
    });

    this.mediaService.fetchMedia();
  }
}
