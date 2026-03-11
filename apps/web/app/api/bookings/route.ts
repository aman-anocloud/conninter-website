import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to our local JSON database
const dbPath = path.join(process.cwd(), 'data', 'db.json');

// GET all bookings (for Admin Dashboard)
export async function GET() {
    try {
        if (!fs.existsSync(dbPath)) {
            return NextResponse.json({ error: 'Database not found' }, { status: 404 });
        }

        const fileData = fs.readFileSync(dbPath, 'utf8');
        const db = JSON.parse(fileData);

        return NextResponse.json(db.bookings);
    } catch (error) {
        console.error('Error reading bookings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST a new booking (from the Partner Section)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.partner_id || !body.customer_name || !body.email || !body.phone || !body.service || !body.booking_date || !body.booking_time) {
             return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!fs.existsSync(dbPath)) {
            return NextResponse.json({ error: 'Database not found' }, { status: 404 });
        }

        const fileData = fs.readFileSync(dbPath, 'utf8');
        const db = JSON.parse(fileData);

        const newBooking = {
            id: `b${Date.now()}`,
            ...body,
            booking_status: 'pending',
            created_at: new Date().toISOString()
        };

        db.bookings.push(newBooking);

        // Save back to file
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
