"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { VMProvider, useVMs } from './VMContext';
import './dashboard.css';
import '../home.css';
import CreateVMModal from './CreateVMModal';
import { Icon } from '@/components/Icon';

function SearchComponent({ vms, router }: { vms: any[], router: any }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = vms.filter(v =>
    v.name.toLowerCase().includes(query.toLowerCase()) ||
    v.ip_address?.toLowerCase().includes(query.toLowerCase()) ||
    v.id.includes(query)
  );

  return (
    <div className="search-box" style={{ position: 'relative', width: '300px', cursor: 'text' }}>
      <Icon name="search" size={16} />
      <input
        type="text"
        placeholder="Rechercher une VM…"
        value={query}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onChange={(e) => setQuery(e.target.value)}
        style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', fontSize: 'inherit', flex: 1 }}
      />
      {isFocused && query.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#0F1623', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', zIndex: 100, marginTop: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          {results.length > 0 ? (
            results.map(v => (
              <div
                key={v.id}
                onClick={() => {
                  setQuery('');
                  router.push(`/dashboard/mes-vms/${v.id}`);
                }}
                style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>{v.name}</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{v.ip_address || 'Pas d\'IP'} · {v.os}</div>
              </div>
            ))
          ) : (
            <div style={{ padding: '12px 16px', fontSize: '13px', color: '#94A3B8' }}>Aucune VM trouvée.</div>
          )}
        </div>
      )}
    </div>
  );
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { vms } = useVMs();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener('open-create-vm', handleOpen);
    return () => window.removeEventListener('open-create-vm', handleOpen);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-theme">
      <div className="shell">
        <div className="sidebar">

          <div className="logo-wrap">
            <div className="logo-mark">
              <div className="logo-box"><Icon name="logo" strokeWidth={2.5} /></div>
              <div><div className="logo-name">Horizon</div><div className="logo-sub">Espace utilisateur</div></div>
            </div>
          </div>
          <div className="nav-wrap">
            <div className="nav-group">
              <div className="nav-group-label">Navigation</div>
              <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}><Icon name="dashboard" /> Dashboard</Link>
            </div>
            <div className="nav-group">
              <div className="nav-group-label">Mes machines virtuelles</div>
              <Link href="/dashboard/mes-vms" className={`nav-item ${pathname === '/dashboard/mes-vms' ? 'active' : ''}`}><Icon name="vms" /> Mes VMs
                <span style={{ marginLeft: 'auto', background: 'rgba(37,99,235,.25)', color: '#93C5FD', fontSize: '9px', fontWeight: '700', padding: '1px 6px', borderRadius: '10px' }}>{vms.length}</span>
              </Link>
              <div className="nav-vm-list">
                {vms.map(vm => (
                  <Link href={`/dashboard/mes-vms/${vm.id}`} key={vm.id} style={{ textDecoration: 'none' }}>
                    <div className={`vm-tree-item ${pathname === `/dashboard/mes-vms/${vm.id}` ? 'active' : ''}`}>
                      <div className={`vm-dot ${vm.status}`}></div>{vm.name}
                    </div>
                  </Link>
                ))}
                <div className="vm-tree-item" style={{ color: 'var(--g1-accent2)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>
                  <Icon name="start" size={14} strokeWidth={2.5} style={{ transform: 'rotate(90deg)' }} />
                  Créer une VM
                </div>
              </div>
            </div>
            <div className="nav-group">
              <div className="nav-group-label">Gestion</div>
              <Link href="/dashboard/reservations" className={`nav-item ${pathname === '/dashboard/reservations' ? 'active' : ''}`}><Icon name="reservations" /> Réservations</Link>
              <Link href="/dashboard/ssh" className={`nav-item ${pathname === '/dashboard/ssh' ? 'active' : ''}`}><Icon name="ssh" /> Clés SSH</Link>
            </div>
            <div className="nav-group">
              <div className="nav-group-label">Compte</div>
              <Link href="/dashboard/profil" className="nav-item"><Icon name="user" /> Mon Profil</Link>
            </div>
          </div>
          <div className="sidebar-footer">
            <div className="user-row" title="Voir mon profil" onClick={() => router.push('/dashboard/profil')}>
              <div className="user-av">{`${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase() || '??'}</div>
              <div style={{ minWidth: '0', flex: '1' }}>
                <div className="user-name">{user?.first_name} {user?.last_name || 'Utilisateur'}</div>
                <div className="user-role">{user?.role?.toUpperCase()}</div>
              </div>
              <div className="user-row-chevron"><Icon name="chevronRight" size={16} /></div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <Icon name="logout" size={16} />
              Déconnexion
            </button>
          </div>

        </div>
        <div className="main">
          <div className="topbar">

            <SearchComponent vms={vms} router={router} />
            <div className="topbar-right">
              <button 
                onClick={toggleTheme} 
                className="btn-ghost" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', padding: '0', borderRadius: '50%' }}
                title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>
              <div className="status-pill"><div className="status-dot"></div>Cluster en ligne</div>
              <button className="btn-ghost" onClick={() => (window as any).open('https://horizon.enspy.cm/help')}>Aide</button>
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <VMProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </VMProvider>
  )
}
