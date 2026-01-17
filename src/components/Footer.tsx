import { Github, Linkedin, Twitter } from 'lucide-react';


export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-white">Marek Ditz</span>
                        <p className="text-slate-400 text-sm mt-1">Innovating banking for the digital age.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-900 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} DevFin Personal Blog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
