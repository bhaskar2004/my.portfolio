import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import './Typewriter.css';

const Typewriter = forwardRef(({
    text,
    delay = 50,
    startDelay = 0,
    threshold = 0.5,
    cursor = '|',
    cursorColor,
    hideCursorOnDone = false,
    onComplete,
    className = '',
    style = {},
    ...rest
}, forwardedRef) => {
    const [{ displayText, index, started }, setState] = useState({
        displayText: '',
        index: 0,
        started: false,
    });

    const innerRef = useRef(null);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    // Merge forwarded ref
    const ref = useCallback((node) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
    }, [forwardedRef]);

    // Reset when text changes
    useEffect(() => {
        setState({ displayText: '', index: 0, started: false });
    }, [text]);

    // Trigger on scroll into view
    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setState(prev => ({ ...prev, started: true }));
                observer.disconnect();
            }
        }, { threshold });

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, text]); // re-observe if text resets

    // Typing loop
    useEffect(() => {
        if (!started || index >= text.length) {
            if (started && index >= text.length) {
                onCompleteRef.current?.();
            }
            return;
        }

        const tickDelay = index === 0 && startDelay > 0 ? startDelay : delay;

        const id = setTimeout(() => {
            setState(prev => ({
                ...prev,
                displayText: text.slice(0, prev.index + 1),
                index: prev.index + 1,
            }));
        }, tickDelay);

        return () => clearTimeout(id);
    }, [started, index, text, delay, startDelay]);

    const isDone = index >= text.length;
    const isBlinking = started && isDone;
    const showCursor = !(hideCursorOnDone && isDone);

    const cssVars = {
        ...(cursorColor && { '--cursor-color': cursorColor }),
        ...style,
    };

    return (
        <span
            ref={ref}
            className={`typewriter-container${className ? ` ${className}` : ''}`}
            style={cssVars}
            aria-label={text}
            aria-live="polite"
            aria-busy={!isDone}
            {...rest}
        >
            <span aria-hidden="true">{displayText}</span>

            {showCursor && (
                <span
                    className="typewriter-cursor"
                    data-blinking={isBlinking}
                    aria-hidden="true"
                >
                    {cursor}
                </span>
            )}
        </span>
    );
});

Typewriter.displayName = 'Typewriter';

export default Typewriter;