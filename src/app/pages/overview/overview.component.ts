import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {filter, takeUntil} from "rxjs/operators";
import {EventFirestoreService} from "../../core/event/services/event-firestore.service";
import {Event} from "../../core/event/model/event"
import {FilterService} from "../../core/event/services/filter.service";
import {SelectableCategory} from "../../core/event/model/selectable-category";
import {MaterialColorService} from "../../core/ui/services/material-color.service";
import {MaterialIconService} from "../../core/ui/services/material-icon.service";
import {HueType} from "../../core/ui/model/hue-type.enum";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SelectableLanguage} from "../../core/event/model/selectable-language";
import {environment} from "../../../environments/environment";

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
        height: '*'
      })),
      state('panel-closed', style({
        opacity: '0',
        height: '0px'
      })),
      state('*', style({
        opacity: '0',
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
  /** Map of languages */
  selectableLanguagesMap = new Map<string, SelectableLanguage>();
  /** Start date */
  startDate = new Date();
  /** End date */
  endDate = null;

  /** Filter values for categories */
  categoriesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
  /** Filter values for languages */
  languagesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();

  /** Background color for categories */
  public categoriesBackgroundColor = 'transparent';
  /** Text color for categories */
  public categoriesTextColor = 'black';
  /** Background color for languages */
  public languagesBackgroundColor = 'transparent';
  /** Text color for languages */
  public languagesTextColor = 'black';

  /** State of the search panel */
  searchPanelState = 'panel-closed';

  /** Helper subject used to finish other subscriptions */
  public unsubscribeSubject = new Subject();

  /**
   * Constructor
   * @param filterService filter service
   * @param eventFirestoreService event Firestore service
   * @param iconRegistry icon registry
   * @param materialColorService material color service
   * @param materialIconService material icon service
   * @param router router
   * @param sanitizer sanitizer
   */
  constructor(private filterService: FilterService,
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
    this.findEntitiesAfter(new Date().toISOString());
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
      this.onEventsUpdated(value as Event[]);
    });
  }

  /**
   * Initializes events
   * @param events events
   */
  private initializeEvents(events: Event[]) {
    events.forEach(event => {
      if (event != null && event.id != null) {
        let image = this.findImageForCategory(event)
        if(image === undefined) {
        image = environment.defaultImageUrl
        }
        event.image = image
        this.eventsMap.set(event.id, event);
      }
    });

    this.eventsMap = new Map(this.eventsMap);
  }


private findImageForCategory(event: Event) : string | undefined {  

for (let type of environment.category_types.keys()) {
  if(event.category?.toLowerCase()?.includes(type.toLowerCase())) {
    return environment.category_types.get(type) 
  }
}
return environment.defaultImageUrl
}

  /**
   * Initializes categories
   * @param events events
   */
  private initializeCategories(events: Event[]) {
    events.forEach(event => {
      if (event.category != null) {
        if (!this.selectableCategoriesMap.has(event.category)) {
          this.selectableCategoriesMap.set(event.category, new SelectableCategory(event.category));
        }

        // Re-instantiate to trigger change detection
        this.selectableCategoriesMap = new Map(this.selectableCategoriesMap);
      }
    });
  }

  /**
   * Initializes languages
   * @param events events
   */
  private initializeLanguages(events: Event[]) {
    events.forEach(event => {
      if (event.languages != null) {
        event.languages = event.languages.filter(language => {
          return language.length > 0;
        });

        event.languages.forEach(language => {
          if (!this.selectableLanguagesMap.has(language)) {
            this.selectableLanguagesMap.set(language, new SelectableLanguage(language));
          }
        })

        // Re-instantiate to trigger change detection
        this.selectableLanguagesMap = new Map(this.selectableLanguagesMap);
      }
    });
  }

  /**
   * Initializes material colors
   */
  private initializeMaterialColors() {
    this.categoriesBackgroundColor = this.materialColorService.color(this.materialColorService.primaryPalette, HueType._200);
    this.categoriesTextColor = this.materialColorService.contrast(this.materialColorService.primaryPalette, HueType._200);
    this.languagesBackgroundColor = this.materialColorService.color(this.materialColorService.primaryPalette, HueType._200);
    this.languagesTextColor = this.materialColorService.contrast(this.materialColorService.primaryPalette, HueType._200);
  }

  /**
   * Initializes events based on filter
   * @param eventsMap events map
   */
  private initializeEventsFiltered(eventsMap: Map<string, Event>) {
    const eventsMapFiltered = new Map<string, Event>();

    Array.from(eventsMap.values()).filter(event => {
      return this.filterService.filterEvent(event, this.selectableCategoriesMap, this.selectableLanguagesMap, this.startDate, this.endDate);
    }).forEach(event => {
      if (event.id) {
        eventsMapFiltered.set(event.id, event);
      }
    });

    // Re-instantiate to trigger change detection
    this.eventsMapFiltered = new Map(eventsMapFiltered);
  }

  /**
   * Initializes filter
   */
  private initializeFilters() {
    // Reset category filters
    this.selectableCategoriesMap.forEach((value: SelectableCategory, _: string) => {
      value.disabled = false;
      value.selected = false;
    });

    // Reset date filters
    this.startDate = new Date();
    this.endDate = null;

    this.updateFilters();
  }

  /**
   * Updates filter
   */
  private updateFilters() {
    // Transform selectable maps to values map
    this.selectableCategoriesMap.forEach((value: SelectableCategory, _: string) => {
      this.categoriesValuesMap.set(value.name, [
        this.materialIconService.getCategoriesIcon(value.name),
        value.disabled,
        value.selected
      ]);
    });

    // Re-instantiate to trigger change detection
    this.categoriesValuesMap = new Map(this.categoriesValuesMap);

    // Transform selectable maps to values map
    this.selectableLanguagesMap.forEach((value: SelectableLanguage, _: string) => {
      this.languagesValuesMap.set(value.name, [
        this.materialIconService.getLanguagesIcon(value.name),
        value.disabled,
        value.selected
      ]);
    });

    // Re-instantiate to trigger change detection
    this.languagesValuesMap = new Map(this.languagesValuesMap);
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
   * @param events events
   */
  onEventsUpdated(events: Event[]) {
    this.initializeEvents(events);
    this.initializeCategories(events);
    this.initializeLanguages(events);

    this.updateFilters();
    this.initializeEventsFiltered(this.eventsMap);
  }

  /**
   * Handles event being clicked
   * @param event event id
   */
  onEventClicked(event: string) {
    this.router.navigate([`/details/${event}`]).then(() => {
    });
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


  /**
   * Handles selection of languages
   * @param event map of languages
   */
  onLanguagesSelected(event: Map<string, [string, boolean, boolean]>) {
    this.selectableLanguagesMap.forEach((value: SelectableLanguage, _: string) => {
      // @ts-ignore
      value.selected = event.has(value.name) && event.get(value.name)[1];
    });

    this.initializeEventsFiltered(this.eventsMap);
  }

  /**
   * Handles selection of start date
   * @param event start date
   */
  onStartDateSelected(event: Date | null) {
    // @ts-ignore
    this.startDate = event;
    this.initializeEventsFiltered(this.eventsMap);
  }

  /**
   * Handles selection of end date
   * @param event end date
   */
  onEndDateSelected(event: Date | null) {
    // @ts-ignore
    this.endDate = event;
    this.initializeEventsFiltered(this.eventsMap);
  }

  /**
   * Handles selection of past events
   * @param event irrelevant
   */
  onPastEventsSelected(event: boolean) {
    setTimeout(() => {
      if (this.endDate != null) {
        // @ts-ignore
        this.findEntitiesBefore(this.endDate.toISOString());
      }
    }, 500);
  }

  //
  // Storage
  //

  /**
   * Finds entities
   */
  private findEntitiesAfter(date: string) {
    this.eventFirestoreService.fetchEventsAfterDate(date);
  }

  /**
   * Finds entities
   */
  private findEntitiesBefore(date: string) {
    this.eventFirestoreService.fetchEventsBeforeDate(date);
  }

  /**
   * Finds entities
   */
  private findAllEntities() {
    this.eventFirestoreService.fetchEvents();
  }
}
