'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSlider.module.css';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        alt: 'Hospital corridor with modern equipment'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2628&auto=format&fit=crop',
        alt: 'Hospital building and medical professionals'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
        alt: 'Medical team discussing patient care'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
        alt: 'Surgical preparation'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop',
        alt: 'Medical research and laboratory'
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
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        priority={index === 0}
                    />
                    <div className={styles.overlay} />
                </div>
            ))}

            <div className={`container ${styles.contentContainer}`}>
                <div className={styles.contentCol}>
                    <div className={`badge badge-blue ${styles.pillBadge}`}>
                        <span className={styles.dot} />
                        New: Smart Scheduling System
                    </div>

                    <h1 className={styles.headline}>
                        Meetings Made <span style={{ color: '#A4D65E' }}>Easy</span> for Healthcare
                    </h1>

                    <p className={styles.sub}>
                        Streamline visitor management and coordinate medical representative meetings with
                        efficiency. Secure, compliant, and designed for modern hospitals.
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
