'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSlider.module.css';

const slides = [
    {
        id: 1,
        image: '/images/hero/doctor.png',
        alt: 'Professional Indian doctor',
        position: 'top',
        headline: 'Smarter hospital visits start here.',
        sub: 'India\'s most advanced platform for coordinating medical reps and visitor management.'
    },
    {
        id: 2,
        image: '/images/hero/rep_discussion.png',
        alt: 'Medical representative discussion',
        position: 'center',
        headline: 'Seamless Medical Rep Coordination',
        sub: 'Empower your staff with automated scheduling and digital reporting tools.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        alt: 'Modern hospital environment',
        position: 'center',
        headline: 'Secure & Compliant Visitor Management',
        sub: 'Enhance hospital security with our robust, paperless check-in systems.'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop',
        alt: 'Modern hospital operating room and environment',
        position: 'center',
        headline: 'Real-time Analytics at Your Fingertips',
        sub: 'Track every visit and delivery with powerful data insights and reporting.'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2070&auto=format&fit=crop',
        alt: 'Advanced medical diagnostics and technology',
        position: 'center',
        headline: 'Built for Modern Healthcare Logistics',
        sub: 'From delivery tracking to clinician coordination, we handle it all.'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2070&auto=format&fit=crop',
        alt: 'Healthcare team in modern surgical setting',
        position: 'center',
        headline: 'Connecting the Healthcare Ecosystem',
        sub: 'Join hundreds of hospitals across India revolutionizing their operations.'
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);

        return () => clearInterval(timer);
    }, [isMounted]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const goToSlide = (index: number) => setCurrentSlide(index);

    if (!isMounted) {
        return <div className={styles.heroSkeleton} />;
    }

    return (
        <section className={styles.hero}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        style={{ objectFit: 'cover', objectPosition: slide.position || 'center' }}
                        priority={index === 0}
                    />
                    <div className={styles.overlay} />
                    
                    <div className={`container ${styles.contentContainer}`}>
                        <div className={styles.contentCol}>
                            <div className={`badge badge-blue ${styles.pillBadge}`}>
                                <span className={styles.dot} />
                                New: Smart Scheduling System
                            </div>

                            <h1 className={styles.headline}>
                                {slide.headline}
                            </h1>

                            <p className={styles.sub}>
                                {slide.sub}
                            </p>

                            <div className={styles.ctas}>
                                <Link href="/auth" className="btn-primary connectBtn" style={{ background: 'white', color: '#003399', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                                    Connect With Us
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link href="/hospitals" className={styles.exploreBtn} style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '13px 28px', borderRadius: 9999,
                                    border: '2px solid rgba(255,255,255,0.6)',
                                    color: 'white', fontWeight: 700, fontSize: 15,
                                    transition: 'all 0.25s ease', fontFamily: 'var(--font-primary)'
                                }}>
                                    Explore Hospitals
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevSlide} aria-label="Previous slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>
            <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextSlide} aria-label="Next slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
