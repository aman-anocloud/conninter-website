import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

// PATCH to update a booking status by ID
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await request.json();

        if (!body.booking_status) {
            return NextResponse.json({ error: 'Missing booking_status' }, { status: 400 });
        }

        if (!fs.existsSync(dbPath)) {
            return NextResponse.json({ error: 'Database not found' }, { status: 404 });
        }

        const fileData = fs.readFileSync(dbPath, 'utf8');
        const db = JSON.parse(fileData);

        const bookingIndex = db.bookings.findIndex((b: { id: string }) => b.id === id);

        if (bookingIndex === -1) {
             return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Update the status
        db.bookings[bookingIndex].booking_status = body.booking_status;

        // Save back to file
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({ success: true, booking: db.bookings[bookingIndex] });

    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
