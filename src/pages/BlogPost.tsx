import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, type Post } from '../lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from '../components/Button';

export function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug).then(p => {
                setPost(p);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
                <Link to="/blog"><Button>Return to Blog</Button></Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-slate-950 pb-24">
            {/* Header Image */}
            {post.coverImage && (
                <div className="w-full h-80 md:h-[500px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
                <div className="mb-8">
                    <Link to="/blog">
                        <Button variant="ghost" className="text-slate-300 hover:text-white mb-6 pl-0">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                        </Button>
                    </Link>

                    <div className="flex gap-2 mb-6">
                        {post.tags.map(tag => (
                            <span key={tag} className="flex items-center text-xs font-medium text-primary-400 bg-primary-900/30 px-3 py-1 rounded-full border border-primary-500/20">
                                <Tag className="w-3 h-3 mr-1" /> {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-slate-400 text-sm border-b border-slate-800 pb-8">
                        <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(post.date).toLocaleDateString(undefined, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg prose-slate max-w-none prose-headings:text-white prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-img:rounded-xl">
                    {post.externalUrl && (
                        <div className="not-prose mb-8 p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Read the full article</h3>
                                <p className="text-slate-400 text-sm">This is an external source. Click the button to view the original content.</p>
                            </div>
                            <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="whitespace-nowrap">
                                    Visit Website
                                    <ArrowRight className="w-4 h-4 ml-2 -rotate-45" />
                                </Button>
                            </a>
                        </div>
                    )}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
