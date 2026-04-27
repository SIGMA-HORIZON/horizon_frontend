"use client";
import React from 'react';

interface CreateVMSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectTemplate: () => void;
    onSelectDirect: () => void;
}

export default function CreateVMSelectionModal({
    isOpen,
    onClose,
    onSelectTemplate,
    onSelectDirect
}: CreateVMSelectionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={overlayStyle}>
            <div className="modal-content" style={contentStyle}>
                <div style={headerStyle}>
                    <div>
                        <h2 style={titleStyle}>Créer une nouvelle VM</h2>
                        <p style={subtitleStyle}>Choisissez la méthode de création souhaitée.</p>
                    </div>
                    <button onClick={onClose} style={closeBtnStyle}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div style={bodyStyle}>
                    <div
                        style={cardStyle}
                        onClick={() => {
                            onSelectTemplate();
                            onClose();
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563EB')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}
                    >
                        <div style={iconContainerStyle}>
                            <svg viewBox="0 0 24 24" width="32" height="32" stroke="#2563EB" strokeWidth="2" fill="none"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                        <div style={cardContentStyle}>
                            <h3 style={cardTitleStyle}>Créer une VM</h3>
                            <p style={cardDescStyle}>Instanciation standard à partir d'un modèle (template) pré-configuré.</p>
                        </div>
                    </div>

                    <div
                        style={cardStyle}
                        onClick={() => {
                            onSelectDirect();
                            onClose();
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563EB')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}
                    >
                        <div style={iconContainerStyle}>
                            <svg viewBox="0 0 24 24" width="32" height="32" stroke="#2563EB" strokeWidth="2" fill="none"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                        </div>
                        <div style={cardContentStyle}>
                            <h3 style={cardTitleStyle}>Créer une VM (ISO Direct)</h3>
                            <p style={cardDescStyle}>Création directe depuis un fichier ISO sans passer par un template (Méthode avancée).</p>
                        </div>
                    </div>
                </div>

                <div style={footerStyle}>
                    <button onClick={onClose} style={btnGhostStyle}>Annuler</button>
                </div>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
};

const contentStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const headerStyle: React.CSSProperties = {
    padding: '24px 32px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #E2E8F0'
};

const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0F172A',
    margin: '0 0 4px 0'
};

const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#64748B',
    margin: 0
};

const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#64748B',
    cursor: 'pointer',
    padding: '4px',
};

const bodyStyle: React.CSSProperties = {
    padding: '24px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
};

const cardStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #E2E8F0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    alignItems: 'center'
};

const iconContainerStyle: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    background: 'rgba(37, 99, 235, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
};

const cardContentStyle: React.CSSProperties = {
    flex: 1
};

const cardTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0F172A',
    margin: '0 0 4px 0'
};

const cardDescStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#64748B',
    lineHeight: '1.5',
    margin: 0
};

const footerStyle: React.CSSProperties = {
    padding: '16px 32px 24px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #E2E8F0'
};

const btnGhostStyle: React.CSSProperties = {
    padding: '8px 16px',
    background: 'transparent',
    border: 'none',
    color: '#64748B',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
};
