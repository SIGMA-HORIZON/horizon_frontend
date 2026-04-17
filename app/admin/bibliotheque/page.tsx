"use client";
import React, { useState } from 'react';

export default function OSBibliotheque() {
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' or 'isos'

  const [images, setImages] = useState([
    { id: 1, name: 'Ubuntu Server 22.04 LTS', status: 'badge-on', statusText: 'Stable', desc: "Distribution Linux stable avec support cloud-init natif et configuration réseau prête à l'emploi.", color: 'var(--g1-accent2)', size: '2.1 Go', deploys: 142 },
    { id: 2, name: 'Debian 12 (Bookworm)', status: 'badge-on', statusText: 'Stable', desc: "Template minimal pur Debian sans outils pré-installés pour charges de travail légères.", color: 'var(--g1-accent)', size: '1.4 Go', deploys: 58 },
    { id: 3, name: 'Fedora 38', status: 'badge-warn', statusText: 'Obsolète (Bientôt)', desc: "Image Fedora pour environnements de bureau et test avec stack technologique récente.", color: 'var(--g1-warn)', size: '2.8 Go', deploys: 12 }
  ]);

  const [isos, setIsos] = useState([
    { id: 1, name: 'ubuntu-24.04-live-server-amd64.iso', size: '2.4 Go', uploadDate: '2024-03-15', status: 'ready' },
    { id: 2, name: 'kali-linux-2024.1-live-amd64.iso', size: '3.8 Go', uploadDate: '2024-03-10', status: 'ready' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIsoModalOpen, setIsIsoModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSize, setNewSize] = useState('1.0 Go');

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    const newImage = {
      id: Date.now(),
      name: newName || 'Nouvelle Image OS',
      status: 'badge-on',
      statusText: 'Nouveau',
      desc: newDesc || 'Description personnalisée pour cette image OS.',
      color: 'var(--g1-accent2)',
      size: newSize,
      deploys: 0
    };
    setImages([...images, newImage]);
    setIsModalOpen(false);
    setNewName('');
    setNewDesc('');
    setNewSize('1.0 Go');
  };

  const handleUploadIso = () => {
    alert("Le téléversement sécurisé vers le stockage Proxmox est en cours de simulation...");
    setIsIsoModalOpen(false);
  };

  return (
    <div className="page active" style={{ padding: '0 20px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--g1-text)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Bibliothèque & ISO</h1>
          <p style={{ color: 'var(--g1-muted)', fontSize: '14px' }}>Gérez les images templates et téléchargez des fichiers ISO pour vos installations personnalisées.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px', height: 'fit-content' }}>
            <button
              onClick={() => setActiveTab('templates')}
              style={{ padding: '8px 16px', border: 'none', background: activeTab === 'templates' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'templates' ? 'white' : 'var(--g1-muted)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            >Templates</button>
            <button
              onClick={() => setActiveTab('isos')}
              style={{ padding: '8px 16px', border: 'none', background: activeTab === 'isos' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'isos' ? 'white' : 'var(--g1-muted)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            >Fichiers ISO</button>
          </div>
          {activeTab === 'templates' ? (
            <button className="btn-accent" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nouvel OS
            </button>
          ) : (
            <button className="btn-accent" onClick={() => setIsIsoModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#2563EB' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Téléverser ISO
            </button>
          )}
        </div>
      </div>

      {activeTab === 'templates' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {images.map(img => (
            <div key={img.id} className="pm-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: img.color }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                </div>
                <span className={`badge ${img.status}`}>{img.statusText}</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--g1-text)', marginBottom: '6px' }}>{img.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--g1-muted)', marginBottom: '16px', lineHeight: '1.5' }}>{img.desc}</p>
              <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--g1-border)', paddingTop: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Taille Base</div>
                  <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>{img.size}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'var(--g1-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Déploiements</div>
                  <div style={{ fontSize: '13px', color: 'var(--g1-text)', fontWeight: 600 }}>{img.deploys}</div>
                </div>
                <div>
                  <button className="btn-ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Éditer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pm-card">
          <div className="pm-hdr">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            Fichiers ISO disponibles (Stockage Principal)
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                <tr>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600 }}>Nom du fichier</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600 }}>Taille</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600 }}>Date d'ajout</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: 'var(--g1-muted)', fontWeight: 600 }}>Statut</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right', color: 'var(--g1-muted)', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isos.map(iso => (
                  <tr key={iso.id}>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'white', fontWeight: 500 }}>{iso.name}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-muted)' }}>{iso.size}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--g1-muted)' }}>{iso.uploadDate}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span className="badge badge-on">PRÊT</span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'right' }}>
                      <button className="btn-ghost" style={{ fontSize: '11px', color: '#EF4444' }}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ISO Upload Modal Simulation */}
      {isIsoModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#0F1623', borderRadius: '16px', width: '100%', maxWidth: '450px', border: '1px solid var(--g1-border)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ padding: '24px 32px 16px', borderBottom: '1px solid var(--g1-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#F8FAFC', margin: 0 }}>Téléverser un fichier ISO</h2>
              <button onClick={() => setIsIsoModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ border: '2px dashed var(--g1-border)', borderRadius: '12px', padding: '40px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', marginBottom: '24px' }}>
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--cyan)" fill="none" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.6 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <div style={{ fontSize: '15px', color: 'white', marginBottom: '8px', fontWeight: 600 }}>Glissez votre fichier ISO ici</div>
                <div style={{ fontSize: '12px', color: 'var(--g1-muted)' }}>Taille max : 5.0 Go . Format supporté : .iso</div>
                <button style={{ marginTop: '20px', padding: '8px 16px', background: 'white', color: 'black', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Parcourir les fichiers</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setIsIsoModalOpen(false)} style={{ padding: '10px 18px', background: 'transparent', border: '1px solid var(--g1-border)', color: '#F8FAFC', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
                <button onClick={handleUploadIso} style={{ padding: '10px 18px', background: '#2563EB', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Démarrer l'envoi</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#0F1623', borderRadius: '16px', width: '100%', maxWidth: '450px', border: '1px solid var(--g1-border)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ padding: '24px 32px 16px', borderBottom: '1px solid var(--g1-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#F8FAFC', margin: 0 }}>Ajouter une image OS</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleAddImage} style={{ padding: '24px 32px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px' }}>Nom de l'image</label>
                <input required type="text" placeholder="Ex: Alpine Linux 3.18" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--g1-border)', borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px' }}>Description</label>
                <textarea required placeholder="Distribution ultra légère..." value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--g1-border)', borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none', minHeight: '80px', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px' }}>Taille (Go)</label>
                <input required type="text" placeholder="Ex: 0.5 Go" value={newSize} onChange={e => setNewSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--g1-border)', borderRadius: '8px', color: '#F8FAFC', fontSize: '14px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 18px', background: 'transparent', border: '1px solid var(--g1-border)', color: '#F8FAFC', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
                <button type="submit" style={{ padding: '10px 18px', background: '#2563EB', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
