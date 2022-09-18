import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OverviewRoutingModule} from './overview-routing.module';
import {OverviewComponent} from './pages/overview/overview.component';
import {OverviewToolbarComponent} from './components/overview-toolbar/overview-toolbar.component';
import {EventListComponent} from './components/event-list/event-list.component';
import {EventListItemComponent} from './components/event-list-item/event-list-item.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TagChipsModule} from "../../ui/tag-chips/tag-chips.module";
import {SearchPanelComponent} from "./components/search-panel/search-panel.component";
import {SearchPanelTopicsComponent} from "./components/search-panel-topics/search-panel-topics.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewToolbarComponent,
    EventListComponent,
    EventListItemComponent,
    SearchPanelComponent,
    SearchPanelTopicsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatToolbarModule,

    TagChipsModule,

    OverviewRoutingModule
  ]
})
export class OverviewModule {
}
