"use server"

import { unstable_noStore as noStore } from 'next/cache';
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

export async function fetchWallets() {
  noStore();
  try {
    const result = await pool.query("SELECT *, (select sum(i.cantidad) from invesment i where i.wallet_id = w.id) as balance FROM wallet w");
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch wallets data.");
  }
}


export async function fetchActives(name?: string) {
  noStore();
  try {
    let data;
    (name) ? data = await pool.query("SELECT * FROM active WHERE name = $1", [name])
    : data = await pool.query(`SELECT * FROM active`);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch actives data.');
  }
}