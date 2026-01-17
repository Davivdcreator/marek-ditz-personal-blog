import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Lock, Github, AlertCircle } from 'lucide-react';
import { Octokit } from 'octokit';

export function Login() {
    const [token, setToken] = useState('');
    const [owner, setOwner] = useState('');
    const [repo, setRepo] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Validate token by fetching repo details
            const octokit = new Octokit({ auth: token });
            await octokit.rest.repos.get({ owner, repo });

            login(token, owner, repo);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Connection failed. Please check your Token, Owner, and Repo name.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-900/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />

            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                        <Lock className="w-8 h-8 text-primary-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2">Admin Access</h2>
                <p className="text-slate-400 text-center mb-8 text-sm">
                    Connect your GitHub repository to manage content.
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Personal Access Token</label>
                        <input
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                            placeholder="ghp_..."
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">Requires 'repo' scope.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Repo Owner</label>
                            <input
                                type="text"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                                placeholder="username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Repo Name</label>
                            <input
                                type="text"
                                value={repo}
                                onChange={(e) => setRepo(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                                placeholder="my-blog"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Connecting...' : (
                            <span className="flex items-center justify-center gap-2">
                                Connect via GitHub <Github className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
