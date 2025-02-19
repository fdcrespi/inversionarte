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
    const result = await pool.query("SELECT w.*, (select sum(i.cantidad) from invesment i where i.wallet_id = w.id) as balance FROM wallet w");
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
    (name) ? data = await pool.query("SELECT a.*, t.name as type_name FROM active a JOIN types t ON a.type_id = t.id WHERE a.name = $1", [name])
    : data = await pool.query(`SELECT a.*, t.name as type_name FROM active a JOIN types t ON a.type_id = t.id`);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch actives data.');
  }
}

export async function fetchInvesment() {
  noStore();
  try {
    const result = await pool.query("SELECT i.*, w.name as wallet_name, a.name as active_name FROM invesment i JOIN wallet w ON i.wallet_id = w.id JOIN active a ON i.active_id = a.id ");
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invesment data.");
  }
}

export async function deleteInvestment(id: string) {
  noStore();
  try {
    await pool.query("DELETE FROM invesment WHERE id = $1", [id])
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete invesment")
  }
}