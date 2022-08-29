import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {filter, takeUntil} from "rxjs/operators";
import {EventFirestoreService} from "../../../../core/event/services/event-firestore.service";
import {Event} from "../../../../core/event/model/event"
import {FilterService} from "../../../../core/event/services/filter.service";
import {SelectableCategory} from "../../../../core/event/model/selectable-category";
import {MaterialColorService} from "../../../../core/ui/services/material-color.service";
import {MaterialIconService} from "../../../../core/ui/services/material-icon.service";
import {HueType} from "../../../../core/ui/model/hue-type.enum";
import {animate, state, style, transition, trigger} from "@angular/animations";

/**
 * Displays overview page
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [
    trigger('searchPanelAnimation', [
      state('panel-open', style({
        opacity: '1',
        overflow: 'hidden',
        height: '*'
      })),
      state('panel-closed', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px'
      })),
      transition('* => *', animate('400ms ease-in-out'))
    ])
  ]
})
export class OverviewComponent implements OnInit, OnDestroy {

  /** Map of events */
  public eventsMap = new Map<string, Event>();
  /** Map of filtered events */
  public eventsMapFiltered = new Map<string, Event>();

  /** Map of categories */
  selectableCategoriesMap = new Map<string, SelectableCategory>();

  /** Filter values for categories */
  categoriesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();

  /** Background color for categories */
  public categoriesBackgroundColor = 'transparent';
  /** Text color for category */
  public categoriesTextColor = 'black';

  /** State of the search panel */
  searchPanelState = 'panel-closed';

  /** Helper subject used to finish other subscriptions */
  public unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param dialog dialog
   * @param filterService filter service
   * @param eventFirestoreService event Firestore service
   * @param iconRegistry icon registry
   * @param materialColorService material color service
   * @param materialIconService material icon service
   * @param router router
   * @param sanitizer sanitizer
   */
  constructor(private dialog: MatDialog,
              private filterService: FilterService,
              private eventFirestoreService: EventFirestoreService,
              private iconRegistry: MatIconRegistry,
              private materialColorService: MaterialColorService,
              private materialIconService: MaterialIconService,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeSubscriptions();

    this.initializeMaterialColors();
    this.findEntities();
  }

  /**
   * Handles on-destroy lifecycle phase
   */
  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  //
  // Initialization
  //

  /**
   * Initializes subscriptions
   */
  private initializeSubscriptions() {
    this.eventFirestoreService.eventsSubject.pipe(
      takeUntil(this.unsubscribeSubject),
      filter(value => value != null)
    ).subscribe(value => {
      this.onEventsUpdated(value as Event);
    });
  }

  /**
   * Initializes events
   * @param event event
   */
  private initializeEvents(event: Event) {
    this.eventsMap.set(event.id, event);
    this.eventsMap = new Map(this.eventsMap);
  }

  /**
   * Initializes categories
   * @param event event
   */
  private initializeCategories(event: Event) {
    if (event.category != null) {
      this.selectableCategoriesMap.set(event.category, new SelectableCategory(event.category));

      this.selectableCategoriesMap = new Map(this.selectableCategoriesMap);
    }
  }

  /**
   * Initializes material colors
   */
  private initializeMaterialColors() {
    this.categoriesBackgroundColor = this.materialColorService.color(this.materialColorService.primaryPalette, HueType._200);
    this.categoriesTextColor = this.materialColorService.contrast(this.materialColorService.primaryPalette, HueType._200);
  }

  /**
   * Initializes events based on filter
   * @param eventsMap events map
   */
  private initializeEventsFiltered(eventsMap: Map<string, Event>) {
    const eventsMapFiltered = new Map<string, Event>();

    Array.from(eventsMap.values()).filter(event => {
      return this.filterService.filterEvent(event, this.selectableCategoriesMap);
    }).forEach(event => {
      eventsMapFiltered.set(event.id, event);
    });

    // Re-instantiate to trigger change detection
    this.eventsMapFiltered = new Map(eventsMapFiltered);
  }

  /**
   * Initializes filter
   */
  private initializeFilters() {
    this.selectableCategoriesMap.forEach((value: SelectableCategory, _: string) => {
      value.disabled = false;
      value.selected = false;
    });

    // Transform selectable maps to value maps
    this.selectableCategoriesMap.forEach((value: SelectableCategory, _: string) => {
      this.categoriesValuesMap.set(value.name, [
        this.materialIconService.getCategoriesIcon(value.name),
        value.disabled,
        value.selected
      ]);
    });

    // Re-instantiate to trigger change detection
    this.categoriesValuesMap = new Map(this.categoriesValuesMap);
  }

  //
  // Events
  //

  /**
   * Handles click on menu item
   * @param menuItem menu item
   */
  onMenuItemClicked(menuItem: string) {
    switch (menuItem) {
      case 'filter': {
        this.searchPanelState = this.searchPanelState === 'panel-open' ? 'panel-closed' : 'panel-open';
        break;
      }
      case 'filter-reset': {
        this.initializeFilters();
        this.initializeEventsFiltered(this.eventsMap);
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * Handles events being loaded
   * @param event event
   */
  onEventsUpdated(event: Event) {
    this.initializeEvents(event);
    this.initializeCategories(event);

    this.initializeFilters();
    this.initializeEventsFiltered(this.eventsMap);
  }

  /**
   * Handles event being clicked
   * @param event event name
   */
  onEventClicked(event: string) {
    this.router.navigate([`/details/${event}`]);
  }

  /**
   * Handles selection of categories
   * @param event map of categories
   */
  onCategoriesSelected(event: Map<string, [string, boolean, boolean]>) {

    this.selectableCategoriesMap.forEach((value: SelectableCategory, _: string) => {
      // @ts-ignore
      value.selected = event.has(value.name) && event.get(value.name)[1];
    });

    this.initializeEventsFiltered(this.eventsMap);
  }

  //
  // Storage
  //

  /**
   * Finds entities
   * @param forceReload force reload
   */
  private findEntities(forceReload = false) {
    this.eventFirestoreService.fetchEvents();
  }
}
