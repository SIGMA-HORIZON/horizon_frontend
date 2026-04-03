
import './home.css';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="home-theme">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
      


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
    <div className="nav-name">HORIZON <span>· SIGMA</span></div>
  </div>

  <ul className="nav-links">
    <li><a href="#features">Fonctionnalités</a></li>
    <li><a href="#how">Comment ça marche</a></li>
    <li><a href="#about">À propos</a></li>
  </ul>

  <div className="nav-cta">
    <a href="/demande_compte" className="btn-ghost-sm">Demander un accès</a>
    <a href="/connexion" className="btn-primary-sm">Se connecter</a>
  </div>
</nav>



<section className="hero">
  <div className="scan-line" style={{ top: '65%' }}></div>

  <div className="hero-inner">
    <div className="hero-badge">
      <span className="badge-dot"></span>
      Cluster Grid-One · ENSPY · Opérationnel
    </div>

    <h1>
      Infrastructure<br/>
      de calcul <span className="accent">académique</span>
    </h1>

    <div className="hero-sub-title">Projet Sigma Horizon</div>

    <p>
      Horizon donne aux étudiants et chercheurs de l'ENSPY un accès autonome
      aux ressources du cluster Grid-One — machines virtuelles, GPU, stockage —
      sans intervention administrative à chaque demande.
    </p>

    <div className="hero-actions">
      <a href="/demande_compte" className="btn-hero-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
        Demander un accès
      </a>
      <a href="#features" className="btn-hero-ghost">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>
        En savoir plus
      </a>
    </div>
  </div>

  <div className="scroll-hint">
    <div className="scroll-mouse"></div>
    Défiler
  </div>
</section>



<section className="stats-section">
  <div className="stats-bar">
    <div className="stat-item">
      <div className="stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      </div>
      <div className="stat-num">12<span>+</span></div>
      <div className="stat-label">Machines virtuelles</div>
    </div>
    <div className="stat-item">
      <div className="stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
      </div>
      <div className="stat-num">4<span>×</span></div>
      <div className="stat-label">GPU disponibles</div>
    </div>
    <div className="stat-item">
      <div className="stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      </div>
      <div className="stat-num">10<span>To</span></div>
      <div className="stat-label">Stockage partagé</div>
    </div>
    <div className="stat-item">
      <div className="stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div className="stat-num">60<span>+</span></div>
      <div className="stat-label">Utilisateurs actifs</div>
    </div>
  </div>
</section>



<section className="features-section" id="features">
  <div className="section-header">
    <div className="section-tag">Fonctionnalités</div>
    <h2>Tout ce dont vous avez besoin<br/>pour vos projets de calcul</h2>
    <p>Une plateforme complète pensée pour les besoins académiques : TP, recherche, simulation, deep learning.</p>
  </div>

  <div className="features-grid">
    <div className="feature-card">
      <div className="feat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      </div>
      <h3>Machines Virtuelles Linux</h3>
      <p>Ubuntu, Debian, Fedora, CentOS — provisionnées en quelques minutes avec accès console web ou SSH via clé publique.</p>
    </div>

    <div className="feature-card">
      <div className="feat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
      </div>
      <h3>Accès GPU</h3>
      <p>Passthrough NVIDIA A100 pour vos entraînements de modèles deep learning, simulations physiques et calculs intensifs.</p>
    </div>

    <div className="feature-card">
      <div className="feat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h3>Accès SSH sécurisé</h3>
      <p>Injection automatique de vos clés publiques via cloud-init. Connexion directe depuis votre terminal, sans configuration manuelle.</p>
    </div>

    <div className="feature-card">
      <div className="feat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <h3>Gestion par quotas</h3>
      <p>Durées de session contrôlées, snapshots automatiques, sauvegardes quotidiennes. Les ressources sont libérées à expiration.</p>
    </div>

    <div className="feature-card">
      <div className="feat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      </div>
      <h3>Stockage temporaire</h3>
      <p>Volume NFS partagé par VM pour vos datasets et résultats. Isolé par projet, accessible depuis toutes vos instances.</p>
    </div>

    <div className="feature-card">
      <div className="feat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      </div>
      <h3>Interface de gestion</h3>
      <p>Dashboard personnel : démarrer, arrêter, redémarrer vos VMs, consulter les métriques CPU/RAM/disque en temps réel.</p>
    </div>
  </div>
</section>



