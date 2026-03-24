import { useState, useEffect, useRef } from 'react';
import './Typewriter.css';

const Typewriter = ({ text, delay = 50, startDelay = 0, className = "" }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTyping(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        let timeout;
        
        if (currentIndex === 0 && startDelay > 0) {
            timeout = setTimeout(() => {
                setCurrentText(text[0] || '');
                setCurrentIndex(1);
            }, startDelay);
        } else if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setCurrentText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, isTyping, text, delay, startDelay]);

    return (
        <span ref={elementRef} className={`typewriter-container ${className}`}>
            {currentText}
            <span className={`typewriter-cursor ${currentIndex >= text.length ? 'blinking' : ''}`}>_</span>
        </span>
    );
};

export default Typewriter;
