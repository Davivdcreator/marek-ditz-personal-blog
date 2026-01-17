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
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Content Manager</h1>
                        <p className="text-slate-400 text-sm">
                            Repository: <span className="text-primary-400 font-mono">{repoOwner}/{repoName}</span>
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost" onClick={handleLogout} className="text-slate-400">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                        <Link to="/admin/editor/new">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                New Post
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
                            <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-medium text-slate-300 mb-2">No posts yet</h3>
                            <p className="text-slate-500 mb-6">Create your first blog post to get started.</p>
                            <Link to="/admin/editor/new">
                                <Button variant="outline">Create Post</Button>
                            </Link>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.slug} className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between transition-all">
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                                            {post.slug}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to={`/admin/editor/${post.slug}`}>
                                        <Button variant="secondary" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    {/* Delete not implemented in MVP yet */}
                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                        <Trash2 className="w-4 h-4" />
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
