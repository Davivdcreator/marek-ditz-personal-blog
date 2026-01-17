import { RockGarden } from '../components/RockGarden';
import { Button } from '../components/Button';
import { ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Experience } from '../components/Experience';

export function Home() {
    return (
        <div className="bg-zen-white">
            {/* Hero Section with Rock Garden */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
                {/* Oversized Quote */}
                <div className="absolute top-32 left-0 right-0 text-center px-4 md:px-zen-lg z-10">
                    <blockquote className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium italic text-zen-stone leading-tight max-w-5xl mx-auto">
                        "Better a short life as a rebel than a long life as a sheep"
                    </blockquote>
                    <p className="mt-8 text-zen-gray text-sm md:text-base tracking-wider uppercase">
                        Marek Ditz
                    </p>
                </div>

                {/* Rock Garden */}
                <div className="mt-32">
                    <RockGarden />
                </div>

                {/* Minimal CTA */}
                <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-6">
                    <p className="text-zen-gray text-sm tracking-widest uppercase">
                        CEO, Partners Banka a.s.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/blog">
                            <Button
                                size="lg"
                                className="bg-zen-stone hover:bg-zen-gray text-zen-white border-none"
                            >
                                Cultivated Thoughts
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <a href="https://www.linkedin.com/in/marekditz/" target="_blank" rel="noopener noreferrer" className="group relative">
                            <Button
                                size="lg"
                                className="relative bg-white border-2 border-zen-stone text-zen-stone hover:bg-zen-stone hover:text-white hover:border-zen-stone transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Linkedin className="w-5 h-5" />
                                    Connect on LinkedIn
                                </span>
                                {/* Ripple effect on hover */}
                                <div className="absolute inset-0 bg-zen-moss/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg" />
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section - Minimal */}
            <section className="py-zen-xl px-4 md:px-zen-lg">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-serif text-zen-stone mb-zen-md text-center">
                        The Gardener
                    </h2>
                    <div className="space-y-8 text-zen-gray text-lg md:text-xl leading-relaxed">
                        <p className="text-center max-w-3xl mx-auto">
                            Building the first neobank in the Czech Republic. Combining leading technology
                            with personalised advisory services.
                        </p>
                        <p className="text-center max-w-3xl mx-auto">
                            With <span className="text-zen-stone font-medium">30+ years of experience</span> in
                            banking and finance, specializing in IT architecture, innovations, M&A, strategic
                            project management, and fintech transformation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <Experience />

            {/* Philosophy Section */}
            <section className="py-zen-xl px-4 md:px-zen-lg bg-zen-light-gray/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-zen-stone mb-zen-md">
                        Leadership Philosophy
                    </h2>
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-zen-gray leading-relaxed max-w-2xl mx-auto">
                        "A leader should provide the environment, not the command.
                        Like a gardener tending to a rock garden—invisible until needed."
                    </blockquote>
                </div>
            </section>
        </div>
    );
}
