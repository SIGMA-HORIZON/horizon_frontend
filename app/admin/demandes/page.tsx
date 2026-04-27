"use client";
import React, { useEffect, useState } from 'react';
import { accountService } from '@/services/accounts';
import { Modal } from '@/components/Modal';

interface AccountRequest {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    organisation: string;
    justification: string;
    status: string;
    created_at: string;
}

export default function DemandesComptes() {
    const [requests, setRequests] = useState<AccountRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<AccountRequest | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    // Dynamic Modal for alerts
    const [alertModal, setAlertModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: 'info' | 'danger' | 'success';
    }>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await accountService.listRequests('PENDING');
            setRequests(data.items || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
            setAlertModal({
                isOpen: true,
                title: "Erreur",
                message: "Erreur lors du chargement des demandes",
                type: 'danger'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        if (!selectedRequest) return;
        try {
            await accountService.approveRequest(selectedRequest.id);
            setAlertModal({
                isOpen: true,
                title: "Approuvé",
                message: `Le compte de ${selectedRequest.first_name} a été approuvé avec succès.`,
                type: 'success'
            });
            setIsApproveModalOpen(false);
            setSelectedRequest(null);
            fetchRequests();
        } catch (error) {
            console.error('Error approving request:', error);
            setAlertModal({
                isOpen: true,
                title: "Erreur",
                message: "Une erreur est survenue lors de l'approbation.",
                type: 'danger'
            });
        }
    };

    const handleReject = async () => {
        if (!selectedRequest || !rejectReason) return;
        try {
            await accountService.rejectRequest(selectedRequest.id, rejectReason);
            setAlertModal({
                isOpen: true,
                title: "Rejeté",
                message: `La demande de ${selectedRequest.first_name} a été rejetée.`,
                type: 'info'
            });
            setIsRejectModalOpen(false);
            setSelectedRequest(null);
            setRejectReason('');
            fetchRequests();
        } catch (error) {
            console.error('Error rejecting request:', error);
            setAlertModal({
                isOpen: true,
                title: "Erreur",
                message: "Une erreur est survenue lors du rejet.",
                type: 'danger'
            });
        }
    };

    return (
        <div className="page active" style={{ padding: '0 20px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Demandes de création de compte</h1>
                    <p style={{ color: 'var(--g1-muted)', fontSize: '14px' }}>Validez ou rejetez les demandes d'accès à la plateforme SIGMA Horizon.</p>
                </div>
            </div>

            <div className="pm-card">
                <div className="pm-hdr">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    Demandes en attente ({requests.length})
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <tr>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Utilisateur / Contact</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Institution</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Statut Demande</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Date Soumission</th>
                                <th style={{ padding: '16px 20px', textAlign: 'right', color: 'var(--g1-muted)', fontWeight: 600, borderBottom: '1px solid var(--g1-border)' }}>Décision</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--g1-muted)' }}>Chargement des demandes...</td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--g1-muted)' }}>Aucune demande en attente.</td>
                                </tr>
                            ) : (
                                requests.map(req => (
                                    <tr key={req.id}>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--g1-text)' }}>{req.first_name} {req.last_name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--g1-muted)', fontFamily: 'monospace' }}>{req.email}</div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-text)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cyan)' }}></div>
                                                {req.organisation.toUpperCase()}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            <span className="badge badge-warn">EN ATTENTE</span>
                                        </td>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-muted)' }}>
                                            {new Date(req.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button
                                                    className="btn-accent"
                                                    style={{ fontSize: '11px', padding: '6px 12px', background: '#22c55e', border: 'none' }}
                                                    onClick={() => {
                                                        setSelectedRequest(req);
                                                        setIsApproveModalOpen(true);
                                                    }}
                                                >
                                                    Approuver
                                                </button>
                                                <button
                                                    className="btn-ghost"
                                                    style={{ fontSize: '11px', padding: '6px 12px', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                                                    onClick={() => {
                                                        setSelectedRequest(req);
                                                        setIsRejectModalOpen(true);
                                                    }}
                                                >
                                                    Rejeter
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                title="Approuver la demande"
                type="success"
                confirmLabel="Confirmer l'approbation"
                onConfirm={handleApprove}
            >
                <p style={{ color: 'var(--g1-text)', marginBottom: '16px' }}>
                    Voulez-vous approuver la demande de création de compte pour <strong>{selectedRequest?.first_name} {selectedRequest?.last_name}</strong> ?
                </p>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--g1-muted)', marginBottom: '4px' }}>Justification fournie :</div>
                    <div style={{ color: 'var(--g1-text)', fontSize: '14px', fontStyle: 'italic' }}>"{selectedRequest?.justification || 'Aucune justification fournie.'}"</div>
                </div>
            </Modal>

            <Modal
                isOpen={isRejectModalOpen}
                onClose={() => {
                    setIsRejectModalOpen(false);
                    setRejectReason('');
                }}
                title="Rejeter la demande"
                type="danger"
                confirmLabel="Confirmer le rejet"
                onConfirm={handleReject}
                showConfirm={!!rejectReason}
            >
                <p style={{ color: 'var(--g1-text)', marginBottom: '20px' }}>
                    Veuillez indiquer la raison du rejet pour <strong>{selectedRequest?.first_name} {selectedRequest?.last_name}</strong>.
                </p>
                <textarea
                    required
                    placeholder="Ex: Justification insuffisante, Profil non conforme..."
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    style={{ width: '100%', minHeight: '100px', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--g1-border)', borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
            </Modal>

            <Modal
                isOpen={alertModal.isOpen}
                onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
                title={alertModal.title}
                type={alertModal.type}
                showConfirm={false}
            >
                {alertModal.message}
            </Modal>
        </div>
    );
}
