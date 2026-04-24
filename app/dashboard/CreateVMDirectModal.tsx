"use client";
import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';

interface CreateVMDirectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateVMDirectModal({ isOpen, onClose, onSuccess }: CreateVMDirectModalProps) {
    const [vmid, setVmid] = useState<number>(100);
    const [node, setNode] = useState('');
    const [nodes, setNodes] = useState<any[]>([]);
    const [storage, setStorage] = useState('local');
    const [isoFilename, setIsoFilename] = useState('');
    const [availableIsos, setAvailableIsos] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [vcpu, setVcpu] = useState(2);
    const [ramMb, setRamMb] = useState(2048);
    const [storageGb, setStorageGb] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [sshPublicKey, setSshPublicKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const [nodesData, isosData] = await Promise.all([
                        adminService.listNodeMappings(),
                        adminService.listIsos()
                    ]);

                    setNodes(nodesData.items || []);
                    if (nodesData.items?.length > 0) {
                        setNode(nodesData.items[0].proxmox_node_name);
                    }

                    setAvailableIsos(isosData.items || []);
                    if (isosData.items?.length > 0) {
                        setIsoFilename(isosData.items[0].filename);
                    }
                } catch (err) {
                    console.error("Failed to fetch direct creation data:", err);
                    setError("Impossible de charger les données nécessaires (ISO/Nœuds).");
                }
            };
            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await adminService.proxmoxCreateVm({
                vmid,
                node,
                storage,
                iso_filename: isoFilename,
                name,
                vcpu,
                ram_mb: ramMb,
                storage_gb: storageGb,
                net0: "virtio,bridge=vmbr0",
                ssh_public_key: sshPublicKey || null
            });

            onClose();
            if (onSuccess) onSuccess();
        } catch (err: any) {
            console.error("Direct VM creation failed:", err);
            setError(err.response?.data?.detail || "Erreur lors de la création directe de la VM.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" style={overlayStyle}>
            <div className="modal-content" style={contentStyle}>
                <div style={headerStyle}>
                    <div>
                        <h2 style={titleStyle}>Création Directe (Admin)</h2>
                        <p style={subtitleStyle}>La VM sera créée immédiatement sur le cluster Proxmox.</p>
                    </div>
                    <button onClick={onClose} style={closeBtnStyle}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    {error && (
                        <div style={{ padding: '12px', background: '#FEF2F2', color: '#EF4444', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <div style={rowStyle}>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>VMID</label>
                            <input type="number" style={inputStyle} value={vmid} onChange={e => setVmid(Number(e.target.value))} required min="100" disabled={isLoading} />
                        </div>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>Nom de la VM</label>
                            <input type="text" style={inputStyle} value={name} onChange={e => setName(e.target.value)} required placeholder="vm-direct-01" disabled={isLoading} />
                        </div>
                    </div>

                    <div style={rowStyle}>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>Nœud Proxmox</label>
                            <select style={inputStyle} value={node} onChange={e => setNode(e.target.value)} required disabled={isLoading}>
                                {nodes.map(n => (
                                    <option key={n.id} value={n.proxmox_node_name}>{n.proxmox_node_name} ({n.physical_node})</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>Stockage Cible</label>
                            <input type="text" style={inputStyle} value={storage} onChange={e => setStorage(e.target.value)} required disabled={isLoading} />
                        </div>
                    </div>

                    <div className="form-group" style={formGroupStyle}>
                        <label style={labelStyle}>Fichier ISO</label>
                        <select style={inputStyle} value={isoFilename} onChange={e => setIsoFilename(e.target.value)} required disabled={isLoading}>
                            {availableIsos.map(iso => (
                                <option key={iso.id} value={iso.filename}>{iso.name} ({iso.filename})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', marginBottom: '16px' }}>
                        <span style={sectionTitleStyle}>Ressources</span>
                        <div style={sectionDividerStyle}></div>
                    </div>

                    <div style={rowStyle}>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>vCPU</label>
                            <input type="number" style={inputStyle} value={vcpu} onChange={e => setVcpu(Number(e.target.value))} required min="1" disabled={isLoading} />
                        </div>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>RAM (Mo)</label>
                            <input type="number" style={inputStyle} value={ramMb} onChange={e => setRamMb(Number(e.target.value))} required min="512" step="512" disabled={isLoading} />
                        </div>
                        <div className="form-group" style={{ ...formGroupStyle, flex: 1 }}>
                            <label style={labelStyle}>Disque (Go)</label>
                            <input type="number" style={inputStyle} value={storageGb} onChange={e => setStorageGb(Number(e.target.value))} required min="5" disabled={isLoading} />
                        </div>
                    </div>

                    <div className="form-group" style={formGroupStyle}>
                        <label style={labelStyle}>Clé SSH Publique (Optionnel)</label>
                        <textarea 
                            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' } as React.CSSProperties} 
                            value={sshPublicKey} 
                            onChange={e => setSshPublicKey(e.target.value)} 
                            placeholder="ssh-rsa AAAAB3Nza..." 
                            disabled={isLoading}
                        />
                        <p style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Nécessite le support Cloud-Init dans l'ISO.</p>
                    </div>

                    <div style={footerStyle}>
                        <button type="button" onClick={onClose} style={btnGhostStyle} disabled={isLoading}>Annuler</button>
                        <button type="submit" style={btnPrimaryStyle} disabled={isLoading}>
                            {isLoading ? 'Création...' : 'Créer la VM'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
    padding: '20px'
};

const contentStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const headerStyle: React.CSSProperties = {
    padding: '24px 32px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #E2E8F0'
};

const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0F172A',
    margin: '0 0 4px 0'
};

const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#64748B',
    margin: 0
};

const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#64748B',
    cursor: 'pointer',
    padding: '4px',
};

const formStyle: React.CSSProperties = {
    padding: '24px 32px'
};

const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px'
};

const formGroupStyle: React.CSSProperties = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column'
};

const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const inputStyle: React.CSSProperties = {
    padding: '10px 14px',
    fontSize: '14px',
    color: '#0F172A',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    width: '100%',
    background: '#fff'
};

const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const sectionDividerStyle: React.CSSProperties = {
    flex: 1,
    height: '1px',
    background: '#E2E8F0'
};

const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px'
};

const btnGhostStyle: React.CSSProperties = {
    padding: '10px 18px',
    background: '#fff',
    border: '1px solid #CBD5E1',
    color: '#475569',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
};

const btnPrimaryStyle: React.CSSProperties = {
    padding: '10px 18px',
    background: '#2563EB',
    border: 'none',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
};
