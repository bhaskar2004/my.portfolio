import { useState, useRef, useCallback, useEffect } from 'react';
import './ContactForm.css';

const MAX_MESSAGE_LENGTH = 1000;

const validators = {
    name: v => v.trim().length < 2 ? 'Name must be at least 2 characters' : '',
    email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Enter a valid email address' : '',
    subject: v => v.trim().length < 3 ? 'Subject is required' : '',
    message: v => v.trim().length < 10 ? 'Message must be at least 10 characters' : '',
};

const INITIAL = { name: '', email: '', subject: '', message: '' };

const FIELD_ICONS = {
    name: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    email: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    subject: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="m3 15 2 2 4-4" />
        </svg>
    ),
    message: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
        </svg>
    ),
};

const ContactForm = () => {
    const [values, setValues] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const textareaRef = useRef(null);
    const formRef = useRef(null);

    const validate = useCallback((field, value) => {
        return validators[field]?.(value) ?? '';
    }, []);

    // Calculate form completion percentage
    const completedFields = Object.keys(INITIAL).filter(k => {
        const val = values[k].trim();
        if (k === 'name') return val.length >= 2;
        if (k === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (k === 'subject') return val.length >= 3;
        if (k === 'message') return val.length >= 10;
        return false;
    });
    const progress = (completedFields.length / Object.keys(INITIAL).length) * 100;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) return;

        setValues(prev => ({ ...prev, [name]: value }));

        // auto-grow textarea
        if (name === 'message' && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.max(120, textareaRef.current.scrollHeight) + 'px';
        }

        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        }
    };

    const handleFocus = (e) => {
        setFocusedField(e.target.name);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFocusedField(null);
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate all fields
        const allTouched = Object.fromEntries(Object.keys(INITIAL).map(k => [k, true]));
        const allErrors = Object.fromEntries(
            Object.keys(INITIAL).map(k => [k, validate(k, values[k])])
        );

        setTouched(allTouched);
        setErrors(allErrors);

        if (Object.values(allErrors).some(Boolean)) {
            // Shake the form on validation error
            formRef.current?.classList.add('form-shake');
            setTimeout(() => formRef.current?.classList.remove('form-shake'), 600);
            return;
        }

        setSubmitting(true);
        // replace with your actual submission (EmailJS, fetch, etc.)
        await new Promise(r => setTimeout(r, 1800));
        setSubmitting(false);
        setSent(true);
    };

    const handleReset = () => {
        setValues(INITIAL);
        setErrors({});
        setTouched({});
        setSent(false);
        setFocusedField(null);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const msgLen = values.message.length;
    const charClass =
        msgLen >= MAX_MESSAGE_LENGTH ? 'char-count at-limit' :
            msgLen >= MAX_MESSAGE_LENGTH * 0.9 ? 'char-count near-limit' :
                'char-count';

    if (sent) {
        return (
            <div className="contact-form-container">
                <div className="form-success">
                    {/* Particle burst */}
                    <div className="success-particles" aria-hidden="true">
                        {[...Array(12)].map((_, i) => (
                            <span key={i} className="particle" style={{
                                '--angle': `${i * 30}deg`,
                                '--delay': `${i * 0.05}s`,
                                '--distance': `${60 + Math.random() * 40}px`,
                            }} />
                        ))}
                    </div>
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" className="check-path" />
                        </svg>
                    </div>
                    <p className="success-title">Message sent!</p>
                    <p className="success-body">
                        Thanks for reaching out — I'll get back to you within 24 hours.
                    </p>
                    <button className="reset-btn" onClick={handleReset}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L2 9" />
                            <path d="M2 3v6h6" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L22 15" />
                            <path d="M22 21v-6h-6" />
                        </svg>
                        Send another message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contact-form-container">
            {/* Animated gradient border */}
            <div className="form-glow-border" aria-hidden="true" />

            {/* Progress bar */}
            <div className="form-progress" aria-label={`Form ${Math.round(progress)}% complete`}>
                <div
                    className="form-progress-fill"
                    style={{ '--progress': progress / 100 }}
                />
                <span className="form-progress-label">
                    {completedFields.length}/{Object.keys(INITIAL).length} fields complete
                </span>
            </div>

            <form
                className="contact-form"
                onSubmit={handleSubmit}
                ref={formRef}
                noValidate
            >
                <div className="form-group-row">
                    <Field
                        id="name" name="name" type="text"
                        label="Name" placeholder=" "
                        icon={FIELD_ICONS.name}
                        value={values.name} error={errors.name}
                        isFocused={focusedField === 'name'}
                        onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                    />
                    <Field
                        id="email" name="email" type="email"
                        label="Email" placeholder=" "
                        icon={FIELD_ICONS.email}
                        value={values.email} error={errors.email}
                        isFocused={focusedField === 'email'}
                        onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                    />
                </div>

                <Field
                    id="subject" name="subject" type="text"
                    label="Subject" placeholder=" "
                    icon={FIELD_ICONS.subject}
                    value={values.subject} error={errors.subject}
                    isFocused={focusedField === 'subject'}
                    onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                />

                {/* Message */}
                <div className={`form-field is-textarea${errors.message ? ' has-error' : ''}${focusedField === 'message' ? ' is-focused' : ''}`}>
                    <div className="field-control">
                        <div className="field-icon-wrap">
                            {FIELD_ICONS.message}
                        </div>
                        <textarea
                            ref={textareaRef}
                            id="message" name="message"
                            placeholder=" "
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            rows={5}
                            style={{ minHeight: 120, overflow: 'hidden' }}
                        />
                        <label htmlFor="message">Message</label>
                    </div>
                    <div className="textarea-footer">
                        <FieldError msg={errors.message} />
                        <span className={charClass}>{msgLen} / {MAX_MESSAGE_LENGTH}</span>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className={`submit-btn${progress === 100 ? ' ready' : ''}`}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <span className="loading-spinner">
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="50" strokeLinecap="round" />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            <>
                                Send Message
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="send-icon">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </>
                        )}
                    </button>
                    {!submitting && (
                        <span className="form-hint">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Secure · All fields required
                        </span>
                    )}
                </div>

            </form>
        </div>
    );
};

/* ── helpers ── */

const Field = ({ id, name, type, label, placeholder, icon, value, error, isFocused, onChange, onBlur, onFocus }) => (
    <div className={`form-field${error ? ' has-error' : ''}${isFocused ? ' is-focused' : ''}${value?.trim() ? ' has-value' : ''}`}>
        <div className="field-control">
            <div className="field-icon-wrap">
                {icon}
            </div>
            <input
                id={id} name={name} type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                autoComplete="off"
            />
            <label htmlFor={id}>{label}</label>
            {/* Validation checkmark */}
            {value?.trim() && !error && (
                <div className="field-valid-icon" aria-label="Valid">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            )}
        </div>
        <FieldError msg={error} />
    </div>
);

const FieldError = ({ msg }) => (
    <div className={`field-error-msg${msg ? ' visible' : ''}`}>
        {msg && (
            <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {msg}
            </>
        )}
    </div>
);

export default ContactForm;