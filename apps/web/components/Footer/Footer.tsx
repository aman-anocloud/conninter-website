import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.upper}>
                <div className={styles.inner}>
                    {/* Brand column */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/logo.png"
                                alt="Conninter Logo"
                                width={450}
                                height={120}
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                        <p className={styles.tagline}>
                            The unified healthcare coordination platform connecting hospitals, distributors, and medical representatives across India.
                        </p>
                        <div className={styles.certStrip}>
                            <span className={styles.certBadge}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                HIPAA Aligned
                            </span>
                            <span className={styles.certBadge}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                ISO 27001
                            </span>
                        </div>
                        <div className={styles.social}>
                            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>in</a>
                            <a href="#" aria-label="Twitter" className={styles.socialLink}>𝕏</a>
                            <a href="#" aria-label="Instagram" className={styles.socialLink}>ig</a>
                        </div>
                    </div>

                    {/* Platform column */}
                    <div className={styles.col}>
                        <h4>Platform</h4>
                        <Link href="/hospitals">Find Hospitals</Link>
                        <Link href="/auth">Book a Slot</Link>
                        <Link href="/#how-it-works">How It Works</Link>
                        <Link href="/dashboard">My Dashboard</Link>
                        <Link href="/#gateways">Distributor Portal</Link>
                    </div>

                    {/* For column */}
                    <div className={styles.col}>
                        <h4>Solutions For</h4>
                        <Link href="/#segments">Hospitals</Link>
                        <Link href="/#segments">Distributors</Link>
                        <Link href="/#segments">Medical Reps</Link>
                        <Link href="/#segments">Pharma Companies</Link>
                    </div>

                    {/* Company column */}
                    <div className={styles.col}>
                        <h4>Company</h4>
                        <Link href="/blog">Blog & Insights</Link>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <p>© {new Date().getFullYear()} Conninter Technologies Pvt. Ltd. All rights reserved.</p>
                    <p className={styles.tagRight}>Made with ❤️ for Indian Healthcare</p>
                </div>
            </div>
        </footer>
    );
}
