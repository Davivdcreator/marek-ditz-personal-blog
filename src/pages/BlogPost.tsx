import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/posts';
import { categorizePostByAge } from '../lib/seasonalPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        const loadPost = async () => {
            if (slug) {
                const foundPost = await getPostBySlug(slug);
                if (foundPost) {
                    setPost(categorizePostByAge(foundPost));
                }
            }
        };
        loadPost();
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen bg-zen-white flex items-center justify-center">
                <p className="text-zen-gray">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zen-white">
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link to="/blog" className="inline-flex items-center text-zen-gray hover:text-zen-stone mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cultivated Thoughts
                    </Link>

                    {/* Growth Stage Badge */}
                    <div className="inline-block bg-zen-light-gray px-4 py-2 rounded-full text-sm font-medium text-zen-stone mb-6">
                        {post.growthStage === 'seed' && '🌱 Seed'}
                        {post.growthStage === 'sapling' && '🌿 Sapling'}
                        {post.growthStage === 'old-growth' && '🌳 Old Growth'}
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-zen-stone mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-zen-gray mb-12">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2">
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className="text-xs px-3 py-1 bg-zen-light-gray rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="mb-16 rounded-lg overflow-hidden">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <article className="pb-24 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* External URL Banner */}
                    {post.externalUrl && (
                        <div className="mb-12 p-8 rounded-lg bg-zen-light-gray/50 border border-zen-light-gray">
                            <h3 className="text-xl font-serif text-zen-stone mb-2">Read the full article</h3>
                            <p className="text-zen-gray text-sm mb-4">
                                This is an external source. Click the button to view the original content.
                            </p>
                            <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-zen-stone hover:bg-zen-gray text-zen-white">
                                    Visit Website
                                    <ArrowRight className="w-4 h-4 ml-2 -rotate-45" />
                                </Button>
                            </a>
                        </div>
                    )}

                    {/* Markdown Content */}
                    <div className="prose prose-lg prose-stone max-w-none
                        prose-headings:font-serif prose-headings:text-zen-stone
                        prose-p:text-zen-gray prose-p:leading-relaxed prose-p:text-lg
                        prose-a:text-zen-moss-dark prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-zen-stone
                        prose-blockquote:border-l-zen-moss prose-blockquote:font-serif prose-blockquote:italic
                        prose-code:text-zen-stone prose-code:bg-zen-light-gray
                        prose-img:rounded-lg"
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </article>
        </div>
    );
}
