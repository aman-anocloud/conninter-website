import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { hospital_id, department, hcp_name, available_date, available_time } = body || {};

        if (!hospital_id || !department || !hcp_name || !available_date || !available_time) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();
        const stmt = db.prepare(
            'INSERT INTO hcp_availability (hospital_id, department, hcp_name, available_date, available_time) VALUES (?, ?, ?, ?, ?)'
        );
        const result = stmt.run(hospital_id, department, hcp_name, available_date, available_time);

        return NextResponse.json({ success: true, id: result.lastInsertRowid });
    } catch (err) {
        console.error('Error adding HCP availability', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const db = getDb();
        const rows = db.prepare('SELECT * FROM hcp_availability ORDER BY available_date, available_time').all();
        return NextResponse.json(rows);
    } catch (err) {
        console.error('Error fetching HCP availability', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}