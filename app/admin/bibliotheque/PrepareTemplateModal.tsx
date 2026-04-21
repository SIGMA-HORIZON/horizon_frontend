"use client";
import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin';

interface PrepareTemplateModalProps {
    onClose: () => void;
    onSuccess: () => void;
    availableIsos?: any[];
}

export default function PrepareTemplateModal({ onClose, onSuccess, availableIsos = [] }: PrepareTemplateModalProps) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form fields
    const [vmid, setVmid] = useState<number>(9100);
    const [node, setNode] = useState('pve1');
    const [storage, setStorage] = useState('local-lvm');
    const [isoFilename, setIsoFilename] = useState('');
    const [isoStorage, setIsoStorage] = useState('nfs-shared-iso');
    const [name, setName] = useState('template-prepare');
    const [vcpu, setVcpu] = useState(2);
    const [ramMb, setRamMb] = useState(2048);
    const [storageGb, setStorageGb] = useState(20);

    useEffect(() => {
        if (availableIsos.length > 0 && !isoFilename) {
            setIsoFilename(availableIsos[0].filename);
        }
    }, [availableIsos]);

    const sanitizeVmName = (val: string) => {
        return val
            .replace(/[^a-zA-Z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        // Sanitize and validate Name
        const sanitizedName = sanitizeVmName(name);
        if (!sanitizedName) {
            setErrorMsg('Le nom de la VM est invalide (doit contenir des caractères alphanumériques).');
            setLoading(false);
            return;
        }

        if (vmid < 100) {
// ... around line 56
            setErrorMsg('Le VMID doit être supérieur ou égal à 100.');
            setLoading(false);
            return;
        }

        if (!isoFilename) {
            setErrorMsg('Veuillez sélectionner ou entrer un nom de fichier ISO.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                vmid,
                node,
                storage,
                iso_filename: isoFilename,
                iso_storage: isoStorage || null,
                name: sanitizedName,
                vcpu,
                ram_mb: ramMb,
                storage_gb: storageGb
            };
            const res = await adminService.prepareTemplate(payload);
            setSuccessMsg(res?.message || 'Préparation du template lancée avec succès.');
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        } catch (err: any) {
            console.error(err);
            const detail = err?.response?.data?.detail || err.message || 'Erreur inconnue';
            setErrorMsg(`Erreur : ${detail}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={iconBoxStyle}>
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" fill="none" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#F1F5F9', margin: 0 }}>
                                Préparer un Template
                            </h2>
                            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                                Créer une VM à partir d'un ISO pour installation
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={closeButtonStyle}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    {/* Notifications */}
                    {errorMsg && <div style={errorBannerStyle}>{errorMsg}</div>}
                    {successMsg && <div style={successBannerStyle}>{successMsg}</div>}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* VMID & Node */}
                        <div>
                            <label style={labelStyle}>VMID ({'>'}= 100)</label>
                            <input
                                type="number"
                                value={vmid}
                                onChange={e => setVmid(parseInt(e.target.value, 10))}
                                style={inputStyle}
                                required
                                min="100"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Nœud Proxmox</label>
                            <input
                                type="text"
                                value={node}
                                onChange={e => setNode(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    {/* ISO Selection */}
                    <div>
                        <label style={labelStyle}>Fichier ISO</label>
                        <select
                            value={isoFilename}
                            onChange={e => setIsoFilename(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="">-- Sélectionner une ISO --</option>
                            
                            {/* ISOs from Database (Uploaded) */}
                            {availableIsos.map(iso => (
                                <option key={`db-${iso.id}`} value={iso.filename}>
                                    {iso.name} ({iso.filename})
                                </option>
                            ))}
                        </select>
                        <p style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
                            Selectionnez l'image ISO que vous avez précédemment uploadée.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Storages */}
                        <div>
                            <label style={labelStyle}>Stockage Disque</label>
                            <input
                                type="text"
                                value={storage}
                                onChange={e => setStorage(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Stockage ISO (si différent)</label>
                            <input
                                type="text"
                                value={isoStorage}
                                onChange={e => setIsoStorage(e.target.value)}
                                placeholder="Auto"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* VM Name */}
                    <div>
                        <label style={labelStyle}>Nom de la VM</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>

                    {/* Resources */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div>
                            <label style={labelStyle}>vCPU</label>
                            <input
                                type="number"
                                value={vcpu}
                                onChange={e => setVcpu(parseInt(e.target.value, 10))}
                                style={inputStyle}
                                required
                                min="1"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>RAM (MB)</label>
                            <input
                                type="number"
                                value={ramMb}
                                onChange={e => setRamMb(parseInt(e.target.value, 10))}
                                style={inputStyle}
                                required
                                min="512"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Disque (GB)</label>
                            <input
                                type="number"
                                value={storageGb}
                                onChange={e => setStorageGb(parseInt(e.target.value, 10))}
                                style={inputStyle}
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={footerStyle}>
                        <button type="button" onClick={onClose} style={cancelButtonStyle} disabled={loading}>
                            Annuler
                        </button>
                        <button type="submit" style={submitButtonStyle} disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg className="animate-spin" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Lancement...
                                </span>
                            ) : 'Lancer la préparation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Styles
const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0,
    backgroundColor: 'rgba(5, 10, 20, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1001, padding: '20px',
};

const modalContentStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #0d1526, #111827)',
    borderRadius: '20px',
    width: '100%', maxWidth: '650px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
    overflow: 'hidden',
};

const headerStyle: React.CSSProperties = {
    padding: '20px 28px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'rgba(16, 185, 129, 0.05)',
};

const iconBoxStyle: React.CSSProperties = {
    width: '40px', height: '40px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const closeButtonStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)', border: 'none',
    borderRadius: '8px', color: '#64748B', cursor: 'pointer', padding: '6px',
};

const formStyle: React.CSSProperties = {
    padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px',
};

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 700,
    color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px', color: '#F1F5F9', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
};

const footerStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px',
};

const cancelButtonStyle: React.CSSProperties = {
    padding: '12px 24px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8',
    borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
};

const submitButtonStyle: React.CSSProperties = {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    border: 'none', color: 'white',
    borderRadius: '12px', fontSize: '14px', fontWeight: 600,
    cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
};

const errorBannerStyle: React.CSSProperties = {
    padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px',
    color: '#F87171', fontSize: '13px',
};

const successBannerStyle: React.CSSProperties = {
    padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px',
    color: '#34D399', fontSize: '13px',
};
