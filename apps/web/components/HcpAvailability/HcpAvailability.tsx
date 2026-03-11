'use client';

import { useState, useEffect } from 'react';
import styles from './HcpAvailability.module.css';

interface HcpSlot {
    id: number;
    hospital_id: number;
    department: string;
    hcp_name: string;
    available_date: string;
    available_time: string;
    created_at: string;
}

export default function HcpAvailability() {
    const [slots, setSlots] = useState<HcpSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await fetch('/api/hcp-availability');
            if (!res.ok) throw new Error('Failed to fetch slots');
            const data = await res.json();
            setSlots(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const requestMeeting = async (slot: HcpSlot) => {
        try {
            const res = await fetch('/api/meeting-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hcp_id: slot.id,
                    user_name: 'Demo User', // TODO: Get from auth context
                    user_email: 'demo@example.com', // TODO: Get from auth context
                    requested_date: slot.available_date,
                    requested_time: slot.available_time
                })
            });
            if (!res.ok) throw new Error('Failed to request meeting');
            alert('Meeting request submitted successfully!');
        } catch (err) {
            alert('Failed to request meeting: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    if (loading) return <div>Loading availability...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h2>HCP Availability</h2>
            <div className={styles.grid}>
                {slots.map(slot => (
                    <div key={slot.id} className={styles.card}>
                        <h3>{slot.hcp_name}</h3>
                        <p><strong>Department:</strong> {slot.department}</p>
                        <p><strong>Date:</strong> {new Date(slot.available_date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {slot.available_time}</p>
                        <button onClick={() => requestMeeting(slot)} className="btn-primary">
                            Request Meeting
                        </button>
                    </div>
                ))}
            </div>
            {slots.length === 0 && <p>No availability slots found.</p>}
        </div>
    );
}