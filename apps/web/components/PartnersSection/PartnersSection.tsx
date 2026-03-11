import Image from 'next/image';
import styles from './PartnersSection.module.css';

const partners = [
    {
        name: 'ANOcloud',
        logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=128&h=128&fit=crop&auto=format',
        description: 'Providing elastic healthcare cloud infrastructure and secure data hosting solutions.',
        type: 'Infrastructure',
        role: 'Strategic Cloud Partner'
    },
    {
        name: 'Dr. Vikram Sethi',
        logo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=128&h=128&fit=crop&auto=format',
        description: 'Guiding clinical workflow optimization and digital health transformation strategies.',
        type: 'Healthcare Expert',
        role: 'Chief Medical Advisor'
    },
    {
        name: 'Nexus Pharma Solutions',
        logo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=128&h=128&fit=crop&auto=format',
        description: 'Global pharmaceutical logistics advisor for efficient supply-chain distribution.',
        type: 'Logistics',
        role: 'Distribution Mentor'
    },
    {
        name: 'Elena Rodriguez',
        logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&auto=format',
        description: 'Technology pioneer advising on AI integration and scalable enterprise architecture.',
        type: 'Technology',
        role: 'Technology Mentor'
    }
];

export default function PartnersSection() {
    return (
        <section className={styles.section} id="partners">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                        Our Network
                    </div>
                    <h2 className={styles.title}>Strategic Partners, Advisors & Mentors</h2>
                    <p className={styles.description}>
                        We collaborate with industry leaders to build a comprehensive, reliable, and innovative healthcare ecosystem.
                    </p>
                </div>

                <div className={styles.grid}>
                    {partners.map((partner, index) => (
                        <div key={index} className={`${styles.card} card-hover-effect`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.logoWrapper}>
                                    <Image
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        width={64}
                                        height={64}
                                        className={styles.partnerLogo}
                                    />
                                </div>
                                <div className={styles.partnerMeta}>
                                    <h3 className={styles.partnerName}>{partner.name}</h3>
                                    <span className={styles.partnerType}>{partner.type}</span>
                                </div>
                            </div>
                            <p className={styles.partnerDescription}>{partner.description}</p>
                            <div className={styles.partnerRole}>
                                <span className={styles.roleLabel}>Role:</span>
                                <span className={styles.roleValue}>{partner.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
