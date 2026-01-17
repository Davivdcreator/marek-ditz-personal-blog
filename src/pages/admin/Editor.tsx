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
            const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
            const postToSave = { ...formData, tags };

            await gh.savePost(postToSave);
            alert('Post saved successfully!');
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Failed to save post:', error);
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
            <div className="min-h-screen bg-zen-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-zen-moss-dark animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zen-white text-zen-stone flex flex-col">
            {/* Toolbar */}
            <div className="h-16 border-b-2 border-zen-light-gray bg-white backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin/dashboard')}
                        className="border border-zen-light-gray"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <span className="text-zen-gray">|</span>
                    <span className="font-serif font-semibold text-zen-stone">
                        {slug === 'new' ? 'New Post' : 'Editing: ' + formData.title}
                    </span>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    variant="primary"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <div className="flex-grow flex">
                {/* Meta Sidebar */}
                <div className="w-80 border-r-2 border-zen-light-gray bg-zen-light-gray/20 p-6 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                            placeholder="Post Title"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone h-24 resize-none focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                            placeholder="Brief summary..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone font-mono focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                            placeholder="post-url-slug"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Category (Growth Stage)</label>
                        <select
                            value={formData.growthStage || ''}
                            onChange={e => setFormData({ ...formData, growthStage: e.target.value as any || undefined })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                        >
                            <option value="">Automatic (By Date)</option>
                            <option value="seed">🌱 Seed (Recent)</option>
                            <option value="sapling">🌿 Sapling (Developing)</option>
                            <option value="old-growth">🌳 Old Growth (Mature)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                            placeholder="fintech, banking, innovation"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">Cover Image</label>

                        {/* Toggle between URL and File Upload */}
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setUploadMode('url')}
                                className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${uploadMode === 'url'
                                    ? 'bg-zen-stone text-white'
                                    : 'bg-zen-light-gray text-zen-gray hover:bg-zen-gray/20'
                                    }`}
                            >
                                <LinkIcon className="w-3 h-3 inline mr-1" />
                                URL
                            </button>
                            <button
                                onClick={() => setUploadMode('file')}
                                className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${uploadMode === 'file'
                                    ? 'bg-zen-stone text-white'
                                    : 'bg-zen-light-gray text-zen-gray hover:bg-zen-gray/20'
                                    }`}
                            >
                                <Upload className="w-3 h-3 inline mr-1" />
                                Upload
                            </button>
                        </div>

                        {uploadMode === 'url' ? (
                            <input
                                type="text"
                                value={formData.coverImage || ''}
                                onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                                placeholder="https://..."
                            />
                        ) : (
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-zen-gray file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-zen-light-gray file:text-zen-stone hover:file:bg-zen-gray/20"
                                />
                                {selectedFile && (
                                    <Button
                                        onClick={handleImageUpload}
                                        disabled={uploading}
                                        size="sm"
                                        className="w-full bg-zen-moss-dark hover:bg-zen-moss text-white"
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
                            <div className="mt-3">
                                <img
                                    src={formData.coverImage}
                                    alt="Cover preview"
                                    className="w-full h-32 object-cover rounded-lg border-2 border-zen-light-gray"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-2">External URL (optional)</label>
                        <input
                            type="text"
                            value={formData.externalUrl || ''}
                            onChange={e => setFormData({ ...formData, externalUrl: e.target.value })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-3 py-2 text-zen-stone focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                            placeholder="https://..."
                        />
                        <p className="text-xs text-zen-gray mt-1">Link to external article source</p>
                    </div>
                </div>

                {/* Content Editor */}
                <div className="flex-grow p-6 overflow-y-auto h-[calc(100vh-64px)]">
                    <div className="max-w-4xl mx-auto">
                        <label className="block text-xs font-medium text-zen-gray uppercase tracking-wider mb-3">Content (Markdown)</label>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full bg-white border-2 border-zen-light-gray rounded-lg text-sm px-4 py-3 text-zen-stone font-mono leading-relaxed min-h-[600px] resize-y focus:border-zen-moss focus:ring-2 focus:ring-zen-moss/20 outline-none"
                            placeholder="# Your content here...&#10;&#10;Write your blog post in Markdown format."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
