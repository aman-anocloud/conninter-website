'use client';

import { useState, useEffect } from 'react';
import styles from './AttendantPass.module.css';

interface AttendantPass {
    id: number;
    hospital_id: number;
    patient_name: string;
    attendant_name: string;
    relationship: string;
    ward_number: string;
    valid_until: string;
    created_at: string;
}

export default function AttendantPass() {
    const [passes, setPasses] = useState<AttendantPass[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPasses();
    }, []);

    const fetchPasses = async () => {
        try {
            const res = await fetch('/api/attendant-pass');
            if (!res.ok) throw new Error('Failed to fetch passes');
            const data = await res.json();
            setPasses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const printPass = (passData: AttendantPass) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const passHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Attendant Pass - ${passData.attendant_name}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .pass { border: 2px solid #003399; padding: 20px; max-width: 400px; margin: 0 auto; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .logo { font-size: 24px; font-weight: bold; color: #003399; }
                    .pass-id { font-size: 12px; color: #666; margin-bottom: 10px; }
                    .field { margin: 10px 0; }
                    .label { font-weight: bold; }
                    .value { margin-left: 10px; }
                    .validity { background: #f0f0f0; padding: 10px; margin-top: 20px; text-align: center; }
                    .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
                </style>
            </head>
            <body>
                <div class="pass">
                    <div class="header">
                        <div class="logo">Conninter Healthcare</div>
                        <div>Attendant Pass</div>
                        <div class="pass-id">Pass ID: ${passData.id}</div>
                    </div>
                    
                    <div class="field">
                        <span class="label">Patient Name:</span>
                        <span class="value">${passData.patient_name}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">Attendant Name:</span>
                        <span class="value">${passData.attendant_name}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">Relationship:</span>
                        <span class="value">${passData.relationship}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">Ward/Room:</span>
                        <span class="value">${passData.ward_number}</span>
                    </div>
                    
                    <div class="validity">
                        <strong>Valid Until: ${new Date(passData.valid_until).toLocaleDateString()}</strong>
                    </div>
                    
                    <div class="footer">
                        This pass is issued by the hospital administration.<br>
                        Please carry this pass at all times during your visit.
                    </div>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(passHtml);
        printWindow.document.close();
        printWindow.print();
    };

    if (loading) return <div>Loading attendant passes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h2>Attendant Passes</h2>
            <div className={styles.grid}>
                {passes.map(pass => (
                    <div key={pass.id} className={styles.passCard}>
                        <div className={styles.passHeader}>
                            <h3>{pass.attendant_name}</h3>
                            <span className={styles.passId}>ID: {pass.id}</span>
                        </div>
                        
                        <div className={styles.passDetails}>
                            <p><strong>Patient:</strong> {pass.patient_name}</p>
                            <p><strong>Relationship:</strong> {pass.relationship}</p>
                            <p><strong>Ward/Room:</strong> {pass.ward_number}</p>
                            <p><strong>Valid Until:</strong> {new Date(pass.valid_until).toLocaleDateString()}</p>
                        </div>
                        
                        <button onClick={() => printPass(pass)} className="btn-primary">
                            Print Pass
                        </button>
                    </div>
                ))}
            </div>
            {passes.length === 0 && <p>No attendant passes found.</p>}
        </div>
    );
}