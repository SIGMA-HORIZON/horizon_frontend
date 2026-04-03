"use client";
import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="page active" style={{ padding: '0 20px 40px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Tableau de bord — Cluster Horizon</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '13px', color: 'var(--g1-text)', fontWeight: 500, border: '1px solid var(--g1-border)' }}>
            Vendredi 27 mars 2026
          </div>
          <button className="btn-ghost" style={{ padding: '8px 16px' }}>Actualiser</button>
          <button className="btn-accent" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Nouvelle image OS
          </button>
        </div>
      </div>

      {/* 4 STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--g1-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Nœuds Actifs</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '8px' }}>12<span style={{ fontSize: '16px', color: 'var(--g1-muted)' }}>/14</span></div>
          <div style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '12px' }}>2 en maintenance</div>
          <div className="badge badge-on">● En ligne</div>
        </div>
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--g1-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>VMs En Cours</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '8px' }}>47</div>
          <div style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '12px' }}>+3 démarrées aujourd'hui</div>
          <div className="badge" style={{ background: 'rgba(37,99,235,0.1)', color: '#93C5FD', border: '1px solid rgba(37,99,235,0.3)' }}>Nominal</div>
        </div>
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--g1-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>CPU Global</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '8px' }}>68<span style={{ fontSize: '16px', color: 'var(--g1-muted)' }}>%</span></div>
          <div style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '12px' }}>340 / 500 vCPU alloués</div>
          <div className="badge badge-warn">⚠ Charge modérée</div>
        </div>
        <div className="pm-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--g1-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Stockage CEPH</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '8px' }}>4.2<span style={{ fontSize: '16px', color: 'var(--g1-muted)' }}>To</span></div>
          <div style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '12px' }}>7.8 To disponibles</div>
          <div className="badge badge-on">● Sain</div>
        </div>
      </div>

      {/* BOTTOM SECTIONS */}
      <div style={{ display: 'flex', gap: '24px' }}>
        
        {/* Table Nœuds */}
        <div className="pm-card" style={{ flex: 2 }}>
          <div className="pm-hdr" style={{ justifyContent: 'space-between' }}>
            <span>Nœuds du cluster</span>
            <a href="#" style={{ fontSize: '13px', color: 'var(--g1-text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Voir tout <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                <tr>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>NŒUD</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>STATUT</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>CPU</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>RAM</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>VMS</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>IP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', fontWeight: 600, color: 'var(--g1-text)' }}>node-01</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)' }}><span style={{ color: 'var(--g1-on)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><div className="status-dot"></div>Actif</span></td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>72%</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>14.2 Go</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>8</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.11</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', fontWeight: 600, color: 'var(--g1-text)' }}>node-02</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)' }}><span style={{ color: 'var(--g1-on)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><div className="status-dot"></div>Actif</span></td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>45%</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>8.6 Go</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>5</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.12</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', fontWeight: 600, color: 'var(--g1-text)' }}>node-03</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)' }}><span style={{ color: 'var(--g1-warn)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><div className="status-dot" style={{ background: 'var(--g1-warn)', boxShadow: '0 0 6px var(--g1-warn)' }}></div>Chargé</span></td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>91%</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>28.4 Go</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>12</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.13</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', fontWeight: 600, color: 'var(--g1-text)' }}>node-04</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)' }}><span style={{ color: 'var(--g1-on)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><div className="status-dot"></div>Actif</span></td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>33%</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>6.1 Go</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-text)' }}>4</td>
                  <td style={{ padding: '16px 24px', borderBottom: '1px solid var(--g1-border)', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.14</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 24px', borderBottom: 'none', fontWeight: 600, color: 'var(--g1-text)' }}>node-05</td>
                  <td style={{ padding: '16px 24px', borderBottom: 'none' }}><span style={{ color: 'var(--g1-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><div className="status-dot" style={{ background: 'var(--g1-muted)', boxShadow: 'none' }}></div>Maintenance</span></td>
                  <td style={{ padding: '16px 24px', borderBottom: 'none', color: 'var(--g1-text)' }}>—</td>
                  <td style={{ padding: '16px 24px', borderBottom: 'none', color: 'var(--g1-text)' }}>—</td>
                  <td style={{ padding: '16px 24px', borderBottom: 'none', color: 'var(--g1-text)' }}>0</td>
                  <td style={{ padding: '16px 24px', borderBottom: 'none', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>10.0.0.15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Consommation Globale */}
        <div className="pm-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="pm-hdr">Consommation globale</div>
          <div className="pm-body" style={{ flex: 1, padding: '24px' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
                <span style={{ color: 'var(--g1-muted)' }}>CPU</span>
                <span style={{ color: 'var(--g1-text)' }}>68%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--g1-warn)', width: '68%', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
                <span style={{ color: 'var(--g1-muted)' }}>RAM</span>
                <span style={{ color: 'var(--g1-text)' }}>54%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--g1-on)', width: '54%', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
                <span style={{ color: 'var(--g1-muted)' }}>Stockage Ceph</span>
                <span style={{ color: 'var(--g1-text)' }}>35%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--g1-on)', width: '35%', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
                <span style={{ color: 'var(--g1-muted)' }}>GPU alloués</span>
                <span style={{ color: 'var(--g1-text)' }}>82%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--g1-err)', width: '82%', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--g1-border)', paddingTop: '24px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--g1-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Réservations en attente</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--g1-text)' }}>5</div>
              </div>
              <button className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--g1-on)' }}>
                Valider
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
