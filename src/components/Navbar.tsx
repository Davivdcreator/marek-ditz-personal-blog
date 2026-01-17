import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { useEnvironmentalInteraction } from '../hooks/useEnvironmentalInteraction';
import { GrowthEffect } from './GrowthEffect';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const env = useEnvironmentalInteraction();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Portfolio', path: '/portfolio' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zen-white/80 backdrop-blur-sm border-b border-zen-light-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group relative">
                        {env.shouldGrow && <GrowthEffect isActive={true} delay={500} />}
                        <span className="text-2xl font-serif font-semibold text-zen-stone transition-transform duration-300"
                            style={{
                                transform: env.shouldShift ? 'translateX(-4px)' : 'translateX(0)',
                            }}
                        >
                            Marek Ditz
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative text-sm font-medium transition-colors duration-200 hover:text-zen-moss-dark"
                                style={{
                                    color: location.pathname === link.path ? '#1C1917' : '#78716C',
                                    transform: env.shouldShift ? 'translateY(-2px)' : 'translateY(0)',
                                }}
                            >
                                {env.shouldGrow && <GrowthEffect isActive={true} delay={link.path === '/' ? 800 : 1200} />}
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact">
                            <Button
                                size="sm"
                                className="bg-zen-stone hover:bg-zen-gray text-zen-white border-none"
                                style={{
                                    transform: env.shouldShift ? 'scale(0.95)' : 'scale(1)',
                                }}
                            >
                                Contact
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zen-stone hover:text-zen-gray focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-zen-white border-b border-zen-light-gray">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium"
                                style={{
                                    color: location.pathname === link.path ? '#1C1917' : '#78716C',
                                    backgroundColor: location.pathname === link.path ? '#E7E5E4' : 'transparent',
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4">
                            <Link to="/contact" className="block" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-zen-stone hover:bg-zen-gray text-zen-white">
                                    Contact
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
