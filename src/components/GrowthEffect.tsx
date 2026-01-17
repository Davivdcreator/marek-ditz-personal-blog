import { useEffect, useState } from 'react';

interface GrowthEffectProps {
    isActive: boolean;
    delay?: number;
}

export function GrowthEffect({ isActive, delay = 0 }: GrowthEffectProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setVisible(true), delay);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [isActive, delay]);

    if (!visible) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Enhanced moss growth effect */}
            <svg
                className="absolute -bottom-3 -left-3 w-20 h-20 animate-grow opacity-70"
                viewBox="0 0 100 100"
                fill="none"
            >
                <circle cx="20" cy="80" r="10" fill="#86EFAC" opacity="0.7">
                    <animate attributeName="r" values="10;12;10" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="38" cy="88" r="7" fill="#4ADE80" opacity="0.8">
                    <animate attributeName="r" values="7;9;7" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="75" r="6" fill="#86EFAC" opacity="0.6">
                    <animate attributeName="r" values="6;7;6" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="15" cy="90" r="5" fill="#4ADE80" opacity="0.7">
                    <animate attributeName="r" values="5;6;5" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="42" cy="82" r="8" fill="#86EFAC" opacity="0.65">
                    <animate attributeName="r" values="8;10;8" dur="3.2s" repeatCount="indefinite" />
                </circle>
            </svg>

            {/* Flower/insight particles with enhanced animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-40 h-40">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-zen-moss animate-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.25}s`,
                                opacity: 0.5 + Math.random() * 0.4,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Vines growing from bottom */}
            <svg
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-24 animate-grow opacity-50"
                viewBox="0 0 100 80"
                fill="none"
            >
                <path
                    d="M 50 80 Q 45 60, 50 40 T 55 0"
                    stroke="#86EFAC"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                />
                <path
                    d="M 30 80 Q 28 65, 32 50 T 35 20"
                    stroke="#4ADE80"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                />
                <path
                    d="M 70 80 Q 72 65, 68 50 T 65 20"
                    stroke="#86EFAC"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                />
            </svg>
        </div>
    );
}
