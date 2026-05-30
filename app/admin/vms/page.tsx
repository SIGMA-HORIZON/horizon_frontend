"use client";
import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/admin';
import { Modal } from '../../../components/Modal';
import '../../../app/dashboard/dashboard.css';

interface VM {
  id: string;
  proxmox_vmid: number;
  name: string;
  owner_username: string | null;
  node: string;
  vcpu: number;
  ram_gb: number;
  storage_gb: number;
  status: string;
  lease_end: string;
  ip_address: string | null;
}

export default function AdminVMsPage() {
  const [activeTab, setActiveTab] = useState<'vms' | 'extensions'>('vms');
  const [vms, setVms] = useState<VM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // States for delete modal
  const [selectedVm, setSelectedVm] = useState<VM | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [extensions, setExtensions] = useState<any[]>([]);
  const [extLoading, setExtLoading] = useState(false);

  const fetchVms = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAdminVms();
      setVms(data.items);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch admin VMs:', err);
      setError('Impossible de charger la liste des VMs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchExtensions = async () => {
    try {
      setExtLoading(true);
      const data = await adminService.listExtensionRequests();
      setExtensions(data);
    } catch (err) {
      console.error('Failed to fetch extensions:', err);
    } finally {
      setExtLoading(false);
    }
  };

  useEffect(() => {
    fetchVms();
    fetchExtensions();
  }, []);

  const handleDelete = async () => {
    if (!selectedVm || !deleteReason.trim()) return;

    try {
      setIsDeleting(true);
      await adminService.adminDeleteVm(selectedVm.id, deleteReason);
      setSelectedVm(null);
      setDeleteReason('');
      fetchVms(); // Refresh list
    } catch (err) {
      console.error('Failed to delete VM:', err);
      alert('Erreur lors de la suppression de la VM.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApproveExtension = async (requestId: string) => {
    const hours = prompt("Nombre d'heures à ajouter ?", "24");
    if (!hours) return;
    try {
      await adminService.approveExtension(requestId, parseInt(hours));
      fetchExtensions();
      fetchVms();
    } catch (err) {
      alert("Erreur lors de l'approbation");
    }
  };

  const filteredVms = vms?.filter(vm => 
    vm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vm.owner_username?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    vm.proxmox_vmid.toString().includes(searchTerm) ||
    vm.ip_address?.includes(searchTerm)
  ) || [];

  const getStatusBadgeClass = (status: string) => {
    if (!status) return '';
    switch (status.toUpperCase()) {
      case 'ACTIVE': return 'status-badge-active';
      case 'STOPPED': return 'status-badge-stopped';
      case 'EXPIRED': return 'status-badge-expired';
      case 'PENDING': return 'status-badge-pending';
      default: return '';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Gestion du parc VM</h1>
          <p className="page-subtitle">Supervisez les instances et traitez les demandes d'extension</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', background: 'var(--g1-nav)', padding: '4px', borderRadius: '10px', border: '1px solid var(--g1-border)' }}>
             <button 
               onClick={() => setActiveTab('vms')}
               style={{ padding: '8px 16px', border: 'none', background: activeTab === 'vms' ? 'var(--g1-accent2)' : 'transparent', color: activeTab === 'vms' ? 'white' : 'var(--g1-muted)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
             >VMs Actives</button>
             <button 
               onClick={() => setActiveTab('extensions')}
               style={{ padding: '8px 16px', border: 'none', background: activeTab === 'extensions' ? 'var(--g1-accent2)' : 'transparent', color: activeTab === 'extensions' ? 'white' : 'var(--g1-muted)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
             >Demandes ({extensions.filter(e => e.status === 'PENDING').length})</button>
          </div>
          <button className="btn-secondary" onClick={() => activeTab === 'vms' ? fetchVms() : fetchExtensions()}>
            <svg viewBox="0 0 24 24" style={{ width: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
            Explorer
          </button>
        </div>
      </div>

      {activeTab === 'vms' ? (
        <>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="search-row">
              <div className="search-field" style={{ maxWidth: '400px' }}>
                <svg viewBox="0 0 24 24" style={{ width: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input 
                  type="text" 
                  placeholder="Rechercher par nom, propriétaire..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des VMs...</p>
            </div>
          ) : error ? (
            <div className="error-card"><p>{error}</p></div>
          ) : (
            <div className="table-wrap card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>VMID</th>
                    <th>Nom & Propriétaire</th>
                    <th>Nœud</th>
                    <th>Ressources</th>
                    <th>Statut</th>
                    <th>IP Address</th>
                    <th>Expiration</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVms.length > 0 ? filteredVms.map(vm => (
                    <tr key={vm.id}>
                      <td className="font-mono" style={{ opacity: 0.7 }}>#{vm.proxmox_vmid}</td>
                      <td>
                        <div className="vm-name-cell">
                          <div className="vm-name-main">{vm.name}</div>
                          <div className="vm-owner">{vm.owner_username || 'Inconnu'}</div>
                        </div>
                      </td>
                      <td>{vm.node}</td>
                      <td>
                        <div className="res-stack">
                          <span>{vm.vcpu} vCPU</span>
                          <span>{vm.ram_gb} GB RAM</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(vm.status)}`}>
                          {vm.status}
                        </span>
                      </td>
                      <td>
                        {vm.ip_address ? (
                          <code className="ip-code">{vm.ip_address}</code>
                        ) : (
                          <span style={{ opacity: 0.4 }}>Pas d'IP</span>
                        )}
                      </td>
                      <td>
                        <div className="date-cell">
                          {new Date(vm.lease_end).toLocaleDateString()}
                          <span className="date-sub">{new Date(vm.lease_end).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          className="btn-icon btn-danger" 
                          title="Supprimer la VM"
                          onClick={() => {
                            setSelectedVm(vm);
                            setDeleteReason('');
                            setIsDeleting(false);
                          }}
                        >
                          <svg viewBox="0 0 24 24" style={{ width: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={8} className="empty-row">Aucune machine virtuelle trouvée.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="table-wrap card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Utilisateur</th>
                <th>VM</th>
                <th>Raison</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {extensions.length > 0 ? extensions.map(ext => (
                <tr key={ext.id}>
                  <td>{new Date(ext.created_at).toLocaleDateString()}</td>
                  <td>{ext.owner_username}</td>
                  <td>{ext.vm_name} (#{ext.proxmox_vmid})</td>
                  <td style={{ maxWidth: '300px', fontSize: '12px', color: 'var(--g1-muted)' }}>{ext.reason}</td>
                  <td>
                    <span className={`status-badge ${ext.status === 'PENDING' ? 'status-badge-pending' : ext.status === 'APPROVED' ? 'status-badge-active' : 'status-badge-expired'}`}>
                      {ext.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {ext.status === 'PENDING' && (
                      <button className="btn-accent" onClick={() => handleApproveExtension(ext.id)}>
                        Approuver
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="empty-row">Aucune demande d'extension.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedVm && (
        <Modal 
          isOpen={!!selectedVm} 
          onClose={() => !isDeleting && setSelectedVm(null)}
          title="Confirmer la suppression"
        >
          <div className="modal-body">
            <p style={{ marginBottom: '16px' }}>
              Vous êtes sur le point de supprimer la machine virtuelle <strong>{selectedVm.name}</strong> (#{selectedVm.proxmox_vmid}).
              Cette action est irréversible et supprimera toutes les données.
            </p>
            
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Raison de la suppression (Sera envoyée à l'utilisateur)</label>
              <textarea 
                className="form-input" 
                rows={3} 
                placeholder="Ex: Violation des CGU, Maintenance critique, Ressources expirées..."
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                disabled={isDeleting}
                style={{ width: '100%', background: 'var(--g1-bg-secondary)', border: '1px solid var(--g1-border)', color: 'var(--g1-text-primary)', padding: '10px', borderRadius: '8px' }}
              />
              <p className="form-hint">L'utilisateur {selectedVm.owner_username} recevra un e-mail avec ce motif.</p>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-ghost" 
                onClick={() => setSelectedVm(null)}
                disabled={isDeleting}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--g1-border)', background: 'transparent', color: 'var(--g1-text-primary)', cursor: 'pointer', marginRight: '12px' }}
              >
                Annuler
              </button>
              <button 
                className="btn-danger" 
                onClick={handleDelete}
                disabled={isDeleting || deleteReason.trim().length < 5}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--g1-err)', color: 'white', cursor: 'pointer' }}
              >
                {isDeleting ? 'Suppression...' : 'Confirmer la suppression'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style jsx>{`
        .page-container {
          padding: 32px;
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
        .page-title { font-size: 24px; font-weight: 700; color: var(--g1-text-primary); margin-bottom: 4px; }
        .page-subtitle { color: var(--g1-text-secondary); font-size: 14px; }
        
        .status-badge {
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .status-badge-active { background: rgba(16, 185, 129, 0.1); color: #10B981; }
        .status-badge-stopped { background: rgba(107, 114, 128, 0.1); color: #6B7280; }
        .status-badge-expired { background: rgba(239, 68, 68, 0.1); color: #EF4444; }
        .status-badge-pending { background: rgba(245, 158, 11, 0.1); color: #F5980B; }

        .vm-name-cell { display: flex; flex-direction: column; }
        .vm-name-main { font-weight: 600; color: var(--g1-text-primary); }
        .vm-owner { font-size: 12px; color: var(--g1-text-secondary); margin-top: 2px; }
        
        .res-stack { display: flex; flex-direction: column; font-size: 12px; color: var(--g1-text-secondary); }
        
        .ip-code {
          background: var(--g1-bg-tertiary);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          color: var(--g1-accent1);
        }

        .date-cell { display: flex; flex-direction: column; font-size: 13px; }
        .date-sub { font-size: 11px; color: var(--g1-text-secondary); margin-top: 2px; }

        .btn-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .btn-danger:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2); }

        .empty-row { text-align: center; padding: 60px !important; color: var(--g1-text-secondary); font-style: italic; }

        .search-row { display: flex; align-items: center; gap: 20px; }
        .search-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--g1-bg-tertiary);
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid var(--g1-border);
        }
        .search-field input { border: none; background: transparent; color: inherit; width: 100%; outline: none; }

        .stat-mini { display: flex; flex-direction: column; align-items: flex-end; }
        .stat-mini-label { font-size: 10px; color: var(--g1-text-secondary); text-transform: uppercase; font-weight: 600; }
        .stat-mini-val { font-size: 18px; font-weight: 700; color: var(--g1-text-primary); }

        .form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: var(--g1-text-primary); }
        .form-hint { font-size: 12px; color: var(--g1-text-secondary); margin-top: 6px; }

        .modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
      `}</style>
    </div>
  );
}
