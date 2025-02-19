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
  wallet_id: number;
  wallet_name: string;
  active_id: number;
  active_name: string;
  active_value?: number;
  money: string;
  value: number
};

export interface Actives {
  id: string;
  name: string;
  type_name: string;
  value_usd: number;
}