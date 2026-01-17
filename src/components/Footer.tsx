import { Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-zen-white to-zen-light-gray/50 border-t border-zen-light-gray py-20 overflow-hidden">
            {/* Garden decoration at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zen-moss/30 to-transparent" />

            {/* Moss patches */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute -top-2 opacity-40"
                        style={{
                            left: `${i * 20 + 10}%`,
                        }}
                    >
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                            <circle cx="10" cy="15" r="4" fill="#86EFAC" opacity="0.6" />
                            <circle cx="18" cy="17" r="3" fill="#4ADE80" opacity="0.7" />
                            <circle cx="14" cy="12" r="2.5" fill="#86EFAC" opacity="0.5" />
                        </svg>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Logo/Name */}
                    <div className="space-y-3">
                        <h3 className="text-3xl font-serif font-semibold text-zen-stone">
                            Marek Ditz
                        </h3>
                        <p className="text-zen-gray text-base max-w-md">
                            Cultivating innovation in banking. Building environments where ideas grow naturally.
                        </p>
                    </div>

                    {/* Decorative divider */}
                    <div className="flex items-center gap-3 py-4">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-zen-moss/40" />
                        <div className="w-2 h-2 rounded-full bg-zen-moss/50" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-zen-moss/40" />
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/marekditz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-3 rounded-full bg-zen-light-gray hover:bg-zen-moss/20 transition-all duration-300 hover:scale-110"
                        >
                            <Linkedin className="w-5 h-5 text-zen-gray group-hover:text-zen-moss-dark transition-colors" />
                            {/* Ripple effect */}
                            <div className="absolute inset-0 rounded-full border-2 border-zen-moss/0 group-hover:border-zen-moss/30 group-hover:scale-150 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-zen-light-gray w-full max-w-2xl">
                        <p className="text-sm text-zen-gray/70">
                            © {new Date().getFullYear()} Marek Ditz. All rights reserved.
                        </p>
                        <p className="text-xs text-zen-gray/50 mt-2 italic">
                            "Like a garden, leadership requires patience, care, and the right environment."
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom moss decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-zen-moss/10 via-zen-moss/20 to-zen-moss/10" />
        </footer>
    );
}
