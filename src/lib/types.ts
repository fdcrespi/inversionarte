export interface Wallet {
  id: number;
  name: string;
  balance: number
}

export interface Types {
  id: number;
  name: string;
}

export interface Usuario {
  id: string;
  email: string
}

export interface Investment {
  id: string;
  activo: number;
  type: number;
  amount: string;
  value: string;
  money: string;
  wallet: number;
  purchaseDate: string;
  currentPrice: string;
  profitLoss: string;
};

export interface Actives {
  id: string;
  name: string;
  types: {
    id: string,
    name: string
  };
  value_usd: number;
}