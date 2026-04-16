import { useState } from 'react';
import { 
    PaperPlaneIcon, 
    MagicWandIcon, 
    EnvelopeClosedIcon,
    PersonIcon,
    Pencil1Icon
} from '@radix-ui/react-icons';
import { generateSmartDraft } from '../../services/ai';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isPolishing, setIsPolishing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMagicDraft = async () => {
        if (!formData.message.trim() || isPolishing) return;
        
        setIsPolishing(true);
        const polished = await generateSmartDraft(formData.message);
        if (polished) {
            setFormData(prev => ({ ...prev, message: polished.trim() }));
        }
        setIsPolishing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulating form submission (e.g. to EmailJS or custom backend)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);

        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="name">NAME</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            required 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            required 
                            placeholder="hello@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">SUBJECT</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        required 
                        placeholder="How can I help?"
                        value={formData.subject}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group message-group">
                    <label htmlFor="message">
                        <span>MESSAGE</span>
                        <button 
                            type="button" 
                            className={`magic-btn ${isPolishing ? 'loading' : ''}`}
                            onClick={handleMagicDraft}
                            title="AI Polish Draft"
                        >
                            <MagicWandIcon /> 
                            {isPolishing ? 'POLISHING...' : 'AI REFINE'}
                        </button>
                    </label>
                    <textarea 
                        id="message" 
                        name="message"
                        required 
                        placeholder="Tell me about your project..."
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className={`btn primary submit-btn ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    {!isSubmitting && <PaperPlaneIcon />}
                </button>

                {status === 'success' && (
                    <div className="form-status success">
                        Message sent successfully. I'll get back to you soon!
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
