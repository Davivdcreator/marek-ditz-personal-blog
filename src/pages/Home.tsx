import { Button } from '../components/Button';
import { ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Experience } from '../components/Experience';

export function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)] justify-center">
            {/* Hero / About Section */}
            <section className="relative py-12 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/20 via-slate-950 to-slate-950 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                        {/* Image Column */}
                        <div className="flex-shrink-0 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500" />
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2 border-2 border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                                <img
                                    src="/images/portrait.jpg"
                                    alt="Marek Ditz"
                                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                                />
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-primary-400 mb-6 font-medium">
                                CEO @ Partners Banka a.s.
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
                                Marek Ditz
                            </h1>

                            <div className="prose prose-lg prose-invert text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                <p>
                                    CEO of <strong className="text-white">Partners Banka a.s.</strong>, the first neobank established in the Czech Republic in 2024.
                                </p>
                                <p>
                                    Combining leading technology with personalised advisory services. With <strong className="text-white">30+ years of experience</strong> in banking and finance, specializing in IT architecture, innovations, M&A, strategic project management, restructuring, crisis management, corporate banking, transformation, open banking, and fintech.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                <Link to="/blog">
                                    <Button size="lg" className="group min-w-[160px]">
                                        Read Insights
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <a href="https://www.linkedin.com/in/marekditz/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="secondary" size="lg" className="min-w-[160px]">
                                        <Linkedin className="mr-2 w-5 h-5" /> LinkedIn
                                    </Button>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Resume / Experience Section */}
            <Experience />
        </div>
    );
}
