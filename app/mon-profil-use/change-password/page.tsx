"use client";

import React, { useState, useEffect } from 'react';
import '../../home.css';
import '../../connexion/connexion.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/auth';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);

    // Si l'utilisateur n'est pas connecté ou n'a pas besoin de changer son mot de passe,
    // on peut rediriger, mais ici on veut surtout s'assurer qu'il peut le faire s'il en a besoin.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError("Les nouveaux mots de passe ne correspondent pas.");
            return;
        }

        setIsLoading(true);
        try {
            await authService.changePassword(currentPassword, newPassword, confirmPassword);
            setSuccess(true);
            setTimeout(() => {
                logout(); // Déconnexion pour forcer la re-connexion avec le nouveau mdp
                router.push('/connexion');
            }, 2000);
        } catch (err: any) {
            console.error("Change password error:", err);
            const detail = err.response?.data?.detail;
            let message = "Une erreur est survenue lors du changement de mot de passe.";

            if (typeof detail === 'string') {
                message = detail;
            } else if (Array.isArray(detail)) {
                // Gestion des erreurs de validation Pydantic (FastAPI)
                message = detail.map((d: any) => d.msg || JSON.stringify(d)).join(", ");
            } else if (detail && typeof detail === 'object') {
                message = detail.msg || JSON.stringify(detail);
            }

            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-theme">
            <Header />

            <div className="login-container" style={{ padding: '120px 20px 80px' }}>
                <div className="login-card">
                    <div className="badge-secure">
                        <span className="badge-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}></span>
                        SÉCURITÉ DU COMPTE
                    </div>

                    <h1 className="login-title">Nouveau mot de passe</h1>
                    <p className="login-desc">
                        Pour des raisons de sécurité, vous devez définir un mot de passe personnel avant de continuer sur la plateforme Horizon.
                    </p>

                    {error && (
                        <div className="login-alert" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <svg className="form-icon" style={{ flexShrink: 0, color: '#ef4444' }} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <div>{error}</div>
                        </div>
                    )}

                    {success && (
                        <div className="login-alert" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.2)', borderLeftColor: '#22c55e' }}>
                            <svg className="form-icon" style={{ flexShrink: 0, color: '#22c55e' }} viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <div>Mot de passe modifié avec succès ! Redirection vers la page de connexion...</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">MOT DE PASSE ACTUEL (PROVISOIRE)</label>
                            <div className="input-wrapper">
                                <svg className="input-icon form-icon" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    type={showPasswords ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Entrez le mot de passe reçu par mail"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="divider">NOUVEAUX IDENTIFIANTS</div>

                        <div className="form-group">
                            <label className="form-label">NOUVEAU MOT DE PASSE</label>
                            <div className="input-wrapper">
                                <svg className="input-icon form-icon" viewBox="0 0 24 24">
                                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 12l.93-2.07 2.07-.93-2.07-.93L12 6l-.93 2.07-2.07.93 2.07.93L12 12z"></path>
                                </svg>
                                <input
                                    type={showPasswords ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Minimum 10 caractères (A-z, 0-9, @#...)"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">CONFIRMER LE MOT DE PASSE</label>
                            <div className="input-wrapper">
                                <svg className="input-icon form-icon" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                <input
                                    type={showPasswords ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Répétez le nouveau mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="input-icon-right"
                                    onClick={() => setShowPasswords(!showPasswords)}
                                >
                                    {showPasswords ? (
                                        <svg className="form-icon" viewBox="0 0 24 24">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg className="form-icon" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="login-btn-primary" disabled={isLoading || success}>
                            {isLoading ? (
                                <span className="loader-small"></span>
                            ) : (
                                <svg className="form-icon" viewBox="0 0 24 24">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <polyline points="17 11 19 13 23 9"></polyline>
                                </svg>
                            )}
                            <span>{isLoading ? 'Modification...' : 'Mettre à jour mon compte'}</span>
                        </button>

                        <div className="login-footer">
                            <button
                                onClick={() => logout()}
                                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '12px' }}
                            >
                                Se déconnecter et annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
