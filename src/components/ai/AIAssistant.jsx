import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
    Cross1Icon,
    PaperPlaneIcon,
    TrashIcon,
    EnterFullScreenIcon,
    ExitFullScreenIcon,
    CopyIcon,
    CheckIcon,
    PersonIcon,
    RocketIcon,
    CodeIcon,
    LightningBoltIcon,
    FileTextIcon,
    MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askBhaskarAI } from '../../services/ai';
import { portfolioData } from '../../services/ai/portfolioData';
import './AIAssistant.css';

// ── Bot icon (inline SVG) ─────────────────────────────────────
const BotIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="10" height="8" rx="2" />
        <path d="M5 5V4a3 3 0 0 1 6 0v1" />
        <circle cx="6" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
);

const UserIcon = ({ size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="6" r="3" />
        <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
);

const INITIAL_MESSAGE = { 
    role: 'assistant', 
    text: "Hi! I'm Bhaskar's AI assistant. I'm aware of what you're looking at, so feel free to ask questions!\n\n**Quick Tip**: You can press `Ctrl + K` (or `⌘ + K`) anywhere to open my **Command Console** and navigate or search instantly." 
};

const AIAssistant = () => {
    const location = useLocation();
    const { id: projectId } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIdx, setCopiedIdx] = useState(null);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // ── Dynamic Context & Suggestions ───────────────────────────
    const contextInfo = useMemo(() => {
        if (location.pathname.startsWith('/project/') && projectId) {
            const project = portfolioData.projects.find(p => p.id === projectId);
            return {
                label: `Project: ${project?.title || projectId}`,
                context: `The user is currently viewing the project details for "${project?.title || projectId}".`,
                suggestions: [
                    { label: 'Technical stack', icon: <CodeIcon />, text: `What technologies were used in "${project?.title}"?` },
                    { label: 'Main challenge', icon: <LightningBoltIcon />, text: `What was the biggest challenge in building "${project?.title}"?` },
                    { label: 'View Github', icon: <MagnifyingGlassIcon />, text: `Give me the GitHub link for "${project?.title}".` }
                ]
            };
        }

        if (location.pathname === '/resume') {
            return {
                label: 'Resume View',
                context: 'The user is currently viewing Bhaskar\'s professional resume and skills.',
                suggestions: [
                    { label: 'Key expertise', icon: <PersonIcon />, text: "What is Bhaskar's core expertise in Software Testing?" },
                    { label: 'Matching help', icon: <FileTextIcon />, text: "How can I match my job description with Bhaskar's skills?" },
                    { label: 'Download link', icon: <CheckIcon />, text: 'Where can I download the PDF resume?' }
                ]
            };
        }

        return {
            label: 'General Portfolio',
            context: 'The user is browsing the main portfolio home/workshops page.',
            suggestions: [
                { label: 'Top projects', icon: <RocketIcon />, text: "Tell me about Bhaskar's top 3 projects." },
                { label: 'Core skills', icon: <CodeIcon />, text: "What are Bhaskar's primary technical skills?" },
                { label: 'Contact Bhaskar', icon: <PersonIcon />, text: 'How can I get in touch with Bhaskar T?' }
            ]
        };
    }, [location.pathname, projectId]);

    // ── Global Event Listener for Command Palette ────────────
    useEffect(() => {
        const handlePaletteCommand = (e) => {
            const query = e.detail;
            setIsOpen(true);
            if (query) {
                handleSend(query);
            }
        };

        window.addEventListener('open-ai-chat', handlePaletteCommand);
        return () => window.removeEventListener('open-ai-chat', handlePaletteCommand);
    }, []);

    // Scroll Fixes
    useEffect(() => {
        if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
    }, [isOpen]);

    const handleSend = async (textOverride) => {
        const text = typeof textOverride === 'string' ? textOverride : input;
        if (!text.trim() || isLoading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', text }]);
        setIsLoading(true);

        const aiResponse = await askBhaskarAI(text, contextInfo.context);
        setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const clearChat = () => {
        if (window.confirm('Clear conversation history?')) {
            setMessages([INITIAL_MESSAGE]);
        }
    };

    const copyToClipboard = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    const isInitial = messages.length === 1 && !isLoading;

    return (
        <div className={[
            'ai-assistant-wrapper',
            isOpen ? 'is-open' : '',
            isFullScreen ? 'full-screen' : '',
        ].join(' ')}>

            <button className="ai-pill-toggle" onClick={() => setIsOpen(true)}>
                <div className="pill-icon-wrap">
                    <BotIcon size={16} />
                    <span className="pill-presence" />
                </div>
                <div className="pill-label">
                    <span className="pill-label-main">Ask AI</span>
                    <span className="pill-label-sub">{contextInfo.label}</span>
                </div>
            </button>

            <div className={`ai-chat-window ${isOpen ? 'visible' : ''}`}>
                {isFullScreen && (
                    <div className="console-sidebar">
                        <div className="sidebar-section">
                            <span className="sidebar-label">Active Model</span>
                            <div className="sidebar-value">gemini-1.5-flash-preview</div>
                        </div>
                        <div className="sidebar-section">
                            <span className="sidebar-label">Session Context</span>
                            <div className="sidebar-value">{contextInfo.label}</div>
                            <p className="sidebar-desc">{contextInfo.context}</p>
                        </div>
                        <div className="sidebar-section">
                            <span className="sidebar-label">System Integrity</span>
                            <div className="integrity-meter">
                                <div className="meter-bar" style={{ width: '98%' }} />
                            </div>
                            <span className="sidebar-meta">Latent Space: Connected</span>
                        </div>
                        <div className="sidebar-footer">
                            <BotIcon size={12} />
                            <span>V8.0 ALPHA</span>
                        </div>
                    </div>
                )}

                <div className="main-console">
                    <div className="chat-header">
                        <div className="chat-avatar"><BotIcon size={16} /></div>
                        <div className="chat-header-info">
                            <div className="chat-header-name">Bhaskar AI Console</div>
                            <div className={`chat-header-status ${isLoading ? 'loading' : ''}`}>
                                <span className={`status-dot ${isLoading ? 'pulse' : ''}`} />
                                {isLoading ? 'Synthesizing...' : 'System Ready'}
                            </div>
                        </div>
                        <div className="chat-header-actions">
                            <button className="hdr-btn" onClick={clearChat} title="Clear history"><TrashIcon /></button>
                            <button className="hdr-btn" onClick={() => setIsFullScreen(f => !f)} title={isFullScreen ? "Exit Console" : "Expand Console"}>
                                {isFullScreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
                            </button>
                            <button className="hdr-btn danger" onClick={() => { setIsOpen(false); setIsFullScreen(false); }} title="Close">
                                <Cross1Icon />
                            </button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-row ${msg.role}`}>
                                {msg.role === 'assistant' && <div className="msg-avatar"><BotIcon size={12} /></div>}
                                <div className={`message-bubble ${msg.role}`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                    {msg.role === 'assistant' && (
                                        <button className="copy-bubble-btn" onClick={() => copyToClipboard(msg.text, idx)}>
                                            {copiedIdx === idx ? <CheckIcon /> : <CopyIcon />} {copiedIdx === idx ? 'Copied' : 'Copy'}
                                        </button>
                                    )}
                                </div>
                                {msg.role === 'user' && <div className="msg-avatar"><UserIcon size={11} /></div>}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message-row assistant">
                                <div className="msg-avatar"><BotIcon size={12} /></div>
                                <div className="message-bubble assistant loading">
                                    <div className="typing-dots"><span /><span /><span /></div>
                                </div>
                            </div>
                        )}

                        {isInitial && (
                            <div className="suggestion-chips">
                                {contextInfo.suggestions.map((s, i) => (
                                    <button key={i} className="chip" onClick={() => handleSend(s.text)}>
                                        {s.icon} <span>{s.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={e => { e.preventDefault(); handleSend(); }}>
                        <div className="input-container">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={isFullScreen ? "Execute command or ask a question..." : "Ask about this page..."}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
                                <PaperPlaneIcon width={15} height={15} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;

