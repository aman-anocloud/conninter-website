'use client';

import Link from 'next/link';
import styles from './EmergencyCTA.module.css';

export default function EmergencyCTA() {
    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                {/* Left: Content */}
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} />
                        Always Available
                    </div>
                    <h2 className={styles.heading}>
                        Need to Connect with a<br />
                        Hospital Right Now?
                    </h2>
                    <p className={styles.body}>
                        Our coordination team is available around the clock to help hospitals, reps, and distributors
                        resolve scheduling conflicts, emergency visits, and urgent delivery requests.
                    </p>
                    <div className={styles.actions}>
                        <Link href="tel:+918000000000" className={styles.callBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            Call Support Line
                        </Link>
                        <Link href="/hospitals" className={styles.findBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            Find a Hospital
                        </Link>
                    </div>
                </div>

                {/* Right: Abstract Decorative Graphic or just more space */}
                <div className={styles.visualCol}>
                    <div className={styles.liveIndicator}>
                        <span className={styles.liveDot} />
                        <span>Live support team online</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
