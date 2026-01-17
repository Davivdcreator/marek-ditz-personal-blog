import { useState, useEffect, useRef } from 'react';

interface EnvironmentalState {
    isIdle: boolean;
    mouseVelocity: number;
    shouldGrow: boolean;
    shouldShift: boolean;
}

export function useEnvironmentalInteraction(idleThreshold = 3000) {
    const [state, setState] = useState<EnvironmentalState>({
        isIdle: false,
        mouseVelocity: 0,
        shouldGrow: false,
        shouldShift: false,
    });

    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastMoveTime = useRef(Date.now());
    const idleTimer = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const timeDelta = now - lastMoveTime.current;

            if (timeDelta > 0) {
                const dx = e.clientX - lastMousePos.current.x;
                const dy = e.clientY - lastMousePos.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const velocity = distance / timeDelta;

                setState(prev => ({
                    ...prev,
                    mouseVelocity: velocity,
                    shouldShift: velocity > 2, // Aggressive movement threshold
                    isIdle: false,
                    shouldGrow: false,
                }));

                lastMousePos.current = { x: e.clientX, y: e.clientY };
                lastMoveTime.current = now;
            }

            // Reset idle timer
            if (idleTimer.current) {
                clearTimeout(idleTimer.current);
            }

            idleTimer.current = setTimeout(() => {
                setState(prev => ({
                    ...prev,
                    isIdle: true,
                    shouldGrow: true,
                    shouldShift: false,
                    mouseVelocity: 0,
                }));
            }, idleThreshold);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (idleTimer.current) {
                clearTimeout(idleTimer.current);
            }
        };
    }, [idleThreshold]);

    return state;
}
