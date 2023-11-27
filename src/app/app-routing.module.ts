import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BookclubComponent } from './pages/bookclub/bookclub.component';

/* List of available routes */
const routes: Routes = [
    // Overview module
    {path: 'overview', loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule)},
    {path: 'details', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule)},
    {path: 'about', component: AboutComponent},
    {path: 'bookclub', component: BookclubComponent},
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: '**', redirectTo: 'overview', pathMatch: 'full'},
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
