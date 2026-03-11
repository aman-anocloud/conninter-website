import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to our local JSON database
const dbPath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
    try {
        // Ensure the file exists before reading
        if (!fs.existsSync(dbPath)) {
            return NextResponse.json({ error: 'Database not found' }, { status: 404 });
        }

        const fileData = fs.readFileSync(dbPath, 'utf8');
        const db = JSON.parse(fileData);

        // Return only active partners
        const activePartners = db.partners.filter((p: { active: boolean }) => p.active);

        return NextResponse.json(activePartners);
    } catch (error) {
        console.error('Error reading partners:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
