"use client";
import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';

const MENU_ITEMS = [
  'Summary', 'Console', 'Hardware', 'Snapshots',
  'Firewalls'
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Summary');
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await adminService.proxmoxGetSummary();
        setSummary(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du résumé Proxmox:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  const onlineNodes = summary?.nodes?.filter((n: any) => n.status === 'online')?.length || 0;
  const offlineNodes = (summary?.nodes?.length || 0) - onlineNodes;

  return (
    <div className="page active" style={{ padding: '0 20px 40px', height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--g1-text)' }}>Datacenter</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn-ghost" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => window.location.reload()}>Actualiser</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flex: 1, alignItems: 'flex-start' }}>

        {/* LEFT LIST FRAME */}
        <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid var(--g1-border)', paddingRight: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {MENU_ITEMS.map(item => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', background: activeTab === item ? 'rgba(37,99,235,0.1)' : 'transparent', color: activeTab === item ? '#60A5FA' : 'var(--g1-text)', fontWeight: activeTab === item ? 600 : 400, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}>
              <div style={{ width: '12px', height: '12px', background: activeTab === item ? '#60A5FA' : 'var(--g1-muted)', borderRadius: '2px' }}></div>
              {item}
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT FRAME */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {activeTab === 'Summary' ? (
            <>
              {/* HEALTH */}
              <div className="pm-card" style={{ padding: '20px', animation: 'fadeUp 0.3s ease' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6', marginBottom: '24px' }}>Health</div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '16px' }}>Status</div>
                    <div style={{ width: '48px', height: '48px', background: onlineNodes > 0 ? '#22c55e' : '#ef4444', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>
                      {onlineNodes > 0 ? '✓' : '✕'}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '12px', color: 'var(--g1-text)' }}>
                      Cluster Proxmox: {onlineNodes > 0 ? 'ONLINE' : 'OFFLINE'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '16px' }}>Nodes</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '24px' }}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#22c55e', fontSize: '16px' }}>✓</span> Online</span> <span style={{ fontWeight: 600 }}>{onlineNodes}</span></div>
                      <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '24px' }}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ef4444', fontSize: '16px' }}>✕</span> Offline</span> <span style={{ fontWeight: 600 }}>{offlineNodes}</span></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '16px' }}>API Proxmox</div>
                    <div style={{ width: '48px', height: '48px', background: summary ? '#22c55e' : '#64748b', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>
                      {summary ? '✓' : '?'}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '12px', color: 'var(--g1-text)' }}>{summary ? 'CONNECTÉ' : 'VÉRIFICATION...'}</div>
                  </div>
                </div>
              </div>

              {/* GUESTS */}
              <div className="pm-card" style={{ padding: '20px', animation: 'fadeUp 0.3s ease 0.1s both' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6', marginBottom: '16px' }}>Guests</div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ flex: 1, padding: '10px' }}>
                    <div style={{ fontWeight: 600, marginBottom: '20px', textAlign: 'center' }}>Machines Virtuelles (QEMU)</div>
                    <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                        <span><span style={{ color: '#22c55e', marginRight: '6px' }}>●</span> Running</span>
                        <span style={{ fontWeight: 600 }}>{summary?.active_vms || 0}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                        <span><span style={{ color: 'var(--g1-muted)', marginRight: '6px' }}>●</span> Total</span>
                        <span style={{ fontWeight: 600 }}>{summary?.total_vms || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NODES LIST */}
              <div className="pm-card" style={{ animation: 'fadeUp 0.3s ease 0.3s both' }}>
                <div style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#3b82f6', borderBottom: '1px solid var(--g1-border)' }}>
                  Nodes ({summary?.nodes?.length || 0})
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--g1-border)' }}>
                    <tr>
                      <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--g1-muted)' }}>Name</th>
                      <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--g1-muted)' }}>Status</th>
                      <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--g1-muted)' }}>CPU usage</th>
                      <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--g1-muted)' }}>Memory usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary?.nodes?.map((node: any) => (
                      <tr key={node.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 20px', color: 'var(--g1-text)', fontWeight: 600 }}>{node.name}</td>
                        <td style={{ padding: '12px 20px', color: node.status === 'online' ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>
                          {node.status === 'online' ? '✓ Online' : '✕ Offline'}
                        </td>
                        <td style={{ padding: '12px 20px' }}>
                          <div style={{ background: 'rgba(59,130,246,0.1)', color: '#60A5FA', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                            {(node.cpu * 100).toFixed(1)}%
                          </div>
                        </td>
                        <td style={{ padding: '12px 20px' }}>
                          <div style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                            {node.memory.total > 0 ? ((node.memory.used / node.memory.total) * 100).toFixed(1) : 0}%
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!summary || summary.nodes.length === 0) && (
                      <tr>
                        <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'var(--g1-muted)' }}>
                          Aucun nœud détecté ou Proxmox inaccessible.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="pm-card" style={{ padding: '64px 32px', textAlign: 'center', color: 'var(--g1-muted)', animation: 'fadeUp 0.3s ease' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}>🛠</div>
              L'interface <strong style={{ color: 'var(--cyan)' }}>{activeTab}</strong> n'est pas encore implémentée dans cette maquette.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
