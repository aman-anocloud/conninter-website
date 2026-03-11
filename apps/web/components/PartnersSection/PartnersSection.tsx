'use client';

import { useState, useEffect } from 'react';
import styles from './PartnersSection.module.css';
import PartnerCard, { Partner } from './PartnerCard';
import BookingModal from './BookingModal';

export default function PartnersSection() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch('/api/partners');
                if (res.ok) {
                    const data = await res.json();
                    setPartners(data);
                }
            } catch (error) {
                console.error('Failed to fetch partners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const handleOpenModal = (partner: Partner) => {
        setSelectedPartner(partner);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const handleCloseModal = () => {
        setSelectedPartner(null);
        document.body.style.overflow = '';
    };

    return (
        <section className={styles.section} id="partners">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                        Our Network
                    </div>
                    <h2 className={styles.title}>Strategic Partnerships</h2>
                    <p className={styles.description}>
                        We collaborate with industry leaders to providing seamless healthcare experiences and services.
                    </p>
                </div>

                {loading ? (
                    <div className={styles.loadingContainer}>Loading partners...</div>
                ) : (
                    <div className={styles.grid}>
                        {partners.map((partner) => (
                            <PartnerCard 
                                key={partner.id} 
                                partner={partner} 
                                onBookNow={handleOpenModal} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedPartner && (
                <BookingModal 
                    partner={selectedPartner}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
}
