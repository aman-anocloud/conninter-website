'use client';

import styles from './WhyChooseUs.module.css';

const features = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        ),
        title: 'Seamless Customer Connectivity',
        desc: 'Bridge the gap between you and your healthcare customers. We ensure direct, real-time coordination for every interaction.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        ),
        title: 'Precision Delivery Scheduling',
        desc: 'Schedule deliveries with down-to-the-minute accuracy. Save hours of manual coordination and prevent logistics delays.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
            </svg>
        ),
        title: 'Maximum Productivity',
        desc: 'Focus on high-value operations while we handle the logistics. Increase your professional output with automated workflows.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
            </svg>
        ),
        title: 'Time-Saving Efficiency',
        desc: 'Eliminate repetitive tasks. Our platform slashes coordination time by 60%, letting you focus on what truly matters.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 02 2h12a2 2 0 0 02-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        ),
        title: 'Digital Transparency',
        desc: 'Real-time dashboards provide a crystal-clear view of every booking and delivery, removing all guesswork.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        ),
        title: 'Enterprise Security',
        desc: 'Role-based access and digital audit trails ensure that your healthcare operations remain secure and data-protected.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className={styles.whySection}>
            <div className={styles.container}>
                {/* Left dark panel */}
                <div className={styles.leftPanel}>
                    <span className="section-eyebrow" style={{ color: 'rgba(164,214,94,0.9)', background: 'rgba(164,214,94,0.1)', borderColor: 'rgba(164,214,94,0.3)' }}>Why Conninter</span>
                    <h2 className={styles.heading}>
                        Why Leading Hospitals Trust Conninter
                    </h2>
                    <p className={styles.body}>
                        We didn&apos;t build just another scheduling tool. We built a coordination layer for the
                        healthcare supply chain — one that respects how hospitals actually operate.
                    </p>

                    {/* Testimonial */}
                    <div className={styles.testimonial}>
                        <p className={styles.quote}>
                            &ldquo;Conninter cut our unplanned visitor intake by 70%. Our front desk isn&apos;t drowning anymore — and our reps actually show up on time.&rdquo;
                        </p>
                        <div className={styles.author}>
                            <div className={styles.authorAvatar}>SK</div>
                            <div>
                                <p className={styles.authorName}>Suresh Kulkarni</p>
                                <p className={styles.authorRole}>General Manager, Sakra World Hospital</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statsStrip}>
                        <div className={styles.stripStat}>
                            <p className={styles.stripValue}>500+</p>
                            <p className={styles.stripLabel}>Hospitals</p>
                        </div>
                        <div className={styles.stripDivider} />
                        <div className={styles.stripStat}>
                            <p className={styles.stripValue}>1M+</p>
                            <p className={styles.stripLabel}>Bookings</p>
                        </div>
                        <div className={styles.stripDivider} />
                        <div className={styles.stripStat}>
                            <p className={styles.stripValue}>45</p>
                            <p className={styles.stripLabel}>Cities</p>
                        </div>
                    </div>
                </div>

                {/* Right features grid */}
                <div className={styles.rightPanel}>
                    {features.map((f, i) => (
                        <div key={i} className={styles.featureItem}>
                            <div className={styles.featureIconWrap}>
                                <span className={styles.featureIcon}>{f.icon}</span>
                            </div>
                            <div className={styles.featureText}>
                                <h4 className={styles.featureTitle}>{f.title}</h4>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
