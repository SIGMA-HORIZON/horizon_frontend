"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useVMs } from '../../VMContext';

export default function VMDetails() {
  const params = useParams();
  const router = useRouter();
  const vmid = params.vmid as string;
  const { vms, deleteVM, updateVM } = useVMs();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const vm = vms.find(v => v.id === vmid);

  if (!vm) {
    return (
      <div className="page active" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>VM introuvable</h2>
        <p>La machine virtuelle avec l'identifiant {vmid} n'existe pas ou a été supprimée.</p>
        <button className="btn-ghost" onClick={() => router.push('/dashboard/mes-vms')} style={{ marginTop: '20px' }}>Retour</button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la VM ${vm.name} ?`)) {
      deleteVM(vm.id);
      router.push('/dashboard/mes-vms');
    }
  };

  const startEdit = (field: string, currentValue: string | number) => {
    setEditingField(field);
    // Remove " Go" from storage/ram so we can edit it as a number 
    setEditValue(String(currentValue).replace(' Go', ''));
  };

  const saveEdit = () => {
    if (!editingField || !editValue) return;

    if (editingField === 'cpu') {
      updateVM(vm.id, { cpu: Number(editValue) });
    } else if (editingField === 'ram') {
      updateVM(vm.id, { ram: `${editValue} Go` });
    } else if (editingField === 'storage') {
      updateVM(vm.id, { storage: `${editValue} Go` });
    } else if (editingField === 'name') {
      updateVM(vm.id, { name: editValue });
    }

    setEditingField(null);
  };

  const tableHeaderStyle = { padding: '12px 16px', borderBottom: '1px solid #E2E8F0', textAlign: 'left' as const, color: '#64748B', fontWeight: 600, fontSize: '12px' };
  const tableDataStyle = { padding: '12px 16px', borderBottom: '1px solid #E2E8F0', fontSize: '14px', color: '#1E293B' };

  const editIcon = (
    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }}>
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  );

  return (
    <div className="page active" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Détails de la VM : {vm.name}</h2>

      <div className="vm-panel" id="myvms-vm-panel">
        <div className="vm-panel-hdr" style={{ borderBottom: 'none', paddingBottom: '0' }}>
          <div>
            <div className="vm-panel-title">{vm.name}</div>
            <div className="vm-panel-meta">VMID {vm.proxmox_vmid} · LINUX · <span style={{ color: vm.status === 'running' ? 'var(--g1-on)' : '#94A3B8', fontWeight: 600 }}>{vm.status.toUpperCase()}</span></div>
          </div>
          <div className="vm-actions">
            <button className="btn-vm btn-vm-console">
              <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>Console
            </button>
            <button className="btn-vm btn-vm-stop" disabled={vm.status !== 'running'}>
              <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>Stop
            </button>
            <button className="btn-vm">
              <svg viewBox="0 0 24 24"><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>Redémarrer
            </button>
            <button className="btn-vm" onClick={handleDelete} style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}>
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg>Supprimer
            </button>
          </div>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--g1-border)' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                <th style={tableHeaderStyle}>Paramètre</th>
                <th style={tableHeaderStyle}>Valeur Actuelle</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Nom */}
              <tr>
                <td style={tableDataStyle}><b>Nom de la VM</b></td>
                <td style={tableDataStyle}>
                  {editingField === 'name' ? (
                    <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} style={{ padding: '6px 10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--g1-border)', borderRadius: '4px', color: 'white' }} />
                  ) : vm.name}
                </td>
                <td style={tableDataStyle}>
                  {editingField === 'name' ? (
                    <button className="btn-accent" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={saveEdit}>Sauvegarder</button>
                  ) : (
                    <button className="btn-ghost" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => startEdit('name', vm.name)}>{editIcon}Modifier</button>
                  )}
                </td>
              </tr>
              {/* CPU */}
              <tr>
                <td style={tableDataStyle}><b>vCPU</b></td>
                <td style={tableDataStyle}>
                  {editingField === 'cpu' ? (
                    <input type="number" value={editValue} onChange={e => setEditValue(e.target.value)} style={{ padding: '6px 10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--g1-border)', borderRadius: '4px', width: '80px', color: 'white' }} />
                  ) : `${vm.vcpu} Cores`}
                  <span style={{ marginLeft: '10px', fontSize: '11px', color: 'var(--g1-muted)' }}>(Usage: {vm.cpu_usage || 0}%)</span>
                </td>
                <td style={tableDataStyle}>
                  {editingField === 'cpu' ? (
                    <button className="btn-accent" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={saveEdit}>Sauvegarder</button>
                  ) : (
                    <button className="btn-ghost" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => startEdit('cpu', vm.vcpu)}>{editIcon}Modifier</button>
                  )}
                </td>
              </tr>
              {/* RAM */}
              <tr>
                <td style={tableDataStyle}><b>Mémoire RAM</b></td>
                <td style={tableDataStyle}>
                  {editingField === 'ram' ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <input type="number" value={editValue} onChange={e => setEditValue(e.target.value)} style={{ padding: '6px 10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--g1-border)', borderRadius: '4px', width: '80px', color: 'white' }} />
                      <span>Go</span>
                    </div>
                  ) : `${vm.ram_gb} Go`}
                  <span style={{ marginLeft: '10px', fontSize: '11px', color: 'var(--g1-muted)' }}>(Usage: {vm.ram_usage || 0}%)</span>
                </td>
                <td style={tableDataStyle}>
                  {editingField === 'ram' ? (
                    <button className="btn-accent" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={saveEdit}>Sauvegarder</button>
                  ) : (
                    <button className="btn-ghost" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => startEdit('ram', vm.ram_gb)}>{editIcon}Modifier</button>
                  )}
                </td>
              </tr>
              {/* Stockage */}
              <tr>
                <td style={tableDataStyle}><b>Espace Disque</b></td>
                <td style={tableDataStyle}>
                  {editingField === 'storage' ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <input type="number" value={editValue} onChange={e => setEditValue(e.target.value)} style={{ padding: '6px 10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--g1-border)', borderRadius: '4px', width: '80px', color: 'white' }} />
                      <span>Go</span>
                    </div>
                  ) : `${vm.storage_gb} Go`}
                </td>
                <td style={tableDataStyle}>
                  {editingField === 'storage' ? (
                    <button className="btn-accent" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={saveEdit}>Sauvegarder</button>
                  ) : (
                    <button className="btn-ghost" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => startEdit('storage', vm.storage_gb)}>{editIcon}Modifier</button>
                  )}
                </td>
              </tr>
              {/* IP */}
              <tr>
                <td style={tableDataStyle}><b>Adresse IP</b></td>
                <td style={tableDataStyle}><code style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid var(--g1-border)' }}>{vm.ip_address || 'En attente...'}</code></td>
                <td style={tableDataStyle}><span style={{ fontSize: '11px', color: 'var(--g1-muted)' }}>Dynamique</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
