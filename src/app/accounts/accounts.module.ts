import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateComponent } from './create/create.component';
import { MaterialModulesModule } from '../shared/material-modules.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MaterialModulesModule,
    SharedModule
  ]
})
export class AccountsModule { }
