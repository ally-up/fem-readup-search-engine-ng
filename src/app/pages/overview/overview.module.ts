import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OverviewRoutingModule} from './overview-routing.module';
import {OverviewComponent} from './pages/overview/overview.component';
import {OverviewToolbarComponent} from './components/overview-toolbar/overview-toolbar.component';
import {LogoComponent} from "./components/logo/logo.component";
import {EventListComponent} from './components/event-list/event-list.component';
import {EventListItemComponent} from './components/event-list-item/event-list-item.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    LogoComponent,
    OverviewComponent,
    OverviewToolbarComponent,
    EventListComponent,
    EventListItemComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatDialogModule,
    MatToolbarModule,

    OverviewRoutingModule
  ]
})
export class OverviewModule {
}
