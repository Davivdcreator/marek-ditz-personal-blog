import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/Button';

export function Contact() {
    const [phoneRevealed, setPhoneRevealed] = useState(false);
    const [emailRevealed, setEmailRevealed] = useState(false);
    const [phoneTimer, setPhoneTimer] = useState<number | null>(null);
    const [emailTimer, setEmailTimer] = useState<number | null>(null);

    const handlePhoneClick = () => {
        if (phoneRevealed) return;

        const startTime = Date.now();
        setPhoneTimer(0);

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 3000 - elapsed);
            setPhoneTimer(Math.ceil(remaining / 1000));

            if (remaining <= 0) {
                clearInterval(interval);
                setPhoneRevealed(true);
                setPhoneTimer(null);
            }
        }, 100);
    };

    const handleEmailClick = () => {
        if (emailRevealed) return;

        const startTime = Date.now();
        setEmailTimer(0);

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 3000 - elapsed);
            setEmailTimer(Math.ceil(remaining / 1000));

            if (remaining <= 0) {
                clearInterval(interval);
                setEmailRevealed(true);
                setEmailTimer(null);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Feel free to reach out for collaborations, speaking engagements, or just to connect.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Info Card */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                        <div className="space-y-4">
                            {/* Name */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-500/10 rounded-lg">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Name</h3>
                                    <p className="text-white font-medium">Marek Ditz</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-500/10 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Phone</h3>
                                    {phoneRevealed ? (
                                        <a href="tel:+420603800181" className="text-white font-medium hover:text-primary-400 transition-colors">
                                            +420 603 800 181
                                        </a>
                                    ) : (
                                        <Button
                                            onClick={handlePhoneClick}
                                            variant="ghost"
                                            size="sm"
                                            className="px-0 hover:bg-transparent"
                                            disabled={phoneTimer !== null}
                                        >
                                            {phoneTimer !== null ? (
                                                <span className="flex items-center gap-2 text-slate-400">
                                                    <Clock className="w-4 h-4 animate-pulse" />
                                                    Revealing in {phoneTimer}s...
                                                </span>
                                            ) : (
                                                <span className="text-primary-500 hover:text-primary-400">Click to reveal</span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-500/10 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Email</h3>
                                    {emailRevealed ? (
                                        <a href="mailto:marek@ditz.cz" className="text-white font-medium hover:text-primary-400 transition-colors break-all">
                                            marek@ditz.cz
                                        </a>
                                    ) : (
                                        <Button
                                            onClick={handleEmailClick}
                                            variant="ghost"
                                            size="sm"
                                            className="px-0 hover:bg-transparent"
                                            disabled={emailTimer !== null}
                                        >
                                            {emailTimer !== null ? (
                                                <span className="flex items-center gap-2 text-slate-400">
                                                    <Clock className="w-4 h-4 animate-pulse" />
                                                    Revealing in {emailTimer}s...
                                                </span>
                                            ) : (
                                                <span className="text-primary-500 hover:text-primary-400">Click to reveal</span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">About</h2>
                        <div className="space-y-4 text-slate-400">
                            <p>
                                CEO of <span className="text-white font-medium">Partners Banka a.s.</span>, the first neobank established in the Czech Republic in 2024.
                            </p>
                            <p>
                                With over 30 years of experience in banking and finance, specializing in fintech innovation, digital transformation, and strategic project management.
                            </p>
                            <p className="text-sm text-slate-500 mt-6">
                                <strong className="text-slate-400">Note:</strong> Contact information is protected against automated scrapers. Click to reveal phone and email after a brief verification delay.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
