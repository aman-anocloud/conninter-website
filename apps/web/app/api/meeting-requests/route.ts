import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { hcp_id, user_name, user_email, requested_date, requested_time } = body || {};

        if (!hcp_id || !user_name || !user_email || !requested_date || !requested_time) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // For now, just log the meeting request
        // In a real app, you'd store this in a database table
        console.log('Meeting request:', {
            hcp_id,
            user_name,
            user_email,
            requested_date,
            requested_time,
            timestamp: new Date().toISOString()
        });

        return NextResponse.json({ success: true, message: 'Meeting request submitted' });
    } catch (err) {
        console.error('Error processing meeting request', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}