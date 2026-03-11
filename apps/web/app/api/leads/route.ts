import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, company, message } = body || {};

        if (!name || !email || !phone || !company) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();
        const stmt = db.prepare(
            'INSERT INTO leads (name, email, phone, company, message) VALUES (?, ?, ?, ?, ?)'
        );
        const result = stmt.run(name, email, phone, company, message || null);

        return NextResponse.json({ success: true, id: result.lastInsertRowid });
    } catch (err) {
        console.error('Error saving lead', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
