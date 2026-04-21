"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { vmService } from '../../services/vms';
import { useAuth } from '../../context/AuthContext';

export interface VM {
  id: string;
  proxmox_vmid: number;
  name: string;
  description?: string;
  vcpu: number;
  ram_gb: number;
  storage_gb: number;
  status: string;
  lease_start: string;
  lease_end: string;
  ip_address?: string;
  // UI helpers (calculated or mocked)
  cpu_usage?: number;
  ram_usage?: number;
}

export interface Reservation {
  id: string;
  name: string;
  os: string;
  cpu: number;
  ram: string;
  storage: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface VMContextType {
  vms: VM[];
  loading: boolean;
  reservations: Reservation[];
  quota: any;
  refreshVMs: () => Promise<void>;
  refreshSingleVM: (vmid: string) => Promise<void>;
  refreshQuota: () => Promise<void>;
  addVM: (data: any) => Promise<any>;
  deleteVM: (vmid: string) => Promise<void>;
  stopVM: (vmid: string) => Promise<void>;
  startVM: (vmid: string) => Promise<void>;
  extendVM: (vmid: string, hours: number) => Promise<void>;
  updateVM: (vmid: string, data: any) => Promise<void>;
}

export const VMContext = createContext<VMContextType | null>(null);

export const useVMs = () => {
  const context = useContext(VMContext);
  if (!context) throw new Error('useVMs must be used within VMProvider');
  return context;
};

export const VMProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [vms, setVMs] = useState<VM[]>([]);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [quota, setQuota] = useState<any>(null);

  const refreshQuota = useCallback(async () => {
    if (!user) return;
    try {
      const data = await vmService.getQuota();
      setQuota(data);
    } catch (error) {
      console.error("Failed to fetch quota:", error);
    }
  }, [user]);

  const refreshVMs = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await vmService.listVms();
      // Map API data to our expected UI format if needed
      setVMs(data.items || []);
    } catch (error) {
      console.error("Failed to fetch VMs:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const refreshSingleVM = useCallback(async (vmid: string) => {
    try {
      const updatedVm = await vmService.getVm(vmid);
      setVMs(prev => prev.map(v => v.id === vmid ? updatedVm : v));
    } catch (error) {
      console.error("Failed to refresh single VM:", error);
    }
  }, []);

  useEffect(() => {
    refreshVMs();
    refreshQuota();
  }, [refreshVMs, refreshQuota]);

  const addVM = async (data: any) => {
    const newVM = await vmService.createVm(data);
    await refreshVMs();
    await refreshQuota();
    return newVM;
  };

  const deleteVM = async (vmid: string) => {
    await vmService.deleteVm(vmid);
    await refreshVMs();
    await refreshQuota();
  };

  const stopVM = async (vmid: string) => {
    await vmService.stopVm(vmid);
    await refreshVMs();
    await refreshQuota();
  };

  const startVM = async (vmid: string) => {
    await vmService.startVm(vmid);
    await refreshVMs();
    await refreshQuota();
  };

  const extendVM = async (vmid: string, hours: number) => {
    await vmService.extendVm(vmid, hours);
    await refreshVMs();
    await refreshQuota();
  };

  const updateVM = async (vmid: string, data: any) => {
    // Mapping frontend fields to backend if necessary
    const backendData: any = {};
    if (data.cpu !== undefined) backendData.vcpu = data.cpu;
    if (data.ram) backendData.ram_gb = parseFloat(data.ram);
    if (data.storage) backendData.storage_gb = parseFloat(data.storage);
    if (data.name) backendData.name = data.name;

    await vmService.updateVm(vmid, backendData);
    await refreshVMs();
    await refreshQuota();
  };

  return (
    <VMContext.Provider value={{
      vms,
      loading,
      reservations,
      quota,
      refreshVMs,
      refreshSingleVM,
      refreshQuota,
      addVM,
      deleteVM,
      stopVM,
      startVM,
      extendVM,
      updateVM
    }}>
      {children}
    </VMContext.Provider>
  );
};
