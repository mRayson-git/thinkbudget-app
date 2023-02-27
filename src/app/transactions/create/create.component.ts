import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith, tap } from 'rxjs';
import { AccountService } from 'src/app/accounts/services/account.service';
import { Account, AccountType, Transaction } from 'src/app/shared/db';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  defaultDate: Date = new Date();
  transactionForm!: FormGroup;

  accounts?: Account[];
  sourceAccountOptions?: Observable<Account[] | undefined>;
  destinationAccountOptions?: Observable<Account[] | undefined>;

  constructor(private accountService: AccountService, private transactionService: TransactionService, private snackBar: MatSnackBar) {
    this.defaultDate.setHours(0);
    this.defaultDate.setMinutes(0);
    this.defaultDate.setSeconds(0);
    this.defaultDate.setMilliseconds(0);
    this.transactionForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      sourceAccount: new FormControl('', Validators.required),
      destinationAccount: new FormControl('', Validators.required),
      date: new FormControl(this.defaultDate, Validators.required)
    })
  }

  ngOnInit(): void {
    this.accountService.getAllAccounts().then(accounts => this.accounts = accounts);
    this.sourceAccountOptions = this.transactionForm.get('sourceAccount')?.valueChanges.pipe(
      startWith(() => ''),
      map(() => this.accounts?.filter(account => account.name.toLowerCase().includes(this.sourceAccount))),
    )
    this.destinationAccountOptions = this.transactionForm.get('destinationAccount')?.valueChanges.pipe(
      startWith(() => ''),
      map(() => this.accounts?.filter(account => account.name.toLowerCase().includes(this.destinationAccount)))
    )
  }

  get sourceAccount(): string {
    return this.transactionForm.get('sourceAccount')?.value.toLowerCase()
  }

  get destinationAccount(): string {
    return this.transactionForm.get('destinationAccount')?.value.toLowerCase()
  }

  async createTransaction(): Promise<void> {
    // source & destination need to be replaced with id values
    const transaction: Transaction = this.transactionForm.value;
    let sourceAccount = this.accounts?.find(existingAccount => existingAccount.name == this.transactionForm.get('sourceAccount')?.value);
    let destinationAccount = this.accounts?.find(existingAccount => existingAccount.name == this.transactionForm.get('destinationAccount')?.value);

    if (!sourceAccount) {
      await this.accountService.createAccount({
        name: this.transactionForm.get('sourceAccount')!.value!,
        type: AccountType.EXPENSE
      }).then(id => transaction.sourceAccountId = id)
    } else {
      transaction.sourceAccountId = sourceAccount.id!
    }

    if (!destinationAccount) {
      await this.accountService.createAccount({
        name: this.transactionForm.get('destinationAccount')!.value!,
        type: AccountType.EXPENSE
      }).then(id => transaction.destinationAccountId = id)
    } else {
      transaction.destinationAccountId = destinationAccount.id!
    }

    //sanitize transaction
    this.transactionForm.reset({ sourceAccount: '', destinationAccount: '', date: new Date() });
    await this.transactionService.createTransaction(transaction).then(() => this.snackBar.open('transaction created', undefined, { duration: 1000 }));
  }
}
