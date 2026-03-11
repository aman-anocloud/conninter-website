'use client';

import Image from 'next/image';
import styles from './PartnersSection.module.css';
import { MapPin, CheckCircle2 } from 'lucide-react';

export interface Partner {
    id: string;
    name: string;
    logo: string;
    description: string;
    services: string[];
    location?: string;
    active: boolean;
}

interface PartnerCardProps {
    partner: Partner;
    onBookNow: (partner: Partner) => void;
}

export default function PartnerCard({ partner, onBookNow }: PartnerCardProps) {
    return (
        <div 
            className={`${styles.card} ${styles.clickableCard}`} 
            onClick={() => onBookNow(partner)}
        >
            <div className={styles.cardHeader}>
                <div className={styles.logoWrapper}>
                    <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={64}
                        height={64}
                        className={styles.partnerLogo}
                        unoptimized
                    />
                </div>
                <div className={styles.partnerMeta}>
                    <h3 className={styles.partnerName}>{partner.name}</h3>
                    {partner.location && (
                        <div className={styles.partnerLocation}>
                            <MapPin size={14} />
                            <span>{partner.location}</span>
                        </div>
                    )}
                </div>
            </div>
            
            <p className={styles.partnerDescription}>{partner.description}</p>
            
            <div className={styles.servicesList}>
                <span className={styles.servicesLabel}>Services Offered:</span>
                <ul>
                    {partner.services.slice(0, 3).map((service, index) => (
                         <li key={index}><CheckCircle2 size={12} className={styles.checkIcon}/> {service}</li>
                    ))}
                    {partner.services.length > 3 && (
                        <li><CheckCircle2 size={12} className={styles.checkIcon}/> +{partner.services.length - 3} more</li>
                    )}
                </ul>
            </div>

            <div className={styles.cardFooter}>
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookNow(partner);
                    }}
                    className={`btn btn-primary ${styles.bookButton}`}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
