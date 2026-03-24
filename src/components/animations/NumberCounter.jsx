import { useState, useEffect, useRef } from 'react';

// Easing function for smoother realistic counting (ease-out-expo)
const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const NumberCounter = ({ 
    end, 
    duration = 2000, 
    delay = 0, 
    prefix = "", 
    suffix = "", 
    className = "" 
}) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        let startTime = null;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;

            // Wait for delay
            if (elapsed < delay) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            const activeElapsed = elapsed - delay;
            const progress = Math.min(activeElapsed / duration, 1);
            
            // Calculate current value based on easing
            const currentCount = Math.floor(easeOutExpo(progress) * end);
            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, delay, hasAnimated]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
};

export default NumberCounter;
