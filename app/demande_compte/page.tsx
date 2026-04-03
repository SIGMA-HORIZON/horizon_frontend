"use client";

import React from 'react';
import '../home.css';
import './demande.css';
import Link from 'next/link';

export default function DemandeCompte() {
  return (
    <div className="home-theme">
      <div className="request-container" style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div className="request-card" style={{ maxWidth: '800px', width: '100%' }}>
          
          <div className="badge-request" style={{ marginBottom: '16px' }}>
            <span className="badge-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}></span>
            DEMANDE DE COMPTE
          </div>

          <h1 className="request-title" style={{ fontSize: '28px' }}>Horizon Sigma : Demande de création</h1>
          <p className="request-desc">
            Veuillez remplir ce formulaire avec le maximum de détails pour nous aider à évaluer votre demande d'admission.
          </p>

          <div className="request-alert" style={{ background: 'rgba(37,99,235,0.1)', borderColor: 'rgba(37,99,235,0.3)' }}>
            <svg className="form-icon" style={{ flexShrink: 0, color: '#93C5FD' }} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div style={{ color: '#E2E8F0', fontSize: '14px' }}>
              <strong>Remarque :</strong> Les champs marqués d'un <span style={{ color: '#EF4444' }}>*</span> sont obligatoires.
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* =============== INFORMATIONS PERSONNELLES =============== */}
            <div className="divider">INFORMATIONS PERSONNELLES</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">PRÉNOM <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" placeholder="Sans accents" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">NOM <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" placeholder="Sans accents" required />
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">E-MAIL INSTITUTIONNEL <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="email" className="form-input" placeholder="" required />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                  Veuillez fournir une adresse e-mail professionnelle/institutionnelle. Fournir des comptes Gmail, Yahoo ou Hotmail limite les probabilités d'approbation.
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">E-MAIL (VÉRIFICATION) <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="email" className="form-input" placeholder="" required />
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">NUMÉRO DE TÉLÉPHONE</label>
                <div className="input-wrapper">
                  <input type="tel" className="form-input" placeholder="" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">LANGUE PRÉFÉRÉE</label>
                <div className="input-wrapper">
                  <select className="form-select" defaultValue="French">
                    <option value="French">Français</option>
                    <option value="English">Anglais</option>
                  </select>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                  Sera utilisé par l'équipe technique pour vous contacter directement.
                </div>
              </div>
            </div>


            {/* =============== AFFILIATION INSTITUTIONNELLE =============== */}
            <div className="divider">AFFILIATION INSTITUTIONNELLE</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Si vous avez plusieurs affiliations, veuillez séparer les entités par des virgules (,).
            </div>

            <div className="form-group">
              <label className="form-label">EMPLOYEUR</label>
              <div className="input-wrapper">
                <input type="text" className="form-input" placeholder="" />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                Le nom de l'entité qui vous verse votre salaire. Exemples : ENSPY, Université de Douala, CNRS, Google, etc.
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">STATUT PROFESSIONNEL <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <select className="form-select" required defaultValue="">
                    <option value="" disabled></option>
                    <option value="student">Étudiant</option>
                    <option value="researcher">Chercheur</option>
                    <option value="engineer">Ingénieur</option>
                    <option value="professor">Enseignant</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">PAYS <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" placeholder="Ex. : Cameroun, France..." required />
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">CENTRE DE RECHERCHE PARTENAIRE <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <select className="form-select" required defaultValue="not_affiliated">
                    <option value="not_affiliated">Non affilié</option>
                    <option value="inria">Inria</option>
                    <option value="citi">CITI Lab</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">LABORATOIRE <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" placeholder="Ex. : UMMISCO, IRISA..." required />
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">ÉQUIPE <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" placeholder="Ex. : MYRIADS" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">PROJET</label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" placeholder="Nom du projet impliqué..." />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">URL DE L'EMPLOYEUR</label>
              <div className="input-wrapper">
                <input type="url" className="form-input" placeholder="URL vers la page institutionnelle publique du labo/projet" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">JUSTIFICATION D'USAGE <span style={{ color: '#EF4444' }}>*</span></label>
              <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                <textarea className="form-textarea" rows={4} placeholder="Décrivez brièvement les ressources désirées et le but visé sur le cluster..." required></textarea>
              </div>
            </div>


            {/* =============== IDENTIFIANTS =============== */}
            <div className="divider">IDENTIFIANTS ET SÉCURITÉ</div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">MOT DE PASSE <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="password" className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">MOT DE PASSE (VÉRIFICATION) <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="input-wrapper">
                  <input type="password" className="form-input" required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">CLÉ PUBLIQUE SSH <span style={{ color: '#EF4444' }}>*</span></label>
              <div className="input-wrapper" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                <textarea className="form-textarea" rows={4} style={{ fontFamily: 'monospace', fontSize: '12px' }} placeholder="ssh-ed25519 AAAA..."></textarea>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Collez le contenu de votre clé publique SSH dans le champ ci-dessus, ou bien sélectionnez votre fichier public en utilisant le bouton Parcourir. (~/.ssh/id_ed25519.pub)
              </div>
              <div style={{ marginTop: '8px' }}>
                <input type="file" style={{ fontSize: '12px', color: 'var(--text-muted)' }} />
              </div>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <input type="checkbox" id="no_ssh" style={{ marginTop: '3px' }} />
                <label htmlFor="no_ssh" style={{ fontSize: '13px', color: 'var(--text-white)' }}>
                  <strong>Pas de clé publique SSH</strong><br/>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>Cochez si vous ne souhaitez pas la configurer maintenant. Vous pourrez la rajouter plus tard depuis le profil.</span>
                </label>
              </div>
            </div>


            {/* =============== VALIDATION =============== */}
            <div className="divider">VALIDATION D'INSCRIPTION</div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginTop: '16px' }}>
              <input type="checkbox" id="rules" style={{ marginTop: '4px' }} required />
              <label htmlFor="rules" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                J'accepte la <a href="#" style={{ color: 'var(--cyan)' }}>Charte d'Utilisation d'Horizon Sigma</a> ainsi que les <a href="#" style={{ color: 'var(--cyan)' }}>Conditions Générales d'Utilisation</a> qui justifient <a href="#" style={{ color: 'var(--cyan)' }}>le traitement de mes données personnelles</a> à des fins académiques.
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '20px' }}>
              <button type="submit" className="submit-btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
                Demander la création de mon compte
              </button>
            </div>

          </form>

          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            Vous avez déjà un compte ? <Link href="/connexion" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600 }}>Se connecter ici</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
