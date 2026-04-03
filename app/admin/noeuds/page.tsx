"use client";
import React from 'react';

export default function Noeuds() {
  return (
    <div className="page active" style={{ padding: '0 20px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Nœuds du Cluster</h1>
          <p style={{ color: 'var(--g1-muted)', fontSize: '14px' }}>Supervision de l'état des hyperviseurs et gestion matérielle.</p>
        </div>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Enregistrer un nœud
        </button>
      </div>

      <div className="pm-card">
        <div className="pm-hdr">
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Liste des hyperviseurs physiques
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
              <tr>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Nom / IP</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Statut</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Charge CPU</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Mémoire (RAM)</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>VMs</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Node 1 */}
              <tr>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--g1-text)' }}>node-01</div>
                  <div style={{ fontSize: '12px', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.11</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span className="badge badge-on">En ligne</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>72%</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '72%', background: 'var(--g1-warn)' }}></div></div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>54%</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '54%' }}></div></div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--g1-muted)', marginTop: '4px' }}>64 / 128 Go</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-text)' }}>8 actives</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Maintenance</button>
                </td>
              </tr>

              {/* Node 2 */}
              <tr>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--g1-text)' }}>node-02</div>
                  <div style={{ fontSize: '12px', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.12</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span className="badge badge-on">En ligne</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>45%</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '45%' }}></div></div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>30%</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '30%' }}></div></div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--g1-muted)', marginTop: '4px' }}>38 / 128 Go</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-text)' }}>5 actives</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Maintenance</button>
                </td>
              </tr>
              
              {/* Node 3 */}
              <tr>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <div style={{ fontWeight: 600, color: 'var(--g1-text)' }}>node-gpu-01</div>
                  <div style={{ fontSize: '12px', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.15</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <span className="badge badge-warn">Surchargé</span>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>96%</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '96%', background: 'var(--g1-err)' }}></div></div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '30px' }}>82%</span>
                    <div className="mini-bar"><div className="mini-fill" style={{ width: '82%', background: 'var(--g1-warn)' }}></div></div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--g1-muted)', marginTop: '4px' }}>210 / 256 Go</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: 'none', color: 'var(--g1-text)' }}>14 actives</td>
                <td style={{ padding: '16px 20px', borderBottom: 'none', textAlign: 'right' }}>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Maintenance</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