<section className="how-section" id="how">
  <div className="how-inner">

    <div className="how-visual">
      <div className="how-glow"></div>
      <div className="how-terminal">
        <div className="terminal-bar">
          <div className="t-dot r"></div>
          <div className="t-dot y"></div>
          <div className="t-dot g"></div>
          <div className="terminal-title">horizon-ssh · vm-ml-ornella-01</div>
        </div>
        <div className="terminal-body">
          <div><span className="t-prompt">ornella@horizon</span><span className="t-out">:~$ </span><span className="t-cmd">ssh vm-ml-ornella-01</span></div>
          <div className="t-out">Connecting to 10.0.1.1 via Grid-One gateway…</div>
          <div className="t-ok">✓ Authenticated · ed25519 key</div>
          <br/>
          <div><span className="t-prompt">ornella@vm-ml-01</span><span className="t-out">:~$ </span><span className="t-cmd">nvidia-smi</span></div>
          <div className="t-out">GPU 0: NVIDIA A100 · 80GB</div>
          <div className="t-out">Temp: 34°C · Util: 0% · Mem: 0/81920 MiB</div>
          <br/>
          <div><span className="t-prompt">ornella@vm-ml-01</span><span className="t-out">:~$ </span><span className="t-cmd">python3 train.py --epochs 100</span></div>
          <div className="t-ok">Epoch  1/100 · loss=2.4312 · acc=0.1842</div>
          <div className="t-ok">Epoch  2/100 · loss=1.9871 · acc=0.3214</div>
          <div className="t-warn">Epoch  3/100 · loss=1.5504 · acc=0.4771</div>
          <div><span className="t-prompt">ornella@vm-ml-01</span><span className="t-out">:~$ </span><span className="cursor-blink"></span></div>
        </div>
      </div>
    </div>

    <div className="how-content">
      <div className="section-tag">Comment ça marche</div>
      <h2>De la demande<br/>à la session en moins de 24h</h2>
      <p>Le processus est simple et entièrement géré par la plateforme. Votre rôle se limite à soumettre votre demande et décrire votre usage.</p>

      <div className="steps">
        <div className="step-item">
          <div className="step-num">01</div>
          <div className="step-text">
            <h4>Soumettez votre demande</h4>
            <p>Remplissez le formulaire de création de compte avec votre profil académique et votre justification d'usage.</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-num">02</div>
          <div className="step-text">
            <h4>Validation par l'équipe SIGMA</h4>
            <p>Un administrateur examine votre demande et crée votre compte. Vous recevez vos identifiants sous 24 heures.</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-num">03</div>
          <div className="step-text">
            <h4>Réservez une VM</h4>
            <p>Connectez-vous au dashboard, choisissez vos ressources (vCPU, RAM, GPU, OS) et soumettez une réservation.</p>
          </div>
        </div>
        <div className="step-item">
          <div className="step-num">04</div>
          <div className="step-text">
            <h4>Travaillez sans contrainte</h4>
            <p>Votre VM est provisionnée automatiquement. Connectez-vous en SSH, lancez vos jobs, consultez vos métriques.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>



<section className="cta-section" id="about">
  <div className="cta-card">
    <div className="cta-glyph">SIGMA</div>

    <div className="hero-badge" style={{ marginBottom: '24px' }}>
      <span className="badge-dot"></span>
      Accès sur demande · ENSPY
    </div>

    <h2>Prêt à rejoindre<br/><span>Horizon</span> ?</h2>
    <p>Soumettez votre demande de compte dès aujourd'hui. L'équipe SIGMA traitera votre accès et vous enverra vos identifiants par e-mail institutionnel.</p>

    <div className="cta-actions">
      <a href="/demande_compte" className="btn-hero-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Faire une demande
      </a>
      <a href="/connexion" className="btn-hero-ghost">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Se connecter
      </a>
    </div>

    <div className="cta-note">Équipe SIGMA · Projet Grid-One · ENSPY 2024–2025</div>
  </div>
</section>



<footer>
  <div className="footer-brand">
    <div className="footer-logo">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="8" height="8" rx="1"/>
        <rect x="14" y="3" width="8" height="8" rx="1"/>
        <rect x="2" y="13" width="8" height="8" rx="1"/>
        <rect x="14" y="13" width="8" height="8" rx="1"/>
      </svg>
    </div>
    <div className="footer-name">HORIZON</div>
  </div>
  <div className="footer-right">© 2025 Équipe SIGMA · ENSPY · Tous droits réservés</div>
</footer>


    </div>
  );
}
