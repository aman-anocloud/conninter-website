'use client';

import styles from './StatsBar.module.css';
import { useCountUp } from '@/hooks/useScrollAnimation';

type StatItemProps = {
    value: number;
    suffix: string;
    label: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
};

function StatItem({ value, suffix, label, icon, iconBg, iconColor }: StatItemProps) {
    const numRef = useCountUp(value, 1800);
    return (
        <div className={styles.stat}>
            <div className={styles.iconWrap} style={{ background: iconBg, color: iconColor }}>
                {icon}
            </div>
            <div className={styles.textGroup}>
                <span className={styles.value}>
                    <span ref={numRef}>0</span>{suffix}
                </span>
                <span className={styles.label}>{label}</span>
            </div>
        </div>
    );
}

export default function StatsBar() {
    return (
        <section className={styles.statsBar}>
            <div className={styles.inner}>
                <StatItem
                    value={50}
                    suffix="+"
                    label="Hospitals Network"
                    iconBg="rgba(0, 51, 153, 0.08)"
                    iconColor="#003399"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    }
                />
                <div className={styles.divider} />
                <StatItem
                    value={1000000}
                    suffix="+"
                    label="Visits Managed"
                    iconBg="rgba(164, 214, 94, 0.12)"
                    iconColor="#5a9e1a"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <polyline points="17 11 19 13 23 9" />
                        </svg>
                    }
                />
                <div className={styles.divider} />
                <StatItem
                    value={10000}
                    suffix="+"
                    label="HCP Network"
                    iconBg="rgba(10, 132, 255, 0.08)"
                    iconColor="#0a84ff"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87" />
                            <path d="M16 3.13a4 4 0 010 7.75" />
                        </svg>
                    }
                />
                <div className={styles.divider} />
                <StatItem
                    value={98}
                    suffix="%"
                    label="Efficiency Gained"
                    iconBg="rgba(244, 161, 0, 0.10)"
                    iconColor="#d48a00"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    }
                />
            </div>
        </section>
    );
}
