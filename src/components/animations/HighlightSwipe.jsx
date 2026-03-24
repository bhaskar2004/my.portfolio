import { useEffect, useRef, useState } from 'react';
import './HighlightSwipe.css';

const HighlightSwipe = ({ children, color = "var(--color-primary)", delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <span 
            ref={elementRef} 
            className={`highlight-swipe ${isVisible ? 'active' : ''} ${className}`}
            style={{ '--highlight-color': color }}
        >
            <span className="highlight-swipe-content">{children}</span>
        </span>
    );
};

export default HighlightSwipe;
