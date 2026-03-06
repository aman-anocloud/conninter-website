import Image from 'next/image';
import styles from './PartnersSection.module.css';

const partners = [
    {
        name: 'MediCorp Health',
        logo: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=128&h=128&fit=crop&auto=format',
        description: 'Collaborating to integrate digital health records seamlessly.',
        type: 'Healthcare Provider',
        role: 'Integration Partner'
    },
    {
        name: 'Nexus Pharma',
        logo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=128&h=128&fit=crop&auto=format',
        description: 'Optimizing pharmaceutical supply chain delivery routes.',
        type: 'Logistics',
        role: 'Distribution Network'
    },
    {
        name: 'CareSync Technologies',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&auto=format',
        description: 'Providing AI-driven insights for patient scheduling.',
        type: 'Technology',
        role: 'Strategic Alliance'
    },
    {
        name: 'Global Medical Devices',
        logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=128&h=128&fit=crop&auto=format',
        description: 'Standardizing equipment procurement processes.',
        type: 'Manufacturing',
        role: 'Supply Partner'
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
                    <h2 className={styles.title}>Strategic Partnerships</h2>
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
