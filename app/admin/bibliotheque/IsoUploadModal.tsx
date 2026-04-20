"use client";
import React, { useState, useRef, useCallback } from 'react';
import { adminService } from '../../../services/admin';

interface IsoUploadModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export default function IsoUploadModal({ onClose, onSuccess }: IsoUploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form metadata
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('local');
    const [node, setNode] = useState('pve');
    const [osFamily, setOsFamily] = useState('LINUX');
    const [osVersion, setOsVersion] = useState('');
    const [description, setDescription] = useState('');

    const handleFile = (f: File) => {
        if (!f.name.toLowerCase().endsWith('.iso')) {
            setErrorMsg('Seuls les fichiers .iso sont acceptés.');
            return;
        }
        setErrorMsg('');
        setFile(f);
        if (!name) setName(f.name.replace(/\.iso$/i, ''));
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) handleFile(droppedFile);
    }, [name]);

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);

    const formatSize = (bytes: number) => {
        if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} Go`;
        if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} Mo`;
        return `${(bytes / 1024).toFixed(0)} Ko`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setStatus('uploading');
        setProgress(0);
        setErrorMsg('');

        try {
            await adminService.uploadIso(
                file,
                { node, storage, name, os_family: osFamily, os_version: osVersion, description },
                (progressEvent: any) => {
                    const pct = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setProgress(pct);
                    if (pct >= 100) setStatus('processing');
                }
            );
            setStatus('success');
            setTimeout(() => { onSuccess(); onClose(); }, 1800);
        } catch (err: any) {
            setStatus('error');
            const detail = err?.response?.data?.detail;
            setErrorMsg(typeof detail === 'string' ? detail : 'Erreur lors de l\'upload. Vérifiez les logs.');
        }
    };

    const isLocked = status === 'uploading' || status === 'processing' || status === 'success';

    return (
        <div style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(5, 10, 20, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, padding: '20px',
        }}>
            <div style={{
                background: 'linear-gradient(145deg, #0d1526, #111827)',
                borderRadius: '20px',
                width: '100%', maxWidth: '560px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15)',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px 28px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(99,102,241,0.06)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" fill="none" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#F1F5F9', margin: 0 }}>
                                Uploader un fichier ISO
                            </h2>
                            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                                Vers le stockage partagé Proxmox
                            </p>
                        </div>
                    </div>
                    {!isLocked && (
                        <button onClick={onClose} style={{
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '8px', color: '#64748B', cursor: 'pointer', padding: '6px',
                            display: 'flex', alignItems: 'center',
                        }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

                    {/* Drop Zone */}
                    <div
                        onClick={() => !isLocked && fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        style={{
                            border: `2px dashed ${isDragging ? '#6366f1' : file ? '#10B981' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '14px',
                            padding: '28px 20px',
                            textAlign: 'center',
                            cursor: isLocked ? 'default' : 'pointer',
                            transition: 'all 0.25s ease',
                            background: isDragging
                                ? 'rgba(99,102,241,0.08)'
                                : file
                                    ? 'rgba(16,185,129,0.06)'
                                    : 'rgba(255,255,255,0.02)',
                        }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".iso"
                            style={{ display: 'none' }}
                            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                            disabled={isLocked}
                        />
                        {file ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="#10B981" fill="none" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>{file.name}</div>
                                    <div style={{ fontSize: '12px', color: '#10B981' }}>{formatSize(file.size)}</div>
                                </div>
                                {!isLocked && (
                                    <button
                                        type="button"
                                        onClick={e => { e.stopPropagation(); setFile(null); setName(''); }}
                                        style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                                    >
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="#6366f1" fill="none" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <p style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '14px', margin: '0 0 4px' }}>
                                    {isDragging ? 'Relâchez ici' : 'Glissez votre fichier ISO ici'}
                                </p>
                                <p style={{ color: '#475569', fontSize: '12px', margin: 0 }}>
                                    ou <span style={{ color: '#6366f1', fontWeight: 600 }}>cliquez pour parcourir</span> — fichiers .iso uniquement
                                </p>
                            </>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {(status === 'uploading' || status === 'processing' || status === 'success') && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                                    {status === 'uploading' ? `Envoi en cours… ${progress}%`
                                        : status === 'processing' ? '⚙️ Traitement Proxmox…'
                                            : '✅ Upload réussi !'}
                                </span>
                                <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>{progress}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    background: status === 'success'
                                        ? 'linear-gradient(90deg, #10B981, #059669)'
                                        : 'linear-gradient(90deg, #6366f1, #8B5CF6)',
                                    borderRadius: '999px',
                                    transition: 'width 0.3s ease',
                                    boxShadow: '0 0 8px rgba(99,102,241,0.4)',
                                }} />
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {(status === 'error' || errorMsg) && (
                        <div style={{
                            padding: '12px 16px', borderRadius: '10px',
                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                            color: '#FCA5A5', fontSize: '13px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                        }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {errorMsg || 'Une erreur est survenue.'}
                        </div>
                    )}

                    {/* Metadata fields */}
                    {!isLocked && (
                        <>
                            {/* Row: Name */}
                            <div>
                                <label style={labelStyle}>Nom d'affichage *</label>
                                <input required type="text" value={name} onChange={e => setName(e.target.value)}
                                    placeholder="Ex: Ubuntu 24.04 LTS"
                                    style={inputStyle} />
                            </div>

                            {/* Row: Node + Storage */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={labelStyle}>Nœud Proxmox</label>
                                    <input type="text" value={node} onChange={e => setNode(e.target.value)}
                                        placeholder="pve"
                                        style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Stockage cible</label>
                                    <input type="text" value={storage} onChange={e => setStorage(e.target.value)}
                                        placeholder="local"
                                        style={inputStyle} />
                                </div>
                            </div>

                            {/* Row: OS Family + Version */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={labelStyle}>Famille OS</label>
                                    <select value={osFamily} onChange={e => setOsFamily(e.target.value)} style={{ ...inputStyle, background: '#0d1526' }}>
                                        <option value="LINUX">Linux</option>
                                        <option value="WINDOWS">Windows</option>
                                        <option value="BSD">BSD</option>
                                        <option value="OTHER">Autre</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Version</label>
                                    <input type="text" value={osVersion} onChange={e => setOsVersion(e.target.value)}
                                        placeholder="Ex: 24.04"
                                        style={inputStyle} />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label style={labelStyle}>Description (optionnel)</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)}
                                    placeholder="Brève description de cette image ISO…"
                                    rows={2}
                                    style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }} />
                            </div>
                        </>
                    )}

                    {/* Footer Actions */}
                    {!isLocked && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '4px' }}>
                            <button type="button" onClick={onClose} style={{
                                padding: '10px 20px', background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8',
                                borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                            }}>
                                Annuler
                            </button>
                            <button type="submit" disabled={!file || !name} style={{
                                padding: '10px 24px',
                                background: !file || !name ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                border: 'none', color: 'white',
                                borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                cursor: !file || !name ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                boxShadow: !file || !name ? 'none' : '0 4px 14px rgba(99,102,241,0.35)',
                                transition: 'all 0.2s',
                            }}>
                                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                Lancer l'upload
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#94A3B8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', color: '#F1F5F9', fontSize: '13px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
};
