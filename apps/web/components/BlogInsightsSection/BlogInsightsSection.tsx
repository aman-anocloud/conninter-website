import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogInsightsSection.module.css';

const insights = [
    {
        title: 'The Future of Hospital Visitor Management',
        excerpt: 'Discover how digital systems are replacing logbooks, improving security, and streamlining patient check-ins.',
        category: 'Industry Trends',
        date: 'Oct 12, 2023',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1033&auto=format&fit=crop',
        readTime: '5 min read',
        slug: '/blog/future-of-vms'
    },
    {
        title: 'Best Practices for Medical Representatives',
        excerpt: 'How to maximize your doctor visits through efficient scheduling platforms and follow-up tools.',
        category: 'Best Practices',
        date: 'Nov 04, 2023',
        image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5fe3?q=80&w=2070&auto=format&fit=crop',
        readTime: '7 min read',
        slug: '/blog/med-rep-best-practices'
    },
    {
        title: 'Integrating DMS with Existing Healthcare Infrastructure',
        excerpt: 'A technical deep-dive into connecting modern Delivery Management Systems with legacy hospital databases.',
        category: 'Expert Opinions',
        date: 'Dec 18, 2023',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
        readTime: '10 min read',
        slug: '/blog/dms-integration'
    }
];

export default function BlogInsightsSection() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div className={styles.headerText}>
                        <h2 className={styles.title}>Latest Insights</h2>
                        <p className={styles.description}>
                            Stay updated with the latest trends, expert opinions, and best practices in healthcare management.
                        </p>
                    </div>
                    <Link href="/blog" className="btn-secondary">
                        View All Articles
                    </Link>
                </div>

                <div className={styles.grid}>
                    {insights.map((post, index) => (
                        <Link href={post.slug} key={index} className={`${styles.card} card-hover-effect`}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.categoryBadge}>{post.category}</div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span>{post.date}</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <div className={styles.readMore}>
                                    Read Article
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
