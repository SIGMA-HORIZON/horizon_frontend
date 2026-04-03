
export default function DashboardHome() {
  return (
    <div className="page active">
      
    <div className="page active" id="pg-dashboard">
      <div className="welcome">
        <div className="welcome-left">
          <h2>Bonjour, Ornella</h2>
          <p>Vendredi 27 mars 2026 · 3 VMs actives · Cluster Horizon en ligne</p>
        </div>
        <div className="welcome-right">
          <button className="btn-ghost" >Voir mes VMs</button>
          <button className="btn-accent" >+ Nouvelle réservation</button>
        </div>
      </div>

      <div className="vm-status-row">
        <div className="vm-status-card selected" >
          <div className="vsc-top">
            <div><div className="vsc-name">vm-ml-ornella-01</div><div className="vsc-id">VMID 101</div></div>
            <span className="badge badge-on">● Running</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--g1-muted)' }}>
            <span>CPU <b style={{ color: 'var(--g1-text)' }}>64%</b></span>
            <span>RAM <b style={{ color: 'var(--g1-text)' }}>58%</b></span>
            <span>Ubuntu 22.04</span>
          </div>
          <div className="vsc-meta">node-01 · 10.0.1.1 · 8 vCPU · 16 Go</div>
        </div>
        <div className="vm-status-card" >
          <div className="vsc-top">
            <div><div className="vsc-name">vm-dev-ornella-02</div><div className="vsc-id">VMID 102</div></div>
            <span className="badge badge-on">● Running</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--g1-muted)' }}>
            <span>CPU <b style={{ color: 'var(--g1-text)' }}>22%</b></span>
            <span>RAM <b style={{ color: 'var(--g1-text)' }}>34%</b></span>
            <span>Debian 12</span>
          </div>
          <div className="vsc-meta">node-02 · 10.0.1.2 · 4 vCPU · 8 Go</div>
        </div>
        <div className="vm-status-card" >
          <div className="vsc-top">
            <div><div className="vsc-name">vm-gpu-ornella-03</div><div className="vsc-id">VMID 103</div></div>
            <span className="badge badge-warn">⚠ High CPU</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--g1-muted)' }}>
            <span>CPU <b style={{ color: '#92400E' }}>91%</b></span>
            <span>RAM <b style={{ color: 'var(--g1-text)' }}>80%</b></span>
            <span>Ubuntu 22.04</span>
          </div>
          <div className="vsc-meta">node-03 · 10.0.1.3 · 16 vCPU · 64 Go · 2 GPU</div>
        </div>
      </div>

      
      <div className="vm-panel" id="dash-vm-panel">
        <div className="vm-panel-hdr">
          <div>
            <div className="vm-panel-title" id="dash-vd-title">vm-ml-ornella-01</div>
            <div className="vm-panel-meta" id="dash-vd-meta">VMID 101 · node-01 · Ubuntu 22.04 · <span style={{ color: 'var(--g1-on)', fontWeight: '600' }}>Running</span></div>
          </div>
          <div className="vm-actions">
            <button className="btn-vm btn-vm-console" >
              <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>Console
            </button>
            <button className="btn-vm btn-vm-stop" id="dash-startstop">
              <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Stop
            </button>
            <button className="btn-vm">
              <svg viewBox="0 0 24 24"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>Redémarrer
            </button>
          </div>
        </div>
        <div className="vm-tabs" id="dash-vm-tabs">
          <div className="vm-tab active" >Summary</div>
          <div className="vm-tab" >Console</div>
          <div className="vm-tab" >Hardware</div>
          <div className="vm-tab" >Cloud-init</div>
          <div className="vm-tab" >Options</div>
          <div className="vm-tab" >Task history</div>
          <div className="vm-tab" >Monitor</div>
          <div className="vm-tab" >Backup</div>
          <div className="vm-tab" >Snapshots</div>
          <div className="vm-tab" >Firewall</div>
          <div className="vm-tab" >Permissions</div>
        </div>
        <div className="vm-tab-body" id="dash-tab-body"></div>
      </div>
    </div>

    
    </div>
  )
}
