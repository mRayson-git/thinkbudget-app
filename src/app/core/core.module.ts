import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModulesModule } from '../shared/material-modules.module';
import { SharedModule } from '../shared/shared.module';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    TopNavComponent,
    BottomNavComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    MaterialModulesModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    TopNavComponent,
    BottomNavComponent
  ]
})
export class CoreModule { }
