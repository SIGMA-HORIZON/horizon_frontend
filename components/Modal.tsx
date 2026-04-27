import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: 'info' | 'danger' | 'success';
  confirmLabel?: string;
  onConfirm?: () => void;
  showConfirm?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'info', 
  confirmLabel = 'Confirmer', 
  onConfirm,
  showConfirm = true 
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className={`modal-type-icon type-${type}`}>
              <Icon name={type === 'danger' ? 'delete' : type === 'success' ? 'start' : 'info'} size={18} />
            </div>
            <h3>{title}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <Icon name="delete" size={16} />
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Annuler</button>
          {showConfirm && (
            <button 
              className={type === 'danger' ? 'btn-modal-danger' : 'btn-accent'} 
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
