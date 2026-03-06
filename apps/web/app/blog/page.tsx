import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BlogListClient from './BlogListClient';
import styles from './page.module.css';
import { client } from '../../sanity/lib/client';

export const metadata: Metadata = {
    title: 'Blog & Insights',
    description: 'Healthcare industry trends, case studies, and product updates from the Conninter team.',
};

const CATEGORIES = ['All', 'Industry Trends', 'Case Studies', 'Product Updates', 'News'];

// Sanity GROQ query to fetch all posts
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "author": author->name,
    "category": categories[0]->title,
    "coverImage": mainImage.asset->url,
    publishedAt,
    excerpt
}`;

async function getPosts() {
    try {
        const posts = await client.fetch(POSTS_QUERY, {}, { next: { revalidate: 60 } });
        return posts;
    } catch (err) {
        console.error('Failed to read posts from Sanity', err);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    <div className={styles.header}>
                        <div className="badge badge-purple" style={{ marginBottom: 16 }}>Blog & Insights</div>
                        <h1 className={styles.title}>Healthcare <span className="gradient-text">Intelligence</span></h1>
                        <p className={styles.subtitle}>Industry trends, product updates, and case studies from our network of 120+ hospitals.</p>
                    </div>

                    <div className={styles.catRow}>
                        {CATEGORIES.map((c) => (
                            <button key={c} className={`${styles.cat} ${c === 'All' ? styles.catActive : ''}`}>{c}</button>
                        ))}
                    </div>

                    <BlogListClient posts={posts} />
                </div>
            </main>
            <Footer />
        </>
    );
}
