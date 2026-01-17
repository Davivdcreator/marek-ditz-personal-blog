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
        <div className="min-h-screen bg-zen-white pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-zen-lg">
                    <h1 className="text-5xl md:text-6xl font-serif text-zen-stone mb-6">
                        Connect
                    </h1>
                    <p className="text-xl text-zen-gray max-w-2xl mx-auto">
                        Reach out for collaborations, speaking engagements, or meaningful conversations.
                    </p>
                </div>

                <div className="bg-white border border-zen-light-gray rounded-2xl p-12 space-y-8">
                    {/* Name */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zen-light-gray rounded-lg">
                            <MapPin className="w-5 h-5 text-zen-stone" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-zen-gray uppercase tracking-wider mb-1">Name</h3>
                            <p className="text-zen-stone font-serif text-xl">Marek Ditz</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zen-light-gray rounded-lg">
                            <Phone className="w-5 h-5 text-zen-stone" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-zen-gray uppercase tracking-wider mb-1">Phone</h3>
                            {phoneRevealed ? (
                                <a href="tel:+420603800181" className="text-zen-stone font-medium hover:text-zen-moss-dark transition-colors">
                                    +420 603 800 181
                                </a>
                            ) : (
                                <Button
                                    onClick={handlePhoneClick}
                                    variant="ghost"
                                    size="sm"
                                    className="px-0 hover:bg-transparent text-zen-moss-dark"
                                    disabled={phoneTimer !== null}
                                >
                                    {phoneTimer !== null ? (
                                        <span className="flex items-center gap-2 text-zen-gray">
                                            <Clock className="w-4 h-4 animate-pulse" />
                                            Revealing in {phoneTimer}s...
                                        </span>
                                    ) : (
                                        <span>Click to reveal</span>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zen-light-gray rounded-lg">
                            <Mail className="w-5 h-5 text-zen-stone" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-zen-gray uppercase tracking-wider mb-1">Email</h3>
                            {emailRevealed ? (
                                <a href="mailto:marek@ditz.cz" className="text-zen-stone font-medium hover:text-zen-moss-dark transition-colors break-all">
                                    marek@ditz.cz
                                </a>
                            ) : (
                                <Button
                                    onClick={handleEmailClick}
                                    variant="ghost"
                                    size="sm"
                                    className="px-0 hover:bg-transparent text-zen-moss-dark"
                                    disabled={emailTimer !== null}
                                >
                                    {emailTimer !== null ? (
                                        <span className="flex items-center gap-2 text-zen-gray">
                                            <Clock className="w-4 h-4 animate-pulse" />
                                            Revealing in {emailTimer}s...
                                        </span>
                                    ) : (
                                        <span>Click to reveal</span>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-zen-gray italic">
                        Contact information is protected against automated scrapers.
                        Click to reveal after a brief verification delay.
                    </p>
                </div>
            </div>
        </div>
    );
}
