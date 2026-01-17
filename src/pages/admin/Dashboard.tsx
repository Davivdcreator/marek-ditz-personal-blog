import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { GitHubService, type BlogPost } from '../../lib/github';
import { Button } from '../../components/Button';
import { Plus, Edit, Trash2, FileText, Loader2, LogOut } from 'lucide-react';

export function Dashboard() {
    const { token, repoOwner, repoName, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/adminblog');
            return;
        }

        const fetchPosts = async () => {
            if (token && repoOwner && repoName) {
                const gh = new GitHubService(token, repoOwner, repoName);
                const fetchedPosts = await gh.getPosts();
                setPosts(fetchedPosts);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [isAuthenticated, token, repoOwner, repoName, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/adminblog');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zen-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-zen-moss-dark animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zen-white text-zen-stone p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-serif font-semibold mb-2">Content Manager</h1>
                        <p className="text-zen-gray text-sm">
                            Repository: <span className="text-zen-moss-dark font-mono">{repoOwner}/{repoName}</span>
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="text-zen-gray hover:text-zen-stone border border-zen-light-gray hover:bg-zen-light-gray/50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                        <Link to="/admin/editor/new">
                            <Button variant="primary">
                                <Plus className="w-4 h-4 mr-2" />
                                New Post
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-zen-light-gray">
                            <div className="bg-zen-light-gray w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-zen-gray" />
                            </div>
                            <h3 className="text-xl font-serif font-medium text-zen-stone mb-2">No posts yet</h3>
                            <p className="text-zen-gray mb-6">Create your first blog post to get started.</p>
                            <Link to="/admin/editor/new">
                                <Button className="bg-zen-stone hover:bg-zen-gray text-white">Create Post</Button>
                            </Link>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.slug} className="group bg-white hover:bg-zen-light-gray/30 border-2 border-zen-light-gray hover:border-zen-moss/30 p-6 rounded-xl flex items-center justify-between transition-all">
                                <div>
                                    <h3 className="text-xl font-serif font-semibold mb-1 group-hover:text-zen-moss-dark transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-zen-gray">
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span className="font-mono text-xs bg-zen-light-gray px-2 py-1 rounded text-zen-gray">
                                            {post.slug}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link to={`/admin/editor/${post.slug}`}>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="h-10 w-10 flex items-center justify-center rounded-full"
                                            title="Edit post"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 w-10 flex items-center justify-center rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-100"
                                        title="Delete post"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
