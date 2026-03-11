'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './DoctorsDirectory.module.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const contacts = [
    {
        image: 'https://images.unsplash.com/photo-1659353888139-4910fb37dc14?auto=format&fit=crop&q=80&w=2070',
        name: 'Ananya Krishnan',
        role: 'Hospital Coordinator',
        hospital: 'Sakra World Hospital, Bengaluru',
        color: '#0a84ff',
        specialty: 'VMS & Slot Management',
    },
    {
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop',
        name: 'Rohit Sharma',
        role: 'Medical Representative Lead',
        hospital: 'Manipal Hospital, Pune',
        color: '#A4D65E',
        specialty: 'Pharmaceutical Liaison',
    },
    {
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1170&auto=format&fit=crop',
        name: 'Priya Desai',
        role: 'Supply Chain Manager',
        hospital: 'Fortis Healthcare, Mumbai',
        color: '#003399',
        specialty: 'DMS & Gate Deliveries',
    },
    {
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1170&auto=format&fit=crop',
        name: 'Mohammed Javed',
        role: 'Hospital Admin',
        hospital: 'Apollo Hospitals, Chennai',
        color: '#f4a100',
        specialty: 'Operations & Compliance',
    },
    {
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1170&auto=format&fit=crop',
        name: 'Savita Patil',
        role: 'Distributor Partner',
        hospital: 'MedHub Distributors, Hyderabad',
        color: '#e84040',
        specialty: 'Logistics & Dispatch',
    },
    {
        image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=1170&auto=format&fit=crop',
        name: 'Vikram Nair',
        role: 'Regional Sales Head',
        hospital: 'Narayana Health, Bengaluru',
        color: '#A4D65E',
        specialty: 'Territory & Schedule Planning',
    },
    {
        image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1170&auto=format&fit=crop',
        name: 'Arjun Mehta',
        role: 'Purchase Head',
        hospital: 'Max Super Specialty, Delhi',
        color: '#0a84ff',
        specialty: 'Procurement & Inventory',
    },
    {
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1170&auto=format&fit=crop',
        name: 'Dr. Kavita Rao',
        role: 'Chief of Operations',
        hospital: 'Medanta - The Medicity, Gurugram',
        color: '#003399',
        specialty: 'Operations & Strategic Planning',
    },
    {
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2??q=80&w=1170&auto=format&fit=crop',
        name: 'Sneha Reddy',
        role: 'HR Manager',
        hospital: 'Apollo Hospitals, Hyderabad',
        color: '#f4a100',
        specialty: 'Human Resources & Talent',
    },
];

const QUICK_SPECIALTIES = ['All', 'Purchase', 'Operations', 'CSSD', 'Cardiology', 'HR', 'Supply Chain'];

export default function DoctorsDirectory() {
    const revealRef = useScrollAnimation();
    return (
        <section className={styles.directory} ref={revealRef}>
            <div className={styles.container}>
                {/* Header */}
                <div className={`${styles.header} reveal-up`}>
                    <span className="section-eyebrow">Our Network</span>
                    <h2 className={styles.heading}>
                        Find Your Healthcare<br />
                        <span className="gradient-text">Contact & Partner</span>
                    </h2>
                    <p className={styles.sub}>
                        Search our network of hospital coordinators, medical representatives, and logistics partners working across India.
                    </p>
                </div>

                {/* Search / Filter row */}
                <div className={`${styles.searchRow} reveal-up delay-100`}>
                    <div className={styles.searchField}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Search by name, hospital, or specialty..." />
                    </div>
                    <select className={styles.filterSelect}>
                        <option>All Roles</option>
                        <option>Hospital Coordinator</option>
                        <option>Medical Rep</option>
                        <option>Distributor</option>
                        <option>Purchase/Operations</option>
                    </select>
                    <button className="btn-primary">Search</button>
                </div>

                {/* Specialty Chips */}
                <div className={`${styles.specialtyChips} reveal-up delay-150`}>
                    {QUICK_SPECIALTIES.map((s, i) => (
                        <button key={i} className={styles.specialtyChip}>
                            {s}
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <div className={styles.cardsGrid}>
                    {contacts.map((c, i) => (
                        <div key={i} className={`${styles.card} reveal-up`} style={{ transitionDelay: `${(i % 3 + 1) * 100}ms` }}>
                            <div className={styles.cardAvatar}>
                                <Image
                                    src={c.image}
                                    alt={c.name}
                                    width={56}
                                    height={56}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardInfo}>
                                <h4 className={styles.cardName}>{c.name}</h4>
                                <p className={styles.cardRole}>{c.role}</p>
                                <p className={styles.cardHospital}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {c.hospital}
                                </p>
                                <div className={styles.cardSpecialtyTag}>{c.specialty}</div>
                            </div>
                            <div className={styles.cardActions}>
                                <Link href="/hospitals" className={styles.viewBtn}>View Professional Profile</Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className={`${styles.viewAllWrap} reveal-up`}>
                    <Link href="/hospitals" className="btn-secondary">
                        View All Contacts
                    </Link>
                </div>
            </div>
        </section>
    );
}
