"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { authService } from '../services/auth.service';
import './demande.css';

export default function DemandeCompte() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    email_verif: '',
    telephone: '',
    langue: 'fr',
    institution: '',
    statut: '',
    projet_titre: '',
    justification: '',
    description: '',
    cgu: false
  });

  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email_verif && formData.email !== formData.email_verif) {
      alert('Les adresses e-mail ne correspondent pas.');
      return;
    }

    if (!formData.cgu) {
      alert('Vous devez accepter les conditions d\'utilisation pour continuer.');
      return;
    }

    if (formData.justification.length < 80) {
      alert('La justification doit comporter au moins 80 caractères.');
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.submitAccountRequest({
        first_name: formData.prenom,
        last_name: formData.nom,
        email: formData.email,
        organisation: formData.institution,
        justification: formData.justification
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Account request error:', err);
      alert(err.response?.data?.detail || 'Une erreur est survenue lors de la soumission de votre demande.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      prenom: '',
      nom: '',
      email: '',
      email_verif: '',
      telephone: '',
      langue: 'fr',
      institution: '',
      statut: '',
      projet_titre: '',
      justification: '',
      description: '',
      cgu: false
    });
    setFileName('');
    setIsSuccess(false);
  };

  return (
    <div className="demande-body">
      {/* TOPBAR */}
      <div className="topbar">
        <Link href="/connexion" className="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Retour
        </Link>
        <div className="top-brand">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="8" height="8" rx="1" /><rect x="14" y="3" width="8" height="8" rx="1" />
              <rect x="2" y="13" width="8" height="8" rx="1" /><rect x="14" y="13" width="8" height="8" rx="1" />
            </svg>
          </div>
          <span className="brand-name">HORIZON</span>
        </div>
        <div className="top-right"></div>
      </div>

      {/* PAGE */}
      <div className="page">
        <div className="form-wrap">
          <div className="card">

            {!isSuccess ? (
              <>
                <div className="badge"><span className="badge-dot"></span>Demande de compte</div>
                <div className="card-title">Horizon : Demande de création</div>
                <div className="card-sub">Veuillez remplir ce formulaire avec le maximum de détails pour nous aider à évaluer votre demande d'admission.</div>

                <div className="info-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  <div className="ib-text"><strong>Remarque :</strong> Les champs marqués d'un <span style={{ color: 'var(--cyan)' }}>*</span> sont obligatoires. Cet espace est réservé à un <a href="#" target="_blank" style={{ color: '#90CAF9', borderBottom: '1px solid rgba(144,202,249,0.35)', textDecoration: 'none' }}>usage strictement académique</a> — consultez les <Link href="/conditions" target="_blank" style={{ color: '#90CAF9', borderBottom: '1px solid rgba(144,202,249,0.35)', textDecoration: 'none' }}>conditions d'utilisation</Link> avant de soumettre.</div>
                </div>

                <div id="form-content">
                  <form onSubmit={handleSubmit} noValidate>

                    {/* ══ INFORMATIONS PERSONNELLES ══ */}
                    <div className="section-sep">
                      <div className="sep-line"></div>
                      <div className="sep-label">Informations personnelles</div>
                      <div className="sep-line"></div>
                    </div>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="prenom">Prénom <span className="req">*</span></label>
                        <div className="input-wrap">
                          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            placeholder="Sans accents"
                            required
                            value={formData.prenom}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="nom">Nom <span className="req">*</span></label>
                        <div className="input-wrap">
                          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          <input
                            type="text"
                            id="nom"
                            name="nom"
                            placeholder="Sans accents"
                            required
                            value={formData.nom}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="email">E-mail institutionnel <span className="req">*</span></label>
                        <div className="input-wrap">
                          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="prenom.nom@institution.cm"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="field-hint">Veuillez fournir une adresse e-mail institutionnelle ou professionnelle.</div>
                      </div>
                      <div className="field">
                        <label htmlFor="email-verif">E-mail (confirmation) <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--dim)', fontSize: '11px' }}>(facultatif)</span></label>
                        <div className="input-wrap">
                          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                          <input
                            type="email"
                            id="email-verif"
                            name="email_verif"
                            placeholder="Confirmez votre e-mail (optionnel)"
                            value={formData.email_verif}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="field-hint">Si renseigné, les deux adresses doivent correspondre.</div>
                      </div>
                    </div>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="telephone">Numéro de téléphone</label>
                        <div className="input-wrap">
                          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.5 6.5l.99-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                          <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            placeholder="+237 6XX XXX XXX"
                            value={formData.telephone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="field-hint">Sera utilisé par l'équipe technique pour vous contacter si nécessaire.</div>
                      </div>
                      <div className="field">
                        <label htmlFor="langue">Langue préférée</label>
                        <div className="input-wrap">
                          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                          <select
                            id="langue"
                            name="langue"
                            value={formData.langue}
                            onChange={handleInputChange}
                          >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                          </select>
                          <svg className="sel-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* ══ AFFILIATION INSTITUTIONNELLE ══ */}
                    <div className="section-sep">
                      <div className="sep-line"></div>
                      <div className="sep-label">Affiliation institutionnelle</div>
                      <div className="sep-line"></div>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px', lineHeight: 1.6 }}>Renseignez l'institution à laquelle vous êtes rattaché(e) pour l'utilisation de cette plateforme.</p>

                    <div className="field-full field">
                      <label htmlFor="institution">Nom de l'institution <span className="req">*</span></label>
                      <div className="input-wrap">
                        <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
                        <select
                          id="institution"
                          name="institution"
                          required
                          value={formData.institution}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Sélectionner une institution…</option>
                          <optgroup label="Cameroun">
                            <option>ENSPY — École Nationale Supérieure Polytechnique de Yaoundé</option>
                            <option>Université de Yaoundé I</option>
                            <option>Université de Yaoundé II</option>
                            <option>Université de Douala</option>
                            <option>Université de Buea</option>
                            <option>Université de Dschang</option>
                            <option>Université de Ngaoundéré</option>
                            <option>INSA Yaoundé</option>
                            <option>IRIC</option>
                          </optgroup>
                          <optgroup label="Organisations de recherche">
                            <option>IRD — Institut de Recherche pour le Développement</option>
                            <option>IMPM — Institut de Médecine et de Pharmacopée</option>
                            <option>IRAD — Institut de Recherche Agricole pour le Développement</option>
                          </optgroup>
                          <option value="autre">Autre (préciser dans la justification)</option>
                        </select>
                        <svg className="sel-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>

                    <div className="field-full field" style={{ marginBottom: '16px' }}>
                      <label htmlFor="statut">Statut professionnel <span className="req">*</span></label>
                      <div className="input-wrap">
                        <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                        <select
                          id="statut"
                          name="statut"
                          required
                          value={formData.statut}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Sélectionner votre statut…</option>
                          <optgroup label="Étudiant">
                            <option>Étudiant — Licence 1</option>
                            <option>Étudiant — Licence 2</option>
                            <option>Étudiant — Licence 3</option>
                            <option>Étudiant — Master 1</option>
                            <option>Étudiant — Master 2</option>
                            <option>Doctorant</option>
                            <option>Post-doctorant</option>
                          </optgroup>
                          <optgroup label="Personnel">
                            <option>Enseignant-chercheur</option>
                            <option>Chercheur (hors enseignement)</option>
                            <option>Personnel technique / Ingénieur</option>
                            <option>Personnel administratif</option>
                          </optgroup>
                        </select>
                        <svg className="sel-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>

                    {/* ══ PROJET / USAGE ══ */}
                    <div className="section-sep">
                      <div className="sep-line"></div>
                      <div className="sep-label">Projet &amp; usage demandé</div>
                      <div className="sep-line"></div>
                    </div>

                    <div className="field-full field">
                      <label htmlFor="projet-titre">Intitulé du projet <span className="req">*</span></label>
                      <div className="input-wrap">
                        <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        <input
                          type="text"
                          id="projet-titre"
                          name="projet_titre"
                          placeholder="Ex. : Simulation de réseaux de neurones pour la détection d'objets"
                          required
                          value={formData.projet_titre}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="field-full field">
                      <label htmlFor="justification">Justification d'usage <span className="req">*</span></label>
                      <div className="input-wrap">
                        <svg className="ico top" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                        <textarea
                          id="justification"
                          name="justification"
                          placeholder="Décrivez brièvement les ressources désirées et le but visé sur le cluster : type de calcul, OS requis, besoins en RAM/CPU, durée estimée…"
                          required
                          value={formData.justification}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="field-hint">Minimum 80 caractères. Plus la description est précise, plus votre demande a de chances d'être approuvée rapidement.</div>
                    </div>

                    <div className="field-full field">
                      <label htmlFor="description">Description détaillée du projet</label>
                      <div className="input-wrap">
                        <svg className="ico top" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="12" y1="17" x2="8" y2="17" /></svg>
                        <textarea
                          id="description"
                          name="description"
                          placeholder="Vous pouvez détailler ici les étapes du projet, la méthodologie, les données utilisées, etc."
                          value={formData.description}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>

                    {/* Upload document */}
                    <div className="field-full field">
                      <label>Document descriptif du projet <span style={{ color: 'var(--dim)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(facultatif)</span></label>
                      <label className="upload-zone" htmlFor="doc-upload" id="upload-label">
                        <input
                          type="file"
                          id="doc-upload"
                          name="document"
                          accept=".pdf,.doc,.docx,.txt"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <div className="upload-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        </div>
                        <div className="upload-title">Cliquez pour sélectionner un fichier</div>
                        <div className="upload-sub">PDF, DOC, DOCX — max 10 Mo</div>
                        {fileName && (
                          <div className="upload-name" style={{ display: 'block' }}>✓ {fileName}</div>
                        )}
                      </label>
                      <div className="field-hint">Un document de cadrage, une fiche de projet ou une description technique peut accélérer l'évaluation.</div>
                    </div>

                    {/* ══ CGU ══ */}
                    <div className="section-sep">
                      <div className="sep-line"></div>
                      <div className="sep-label">Conditions d'utilisation</div>
                      <div className="sep-line"></div>
                    </div>

                    <div className="academic-note">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                      <span>La plateforme <strong>Horizon</strong> est réservée à des activités académiques et de recherche. Tout usage à des fins commerciales ou non conformes entraîne la suspension immédiate du compte. Consultez les <Link href="/conditions#usages" target="_blank" style={{ color: '#FFD54F', borderBottom: '1px solid rgba(255,213,79,0.4)', textDecoration: 'none' }}>usages interdits</Link> dans les conditions d'utilisation.</span>
                    </div>

                    <div className="cgu-row">
                      <input
                        type="checkbox"
                        id="cgu"
                        name="cgu"
                        className="cgu-check"
                        required
                        checked={formData.cgu}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="cgu" className="cgu-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </label>
                      <label htmlFor="cgu" className="cgu-text">
                        J'ai lu et j'accepte les <Link href="/conditions" target="_blank">Conditions d'utilisation</Link> de la plateforme Horizon, notamment les <Link href="/conditions#usages" target="_blank">règles d'usage académique</Link>, les <Link href="/conditions#ressources" target="_blank">quotas de ressources</Link> et la <Link href="/conditions#donnees" target="_blank">politique de confidentialité</Link>.
                      </label>
                    </div>

                    <div className="divider">Soumettre la demande</div>

                    <button type="submit" className="btn-submit" id="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Envoi en cours…'
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                          Envoyer ma demande
                        </>
                      )}
                    </button>

                    <p className="card-foot">
                      Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
                    </p>

                  </form>
                </div>
              </>
            ) : (
              /* SUCCESS */
              <div className="success-overlay show" id="success-overlay">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div className="success-title">Demande envoyée !</div>
                <p className="success-sub">Votre demande a bien été transmise aux administrateurs de la plateforme Horizon. Vous recevrez vos identifiants provisoires à l'adresse indiquée sous <strong style={{ color: 'var(--text)' }}>24 à 48 heures</strong> ouvrées.</p>
                <p className="card-foot" style={{ marginTop: '8px' }}><a href="#" onClick={(e) => { e.preventDefault(); resetForm(); }}>Soumettre une autre demande</a></p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
