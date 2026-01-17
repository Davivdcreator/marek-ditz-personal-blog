import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { GitHubService, type BlogPost } from '../../lib/github';
import { Button } from '../../components/Button';
import { Save, ArrowLeft, Loader2, Upload, Link as LinkIcon } from 'lucide-react';

export function Editor() {
    const { slug } = useParams();
    const { token, repoOwner, repoName, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(slug !== 'new');
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState<BlogPost>({
        slug: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        content: '',
        tags: []
    });

    const [tagInput, setTagInput] = useState('');
    const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const loadPost = async () => {
            if (slug && slug !== 'new' && token && repoOwner && repoName) {
                const gh = new GitHubService(token, repoOwner, repoName);
                const posts = await gh.getPosts();
                const post = posts.find(p => p.slug === slug);
                if (post) {
                    setFormData(post);
                    setTagInput(post.tags?.join(', ') || '');
                }
                setLoading(false);
            }
        };

        loadPost();
    }, [slug, isAuthenticated, token, repoOwner, repoName]);

    const handleSave = async () => {
        if (!token || !repoOwner || !repoName) return;
        setSaving(true);

        try {
            const gh = new GitHubService(token, repoOwner, repoName);

            // Generate slug from title if new
            const finalSlug = slug === 'new'
                ? formData.title
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '') || 'untitled-post'
                : slug!;

            const postToSave = {
                ...formData,
                slug: finalSlug,
                tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
                date: new Date().toISOString() // Update timestamp on save? Optional.
            };

            await gh.savePost(postToSave);
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Failed to save:', error);
            alert(`Failed to save post: ${error.message || error}`);
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedFile || !token || !repoOwner || !repoName) return;
        setUploading(true);

        try {
            const gh = new GitHubService(token, repoOwner, repoName);
            const imageUrl = await gh.uploadImage(selectedFile, selectedFile.name);
            setFormData({ ...formData, coverImage: imageUrl });
            setSelectedFile(null);
            alert('Image uploaded successfully!');
        } catch (error: any) {
            console.error('Failed to upload image:', error);
            alert(`Failed to upload image: ${error.message || error}`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Toolbar */}
            <div className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <span className="text-slate-500">|</span>
                    <span className="font-semibold text-slate-300">
                        {slug === 'new' ? 'New Post' : 'Editing: ' + formData.title}
                    </span>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <div className="flex-grow flex">
                {/* Meta Sidebar */}
                <div className="w-80 border-r border-slate-800 bg-slate-900/30 p-6 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm px-3 py-2 text-slate-100"
                            placeholder="Post Title"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm px-3 py-2 text-slate-100 h-24 resize-none"
                            placeholder="Brief summary..."
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">Cover Image</label>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => setUploadMode('url')}
                                    className={`px-2 py-1 text-xs rounded transition-colors ${uploadMode === 'url'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:text-slate-300'
                                        }`}
                                >
                                    <LinkIcon className="w-3 h-3" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadMode('file')}
                                    className={`px-2 py-1 text-xs rounded transition-colors ${uploadMode === 'file'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:text-slate-300'
                                        }`}
                                >
                                    <Upload className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {uploadMode === 'url' ? (
                            <input
                                type="text"
                                value={formData.coverImage || ''}
                                onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm px-3 py-2 text-slate-100"
                                placeholder="https://..."
                            />
                        ) : (
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                                    className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm px-3 py-2 text-slate-100 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary-500 file:text-white hover:file:bg-primary-600 file:cursor-pointer"
                                />
                                {selectedFile && (
                                    <Button
                                        onClick={handleImageUpload}
                                        disabled={uploading}
                                        size="sm"
                                        className="w-full"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-3 h-3 mr-2" />
                                                Upload Image
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        )}

                        {formData.coverImage && (
                            <div className="mt-2">
                                <img
                                    src={formData.coverImage}
                                    alt="Cover preview"
                                    className="w-full h-32 object-cover rounded-lg border border-slate-700"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">External Content URL</label>
                        <input
                            type="text"
                            value={formData.externalUrl || ''}
                            onChange={e => setFormData({ ...formData, externalUrl: e.target.value })}
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm px-3 py-2 text-slate-100"
                            placeholder="https://... (Optional)"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">If set, this post will link to this URL.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Tags (comma sep)</label>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm px-3 py-2 text-slate-100"
                            placeholder="fintech, react, crypto"
                        />
                    </div>
                </div>

                {/* Main Editor */}
                <div className="flex-grow h-[calc(100vh-64px)]">
                    <textarea
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        className="w-full h-full bg-slate-950 p-8 text-lg font-mono text-slate-300 focus:outline-none resize-none"
                        placeholder="# Write your masterpiece..."
                    />
                </div>
            </div>
        </div>
    );
}
