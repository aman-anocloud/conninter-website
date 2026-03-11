import styles from './TopBar.module.css';

export default function TopBar() {
    return (
        <div className={styles.topBar}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.left}>
                    <div className={styles.infoItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        <span>+91 98765 43210</span>
                    </div>
                    <div className={styles.infoItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>support@conninter.com</span>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.infoItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                    </div>
                    <div className={styles.socials}>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="Twitter">𝕏</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
