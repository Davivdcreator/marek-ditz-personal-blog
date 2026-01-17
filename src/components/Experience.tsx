import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { experience, education, type ExperienceItem, type EducationItem } from '../data/resume';

function ExperienceCard({ item, index }: { item: ExperienceItem | EducationItem; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    // Type guard to check if item is ExperienceItem
    const isExperience = (item: ExperienceItem | EducationItem): item is ExperienceItem => {
        return 'company' in item;
    };

    return (
        <div
            className="group relative bg-white border border-zen-light-gray rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            style={{
                animationDelay: `${index * 150}ms`,
            }}
        >
            {/* Stone decoration */}
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-zen-moss/30 group-hover:bg-zen-moss/50 transition-colors duration-500" />

            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                    <h3 className="text-2xl font-serif text-zen-stone mb-2">
                        {isExperience(item) ? item.role : item.degree}
                    </h3>
                    <p className="text-zen-gray font-medium mb-1">
                        {isExperience(item) ? item.company : item.school}
                    </p>
                    <p className="text-sm text-zen-gray/70">
                        {isExperience(item) ? item.period : item.year}
                    </p>
                </div>
            </div>

            {isExperience(item) && (
                <>
                    <p className="text-zen-gray leading-relaxed mb-4">
                        {item.description}
                    </p>

                    {item.achievements && item.achievements.length > 0 && (
                        <div>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center text-sm font-medium text-zen-moss-dark hover:text-zen-moss transition-colors focus:outline-none"
                            >
                                {isOpen ? (
                                    <>
                                        <ChevronUp className="w-4 h-4 mr-1.5" />
                                        Hide Achievements
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4 mr-1.5" />
                                        Show Achievements
                                    </>
                                )}
                            </button>

                            {isOpen && (
                                <div className="mt-4 pl-4 border-l-2 border-zen-moss/30 space-y-2 animate-grow">
                                    {item.achievements.map((achievement: string, i: number) => (
                                        <div key={i} className="text-zen-gray text-sm flex items-start">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zen-moss mt-2 mr-3 shrink-0" />
                                            <span>{achievement}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export function Experience() {
    return (
        <section className="py-zen-xl px-4 md:px-zen-lg bg-zen-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-serif text-zen-stone mb-4 text-center">
                    Journey
                </h2>
                <p className="text-zen-gray text-center mb-zen-md max-w-2xl mx-auto">
                    Each role is a stone in the garden, carefully placed to create a path of growth and learning.
                </p>

                {/* Experience */}
                <div className="mb-zen-lg">
                    <h3 className="text-2xl font-serif text-zen-stone mb-8">Professional Experience</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {experience.map((item, index) => (
                            <ExperienceCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <h3 className="text-2xl font-serif text-zen-stone mb-8">Education</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {education.map((item, index) => (
                            <ExperienceCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
