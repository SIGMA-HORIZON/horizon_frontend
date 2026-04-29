"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import '../dashboard/dashboard.css';
import '../home.css';

import { VMProvider, useVMs } from '../dashboard/VMContext';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '@/components/Icon';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { clusterStatus } = useVMs();

  const isOnline = clusterStatus?.nodes?.some((n: any) => n.status === 'online') || false;

  return (
    <div className="dashboard-theme">
      <div className="shell">
        <div className="sidebar">

          <div className="logo-wrap">
            <div className="logo-mark">
              <div className="logo-box">
                <Icon name="logo" strokeWidth={2.5} />
              </div>
              <div><div className="logo-name">Horizon</div><div className="logo-sub" style={{ color: 'var(--g1-accent2)' }}>Admin Portail</div></div>
            </div>
          </div>

          <div className="nav-wrap">
            <div className="nav-group">
              <div className="nav-group-label">Supervision</div>
              <Link href="/admin" className={`nav-item ${pathname === '/admin' ? 'active' : ''}`}>
                <Icon name="dashboard" />
                Tableau de bord
              </Link>
              <Link href="/admin/noeuds" className={`nav-item ${pathname === '/admin/noeuds' ? 'active' : ''}`}>
                <Icon name="vms" />
                Nœuds cluster
              </Link>
            </div>
            <div className="nav-group">
              <div className="nav-group-label">Gestion</div>
              <Link href="/admin/reservations" className={`nav-item ${pathname === '/admin/reservations' ? 'active' : ''}`}>
                <Icon name="reservations" />
                Réservations
              </Link>
              <Link href="/admin/bibliotheque" className={`nav-item ${pathname === '/admin/bibliotheque' ? 'active' : ''}`}>
                <Icon name="vms" />
                Bibliothèque OS
              </Link>
              <Link href="/admin/utilisateurs" className={`nav-item ${pathname === '/admin/utilisateurs' ? 'active' : ''}`}>
                <Icon name="user" />
                Utilisateurs
              </Link>
              <Link href="/admin/demandes" className={`nav-item ${pathname === '/admin/demandes' ? 'active' : ''}`}>
                <Icon name="reservations" />
                Demandes de comptes
              </Link>
            </div>

          </div>

          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-av" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>AD</div>
              <div style={{ minWidth: '0', flex: '1' }}>
                <div className="user-name">Admin Horizon</div>
                <div className="user-role">Administrateur</div>
              </div>
            </div>
            <button className="logout-btn" onClick={logout}>
              <Icon name="logout" size={16} />
              Déconnexion
            </button>
          </div>

        </div>
        <div className="main">

          <div className="topbar">
            <div className="search-box">
              <Icon name="search" size={16} />
              Rechercher (Utilisateur, IP, VM)...
            </div>
            <div className="topbar-right">
              <button
                className="btn-ghost"
                onClick={toggleTheme}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}
                title="Changer de thème"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
                {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
              </button>
              <div className={`status-pill ${!isOnline ? 'offline' : ''}`}>
                <div className={`status-dot ${!isOnline ? 'offline' : ''}`}></div>
                {isOnline ? 'Cluster en ligne' : 'Cluster hors ligne'}
              </div>
              <button className="btn-ghost">Aide</button>
            </div>
          </div>

          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <VMProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </VMProvider>
  );
}
