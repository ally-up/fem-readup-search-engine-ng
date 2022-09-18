import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventFirestoreService} from "./services/event-firestore.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    EventFirestoreService
  ]
})
export class EventModule {
}
