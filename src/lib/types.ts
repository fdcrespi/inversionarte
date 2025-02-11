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
  created_at: string;
  cantidad: number;
  wallet: {
    id: number;
    name: string
  };
  active: {
    id: number;
    name: string
    value_usd?: number;
  };
  money: string;
  value: number
};

export interface Actives {
  id: string;
  name: string;
  type: {
    id: string,
    name: string
  };
  value_usd: number;
}