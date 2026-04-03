
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './dashboard.css';
import '../home.css';
import CreateVMModal from './CreateVMModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener('open-create-vm', handleOpen);
    return () => window.removeEventListener('open-create-vm', handleOpen);
  }, []);

  return (
    <div className="dashboard-theme">
      <div className="shell">
        <div className="sidebar">
          
  <div className="logo-wrap">
    <div className="logo-mark">
      <div className="logo-box"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
      <div><div className="logo-name">Horizon Sigma</div><div className="logo-sub">Espace utilisateur</div></div>
    </div>
  </div>
  <div className="nav-wrap">
    <div className="nav-group">
      <div className="nav-group-label">Navigation</div>
      <Link href="/dashboard" className="nav-item active"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>Dashboard</Link>
    </div>
    <div className="nav-group">
      <div className="nav-group-label">Mes machines virtuelles</div>
      <Link href="/dashboard/mes-vms" className="nav-item"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 4v16M16 4v16"/></svg>Mes VMs
        <span style={{ marginLeft: 'auto', background: 'rgba(37,99,235,.25)', color: '#93C5FD', fontSize: '9px', fontWeight: '700', padding: '1px 6px', borderRadius: '10px' }}>3</span>
      </Link>
      <div className="nav-vm-list">
        <div className="vm-tree-item active" >
          <div className="vm-dot on"></div>vm-ml-ornella-01
        </div>
        <div className="vm-tree-item" >
          <div className="vm-dot on"></div>vm-dev-ornella-02
        </div>
        <div className="vm-tree-item" >
          <div className="vm-dot warn"></div>vm-gpu-ornella-03
        </div>
        <div className="vm-tree-item" style={{ color: 'var(--g1-accent2)', fontWeight: 600 }} onClick={() => setIsModalOpen(true)}>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Créer une VM
        </div>
      </div>
    </div>
    <div className="nav-group">
      <div className="nav-group-label">Gestion</div>
      <Link href="/dashboard/reservations" className="nav-item"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Réservations</Link>
      <Link href="/dashboard/ssh" className="nav-item"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 12l2 2 4-4"/></svg>Clés SSH</Link>
    </div>
    <div className="nav-group">
      <div className="nav-group-label">Compte</div>
      <Link href="/dashboard/profil" className="nav-item"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Mon Profil</Link>
    </div>
  </div>
  <div className="sidebar-footer">
    <div className="user-row"  title="Voir mon profil">
      <div className="user-av">OM</div>
      <div style={{ minWidth: '0', flex: '1' }}>
        <div className="user-name">Ornella Mbo'o</div>
        <div className="user-role">ML Avancé</div>
      </div>
      <div className="user-row-chevron"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></div>
    </div>
    <button className="logout-btn" onClick={() => router.push('/connexion')}>
      <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Déconnexion
    </button>
  </div>

        </div>
        <div className="main">
          <div className="topbar">
            
    <div className="search-box">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      Rechercher une VM…
    </div>
    <div className="topbar-right">
      <div className="status-pill"><div className="status-dot"></div>Cluster en ligne</div>
      <button className="btn-ghost">Aide</button>
    </div>
  
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
      <CreateVMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
