import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/homepage/homepage.component';

const routes: Routes = [
  { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) },
  { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
  { path: '**', component: HomepageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
