export type Wallet = {
  id: number,
  created_at: string,
  name: string
}


export type Active = {
  id: number,
  created_at: string,
  name: string,
  type_id: number,
  value_usd: number,
  updated_at: string
}