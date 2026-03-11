'use client';

import { useState } from 'react';
import styles from './PartnersSection.module.css';
import { X } from 'lucide-react';
import { Partner } from './PartnerCard';

interface BookingModalProps {
    partner: Partner;
    onClose: () => void;
}

export default function BookingModal({ partner, onClose }: BookingModalProps) {
    const [formData, setFormData] = useState({
        customer_name: '',
        email: '',
        phone: '',
        service: partner.services[0] || '',
        booking_date: '',
        booking_time: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    partner_id: partner.id,
                    ...formData
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit booking');
            }

            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>
                    <X size={24} />
                </button>

                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Book Appointment</h3>
                    <p className={styles.modalSubtitle}>with {partner.name}</p>
                </div>

                {success ? (
                    <div className={styles.successMessage}>
                        <div className={styles.successIcon}>✓</div>
                        <h4>Booking Successful!</h4>
                        <p>Your request has been sent to {partner.name}. We will contact you shortly to confirm your appointment.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.bookingForm}>
                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <div className={styles.formGroup}>
                            <label htmlFor="customer_name">Full Name *</label>
                            <input type="text" id="customer_name" name="customer_name" required value={formData.customer_name} onChange={handleChange} placeholder="John Doe" />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address *</label>
                                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone Number *</label>
                                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="service">Service Required *</label>
                            <select id="service" name="service" required value={formData.service} onChange={handleChange}>
                                {partner.services.map((svc, idx) => (
                                    <option key={idx} value={svc}>{svc}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="booking_date">Preferred Date *</label>
                                <input type="date" id="booking_date" name="booking_date" required value={formData.booking_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="booking_time">Preferred Time *</label>
                                <input type="time" id="booking_time" name="booking_time" required value={formData.booking_time} onChange={handleChange} />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Additional Message (Optional)</label>
                            <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Any specific requirements..."></textarea>
                        </div>

                        <div className={styles.modalFooter}>
                            <button type="button" onClick={onClose} className={`btn btn-secondary ${styles.cancelBtn}`}>Cancel</button>
                            <button type="submit" disabled={loading} className={`btn btn-primary ${styles.submitBtn}`}>
                                {loading ? 'Submitting...' : 'Confirm Book Now'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
