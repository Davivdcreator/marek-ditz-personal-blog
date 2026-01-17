export function RockGarden() {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-zen-white texture-overlay overflow-hidden">
            {/* Enhanced ambient particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-zen-gray/20 animate-float"
                        style={{
                            top: `${10 + Math.random() * 80}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${6 + Math.random() * 6}s`,
                        }}
                    />
                ))}
            </div>

            {/* Moss patches on ground */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 opacity-30 animate-grow"
                        style={{
                            left: `${i * 12}%`,
                            animationDelay: `${i * 0.3}s`,
                        }}
                    >
                        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                            <circle cx="20" cy="30" r="8" fill="#86EFAC" opacity="0.6" />
                            <circle cx="35" cy="35" r="6" fill="#4ADE80" opacity="0.7" />
                            <circle cx="28" cy="25" r="5" fill="#86EFAC" opacity="0.5" />
                            <circle cx="45" cy="32" r="7" fill="#4ADE80" opacity="0.6" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* 3D Stone with Portrait */}
            <div className="relative group">
                {/* Stone shadow - enhanced */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16 w-72 h-12 bg-zen-stone/10 rounded-full blur-2xl transition-all duration-700 group-hover:w-80 group-hover:h-16" />

                {/* Main stone */}
                <div className="relative w-56 h-64 md:w-72 md:h-80 transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
                    {/* Stone body with 3D effect */}
                    <div className="absolute inset-0 rounded-[45%_55%_60%_40%/50%_50%_50%_50%] bg-gradient-to-br from-zen-light-gray via-zen-gray/30 to-zen-gray/50 shadow-2xl overflow-hidden">
                        {/* Portrait inside stone */}
                        <div className="absolute inset-4 rounded-[45%_55%_60%_40%/50%_50%_50%_50%] overflow-hidden">
                            <img
                                src="/images/marek-portrait.jpg"
                                alt="Marek Ditz"
                                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                            />
                            {/* Gradient overlay for blend */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zen-gray/40 via-transparent to-zen-light-gray/20" />
                        </div>

                        {/* Highlight */}
                        <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-white/30 blur-2xl" />

                        {/* Texture overlay */}
                        <div className="absolute inset-0 rounded-[45%_55%_60%_40%/50%_50%_50%_50%] opacity-20 mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    {/* Enhanced ripple effect on hover */}
                    <div className="absolute inset-0 rounded-[45%_55%_60%_40%/50%_50%_50%_50%] border-2 border-zen-moss/0 group-hover:border-zen-moss/40 transition-all duration-1000 group-hover:scale-110 animate-pulse" />
                    <div className="absolute inset-0 rounded-[45%_55%_60%_40%/50%_50%_50%_50%] border border-zen-moss/0 group-hover:border-zen-moss/20 transition-all duration-1000 delay-100 group-hover:scale-115" />
                </div>

                {/* Enhanced moss growth at base */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                    <div className="w-4 h-4 rounded-full bg-zen-moss/70 animate-grow" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-3 rounded-full bg-zen-moss-dark/60 animate-grow" style={{ animationDelay: '0.2s' }} />
                    <div className="w-4 h-4 rounded-full bg-zen-moss/50 animate-grow" style={{ animationDelay: '0.3s' }} />
                    <div className="w-2 h-2 rounded-full bg-zen-moss-dark/70 animate-grow" style={{ animationDelay: '0.4s' }} />
                    <div className="w-3 h-3 rounded-full bg-zen-moss/60 animate-grow" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Floating leaves/petals around stone */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-zen-moss/40 animate-float"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${-10 + Math.random() * 120}%`,
                                animationDelay: `${i * 0.4}s`,
                                animationDuration: `${4 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
