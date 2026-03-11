import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
    if (!db) {
        const file = path.join(process.cwd(), 'apps', 'web', 'data', 'leads.db');
        // ensure directory exists
        const dir = path.dirname(file);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        db = new Database(file);
        // ensure tables exist
        db.exec(`
            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                company TEXT NOT NULL,
                message TEXT,
                created_at DATETIME DEFAULT (datetime('now'))
            );
        `);
        db.exec(`
            CREATE TABLE IF NOT EXISTS hcp_availability (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hospital_id INTEGER NOT NULL,
                department TEXT NOT NULL,
                hcp_name TEXT NOT NULL,
                available_date DATE NOT NULL,
                available_time TEXT NOT NULL,
                created_at DATETIME DEFAULT (datetime('now'))
            );
        `);
        db.exec(`
            CREATE TABLE IF NOT EXISTS attendant_pass (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hospital_id INTEGER NOT NULL,
                patient_name TEXT NOT NULL,
                attendant_name TEXT NOT NULL,
                relationship TEXT NOT NULL,
                ward_number TEXT NOT NULL,
                valid_until DATE NOT NULL,
                created_at DATETIME DEFAULT (datetime('now'))
            );
        `);
    }
    return db;
}
