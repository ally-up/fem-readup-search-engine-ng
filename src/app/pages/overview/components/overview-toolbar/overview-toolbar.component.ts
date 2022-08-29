import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaService} from "../../../../core/ui/services/media.service";
import {Media} from "../../../../core/ui/model/media.enum";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";

/**
 * Displays toolbar for overview page
 */
@Component({
  selector: 'app-overview-toolbar',
  templateUrl: './overview-toolbar.component.html',
  styleUrls: ['./overview-toolbar.component.scss'],
})
export class OverviewToolbarComponent implements OnInit, OnDestroy {

  /** App subtitle */
  appSubtitle = environment.app_subtitle;

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

  /**
   * Handles on-destroy lifecycle phase
   */
  ngOnDestroy() {
    this.unsubscribeSubject.next();
  }

  //
  // Initialization
  //

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
