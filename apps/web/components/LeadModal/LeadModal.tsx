'use client';

import { useState } from 'react';
import styles from './LeadModal.module.css';
import { useLeadModal } from '@/context/LeadModalContext';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

export default function LeadModal() {
    const { close } = useLeadModal();
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const errs: Partial<FormData> = {};
        if (!form.name.trim()) errs.name = 'Full name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        if (!form.phone.trim()) errs.phone = 'Phone number is required';
        if (!form.company.trim()) errs.company = 'Company / Organization is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to submit');
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setErrors({ ...errors, message: 'Submission failed. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={close}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={close} aria-label="Close">
                    &times;
                </button>
                {!success ? (
                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <h2>Get in Touch</h2>
                        <div className={styles.field}>
                            <label htmlFor="name">Full Name*</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className={styles.error}>{errors.name}</span>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email">Email*</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="phone">Phone Number*</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="company">Company / Organization*</label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                value={form.company}
                                onChange={handleChange}
                            />
                            {errors.company && <span className={styles.error}>{errors.company}</span>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="message">Message (optional)</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%' }}>
                            {submitting ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                ) : (
                    <div className={styles.confirmation}>
                        <h2>Thank you.</h2>
                        <p>Our team will contact you soon.</p>
                        <button className="btn-primary" onClick={close} style={{ marginTop: '1rem' }}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
