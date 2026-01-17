import { useState, useEffect } from 'react';
import { getAllPosts, type Post } from '../lib/posts';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar } from 'lucide-react';
import { Button } from '../components/Button';

export function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPosts().then(data => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                            Financial Insights
                        </h1>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Expert analysis on fintech architecture, security, and the future of digital money.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-slate-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                        />
                        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading insights...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.slug} className="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 hover:-translate-y-1">
                                {post.coverImage && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                                    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium text-primary-400 bg-primary-900/20 px-2 py-1 rounded-full whitespace-nowrap">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {post.externalUrl ? (
                                        <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                                            <h2 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors flex items-start gap-2">
                                                {post.title}
                                                <ArrowRight className="w-4 h-4 mt-1.5 -rotate-45 shrink-0 opacity-50" />
                                            </h2>
                                        </a>
                                    ) : (
                                        <Link to={`/blog/${post.slug}`}>
                                            <h2 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                                                {post.title}
                                            </h2>
                                        </Link>
                                    )}

                                    <p className="text-slate-400 mb-6 text-sm line-clamp-3 flex-grow">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                                        <div className="flex items-center text-slate-500 text-xs gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>

                                        {post.externalUrl ? (
                                            <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                                                <Button variant="ghost" size="sm" className="group/btn">
                                                    Visit Source
                                                    <ArrowRight className="w-4 h-4 ml-2 -rotate-45 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                </Button>
                                            </a>
                                        ) : (
                                            <Link to={`/blog/${post.slug}`}>
                                                <Button variant="ghost" size="sm" className="group/btn">
                                                    Read
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
