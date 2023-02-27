import Dexie, { Table } from 'dexie';

export interface Transaction {
    id?: number,
    description: string;
    amount: number;
    sourceAccount?: string,
    sourceAccountId: number;
    destinationAccount?: string,
    destinationAccountId: number;
    date: Date;
}

export interface Account {
    id?: number,
    name: string;
    type: AccountType;
}

export enum AccountType {
    ASSET = 'asset',
    EXPENSE = 'expense'
}

export class AppDB extends Dexie {
    //tables
    transactions!: Table<Transaction, number>;
    accounts!: Table<Account, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(4).stores({
            transactions: '++id, sourceAccountId, destinationAccountId, date',
            accounts: '++id, name, type'
        })
    }
}

export const db = new AppDB();