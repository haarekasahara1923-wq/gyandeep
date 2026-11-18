"use client";
import { useState } from "react";
import styles from "./LeadForm.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LeadForm({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    purpose: "Admission Inquiry",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917828499519";
    
    const message = `Hello! Gyandeep Institute,
Mujhe aapke coaching center ke baare mein jaankari chahiye.

*Naam:* ${formData.name}
*Contact:* ${formData.contact}
*Address:* ${formData.address}
*Inquiry:* ${formData.purpose}

Please contact me. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <div className={styles.headerIcon}>📚</div>
        <h2 className={styles.title}>Course / Batch Inquiry</h2>
        <p className={styles.subtitle}>Apni details bharo aur Gyandeep Institute team WhatsApp pe sampark karegi</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name *</label>
            <div className={styles.inputWrap}>
              <input 
                type="text" 
                required 
                placeholder="e.g. Ramesh Kumar"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Contact Number *</label>
            <div className={styles.inputWrap}>
              <input 
                type="tel" 
                required 
                placeholder="+91 98765 43210"
                value={formData.contact} 
                onChange={e => setFormData({...formData, contact: e.target.value})} 
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Address *</label>
            <div className={styles.inputWrap}>
              <input 
                type="text" 
                required 
                placeholder="Your city / area"
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Purpose *</label>
            <div className={styles.inputWrap}>
              <select 
                value={formData.purpose} 
                onChange={e => setFormData({...formData, purpose: e.target.value})}
              >
                <option value="Classes 1st to 10th (All Subjects - CBSE/MP Board)">Classes 1st to 10th (All Subjects - CBSE & MP Board)</option>
                <option value="Classes 11th & 12th (Arts / Biology / Mathematics / Commerce / Agriculture)">Classes 11th & 12th (Arts / Biology / Mathematics / Commerce / Agriculture)</option>
                <option value="NEET & IIT-JEE (Main & Advanced)">NEET & IIT-JEE (Main & Advanced)</option>
                <option value="Sainik School / Navodaya / Excellence School">Sainik School / Navodaya / Excellence School</option>
                <option value="Foundation (Hindi & English, Grammar, Personality Dev)">Foundation (Hindi & English, Grammar, Personality Dev)</option>
                <option value="Online Education (Live Classes & Test Series)">Online Education (Live Classes & Test Series)</option>
                <option value="Free Demo Class">Free Demo Class</option>
                <option value="General Admission Inquiry">General Admission Inquiry</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            📱 Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
