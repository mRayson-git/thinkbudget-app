import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionEvents } from 'dexie';
import { AccountService } from 'src/app/accounts/services/account.service';
import { Account, AccountType, Transaction } from 'src/app/shared/db';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  currDate: Date = new Date();

  transactions?: Transaction[];
  assetAccounts?: Account[];
  displayedColumns: string[] = ['destinationAccount', 'amount', 'date'];

  periodForm!: FormGroup;

  constructor(private transactionService: TransactionService, private accountService: AccountService, private snackBar: MatSnackBar) {
    let startDate: Date = new Date();
    startDate.setDate(1);

    this.periodForm = new FormGroup({
      startDate: new FormControl(startDate),
      endDate: new FormControl(new Date)
    });

    this.periodForm.valueChanges.subscribe(() => {
      if (this.startDate && this.endDate) {
        this.getTransactions();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.getTransactions();
    await this.accountService.getAccountsOfType(AccountType.ASSET).then(accounts => this.assetAccounts = accounts);
  }

  isExpense(transaction: Transaction): boolean {
    return !this.assetAccounts?.find(account => transaction.destinationAccount == account.name);
  }

  toggleDelete(): void {
    this.displayedColumns.find(column => column === 'delete') ? this.displayedColumns.pop() : this.displayedColumns.push('delete');
  }

  removeTransaction(transaction: Transaction): void {
    this.transactionService.removeTransaction(transaction).then(() => {
      this.getTransactions();
      this.snackBar.open('transaction removed', undefined, { duration: 2000 })
    });
  }

  async getTransactions(): Promise<void> {
    const startDate = this.periodForm.get('startDate')!.value;
    const endDate = this.periodForm.get('endDate')!.value;
    console.log(`startDate ${startDate}`);
    console.log(`endDate: ${endDate}`);
    await this.transactionService.getTransactionsWithPeriod(startDate, endDate).then(transactions => this.transactions = transactions);
    console.log(this.transactions);
  }


  get totalExpense(): number {
    let total = 0;
    this.transactions?.forEach(transaction => {
      if (this.isExpense(transaction)) {
        total = total + transaction.amount;
      }
    })
    return total;
  }

  get totalIncome(): number {
    let total = 0;
    this.transactions?.forEach(transaction => {
      if (!this.isExpense(transaction)) {
        total = total + transaction.amount;
      }
    })
    return total;
  }

  get startDate(): Date {
    return this.periodForm.get('startDate')?.value;
  }

  get endDate(): Date {
    return this.periodForm.get('endDate')?.value;
  }


}
