import { experience, education, type ExperienceItem } from '../data/resume';
import { Briefcase, GraduationCap, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

function ExperienceCard({ item }: { item: ExperienceItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative group">
            {/* Dot */}
            <div className="absolute -left-[41px] md:-left-[59px] top-1.5 w-5 h-5 rounded-full border-4 border-slate-950 bg-slate-700 group-hover:bg-primary-500 transition-colors" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                    {item.role}
                </h3>
                <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full whitespace-nowrap w-fit mt-2 sm:mt-0">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {item.period}
                </div>
            </div>

            <div className="text-lg text-slate-300 font-medium mb-3">
                {item.company}
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-4">
                {item.description}
            </p>

            {item.achievements && item.achievements.length > 0 && (
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors focus:outline-none"
                    >
                        {isOpen ? (
                            <>
                                <ChevronUp className="w-4 h-4 mr-1.5" />
                                Hide Key Achievements
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4 mr-1.5" />
                                Show Key Achievements
                            </>
                        )}
                    </button>

                    {isOpen && (
                        <div className="mt-4 pl-4 border-l border-slate-800 space-y-2 animate-in slide-in-from-top-2 duration-200">
                            {item.achievements.map((achievement, i) => (
                                <div key={i} className="text-slate-400 text-sm flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mt-1.5 mr-3 shrink-0" />
                                    <span>{achievement}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function Experience() {
    return (
        <section className="py-24 bg-slate-950/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                    <Briefcase className="w-8 h-8 text-primary-500" />
                    Professional Experience
                </h2>

                <div className="space-y-12 relative border-l-2 border-slate-800 ml-3 md:ml-6 pl-8 md:pl-12 pb-12">
                    {experience.map((item, index) => (
                        <ExperienceCard key={index} item={item} />
                    ))}
                </div>

                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-primary-500" />
                        Education
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {education.map((edu, index) => (
                            <div key={index} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:border-primary-500/30 transition-colors">
                                <div className="text-primary-400 text-sm font-bold mb-2">{edu.year}</div>
                                <h3 className="text-xl font-bold text-white mb-1">{edu.school}</h3>
                                <p className="text-slate-400">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
