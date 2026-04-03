"use client";
import React from 'react';

export default function OSBibliotheque() {
  return (
    <div className="page active" style={{ padding: '0 20px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Bibliothèque OS</h1>
          <p style={{ color: 'var(--g1-muted)', fontSize: '14px' }}>Images système et templates Cloud-Init disponibles pour le déploiement.</p>
        </div>
        <button className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Ajouter une image OS
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* OS Card 1 */}
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(37,99,235,0.3)' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--g1-accent2)' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <span className="badge badge-on">Stable</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--g1-text)', marginBottom: '6px' }}>Ubuntu Server 22.04 LTS</h3>
          <p style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '16px', lineHeight: '1.5' }}>Distribution Linux stable avec support cloud-init natif et configuration réseau prête à l'emploi.</p>
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--g1-border)', paddingTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Taille Base</div>
              <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>2.1 Go</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Déploiements</div>
              <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>142</div>
            </div>
            <div>
              <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Éditer</button>
            </div>
          </div>
        </div>

        {/* OS Card 2 */}
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(37,99,235,0.3)' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--g1-accent)' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <span className="badge badge-on">Stable</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--g1-text)', marginBottom: '6px' }}>Debian 12 (Bookworm)</h3>
          <p style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '16px', lineHeight: '1.5' }}>Template minimal pur Debian sans outils pré-installés pour charges de travail légères.</p>
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--g1-border)', paddingTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Taille Base</div>
              <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>1.4 Go</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Déploiements</div>
              <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>58</div>
            </div>
            <div>
              <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Éditer</button>
            </div>
          </div>
        </div>

        {/* OS Card 3 */}
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(245,158,11,0.3)' }}>
               <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--g1-warn)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <span className="badge badge-warn">Obsolète (Bientôt)</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--g1-text)', marginBottom: '6px' }}>Fedora 38</h3>
          <p style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '16px', lineHeight: '1.5' }}>Image Fedora pour environnements de bureau et test avec stack technologique récente.</p>
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--g1-border)', paddingTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Taille Base</div>
              <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>2.8 Go</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Déploiements</div>
              <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>12</div>
            </div>
            <div>
              <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Éditer</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
