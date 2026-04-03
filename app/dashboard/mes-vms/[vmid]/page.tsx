
"use client";
import { useParams } from 'next/navigation';

export default function VMDetails() {
  const params = useParams();
  const vmid = params.vmid;

  return (
    <div className="page active" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Détails de la VM: {vmid}</h2>
      
      <div className="vm-panel" id="myvms-vm-panel">
        <div className="vm-panel-hdr">
          <div>
            <div className="vm-panel-title">{vmid}</div>
            <div className="vm-panel-meta">VMID XXX · node-01 · Ubuntu 22.04 · <span style={{ color: 'var(--g1-on)', fontWeight: 600 }}>Running</span></div>
          </div>
          <div className="vm-actions">
            <button className="btn-vm btn-vm-console">
              <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>Console
            </button>
            <button className="btn-vm btn-vm-stop">
              <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Stop
            </button>
            <button className="btn-vm">
              <svg viewBox="0 0 24 24"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>Redémarrer
            </button>
          </div>
        </div>
        <div className="vm-tabs">
          <div className="vm-tab active">Summary</div>
          <div className="vm-tab">Console</div>
          <div className="vm-tab">Hardware</div>
          <div className="vm-tab">Cloud-init</div>
          <div className="vm-tab">Options</div>
          <div className="vm-tab">Tasks history</div>
          <div className="vm-tab">Monitor</div>
          <div className="vm-tab">Backup</div>
          <div className="vm-tab">Snapshots</div>
          <div className="vm-tab">Firewall</div>
          <div className="vm-tab">Permissions</div>
        </div>
        <div className="vm-tab-body">
          <p style={{ padding: '20px' }}>Les onglets de gestion de la machine {vmid} se trouvent ici.</p>
        </div>
      </div>
    </div>
  )
}
