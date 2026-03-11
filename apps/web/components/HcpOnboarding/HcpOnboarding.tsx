'use client';

import { useState } from 'react';
import styles from './HcpOnboarding.module.css';

const DEPARTMENTS = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Surgery',
    'Radiology',
    'Oncology'
];

const TIME_SLOTS = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
];

export default function HcpOnboarding() {
    const [form, setForm] = useState({
        hospital_id: '',
        department: '',
        hcp_name: '',
        available_date: '',
        available_time: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const res = await fetch('/api/hcp-availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error('Failed to add availability');

            setMessage({ type: 'success', text: 'HCP availability added successfully!' });
            setForm({
                hospital_id: '',
                department: '',
                hcp_name: '',
                available_date: '',
                available_time: ''
            });
        } catch (err) {
            setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Unknown error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add HCP Availability</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="hospital_id">Hospital ID</label>
                    <input
                        id="hospital_id"
                        name="hospital_id"
                        type="number"
                        value={form.hospital_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="department">Department</label>
                    <select
                        id="department"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="hcp_name">HCP Name</label>
                    <input
                        id="hcp_name"
                        name="hcp_name"
                        type="text"
                        value={form.hcp_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="available_date">Available Date</label>
                    <input
                        id="available_date"
                        name="available_date"
                        type="date"
                        value={form.available_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="available_time">Available Time Slot</label>
                    <select
                        id="available_time"
                        name="available_time"
                        value={form.available_time}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Time Slot</option>
                        {TIME_SLOTS.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-primary" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add Availability'}
                </button>
            </form>
            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}