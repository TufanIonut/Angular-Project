import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { StorePageComponent } from './store-page/store-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    AboutPageComponent,
    StorePageComponent,
    NavComponentComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent,
    HomePageComponent,
    AboutPageComponent,
    StorePageComponent,
    NavComponentComponent,
    FooterComponent,
  ]
})
export class DashboardModule { }
