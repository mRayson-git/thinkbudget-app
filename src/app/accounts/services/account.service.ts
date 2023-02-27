import { Injectable } from '@angular/core';
import { db, Account, AccountType } from 'src/app/shared/db';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  async createAccount(account: Account) {
    return db.accounts.add(account);
  }

  async getAccountsOfType(accountType: AccountType) {
    return db.accounts.where({ type: accountType }).toArray();
  }

  async getAllAccounts() {
    return db.accounts.toArray();
  }
}
