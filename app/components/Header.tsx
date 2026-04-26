"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('Accueil');
    } else if (pathname === '/cgu') {
      setActiveTab('À propos');
    } else if (pathname === '/demande_compte') {
      setActiveTab('Demande d\'accès');
    } else if (pathname === '/connexion') {
      setActiveTab('Connexion');
    }
  }, [pathname]);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Fonctionnalités', href: '/#features' },
    { name: 'Comment ça marche', href: '/#how' }
  ];

  return (
    <nav>
      <div className="nav-brand">
        <div className="nav-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="8" height="8" rx="1"/>
            <rect x="14" y="3" width="8" height="8" rx="1"/>
            <rect x="2" y="13" width="8" height="8" rx="1"/>
            <rect x="14" y="13" width="8" height="8" rx="1"/>
          </svg>
        </div>
        <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setActiveTab('Accueil')}>
          <div className="nav-name">HORIZON</div>
        </Link>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              href={item.href} 
              className={activeTab === item.name ? 'nav-active' : ''}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/cgu" className={activeTab === 'À propos' ? 'nav-active' : ''} onClick={() => setActiveTab('À propos')}>
            À propos
          </Link>
        </li>
      </ul>

      <div className="nav-cta">
        <button 
          onClick={toggleTheme} 
          className="btn-ghost-sm" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', padding: '0', marginRight: '10px', borderRadius: '50%' }}
          title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        <Link href="/demande_compte" className={`btn-ghost-sm ${activeTab === 'Demande d\'accès' ? 'nav-active-btn' : ''}`} onClick={() => setActiveTab('Demande d\'accès')}>Demande d'accès</Link>
        <Link href="/connexion" className={`btn-primary-sm ${activeTab === 'Connexion' ? 'nav-active-btn' : ''}`} onClick={() => setActiveTab('Connexion')}>Connexion</Link>
      </div>
    </nav>
  );
};

export default Header;
