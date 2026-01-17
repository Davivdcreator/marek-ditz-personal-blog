import { useState, useEffect } from 'react';
import { getAllPosts } from '../lib/posts';
import { categorizePostByAge, getGrowthStageLabel, getGrowthStageDescription, type SeasonalPost, type GrowthStage } from '../lib/seasonalPosts';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, Calendar } from 'lucide-react';

export function Blog() {
    const [posts, setPosts] = useState<SeasonalPost[]>([]);
    const [selectedStage, setSelectedStage] = useState<GrowthStage | 'all'>('all');

    useEffect(() => {
        const loadPosts = async () => {
            const allPosts = await getAllPosts();
            const seasonalPosts = allPosts.map(categorizePostByAge);
            setPosts(seasonalPosts);
        };
        loadPosts();
    }, []);

    const filteredPosts = selectedStage === 'all'
        ? posts
        : posts.filter(p => p.growthStage === selectedStage);

    const stages: Array<GrowthStage | 'all'> = ['all', 'seed', 'sapling', 'old-growth'];

    return (
        <div className="min-h-screen bg-zen-white pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-zen-lg">
                    <h1 className="text-6xl md:text-7xl font-serif text-zen-stone mb-6">
                        Cultivated Thoughts
                    </h1>
                    <p className="text-xl text-zen-gray max-w-2xl mx-auto leading-relaxed">
                        Ideas grow like plants in a garden. Some are fresh seeds, others are developing saplings,
                        and a few have matured into old growth wisdom.
                    </p>
                </div>

                {/* Growth Stage Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-zen-md">
                    {stages.map((stage) => (
                        <button
                            key={stage}
                            onClick={() => setSelectedStage(stage)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedStage === stage
                                ? 'bg-zen-stone text-zen-white'
                                : 'bg-zen-light-gray text-zen-gray hover:bg-zen-gray hover:text-zen-white'
                                }`}
                        >
                            {stage === 'all' ? 'All Thoughts' : getGrowthStageLabel(stage)}
                        </button>
                    ))}
                </div>

                {/* Stage Description */}
                {selectedStage !== 'all' && (
                    <div className="text-center mb-zen-md">
                        <p className="text-zen-gray italic">
                            {getGrowthStageDescription(selectedStage)}
                        </p>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <article
                            key={post.slug}
                            className="group bg-white border border-zen-light-gray rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Cover Image */}
                            {post.coverImage && (
                                <div className="relative h-48 overflow-hidden bg-zen-light-gray">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Growth Stage Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-zen-stone">
                                        {post.growthStage === 'seed' && '🌱 Seed'}
                                        {post.growthStage === 'sapling' && '🌿 Sapling'}
                                        {post.growthStage === 'old-growth' && '🌳 Old Growth'}
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {/* Date */}
                                <div className="flex items-center gap-2 text-xs text-zen-gray mb-3">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>

                                {/* Title */}
                                {post.externalUrl ? (
                                    <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <h2 className="text-2xl font-serif text-zen-stone mb-3 group-hover:text-zen-moss-dark transition-colors">
                                            {post.title}
                                        </h2>
                                    </a>
                                ) : (
                                    <Link to={`/blog/${post.slug}`}>
                                        <h2 className="text-2xl font-serif text-zen-stone mb-3 group-hover:text-zen-moss-dark transition-colors">
                                            {post.title}
                                        </h2>
                                    </Link>
                                )}

                                {/* Description */}
                                <p className="text-zen-gray text-sm leading-relaxed mb-4 line-clamp-3">
                                    {post.description}
                                </p>

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 bg-zen-light-gray text-zen-gray rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Read More */}
                                {post.externalUrl ? (
                                    <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="ghost" size="sm" className="group/btn text-zen-stone hover:text-zen-moss-dark">
                                            Visit Source
                                            <ArrowRight className="w-4 h-4 ml-2 -rotate-45 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        </Button>
                                    </a>
                                ) : (
                                    <Link to={`/blog/${post.slug}`}>
                                        <Button variant="ghost" size="sm" className="group/btn text-zen-stone hover:text-zen-moss-dark">
                                            Read
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-zen-lg">
                        <p className="text-zen-gray text-lg">
                            No thoughts in this growth stage yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
