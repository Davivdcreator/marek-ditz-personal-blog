import matter from 'gray-matter';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    coverImage?: string;
}

export async function getAllPosts(): Promise<Post[]> {
    const modules = import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true });

    const posts = Object.entries(modules).map(([path, content]) => {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const { data, content: markdownBody } = matter(content as string);

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            description: data.description || '',
            tags: data.tags || [],
            coverImage: data.coverImage,
            content: markdownBody
        };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getAllPosts();
    return posts.find(p => p.slug === slug) || null;
}
