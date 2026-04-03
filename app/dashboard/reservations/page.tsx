"use client";
import React from 'react';

export default function Reservations() {
  return (
    <div className="page active" id="pg-reserv">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '8px', letterSpacing: '-0.5px' }}>Réservations</h1>
        <p style={{ color: 'var(--g1-muted)', fontSize: '15px' }}>Gérez vos demandes d'allocation de ressources.</p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '80px 20px', 
        background: 'var(--g1-card)', 
        border: '1px solid var(--g1-border)', 
        borderTop: '1px solid rgba(0,180,216,0.3)',
        borderRadius: '12px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(37,99,235,0.08)',
          border: '1px solid rgba(37,99,235,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 0 30px rgba(37,99,235,0.1) inset, 0 0 20px rgba(0,0,0,0.4)'
        }}>
          <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--g1-accent2)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        
        <h3 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--g1-text)', marginBottom: '12px', letterSpacing: '-0.3px' }}>Aucune réservation pour le moment</h3>
        <p style={{ color: 'var(--g1-muted)', fontSize: '15px', maxWidth: '420px', marginBottom: '36px', lineHeight: '1.6' }}>
          Vous n'avez soumis aucune demande de réservation de ressources. Créez une nouvelle demande pour obtenir l'approbation d'une machine virtuelle ou de ressources supplémentaires.
        </p>

        <button 
          className="btn-accent" 
          onClick={() => window.dispatchEvent(new Event('open-create-vm'))}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '15px' }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Créer une réservation
        </button>
      </div>
    </div>
  )
}
