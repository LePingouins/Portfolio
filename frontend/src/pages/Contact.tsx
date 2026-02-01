import React, { useState, useContext } from 'react';
import './Contact.css';
import FeedbackForm from '../components/FeedbackForm';
import { LanguageContext } from '../components/LanguageContext';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { language } = useContext(LanguageContext);

  return (
    <div className="contact-page-bg">
      <div className="contact-container">
        <h1>{language === 'fr' ? 'Contactez-moi' : 'Contact Me'}</h1>
        <p>{language === 'fr' ? "Une question, une collaboration ou juste envie de dire bonjour ? Remplissez le formulaire ci-dessous !" : "Have a question, want to collaborate, or just want to say hi? Fill out the form below!"}</p>
        {submitted ? (
          <div className="contact-success">{language === 'fr' ? "Merci pour votre message ! Je vous répondrai bientôt." : "Thank you for your message! I'll get back to you soon."}</div>
        ) : (
          <FeedbackForm onSubmit={() => setSubmitted(true)} />
        )}
      </div>
    </div>
  );
};

export default Contact;
