
export interface Wallet {
  address: string;
  balance: number;
  transactionCount: number;
  performance: {
    sevenDay: {
      pnl: number;
      winRate: number;
    };
    thirtyDay: {
      pnl: number;
      winRate: number;
    };
  };
  tokens: {
    count: number;
    list: string[];
  };
}

export interface WalletFilters {
  minBalance: number;
  minTransactions: number;
  maxTransactions: number;
}
