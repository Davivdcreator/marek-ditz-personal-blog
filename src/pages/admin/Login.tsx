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
        <div className="min-h-screen bg-zen-white flex items-center justify-center px-4 relative overflow-hidden">
            {/* Moss decorations */}
            <div className="absolute top-10 left-10 opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="20" cy="40" r="12" fill="#86EFAC" opacity="0.6" />
                    <circle cx="35" cy="45" r="8" fill="#4ADE80" opacity="0.7" />
                </svg>
            </div>
            <div className="absolute bottom-10 right-10 opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="40" cy="20" r="10" fill="#86EFAC" opacity="0.6" />
                    <circle cx="25" cy="15" r="6" fill="#4ADE80" opacity="0.7" />
                </svg>
            </div>

            <div className="max-w-md w-full bg-white p-10 rounded-2xl border-2 border-zen-light-gray shadow-xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-zen-light-gray rounded-xl border border-zen-gray/20">
                        <Lock className="w-8 h-8 text-zen-stone" />
                    </div>
                </div>

                <h2 className="text-3xl font-serif font-semibold text-center mb-2 text-zen-stone">Admin Access</h2>
                <p className="text-zen-gray text-center mb-8 text-sm">
                    Connect your GitHub repository to manage content.
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-zen-stone mb-2">Personal Access Token</label>
                        <input
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full bg-zen-white border-2 border-zen-light-gray rounded-lg px-4 py-3 text-zen-stone focus:ring-2 focus:ring-zen-moss/50 focus:border-zen-moss transition-all outline-none"
                            placeholder="ghp_..."
                            required
                        />
                        <p className="text-xs text-zen-gray mt-2">Requires 'repo' scope.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zen-stone mb-2">Repo Owner</label>
                            <input
                                type="text"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                                className="w-full bg-zen-white border-2 border-zen-light-gray rounded-lg px-4 py-3 text-zen-stone focus:ring-2 focus:ring-zen-moss/50 focus:border-zen-moss transition-all outline-none"
                                placeholder="username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zen-stone mb-2">Repo Name</label>
                            <input
                                type="text"
                                value={repo}
                                onChange={(e) => setRepo(e.target.value)}
                                className="w-full bg-zen-white border-2 border-zen-light-gray rounded-lg px-4 py-3 text-zen-stone focus:ring-2 focus:ring-zen-moss/50 focus:border-zen-moss transition-all outline-none"
                                placeholder="my-blog"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
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
