import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { CreateComponent } from './create/create.component';
import { MaterialModulesModule } from '../shared/material-modules.module';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MaterialModulesModule,
    SharedModule
  ]
})
export class TransactionsModule { }
