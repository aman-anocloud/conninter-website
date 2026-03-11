'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './AboutSection.module.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
    {
        title: 'Digital Slot Booking',
        desc: 'Advanced visit scheduling for reps.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        ),
        color: '#0a84ff',
        bg: '#e8f4ff',
    },
    {
        title: 'Verified Professionals',
        desc: 'Structured identity verification.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        ),
        color: '#0a84ff',
        bg: '#e8f4ff',
    },
    {
        title: 'Real-Time Delivery',
        desc: 'Gate-level visibility for supplies.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h5l2 4v4h-7V8z"></path>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        ),
        color: '#003399',
        bg: '#f0eeff',
    },
    {
        title: 'Secure & Compliant',
        desc: 'Built-in role-based audit trails.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        ),
        color: '#f4a100',
        bg: '#fff8e6',
    },
];

export default function AboutSection() {
    const revealRef = useScrollAnimation();
    return (
        <section className={styles.about} ref={revealRef}>
            <div className={styles.container}>
                {/* 1. Main Content: Text Left, Image Right */}
                <div className={styles.mainContent}>
                    <div className={`${styles.leftCol} reveal-up`}>
                        <span className="section-eyebrow">About Conninter</span>
                        <h2 className={styles.heading}>
                            Revolutionizing India&apos;s <br />
                            <span className="gradient-text">Healthcare Coordination</span>
                        </h2>
                        <p className={styles.body}>
                            Conninter began with a simple mission: bringing structure and efficiency to hospital corridors. 
                            We bridge the gap between medical institutions, distributors, and representatives, ensuring every visit and delivery is scheduled, verified, and seamless.
                        </p>
                        <p className={styles.body}>
                            Our technology removes the guesswork, allowing hospitals to open their doors on their own terms while providing professionals with the clarity they need to excel.
                        </p>
                        
                        <div className={styles.ctaRow}>
                            <Link href="/about" className="btn-primary" style={{ padding: '12px 30px' }}>
                                Learn More Our Mission
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            {/* 24/7 Badge integrated here */}
                            <div className={styles.emergencyPill}>
                                <span className={styles.badgeDot} />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.rightCol} reveal-up delay-200`}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1453&auto=format&fit=crop"
                                alt="Modern Healthcare Coordination"
                                width={600}
                                height={450}
                                className={styles.mainImage}
                                priority
                            />
                            <div className={styles.trustBadge}>
                                <div className={styles.badgeIcon}>✓</div>
                                <div className={styles.badgeText}>
                                    <p className={styles.badgeLabel}>100% SECURE</p>
                                    <p className={styles.badgeVal}>HIPAA Compliant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Features Strip: 4 columns below main content */}
                <div className={`${styles.featuresStrip} reveal-up delay-400`}>
                    {features.map((f, i) => (
                        <div key={i} className={styles.featureItem}>
                            <div className={styles.miniIconWrap} style={{ color: f.color }}>
                                {f.icon}
                            </div>
                            <div className={styles.miniText}>
                                <h5>{f.title}</h5>
                                <p>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
