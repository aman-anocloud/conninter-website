'use client';

import styles from './EmergencyCTA.module.css';
import { useLeadModal } from '@/context/LeadModalContext';

export default function EmergencyCTA() {
    const { open } = useLeadModal();

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
                        Looking to meet a<br />
                        HCP??
                    </h2>
                    <p className={styles.body}>
                        Connect on WhatsApp with us. Explore our elite coordination services and
                        schedule your next professional meeting with us effortlessly.
                    </p>
                    <div className={styles.actions}>
                        <button onClick={open} className={styles.whatsappBtn}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.974.529 1.961.812 3.149.813 3.181 0 5.767-2.585 5.767-5.766 0-3.181-2.587-5.765-5.767-5.765zm3.374 8.203c-.147.414-.744.757-1.025.77-.323.015-.739.045-1.121-.144l-.087-.043c-1.397-.686-2.316-2.102-2.386-2.196-.07-.094-.567-.754-.567-1.442 0-.688.361-1.026.491-1.166.13-.14.28-.175.373-.175h.262c.084 0 .197-.031.291.196.114.275.39.95.424 1.02.034.07.056.152.012.242-.045.09-.074.152-.148.243-.074.093-.153.208-.218.269-.074.068-.152.142-.066.291.086.148.383.633.821 1.023.564.502 1.037.658 1.186.732.148.075.234.062.321-.038.087-.1.373-.434.472-.584.099-.151.198-.126.335-.075.137.05.867.411 1.018.486.15.075.25.111.285.174.035.063.035.364-.112.778zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l5.011-1.315c1.472.846 3.176 1.315 4.989 1.315 5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.63 0-3.156-.47-4.444-1.276l-.319-.199-2.983.782.796-2.911-.218-.348C4.033 14.851 3.5 13.487 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
                            </svg>
                            Connect on WhatsApp
                        </button>
                        <button onClick={open} className={styles.meetingBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Schedule a Meeting
                        </button>
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
