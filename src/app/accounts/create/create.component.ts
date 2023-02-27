import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/shared/db';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  accountForm!: FormGroup

  accounts?: Account[];

  constructor(private accountService: AccountService, private snackBar: MatSnackBar) {
    this.accountForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl("asset", Validators.required)
    })
  }

  ngOnInit(): void {
    this.accountService.getAllAccounts().then(accounts => this.accounts = accounts);
  }

  async createAccount(): Promise<void> {
    const account = this.accountForm.value;
    this.accountForm.reset();
    await this.accountService.createAccount(account).then(() => this.snackBar.open('account created', undefined, { duration: 1000 }));
  }


}
