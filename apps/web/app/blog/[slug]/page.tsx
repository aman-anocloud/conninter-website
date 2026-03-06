import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BlogPostClient from './BlogPostClient';
import styles from './page.module.css';
import { client } from '../../../sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getPost(slug: string): Promise<any | null> {
    try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
            title,
            "slug": slug.current,
            "author": author->name,
            "category": categories[0]->title,
            "coverImage": mainImage.asset->url,
            publishedAt,
            excerpt,
            body
        }`;

        const post = await client.fetch(query, { slug });
        return post || null;
    } catch (err) {
        console.error("Failed to fetch post from Sanity", err);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPost(params.slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: `${post.title} | Conninter`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <BlogPostClient post={post} />
            </main>
            <Footer />
        </>
    );
}
