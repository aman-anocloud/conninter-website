'use client';
import Link from 'next/link';
import styles from './ChooseGateway.module.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const gateways = [
    {
        title: 'Hospitals, Clinics & Healthcare Service Providers',
        description: 'Command center for facility management and visitor logistics.',
        benefits: ['Smart Appointment Control', 'Automated Visitor Logs', 'Staff Coordination Tools'],
        iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        href: '/hospitals',
        color: '#003399',
        linkText: 'Access Hospital Portal'
    },
    {
        title: 'Distributors, Suppliers & Vendors',
        description: 'Optimize supply chain visibility and streamline hospital deliveries.',
        benefits: ['Direct Stock Updates', 'Real-time Delivery Tracking', 'Digital Invoicing Flow'],
        iconPath: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
        href: '#',
        color: '#5a9e1a',
        linkText: 'Access Distributor Portal'
    },
    {
        title: 'Medical & Industry Representatives',
        description: 'Bridge the gap with HCPs through prioritized scheduling.',
        benefits: ['Priority Slot Booking', 'Doctor Availability Feeds', 'Automated Visit Reminders'],
        iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        href: '#',
        color: '#003399',
        linkText: 'Access MedRep Portal'
    }
];

export default function ChooseGateway() {
    const revealRef = useScrollAnimation();
    return (
        <section className={styles.section} id="gateways" ref={revealRef}>
            <div className={`container ${styles.container}`}>
                <div className={`${styles.header} reveal-up`}>
                    <span className="section-eyebrow">Precision Access</span>
                    <h2 className={styles.title}>Experience Access <span className="gradient-text">Tailored for You</span></h2>
                    <p className={styles.description}>
                        Empower your operations with specialized portals designed to solve your unique challenges in the healthcare ecosystem.
                    </p>
                </div>

                <div className={styles.grid}>
                    {gateways.map((gateway, index) => (
                        <div key={index} className={`${styles.card} card-hover-effect reveal-up`} style={{ transitionDelay: `${(index + 1) * 150}ms` }}>
                            <div className={styles.iconWrapper} style={{ backgroundColor: gateway.color + '15' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gateway.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={gateway.iconPath} />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>{gateway.title}</h3>
                            <p className={styles.cardDescription}>{gateway.description}</p>

                            <ul className={styles.benefitsList}>
                                {gateway.benefits.map((benefit, i) => (
                                    <li key={i} className={styles.benefitItem}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A4D65E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <Link href={gateway.href} className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start', background: gateway.color, padding: '10px 20px' }}>
                                {gateway.linkText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
