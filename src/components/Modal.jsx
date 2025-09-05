import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         width="24" height="24" 
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke="currentColor" 
                         strokeWidth="2" 
                         strokeLinecap="round" 
                         strokeLinejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
