import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AirportComponent} from "./airport/airport.component";
import {HttpTraceComponent} from "./http-trace/http-trace.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'airport',
    component: AirportComponent
  },
  {
    path: 'httpTrace',
    component: HttpTraceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
