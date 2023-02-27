import { Injectable } from '@angular/core';
import { db, Transaction } from 'src/app/shared/db';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  async getTransactions() {
    return await db.transactions.toArray();
  }

  async createTransaction(transaction: Transaction) {
    return await db.transactions.add(transaction);
  }

  async removeTransaction(transaction: Transaction) {
    return await db.transactions.delete(transaction.id!);
  }

  async getTransactionsWithPeriod(startDate: Date, endDate: Date) {
    return await db.transactions.where('date').between(startDate, endDate, true, true).reverse().sortBy('date');
  }


}
