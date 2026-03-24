import { useEffect, useRef, useState, forwardRef } from 'react';
import './HighlightSwipe.css';

const HighlightSwipe = forwardRef(({
    as: Tag = 'span',
    children,
    color,
    textColor,
    delay = 0,
    duration,
    threshold = 0.5,
    triggerOnce = true,
    className = '',
    style = {},
    ...rest
}, forwardedRef) => {
    const [isActive, setIsActive] = useState(false);
    const innerRef = useRef(null);

    // Merge forwarded ref with inner ref
    const ref = (node) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
    };

    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        let timeoutId;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timeoutId = setTimeout(() => setIsActive(true), delay);
                    if (triggerOnce) observer.disconnect();
                } else if (!triggerOnce) {
                    clearTimeout(timeoutId);
                    setIsActive(false);
                }
            },
            { threshold }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [delay, threshold, triggerOnce]);

    const cssVars = {
        ...(color && { '--highlight-color': color }),
        ...(textColor && { '--highlight-text-color': textColor }),
        ...(duration && { '--highlight-duration': duration }),
        ...style,
    };

    return (
        <Tag
            ref={ref}
            className={`highlight-swipe${isActive ? ' active' : ''}${className ? ` ${className}` : ''}`}
            style={cssVars}
            {...rest}
        >
            <span className="highlight-swipe-content">{children}</span>
        </Tag>
    );
});

HighlightSwipe.displayName = 'HighlightSwipe';

export default HighlightSwipe;