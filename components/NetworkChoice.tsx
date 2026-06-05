"use client";

import React from 'react';

export interface NetworkGroup {
  vlan_id: number;
  vm_count: number;
  vm_names: string[];
}

interface NetworkChoiceProps {
  sharedNetwork: boolean;
  sharedVlanId: number | null;
  networkGroups: NetworkGroup[];
  onSharedNetworkChange: (shared: boolean) => void;
  onSharedVlanIdChange: (vlanId: number | null) => void;
  disabled?: boolean;
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '14px 16px',
  borderRadius: '10px',
  border: '1px solid var(--g1-border, #CBD5E1)',
  background: 'var(--g1-bg-alt, rgba(0,0,0,0.02))',
  cursor: 'pointer',
  transition: 'border-color 0.2s, background 0.2s',
};

const selectedCardStyle: React.CSSProperties = {
  ...cardStyle,
  borderColor: 'var(--g1-accent2, #2563EB)',
  background: 'var(--g1-tag, rgba(37,99,235,0.1))',
};

export default function NetworkChoice({
  sharedNetwork,
  sharedVlanId,
  networkGroups,
  onSharedNetworkChange,
  onSharedVlanIdChange,
  disabled = false,
}: NetworkChoiceProps) {
  const hasGroups = networkGroups.length > 0;
  const selectedGroup = networkGroups.find(g => g.vlan_id === sharedVlanId)
    ?? networkGroups[0]
    ?? null;

  const handleSelectShared = () => {
    if (disabled) return;
    onSharedNetworkChange(true);
    if (networkGroups.length === 1) {
      onSharedVlanIdChange(networkGroups[0].vlan_id);
    } else if (networkGroups.length > 1 && sharedVlanId == null) {
      onSharedVlanIdChange(networkGroups[0].vlan_id);
    }
  };

  const handleSelectIsolated = () => {
    if (disabled) return;
    onSharedNetworkChange(false);
    onSharedVlanIdChange(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <label
          style={sharedNetwork ? selectedCardStyle : cardStyle}
          onClick={handleSelectShared}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="radio"
              name="network-mode"
              checked={sharedNetwork}
              onChange={handleSelectShared}
              disabled={disabled}
              style={{ accentColor: 'var(--g1-accent2, #2563EB)' }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--g1-text, #0F172A)' }}>
                Réseau partagé
              </div>
              <div style={{ fontSize: '12px', color: 'var(--g1-muted, #64748B)', marginTop: '2px' }}>
                {hasGroups
                  ? 'Même VLAN que vos VMs sélectionnées — communication possible entre elles'
                  : 'Premier réseau : un VLAN sera créé pour vos futures VMs'}
              </div>
            </div>
          </div>
        </label>

        <label
          style={!sharedNetwork ? selectedCardStyle : cardStyle}
          onClick={handleSelectIsolated}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="radio"
              name="network-mode"
              checked={!sharedNetwork}
              onChange={handleSelectIsolated}
              disabled={disabled}
              style={{ accentColor: 'var(--g1-accent2, #2563EB)' }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--g1-text, #0F172A)' }}>
                Réseau isolé
              </div>
              <div style={{ fontSize: '12px', color: 'var(--g1-muted, #64748B)', marginTop: '2px' }}>
                VLAN dédié — vos autres VMs ne pourront pas joindre celle-ci
              </div>
            </div>
          </div>
        </label>
      </div>

      {sharedNetwork && networkGroups.length > 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--g1-text, #1E293B)' }}>
            Rejoindre le réseau
          </label>
          <select
            value={sharedVlanId ?? selectedGroup?.vlan_id ?? ''}
            onChange={(e) => onSharedVlanIdChange(Number(e.target.value))}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid var(--g1-border, #CBD5E1)',
              background: 'var(--g1-card, #fff)',
              color: 'var(--g1-text, #0F172A)',
              width: '100%',
            }}
          >
            {networkGroups.map((g) => (
              <option key={g.vlan_id} value={g.vlan_id}>
                VLAN {g.vlan_id} — {g.vm_count} VM{g.vm_count > 1 ? 's' : ''} ({g.vm_names.slice(0, 3).join(', ')}
                {g.vm_names.length > 3 ? '…' : ''})
              </option>
            ))}
          </select>
        </div>
      )}

      {sharedNetwork && networkGroups.length === 1 && selectedGroup && (
        <p style={{ fontSize: '12px', color: 'var(--g1-muted, #64748B)', margin: 0 }}>
          Sera ajoutée au VLAN <strong>{selectedGroup.vlan_id}</strong> avec :{' '}
          {selectedGroup.vm_names.join(', ')}
        </p>
      )}

      {!sharedNetwork && (
        <p style={{ fontSize: '12px', color: 'var(--g1-muted, #64748B)', margin: 0 }}>
          Un nouveau VLAN isolé sera alloué automatiquement à cette VM.
        </p>
      )}
    </div>
  );
}
