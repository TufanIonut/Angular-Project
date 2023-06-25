import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from 'src/_core/guards/dashboard.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { StorePageComponent } from './store-page/store-page.component';

const routes: Routes = [
  {path: '',
  component:DashboardComponent,
  canActivate:[DashboardGuard],
    children: [
    {path:'',pathMatch:'full',redirectTo:'dashboard-page'},
    {path:'dashboard-page',component:HomePageComponent},
    {path:'about',component:AboutPageComponent},
    {path:'store',component:StorePageComponent},
    {path:'home',component:HomePageComponent}
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
