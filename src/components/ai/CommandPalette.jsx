import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    MagnifyingGlassIcon, 
    MagicWandIcon,
    CodeIcon,
    HomeIcon,
    FileTextIcon,
    PaperPlaneIcon
} from '@radix-ui/react-icons';
import { processCommand } from '../../services/ai';
import './CommandPalette.css';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    const handleHashLink = (id) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Keyboard shortcut listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when open
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setFeedback('');
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    const handleCommand = async (e) => {
        e.preventDefault();
        if (!query.trim() || isProcessing) return;

        setIsProcessing(true);
        setFeedback('Interpreting command...');

        try {
            const cmd = await processCommand(query);
            
            if (cmd.type === 'navigate') {
                setFeedback(`Navigating to ${cmd.label}...`);
                setTimeout(() => {
                    navigate(cmd.payload);
                    setIsOpen(false);
                }, 800);
            } else if (cmd.type === 'search') {
                setFeedback(`Searching for "${cmd.payload}"...`);
                // Logic for search can be navigation to project detail or filtering
                navigate(`/project/${cmd.payload}`);
                setIsOpen(false);
            } else if (cmd.type === 'chat') {
                setFeedback('Redirecting to AI Assistant...');
                // We could trigger a global event or just open the assistant
                window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: query }));
                setIsOpen(false);
            } else {
                setFeedback('Command not recognized. Try "Go to workshops".');
            }
        } catch (err) {
            setFeedback('Error processing command.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
            <div className="command-palette-modal" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleCommand} className="palette-input-wrap">
                    <MagnifyingGlassIcon className="palette-search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command... (e.g. 'Show me Java projects' or 'Go home')"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        disabled={isProcessing}
                    />
                    <div className="palette-hint">
                        {isProcessing ? <MagicWandIcon className="spin" /> : <span>↵ ENTER</span>}
                    </div>
                </form>

                {feedback && <div className="palette-feedback">{feedback}</div>}

                <div className="palette-suggestions">
                    <div className="suggestion-item" onClick={() => {navigate('/'); setIsOpen(false);}}>
                        <HomeIcon /> <span>Home</span>
                        <kbd>G H</kbd>
                    </div>
                    <div className="suggestion-item" onClick={() => {handleHashLink('projects'); setIsOpen(false);}}>
                        <CodeIcon /> <span>Featured Projects</span>
                        <kbd>G F</kbd>
                    </div>
                    <div className="suggestion-item" onClick={() => {navigate('/workshops'); setIsOpen(false);}}>
                        <MagicWandIcon /> <span>All Workshops</span>
                        <kbd>G W</kbd>
                    </div>
                    <div className="suggestion-item" onClick={() => {navigate('/resume'); setIsOpen(false);}}>
                        <FileTextIcon /> <span>Resume</span>
                        <kbd>G R</kbd>
                    </div>
                </div>

                <div className="palette-footer">
                    <span>Powered by AI</span>
                    <div className="palette-controls">
                        <span><kbd>ESC</kbd> to close</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
