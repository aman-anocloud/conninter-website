'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <nav className={styles.nav}>
                <div className={styles.inner}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/LOGO CON.png"
                            alt="Conninter Logo"
                            width={600}
                            height={160}
                            style={{ objectFit: 'contain' }}
                            className={scrolled ? styles.logoScrolled : styles.logoInverted}
                            priority
                        />
                        {/* Heartbeat Waveform */}
                        <svg
                            className={styles.heartbeatWave}
                            viewBox="0 0 300 60"
                            preserveAspectRatio="none"
                            width="100%"
                            height="100%"
                        >
                            <defs>
                                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(0, 51, 153, 0)" />
                                    <stop offset="20%" stopColor="rgba(0, 51, 153, 0.8)" />
                                    <stop offset="35%" stopColor="rgba(164, 214, 94, 1)" />
                                    <stop offset="50%" stopColor="rgba(0, 51, 153, 0.9)" />
                                    <stop offset="65%" stopColor="rgba(164, 214, 94, 0.9)" />
                                    <stop offset="80%" stopColor="rgba(0, 51, 153, 0.6)" />
                                    <stop offset="100%" stopColor="rgba(0, 51, 153, 0)" />
                                </linearGradient>
                            </defs>
                            <polyline
                                points="0,30 10,30 15,30 20,28 25,32 30,30 35,30 40,25 45,35 50,30 55,30 60,30 65,28 70,32 75,30 80,30 85,15 90,45 95,30 100,30 105,30 110,28 115,32 120,30 125,30 130,20 135,40 140,30 145,30 150,30 155,28 160,32 165,30 170,30 175,25 180,35 185,30 190,30 195,30 200,28 205,32 210,30 215,30 220,22 225,38 230,30 235,30 240,30 245,28 250,32 255,30 260,30 265,25 270,35 275,30 280,30 290,30 300,30"
                                fill="none"
                                stroke="url(#waveGradient)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </Link>

                    {/* Desktop Links */}
                    <ul className={styles.links}>
                        <li><Link href="/hospitals">Hospitals</Link></li>
                        <li><Link href="/#how-it-works">How It Works</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/#partners">Partners</Link></li>
                    </ul>

                    {/* CTA */}
                    <div className={styles.actions}>
                        <Link href="/auth" className={styles.signInBtn}>
                            Sign In
                        </Link>
                        <Link href="/auth" className="btn-primary" style={{ fontSize: 13, padding: '8px 18px', fontWeight: 600 }}>
                            Get Started
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        className={styles.hamburger}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={menuOpen ? styles.barOpen : ''} />
                        <span className={menuOpen ? styles.barOpen : ''} />
                        <span className={menuOpen ? styles.barOpen : ''} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/hospitals" onClick={() => setMenuOpen(false)}>Hospitals</Link>
                        <Link href="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link>
                        <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                        <Link href="/auth" className="btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
