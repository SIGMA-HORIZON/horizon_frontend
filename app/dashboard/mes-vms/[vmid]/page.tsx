"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useVMs } from '../../VMContext';
import { vmService } from '@/services/vms';
import { Icon } from '@/components/Icon';
import SSHTerminal from './SSHTerminal';
import { Modal } from '@/components/Modal';

export default function VMDetails() {
  const params = useParams();
  const router = useRouter();
  const vmid = params.vmid as string;
  const { vms, deleteVM, updateVM, startVM, stopVM, rebootVM, refreshVMs, refreshSingleVM } = useVMs();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [showTerminal, setShowTerminal] = useState(false);
  
  // Modal states
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string | React.ReactNode;
    type: 'info' | 'danger' | 'success';
    onConfirm?: () => void;
    confirmLabel?: string;
    showConfirm?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Polling for real-time usage stats
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSingleVM(vmid);
    }, 5000);
    return () => clearInterval(interval);
  }, [vmid, refreshSingleVM]);

  const vm = vms.find(v => v.id === vmid);

  if (!vm) return <VMNotFound vmid={vmid} onBack={() => router.push('/dashboard/mes-vms')} />;

  const isRunning = ['ACTIVE', 'running', 'on'].includes(vm.status);
  const isExpired = vm.status === 'EXPIRED';

  const handleEdit = (field: string, val: any) => {
    setEditingField(field);
    setEditValue(String(val).replace(' Go', ''));
  };

  const saveEdit = () => {
    if (!editingField || !editValue) return;
    const payload: any = { [editingField]: editingField === 'name' ? editValue : Number(editValue) };
    updateVM(vm.id, payload);
    setEditingField(null);
  };

  const downloadKey = async () => {
    try {
      const data = await vmService.getSshKey(vm.id);
      const blob = new Blob([data.ssh_public_key], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `horizon-${vm.name}.pub`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setModalConfig({
        isOpen: true,
        title: "Succès",
        message: "Clé SSH téléchargée avec succès. Elle a été supprimée du serveur.",
        type: 'success',
        showConfirm: false
      });
      refreshSingleVM(vm.id);
    } catch (error: any) {
      setModalConfig({
        isOpen: true,
        title: "Erreur",
        message: error.response?.data?.detail || "Erreur lors du téléchargement.",
        type: 'danger',
        showConfirm: false
      });
    }
  };

  return (
    <div className="page active vm-details-layout">
      {/* 1. HERO SECTION */}
      <div className="vm-hero">
        <div className="vm-hero-left">
          <div className="vm-hero-icon">
            <Icon name="vms" size={24} />
          </div>
          <div className="vm-hero-info">
            <h1>{vm.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
              <span className={`badge ${isExpired ? 'badge-expired' : isRunning ? 'badge-on' : 'badge-off'}`}>
                {isExpired ? '○ EXPIRÉE' : isRunning ? '● EN LIGNE' : '○ HORS LIGNE'}
              </span>
              <span style={{ color: 'var(--g1-muted)', fontSize: '13px' }}>ID: {vm.proxmox_vmid}</span>
            </div>
          </div>
        </div>

        <div className="vm-actions">
          <button 
            className="btn-accent" 
            onClick={() => router.push(`/dashboard/mes-vms/${vm.id}/console`)}
            disabled={isExpired}
          >
            <Icon name="console" strokeWidth={2.5} />
            Console VNC
          </button>
          
          <ActionButtons 
            isRunning={isRunning} 
            isExpired={isExpired}
            onStart={() => startVM(vm.id)} 
            onStop={() => stopVM(vm.id)} 
            onReboot={() => rebootVM(vm.id)} 
            onDelete={() => {
              setModalConfig({
                isOpen: true,
                title: "Supprimer la VM",
                message: <p>Êtes-vous sûr de vouloir supprimer définitivement la machine <strong>{vm.name}</strong> ? Cette action est irréversible.</p>,
                type: 'danger',
                confirmLabel: 'Supprimer',
                onConfirm: () => {
                  deleteVM(vm.id);
                  router.push('/dashboard/mes-vms');
                }
              });
            }}
          />
        </div>
      </div>

      {isExpired && (
        <div className="expiry-banner">
          <div className="expiry-banner-content">
            <div className="expiry-icon-wrap">
              <Icon name="info" size={24} />
            </div>
            <div className="expiry-text">
              <h3>Session expirée</h3>
              <p>Cette machine virtuelle est verrouillée car sa session a expiré le {new Date(vm.lease_end).toLocaleString()}.</p>
            </div>
          </div>
          <button className="btn-extend" onClick={() => setModalConfig({
            isOpen: true,
            title: "Prolongation",
            message: "La fonctionnalité de prolongation de session est en cours de déploiement et sera disponible prochainement.",
            type: 'info',
            showConfirm: false
          })}>
            <Icon name="reboot" />
            Étendre la durée
          </button>
        </div>
      )}

      {/* 2. STATS GRID */}
      <div className={`vm-stats-grid ${isExpired ? 'vm-locked' : ''}`}>
        <StatCard label="vCPU" value={`${vm.vcpu} Cores`} usage={vm.cpu_usage} icon="cpu" />
        <StatCard label="RAM" value={`${vm.ram_gb} Go`} usage={vm.ram_usage} icon="ram" />
        <StatCard label="Stockage" value={`${vm.storage_gb} Go`} icon="disk" />
        <StatCard label="IP" value={vm.ip_address || 'Allocation...'} icon="network" />
      </div>

      {/* 3. DETAILS & SSH */}
      <div className="details-section">
        <div className="details-card">
          <div className="details-card-header">
            <Icon name="info" size={18} />
            Paramètres système
          </div>
          <div className="details-card-body">
            <EditableRow label="Nom de la machine" value={vm.name} field="name" editingField={editingField} editValue={editValue} onEdit={handleEdit} onSave={saveEdit} onChange={setEditValue} />
            <div className="detail-row"><span className="detail-label">OS</span><span className="detail-value">{vm.os_name || 'Inconnu'}</span></div>
            <EditableRow label="vCPU" value={`${vm.vcpu} Cores`} field="cpu" editingField={editingField} editValue={editValue} onEdit={handleEdit} onSave={saveEdit} onChange={setEditValue} type="number" />
            <EditableRow label="RAM" value={`${vm.ram_gb} Go`} field="ram" editingField={editingField} editValue={editValue} onEdit={handleEdit} onSave={saveEdit} onChange={setEditValue} type="number" />
            <div className="detail-row"><span className="detail-label">Créée le</span><span className="detail-value">{new Date(vm.lease_start).toLocaleDateString()}</span></div>
          </div>
        </div>

        <SSHCard 
          ip={vm.ip_address} 
          hasKey={!!vm.ssh_public_key} 
          onDownload={downloadKey} 
          osFamily={vm.os_family} 
          onOpenTerminal={() => setShowTerminal(true)}
          disabled={isExpired}
        />
      </div>

      {showTerminal && (
        <SSHTerminal 
          vmid={vm.id} 
          onClose={() => setShowTerminal(false)} 
        />
      )}

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        confirmLabel={modalConfig.confirmLabel}
        showConfirm={modalConfig.showConfirm}
      >
        {modalConfig.message}
      </Modal>
    </div>
  );
}

// SUB-COMPONENTS
function VMNotFound({ vmid, onBack }: any) {
  return (
    <div className="page active" style={{ padding: '40px' }}>
      <div className="vm-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff' }}>VM introuvable</h2>
        <p style={{ color: 'var(--g1-muted)', margin: '12px 0 24px' }}>L'identifiant {vmid} est incorrect.</p>
        <button className="btn-accent" onClick={onBack}>Retour à la liste</button>
      </div>
    </div>
  );
}

function StatCard({ label, value, usage, icon }: any) {
  return (
    <div className="stat-card">
      <div className="stat-card-label"><Icon name={icon} size={14} /> {label}</div>
      <div className="stat-card-value">{value}</div>
      {usage !== undefined && (
        <>
          <div className="stat-card-footer">Usage: {usage}%</div>
          <div className="usage-bar">
            <div className="usage-fill" style={{ width: `${usage}%`, background: usage > 80 ? 'var(--g1-err)' : 'var(--g1-accent2)' }}></div>
          </div>
        </>
      )}
    </div>
  );
}

function EditableRow({ label, value, field, editingField, editValue, onEdit, onSave, onChange, type = "text" }: any) {
  const isEditing = editingField === field;
  return (
    <div className="detail-row">
      <div className="detail-label">{label}</div>
      <div className="detail-value">
        {isEditing ? (
          <input 
            className="pm-input" 
            type={type} 
            style={{ padding: '4px 8px', width: '120px', height: '28px' }} 
            value={editValue} 
            onChange={e => onChange(e.target.value)} 
            onBlur={onSave} 
            autoFocus 
          />
        ) : (
          <span onClick={() => onEdit(field, value)} style={{ cursor: 'pointer', borderBottom: '1px dashed rgba(255,255,255,0.2)' }}>{value}</span>
        )}
      </div>
    </div>
  );
}

function SSHCard({ ip, hasKey, onDownload, osFamily, onOpenTerminal, disabled }: any) {
  return (
    <div className={`details-card ${disabled ? 'vm-locked' : ''}`} style={{ borderTopColor: 'var(--g1-accent2)' }}>
      <div className="details-card-header">
        <Icon name="lock" size={18} />
        Accès SSH
      </div>
      <div className="pm-body">
        <p style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '12px' }}>Connectez-vous via terminal :</p>
        <code style={{ display: 'block', background: '#030610', padding: '12px', borderRadius: '8px', border: '1px solid var(--g1-border)', color: 'var(--g1-accent)', fontSize: '12px' }}>
          ssh {osFamily === 'WINDOWS' ? 'Administrator' : 'user'}@{ip || 'IP'}
        </code>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          {hasKey && (
            <button className="btn-primary" style={{ flex: 1 }} onClick={onDownload}>
              <Icon name="download" />
              Clé
            </button>
          )}
          <button className="btn-accent" style={{ flex: 1 }} onClick={onOpenTerminal}>
            <Icon name="console" />
            Terminal
          </button>
        </div>

        {!hasKey && (
          <div className="pm-alert pm-alert-info" style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '12px' }}>Clé déjà téléchargée ou fournie.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButtons({ isRunning, isExpired, onStart, onStop, onReboot, onDelete }: any) {
  return (
    <>
      {isRunning ? (
        <button className="btn-vm btn-vm-stop" onClick={onStop} disabled={isExpired}>
          <Icon name="stop" />Arrêter
        </button>
      ) : (
        <button className="btn-vm btn-vm-start" onClick={onStart} disabled={isExpired}>
          <Icon name="start" />Démarrer
        </button>
      )}
      <button className="btn-vm" onClick={onReboot} disabled={isExpired}>
        <Icon name="reboot" />Reboot
      </button>
      <button className="btn-vm" style={{ color: 'var(--g1-err)' }} onClick={onDelete}>
        <Icon name="delete" />Delete
      </button>
    </>
  );
}
