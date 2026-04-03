"use client";
import React from 'react';

export default function Utilisateurs() {
  return (
    <div className="page active" style={{ padding: '0 20px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Dossiers Utilisateurs</h1>
          <p style={{ color: 'var(--g1-muted)', fontSize: '14px' }}>Contrôle des privilèges d'accès, droits et supervision des quotas actifs.</p>
        </div>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Créer un utilisateur
        </button>
      </div>

      <div className="pm-card">
        <div className="pm-hdr">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Répertoire principal
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
              <tr>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Nom & E-mail</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Rôle</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Organisation</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>VMs Autorisées</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Statut du compte</th>
                <th style={{ padding: '16px 20px', textAlign: 'right', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* User 1 */}
              <tr>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--g1-accent), #3B82F6)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 600 }}>OM</div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--g1-text)' }}>Ornella Mbo'o</div>
                      <div style={{ fontSize: '12px', color: 'var(--g1-muted)' }}>ornella.mboo@enspy.cm</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span className="badge badge-blue">ML Avancé</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-text)' }}>
                  Étudiante — M2 INFO
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>3/5</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '60%' }}></div></div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span className="badge badge-on">Actif</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Gérer le quota</button>
                </td>
              </tr>

              {/* User 2 */}
              <tr>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 600 }}>JD</div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--g1-text)' }}>Jean Dupont</div>
                      <div style={{ fontSize: '12px', color: 'var(--g1-muted)' }}>jean.dupont@enspy.cm</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>Standard</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none', color: 'var(--g1-text)' }}>
                  Département Mécanique
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>1/2</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '50%', background: 'var(--g1-warn)' }}></div></div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <span className="badge badge-on">Actif</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none', textAlign: 'right' }}>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Gérer le quota</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
