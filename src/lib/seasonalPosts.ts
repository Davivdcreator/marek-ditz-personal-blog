import type { Post } from './posts';

export type GrowthStage = 'seed' | 'sapling' | 'old-growth';

export interface SeasonalPost extends Post {
    growthStage: GrowthStage;
    ageInDays: number;
}

export function categorizePostByAge(post: Post): SeasonalPost {
    const postDate = new Date(post.date);
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));

    let growthStage: GrowthStage;

    // Priority: Manual override from frontmatter
    if (post.growthStage) {
        growthStage = post.growthStage as GrowthStage;
    } else {
        // Fallback: Automatic based on age
        if (ageInDays < 90) {
            growthStage = 'seed';
        } else if (ageInDays < 365) {
            growthStage = 'sapling';
        } else {
            growthStage = 'old-growth';
        }
    }

    return {
        ...post,
        growthStage,
        ageInDays,
    };
}

export function getGrowthStageLabel(stage: GrowthStage): string {
    switch (stage) {
        case 'seed':
            return 'Seeds';
        case 'sapling':
            return 'Saplings';
        case 'old-growth':
            return 'Old Growth';
    }
}

export function getGrowthStageDescription(stage: GrowthStage): string {
    switch (stage) {
        case 'seed':
            return 'Recent insights and emerging thoughts';
        case 'sapling':
            return 'Developing ideas and growing perspectives';
        case 'old-growth':
            return 'Strategic whitepapers and timeless wisdom';
    }
}

export function getGrowthStageIcon(stage: GrowthStage): string {
    switch (stage) {
        case 'seed':
            return '🌱';
        case 'sapling':
            return '🌿';
        case 'old-growth':
            return '🌳';
    }
}
