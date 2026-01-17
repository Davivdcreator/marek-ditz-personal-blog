import { Octokit } from 'octokit';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill Buffer for browser
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    coverImage?: string;
    tags?: string[];
    growthStage?: 'seed' | 'sapling' | 'old-growth';
    content: string;
    sha?: string; // For updates
    externalUrl?: string;
}

export class GitHubService {
    private octokit: Octokit;
    private owner: string;
    private repo: string;

    constructor(token: string, owner: string, repo: string) {
        this.octokit = new Octokit({ auth: token });
        this.owner = owner;
        this.repo = repo;
    }

    async getPosts(): Promise<BlogPost[]> {
        try {
            const path = 'src/content/posts';
            const response = await this.octokit.rest.repos.getContent({
                owner: this.owner,
                repo: this.repo,
                path,
            });

            if (!Array.isArray(response.data)) {
                return [];
            }

            const posts: BlogPost[] = [];

            for (const file of response.data) {
                if (file.name.endsWith('.md')) {
                    const fileContent = await this.octokit.rest.repos.getContent({
                        owner: this.owner,
                        repo: this.repo,
                        path: file.path,
                    });

                    if ('content' in fileContent.data) {
                        const raw = Buffer.from(fileContent.data.content, 'base64').toString('utf-8');
                        const { data, content } = matter(raw);

                        posts.push({
                            slug: file.name.replace('.md', ''),
                            title: data.title || 'Untitled',
                            date: data.date || new Date().toISOString(),
                            description: data.description || '',
                            coverImage: data.coverImage,
                            tags: data.tags || [],
                            externalUrl: data.externalUrl,
                            content,
                            sha: file.sha,
                        });
                    }
                }
            }

            return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }

    async savePost(post: BlogPost): Promise<void> {
        const path = `src/content/posts/${post.slug}.md`;

        // Build frontmatter object, explicitly filtering out undefined values
        const rawFrontmatter = {
            title: post.title,
            date: post.date,
            description: post.description,
            coverImage: post.coverImage,
            tags: post.tags,
            externalUrl: post.externalUrl,
        };

        // Remove all undefined/null values to prevent YAML serialization errors
        const frontmatter: Record<string, any> = {};
        for (const [key, value] of Object.entries(rawFrontmatter)) {
            if (value !== undefined && value !== null) {
                frontmatter[key] = value;
            }
        }

        // Validate required fields
        if (!frontmatter.title || !frontmatter.date || !frontmatter.description) {
            throw new Error(
                `Missing required fields. Please ensure Title, Date, and Description are filled in.\n` +
                `Current values:\n` +
                `- Title: ${frontmatter.title || '(empty)'}\n` +
                `- Date: ${frontmatter.date || '(empty)'}\n` +
                `- Description: ${frontmatter.description || '(empty)'}`
            );
        }

        try {
            const fileContent = matter.stringify(post.content, frontmatter);
            const encodedContent = Buffer.from(fileContent).toString('base64');

            // Check if file exists to get SHA for update (if not provided in post object, though usually we should have it)
            let sha = post.sha;
            if (!sha) {
                try {
                    const existing = await this.octokit.rest.repos.getContent({
                        owner: this.owner,
                        repo: this.repo,
                        path,
                    });
                    // @ts-expect-error Output of getContent is union type, we know it's a file
                    sha = existing.data.sha;
                } catch {
                    // File doesn't exist, strictly creating new
                }
            }

            await this.octokit.rest.repos.createOrUpdateFileContents({
                owner: this.owner,
                repo: this.repo,
                path,
                message: `Content Update: ${post.title}`,
                content: encodedContent,
                sha,
            });
        } catch (error: any) {
            // Provide detailed error information
            if (error.message?.includes('unacceptable kind of an object')) {
                throw new Error(
                    `YAML Serialization Error: One of your fields contains an invalid value.\n\n` +
                    `Please check:\n` +
                    `- All text fields are properly filled\n` +
                    `- Tags are comma-separated text (not empty)\n` +
                    `- Cover Image is either a URL or uploaded file\n\n` +
                    `Technical details: ${error.message}`
                );
            }
            throw error;
        }
    }

    async uploadImage(file: File, filename: string): Promise<string> {
        // Read file as base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const encodedContent = buffer.toString('base64');

        // Generate unique filename with timestamp to avoid conflicts
        const timestamp = Date.now();
        const extension = filename.split('.').pop();
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
        const uniqueFilename = `${nameWithoutExt}-${timestamp}.${extension}`;

        const path = `public/images/uploads/${uniqueFilename}`;

        await this.octokit.rest.repos.createOrUpdateFileContents({
            owner: this.owner,
            repo: this.repo,
            path,
            message: `Upload image: ${uniqueFilename}`,
            content: encodedContent,
        });

        // Return the public URL path (relative to public directory)
        return `/images/uploads/${uniqueFilename}`;
    }
}
