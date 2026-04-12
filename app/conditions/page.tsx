"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './conditions.css';

export default function ConditionsUtilisation() {
    const [activeSection, setActiveSection] = useState('intro');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    const sectionsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docH > 0 ? (scrollTop / docH) * 100 : 0);

            let current = 'intro';
            const sections = document.querySelectorAll('section[id], .hero[id]');
            sections.forEach((s) => {
                const rect = s.getBoundingClientRect();
                if (rect.top <= 100) {
                    current = s.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="conditions-body">
            {/* ══ PROGRESS BAR ══ */}
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* ══ TOPBAR ══ */}
            <header className="topbar">
                <Link href="/connexion" className="tb-brand">
                    <div className="tb-logo">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="8" height="8" rx="1" /><rect x="14" y="3" width="8" height="8" rx="1" />
                            <rect x="2" y="13" width="8" height="8" rx="1" /><rect x="14" y="13" width="8" height="8" rx="1" />
                        </svg>
                    </div>
                    <span className="tb-name">HORIZON</span>
                </Link>

                <nav className="tb-tabs">
                    <Link className="tb-tab" href="/">Accueil</Link>
                    <Link className="tb-tab" href="/demande_compte">Demande d'accès</Link>
                    <Link className="tb-tab active" href="/conditions">Conditions d'utilisation</Link>
                    <Link className="tb-tab" href="/connexion">Connexion</Link>
                </nav>

                <div className="tb-spacer"></div>

                <button onClick={() => window.history.back()} className="tb-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                    Retour
                </button>
            </header>

            {/* ══ PAGE WRAP ══ */}
            <div className="page-wrap">

                {/* ══ SIDEBAR ══ */}
                <aside className="sidebar">
                    <div className="sb-header">
                        <div className="sb-header-top">
                            <div className="sb-header-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                            </div>
                            <span className="sb-title">Conditions d'utilisation</span>
                        </div>
                    </div>

                    <div className="sb-section">
                        <button className={`sb-section-toggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                            Les conditions d'utilisation
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                        </button>
                        <div className={`sb-links ${isSidebarOpen ? '' : 'collapsed'}`}>
                            {[
                                { id: 'intro', label: 'Introduction' },
                                { id: 'objet', label: "Objet et champ d'application" },
                                { id: 'acces', label: 'Accès à la plateforme' },
                                { id: 'usages', label: 'Usages autorisés et interdits' },
                                { id: 'ressources', label: 'Ressources et quotas' },
                                { id: 'securite', label: 'Sécurité et authentification' },
                                { id: 'donnees', label: 'Données personnelles' },
                                { id: 'obligations', label: "Obligations de l'utilisateur" },
                                { id: 'sanctions', label: 'Sanctions et suspension' },
                                { id: 'responsabilites', label: 'Responsabilités' },
                                { id: 'modifications', label: 'Modifications des conditions' },
                                { id: 'contact', label: 'Contact et réclamations' }
                            ].map((link) => (
                                <a
                                    key={link.id}
                                    className={`sb-link ${activeSection === link.id ? 'active' : ''}`}
                                    href={`#${link.id}`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="sb-footer">
                        <div>Version 1.0 — Avril 2025<br />Équipe SIGMA · ENSPY</div>
                        <Link href="/demande_compte">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            Demander un accès
                        </Link>
                    </div>
                </aside>

                {/* ══ MAIN CONTENT ══ */}
                <main className="main-content">

                    {/* ── INTRO ── */}
                    <div className="hero" id="intro">
                        <div className="hero-badge"><span className="badge-pulse"></span>Document officiel</div>
                        <h1>Conditions d'utilisation<br />de la plateforme Horizon</h1>
                        <p className="hero-lead">
                            Ces conditions régissent l'utilisation de <strong>Horizon</strong>, système de gestion de machines virtuelles du cluster Grid-One, développé par l'équipe SIGMA à l'ENSPY. En accédant à la plateforme ou en soumettant une <Link href="/demande_compte">demande de compte</Link>, vous acceptez l'intégralité des présentes conditions.
                        </p>
                        <div className="meta-chips">
                            <div className="meta-chip">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                Entrée en vigueur : Avril 2025
                            </div>
                            <div className="meta-chip">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                                Équipe SIGMA — ENSPY
                            </div>
                            <div className="meta-chip">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                Cluster Grid-One
                            </div>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════ Object et champ d'application ═══════════════════════════════════ */}
                    <section className="section" id="objet">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            Objet et champ d'application
                        </h2>
                        <p className="body-text"><strong>Horizon</strong> est un système de gestion de machines virtuelles (VMs) développé par l'équipe SIGMA dans le cadre du projet académique <strong>Grid-One</strong> à l'ENSPY. Elle donne accès aux ressources de calcul partagées du cluster composé des nœuds REM, RAM et EMILIA.</p>
                        <p className="body-text">Les présentes conditions s'appliquent à toute personne qui soumet une <Link href="/demande_compte">demande d'accès</Link>, crée un compte ou utilise les services de la plateforme Horizon.</p>
                        <div className="alert alert-info">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            <span>L'utilisation de la plateforme est strictement réservée à des fins <strong>académiques et de recherche</strong>. Consultez les <a href="#usages">usages autorisés et interdits</a> pour plus de détails.</span>
                        </div>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Accès à la plateforme ═══════════════════════════════════ */}
                    <section className="section" id="acces">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            Accès à la plateforme
                        </h2>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            Processus de demande
                        </div>
                        <p className="body-text">L'accès à Horizon est conditionné à la validation préalable d'une <Link href="/demande_compte">demande de création de compte</Link> par un administrateur. Aucune auto-inscription n'est permise.</p>
                        <ul className="doc-list">
                            <li>L'utilisateur soumet un formulaire de demande comprenant ses informations personnelles, son affiliation institutionnelle et une justification d'usage.</li>
                            <li>Un administrateur examine la demande et peut l'approuver ou la rejeter sans obligation de motivation.</li>
                            <li>En cas d'approbation, des identifiants provisoires sont transmis à l'adresse fournie.</li>
                            <li>L'utilisateur est tenu de modifier son mot de passe provisoire dès la première connexion, conformément à la <a href="#securite">politique de sécurité</a>.</li>
                        </ul>
                        <div className="sub-divider"></div>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            Révocation de l'accès
                        </div>
                        <p className="body-text">L'accès peut être révoqué à tout moment par un administrateur, notamment en cas de violation des présentes conditions (voir <a href="#sanctions">sanctions</a>) ou d'inactivité prolongée (voir <a href="#sanctions">gestion du cycle de vie du compte</a>).</p>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Usages autorisés et interdits ═══════════════════════════════════ */}
                    <section className="section" id="usages">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" /></svg>
                            Usages autorisés et interdits
                        </h2>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            Usages autorisés
                        </div>
                        <ul className="doc-list">
                            <li>Travaux pratiques, simulations et expériences dans le cadre de cours universitaires.</li>
                            <li>Projets de recherche académique, thèses, mémoires de master ou de doctorat.</li>
                            <li>Développement et test de logiciels à des fins éducatives ou de recherche.</li>
                            <li>Traitement de données dans le cadre de projets approuvés par l'institution, dans le respect de la <a href="#donnees">politique de confidentialité</a>.</li>
                        </ul>
                        <div className="sub-divider"></div>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            Usages strictement interdits
                        </div>
                        <div className="alert alert-danger">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                            <span>Tout manquement à ces interdictions entraîne des <a href="#sanctions">sanctions immédiates</a>, pouvant aller jusqu'à la suspension définitive du compte.</span>
                        </div>
                        <ul className="doc-list">
                            <li><strong>Minage de cryptomonnaies</strong> — toute exploitation des ressources GPU/CPU à cette fin est interdite.</li>
                            <li><strong>Activités commerciales</strong> — utilisation générant des revenus personnels directs ou indirects.</li>
                            <li><strong>Stockage ou distribution de contenus illégaux</strong> — y compris les logiciels piratés et tout contenu contrevenant à la législation.</li>
                            <li><strong>Attaques réseau</strong> — port scanning, exploitation de vulnérabilités, tentatives d'intrusion depuis une VM.</li>
                            <li><strong>Partage des identifiants</strong> — il est interdit de transmettre ses accès à un tiers. Voir <a href="#securite">politique de sécurité</a>.</li>
                            <li><strong>Modification de l'infrastructure physique</strong> — tout accès aux paramètres BIOS, BMC ou firmware est réservé aux super-administrateurs.</li>
                            <li><strong>Contournement des mécanismes de journalisation</strong> — désactiver ou altérer les logs constitue une violation grave.</li>
                            <li><strong>Accès aux VMs d'autres utilisateurs</strong> — chaque VM appartient exclusivement à son créateur. Voir <a href="#obligations">obligations de l'utilisateur</a>.</li>
                        </ul>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Ressources et quotas ═══════════════════════════════════ */}
                    <section className="section" id="ressources">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
                            Ressources et quotas
                        </h2>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></svg>
                            Quotas par défaut
                        </div>
                        <p className="body-text">L'utilisation des ressources est encadrée par des quotas définis par les administrateurs. Ces valeurs peuvent être ajustées sur demande justifiée.</p>
                        <table className="quota-table">
                            <thead>
                                <tr><th>Ressource</th><th>Valeur par défaut</th><th>Maximum autorisé</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>CPU (vCores) par VM</td><td>2 vCores</td><td>8 vCores</td></tr>
                                <tr><td>RAM par VM</td><td>2 Go</td><td>16 Go</td></tr>
                                <tr><td>Stockage (ROM) par VM</td><td>20 Go</td><td>100 Go</td></tr>
                                <tr><td>VMs simultanées</td><td>2 VMs</td><td>5 VMs</td></tr>
                                <tr><td>Durée de session par VM</td><td>8 heures</td><td>72 heures</td></tr>
                                <tr><td>Espace de partage par VM</td><td>5 Go</td><td>20 Go</td></tr>
                            </tbody>
                        </table>
                        <div className="sub-divider"></div>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            Gestion du temps et nettoyage automatique
                        </div>
                        <ul className="doc-list">
                            <li>Toute VM inactive depuis plus de <strong>2 heures</strong> (aucune activité CPU ou réseau) déclenche une alerte e-mail.</li>
                            <li>Une VM arrêtée depuis plus de <strong>7 jours</strong> est supprimée automatiquement. Les données de l'espace de partage sont conservées <strong>24h</strong> supplémentaires avant purge définitive.</li>
                            <li>L'utilisateur est <strong>responsable d'arrêter ses VMs</strong> dès qu'elles ne sont plus utilisées.</li>
                        </ul>
                        <div className="alert alert-warn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                            <span>Horizon est une infrastructure partagée. Le non-respect des quotas impacte tous les utilisateurs. Des <a href="#sanctions">sanctions progressives</a> sont appliquées en cas de manquement répété.</span>
                        </div>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Sécurité et authentification ═══════════════════════════════════ */}
                    <section className="section" id="securite">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            Sécurité et authentification
                        </h2>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            Responsabilité des identifiants
                        </div>
                        <p className="body-text">L'utilisateur est seul responsable de la confidentialité de ses identifiants. Toute utilisation du compte sous son identité lui est imputable, sauf preuve de compromission signalée dans les meilleurs délais (voir <a href="#contact">contact</a>).</p>
                        <div className="sub-divider"></div>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            Exigences du mot de passe
                        </div>
                        <ul className="doc-list">
                            <li>Le mot de passe doit contenir au moins <strong>10 caractères</strong>, une majuscule, un chiffre et un caractère spécial.</li>
                            <li>Après <strong>5 tentatives échouées</strong>, le compte est temporairement verrouillé (15 minutes). Après 10 échecs cumulés, un administrateur est alerté.</li>
                            <li>Le mot de passe provisoire doit être changé dès la première connexion, conformément à la procédure décrite à la section <a href="#acces">Accès à la plateforme</a>.</li>
                        </ul>
                        <div className="sub-divider"></div>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                            Journalisation des activités
                        </div>
                        <p className="body-text">Les actions suivantes sont enregistrées et conservées <strong>90 jours</strong>, accessibles uniquement aux administrateurs :</p>
                        <ul className="doc-list">
                            <li>Connexions et déconnexions (succès et échecs).</li>
                            <li>Création, modification, suppression et arrêt de VMs.</li>
                            <li>Téléchargements depuis l'espace de partage.</li>
                            <li>Connexions SSH aux VMs (IP source, horodatage, durée).</li>
                            <li>Actions administratives (création de comptes, modification de quotas).</li>
                            <li>Toute tentative d'accès non autorisé.</li>
                        </ul>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Données personnelles ═══════════════════════════════════ */}
                    <section className="section" id="donnees">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            Données personnelles et confidentialité
                        </h2>
                        <p className="body-text">Les données personnelles collectées (nom, prénom, e-mail, affiliation, journaux de connexion) sont utilisées exclusivement pour la gestion des comptes et la sécurité de la plateforme. Elles ne sont ni vendues, ni partagées avec des tiers sans consentement explicite.</p>
                        <ul className="doc-list">
                            <li>Les données personnelles sont accessibles uniquement aux administrateurs.</li>
                            <li>Les <a href="#securite">journaux d'activité</a> sont conservés pendant <strong>90 jours</strong>.</li>
                            <li>Les données stockées dans l'espace de partage sont purgées <strong>24h après l'arrêt de la VM</strong>.</li>
                            <li>L'utilisateur peut demander la rectification ou la suppression de ses données en <a href="#contact">contactant l'équipe Horizon</a>.</li>
                        </ul>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Obligations de l'utilisateur ═══════════════════════════════════ */}
                    <section className="section" id="obligations">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            Obligations de l'utilisateur
                        </h2>
                        <p className="body-text">En utilisant la plateforme Horizon, l'utilisateur s'engage à :</p>
                        <ul className="doc-list">
                            <li>Utiliser les ressources uniquement dans le cadre défini dans sa demande d'accès approuvée (voir <a href="#usages">usages autorisés</a>).</li>
                            <li>Arrêter ses machines virtuelles dès qu'elles ne sont plus nécessaires (voir <a href="#ressources">gestion du temps</a>).</li>
                            <li>Ne pas tenter d'accéder aux VMs d'autres utilisateurs ni à l'infrastructure Proxmox sous-jacente (voir <a href="#usages">usages interdits</a>).</li>
                            <li>Signaler immédiatement tout incident de sécurité ou suspicion de compromission de son compte à l'équipe Horizon.</li>
                            <li>Respecter les licences des systèmes d'exploitation et logiciels déployés sur ses VMs.</li>
                            <li>Ne pas stocker de données personnelles de tiers sur les espaces de stockage partagés (voir <a href="#donnees">politique de données</a>).</li>
                            <li>Informer l'équipe Horizon de tout changement significatif dans son affiliation ou son usage prévu.</li>
                        </ul>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Sanctions et suspension ═══════════════════════════════════ */}
                    <section className="section" id="sanctions">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            Sanctions et suspension de compte
                        </h2>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
                            Sanctions progressives
                        </div>
                        <p className="body-text">Tout manquement aux présentes conditions entraîne des sanctions proportionnées à la gravité de la violation :</p>
                        <div className="sanction-cards">
                            <div className="sanction-card">
                                <div className="s-level level-1">Niveau 1<br />(Avert.)</div>
                                <div className="s-col">Quota mineur dépassé, VM laissée active inutilement</div>
                                <div className="s-col">Avertissement automatique par e-mail</div>
                            </div>
                            <div className="sanction-card">
                                <div className="s-level level-2">Niveau 2<br />(Suspens.)</div>
                                <div className="s-col">Violation répétée, tentative d'accès non autorisé</div>
                                <div className="s-col">Suspension temporaire (24h) + alerte administrateur</div>
                            </div>
                            <div className="sanction-card">
                                <div className="s-level level-3">Niveau 3<br />(Excl.)</div>
                                <div className="s-col">Incident de sécurité, usage frauduleux (voir <a href="#usages">usages interdits</a>)</div>
                                <div className="s-col">Suspension immédiate + investigation + possible suppression définitive</div>
                            </div>
                        </div>
                        <div className="sub-divider"></div>
                        <div className="sub-heading">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            Cycle de vie du compte
                        </div>
                        <ul className="doc-list">
                            <li>Compte inactif depuis <strong>90 jours</strong> : suspension automatique après avertissement (7 jours avant).</li>
                            <li>Compte suspendu depuis <strong>30 jours</strong> sans réactivation : suppression définitive entraînant la suppression de toutes les VMs et données associées.</li>
                        </ul>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Responsabilités ═══════════════════════════════════ */}
                    <section className="section" id="responsabilites">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            Responsabilités
                        </h2>
                        <p className="body-text">L'équipe Horizon s'engage à maintenir une disponibilité de la plateforme d'au moins <strong>99%</strong> en dehors des fenêtres de maintenance planifiées. Cependant, elle ne saurait être tenue responsable de :</p>
                        <ul className="doc-list">
                            <li>Pertes de données résultant de l'expiration ou de la suppression automatique d'une VM (voir <a href="#ressources">nettoyage automatique</a>).</li>
                            <li>Interruptions de service liées à des maintenances planifiées ou à des incidents matériels.</li>
                            <li>Dommages résultant d'une utilisation non conforme aux présentes conditions.</li>
                        </ul>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Modifications ═══════════════════════════════════ */}
                    <section className="section" id="modifications">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            Modifications des conditions
                        </h2>
                        <p className="body-text">L'équipe Horizon se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés de toute modification significative par e-mail au moins <strong>7 jours</strong> avant son entrée en vigueur.</p>
                        <div className="section-end"></div>
                    </section>

                    {/* ═══════════════════════════════════ Contact ═══════════════════════════════════ */}
                    <section className="section" id="contact">
                        <h2 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            Contact et réclamations
                        </h2>
                        <p className="body-text">Pour toute question relative aux présentes conditions, toute demande de rectification de données, toute demande de recours ou tout signalement d'incident de sécurité, vous pouvez contacter l'équipe Horizon via le Département Informatique de l'ENSPY.</p>
                        <div className="section-end"></div>
                    </section>

                    {/* ── ACCEPT FOOTER ── */}
                    <div className="accept-footer">
                        <h2>Prêt à rejoindre la plateforme ?</h2>
                        <p>En retournant au formulaire et en cochant la case correspondante, vous confirmez avoir lu et accepté l'intégralité de ces conditions.</p>
                        <Link href="/demande_compte" className="btn-primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            Faire une demande d'accès
                        </Link>
                        <Link href="/connexion" className="btn-ghost">Déjà un compte ? Se connecter</Link>
                    </div>

                </main>
            </div>
        </div>
    );
}
