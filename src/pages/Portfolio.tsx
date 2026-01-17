export function Portfolio() {
    return (
        <div className="min-h-screen bg-zen-white pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-zen-lg">
                    <h1 className="text-6xl md:text-7xl font-serif text-zen-stone mb-6">
                        Portfolio
                    </h1>
                    <p className="text-xl text-zen-gray max-w-2xl mx-auto">
                        Strategic initiatives and transformative projects.
                    </p>
                </div>

                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-zen-light-gray/50 flex items-center justify-center">
                            <span className="text-6xl">🌱</span>
                        </div>
                        <p className="text-zen-gray text-lg italic">
                            Project case studies are growing...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
