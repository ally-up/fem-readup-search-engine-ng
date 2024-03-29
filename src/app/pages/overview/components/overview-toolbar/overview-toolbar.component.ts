import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MediaService} from "../../../../core/ui/services/media.service";
import {Media} from "../../../../core/ui/model/media.enum";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { Router } from '@angular/router';

/**
 * Displays toolbar for overview page
 */
@Component({
  selector: 'app-overview-toolbar',
  templateUrl: './overview-toolbar.component.html',
  styleUrls: ['./overview-toolbar.component.scss'],
  animations: [
    trigger('searchResetButtonAnimation', [
      state('panel-open', style({
        opacity: '1',
        width: '*',
        padding: '0 16px'
      })),
      state('panel-closed', style({
        opacity: '0',
        width: '0',
        padding: '0'
      })),
      state('*', style({
        opacity: '0',
        width: '0',
        padding: '0'
      })),
      transition('* => *', animate('250ms ease-in-out'))
    ]),
    trigger('logoAnimation', [
      state('logo-open', style({
        opacity: '1',
        width: '*'
      })),
      state('logo-closed', style({
        opacity: '0',
        width: '0px'
      })),
      state('*', style({
        opacity: '0',
        width: '0px'
      })),
      transition('* => *', animate('250ms ease-in-out'))
    ])
  ]
})
export class OverviewToolbarComponent implements OnInit, OnDestroy {

  /** State of the logo */
  @Input() logoState = "logo-closed";
  /** State of the search panel */
  @Input() searchPanelState = "panel-closed";
  /** Event emitter indicating menu item being clicked */
  @Output() menuItemEventEmitter = new EventEmitter<string>();

  /** App title */
  appTitle = environment.app_title;
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
  constructor(private mediaService: MediaService,
    private router: Router) {
  }

  onAboutClicked() {
    this.router.navigate(['/about']);
  }

  onBookClicked() {
    this.router.navigate(['/bookclub']);
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

  //
  // Actions
  //

  /**
   * Handles click on filter button
   */
  onFilterClicked() {
    this.menuItemEventEmitter.emit('filter');
  }

  /**
   * Handles click on reset filter button
   */
  onResetFilterClicked() {
    this.menuItemEventEmitter.emit('filter-reset');
  }
}
