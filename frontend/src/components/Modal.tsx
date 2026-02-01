import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 10,
        padding: '2em',
        minWidth: 320,
        maxWidth: '90vw',
        boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'none',
          border: 'none',
          fontSize: 22,
          cursor: 'pointer',
          color: '#888'
        }}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
