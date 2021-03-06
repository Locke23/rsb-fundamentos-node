import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(trs => {
      balance[trs.type] += trs.value;
    });
    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create(trs: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction(trs);
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
