
"use client";
import { useRouter } from 'next/navigation';

export default function MesVMs() {
  const router = useRouter();

  return (
    <div className="page active">
      <div style={{ paddingBottom: '20px' }}>
         <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Mes VMs</h1>
         <button className="btn-accent" style={{ marginTop: '5px' }} onClick={() => window.dispatchEvent(new Event('open-create-vm'))}>+ Créer une VM</button>
      </div>

      <div className="vm-panel" style={{ marginBottom: '14px' }}>
        <table>
          <thead style={{ background: '#F8FAFD' }}>
            <tr>
              <th style={{ padding: '10px 16px' }}>VM</th>
              <th>Statut</th>
              <th>OS</th>
              <th>CPU</th>
              <th>RAM</th>
              <th>IP</th>
              <th>Nœud</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => router.push('/dashboard/mes-vms/vm-ml-01')} style={{ cursor: 'pointer' }}>
              <td style={{ padding: '10px 16px' }}><div style={{ fontWeight: 600, fontSize: '12px' }}>vm-ml-ornella-01</div><div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>VMID 101</div></td>
              <td><span className="badge badge-on">● Running</span></td>
              <td><span className="badge badge-blue">Ubuntu 22.04</span></td>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>64%<div className="mini-bar"><div className="mini-fill mini-fill-warn" style={{ width: '64%' }}></div></div></div></td>
              <td style={{ fontSize: '12px' }}>9.2 / 16 Go</td>
              <td style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>10.0.1.1</td>
              <td><span className="badge badge-off">node-01</span></td>
              <td>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="btn-vm btn-vm-console" style={{ fontSize: '10px', padding: '3px 8px' }}>Console</button>
                  <button className="btn-vm btn-vm-stop" style={{ fontSize: '10px', padding: '3px 8px' }}>Stop</button>
                </div>
              </td>
            </tr>
            <tr onClick={() => router.push('/dashboard/mes-vms/vm-dev-02')} style={{ cursor: 'pointer' }}>
              <td style={{ padding: '10px 16px' }}><div style={{ fontWeight: 600, fontSize: '12px' }}>vm-dev-ornella-02</div><div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>VMID 102</div></td>
              <td><span className="badge badge-on">● Running</span></td>
              <td><span className="badge badge-blue">Debian 12</span></td>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>22%<div className="mini-bar"><div className="mini-fill" style={{ width: '22%' }}></div></div></div></td>
              <td style={{ fontSize: '12px' }}>2.7 / 8 Go</td>
              <td style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>10.0.1.2</td>
              <td><span className="badge badge-off">node-02</span></td>
              <td>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="btn-vm btn-vm-console" style={{ fontSize: '10px', padding: '3px 8px' }}>Console</button>
                  <button className="btn-vm btn-vm-stop" style={{ fontSize: '10px', padding: '3px 8px' }}>Stop</button>
                </div>
              </td>
            </tr>
            <tr onClick={() => router.push('/dashboard/mes-vms/vm-gpu-03')} style={{ cursor: 'pointer' }}>
              <td style={{ padding: '10px 16px' }}><div style={{ fontWeight: 600, fontSize: '12px' }}>vm-gpu-ornella-03</div><div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>VMID 103</div></td>
              <td><span className="badge badge-warn">⚠ High CPU</span></td>
              <td><span className="badge badge-blue">Ubuntu 22.04</span></td>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>91%<div className="mini-bar"><div className="mini-fill mini-fill-err" style={{ width: '91%' }}></div></div></div></td>
              <td style={{ fontSize: '12px' }}>51.2 / 64 Go</td>
              <td style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>10.0.1.3</td>
              <td><span className="badge badge-off">node-03</span></td>
              <td>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="btn-vm btn-vm-console" style={{ fontSize: '10px', padding: '3px 8px' }}>Console</button>
                  <button className="btn-vm btn-vm-stop" style={{ fontSize: '10px', padding: '3px 8px' }}>Stop</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
