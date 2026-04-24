"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { vmService } from '@/services/vms';
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
  ssh_public_key?: string;
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
  clusterStatus: any;
  quota: any;
  refreshVMs: () => Promise<void>;
  refreshClusterStatus: () => Promise<void>;
  refreshQuota: () => Promise<void>;
  addVM: (data: any) => Promise<any>;
  deleteVM: (vmid: string) => Promise<void>;
  startVM: (vmid: string) => Promise<void>;
  stopVM: (vmid: string) => Promise<void>;
  rebootVM: (vmid: string) => Promise<void>;
  pauseVM: (vmid: string) => Promise<void>;
  extendVM: (vmid: string, hours: number) => Promise<void>;
  updateVM: (vmid: string, data: any) => Promise<void>;
  refreshSingleVM: (vmid: string) => Promise<void>;
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
  const [clusterStatus, setClusterStatus] = useState<any>(null);
  const [quota, setQuota] = useState<any>(null);

  const refreshVMs = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await (vmService as any).listVms();
      setVMs(data.items || []);
    } catch (error) {
      console.error("Failed to fetch VMs:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshVMs();
    refreshClusterStatus();
    refreshQuota();
  }, [refreshVMs]);

  const refreshClusterStatus = async () => {
    try {
      const { adminService } = await import('@/services/admin');
      const status = await adminService.getClusterStatus();
      setClusterStatus(status);
    } catch (error) {
      console.error("Failed to fetch cluster status:", error);
    }
  };

  const refreshQuota = async () => {
    // Placeholder for refreshQuota - implementation should be added when endpoint is available
    console.warn("refreshQuota is not implemented yet");
  };

  const refreshSingleVM = async (vmid: string) => {
    try {
      const updatedVM = await (vmService as any).getVm(vmid);
      setVMs(current => current.map(v => v.id === vmid ? updatedVM : v));
    } catch (error) {
      console.error("Failed to refresh single VM:", error);
    }
  };

  const addVM = async (data: any) => {
    const newVM = await (vmService as any).createVm(data);
    await refreshVMs();
    await refreshQuota();
    return newVM;
  };

  const deleteVM = async (vmid: string) => {
    await (vmService as any).deleteVm(vmid);
    await refreshVMs();
    await refreshQuota();
  };

  const stopVM = async (vmid: string) => {
    await (vmService as any).stopVm(vmid);
    await refreshVMs();
    await refreshQuota();
  };

  const startVM = async (vmid: string) => {
    await (vmService as any).startVm(vmid);
    await refreshVMs();
    await refreshQuota();
  };

  const rebootVM = async (vmid: string) => {
    await (vmService as any).rebootVm(vmid);
    await refreshVMs();
  };

  const pauseVM = async (vmid: string) => {
    await (vmService as any).pauseVm(vmid);
    await refreshVMs();
  };

  const extendVM = async (vmid: string, hours: number) => {
    await (vmService as any).extendVm(vmid, hours);
    await refreshVMs();
    await refreshQuota();
  };

  const updateVM = async (vmid: string, data: any) => {
    const backendData: any = {};
    if (data.cpu !== undefined) backendData.vcpu = data.cpu;
    if (data.ram) backendData.ram_gb = parseFloat(data.ram);
    if (data.storage) backendData.storage_gb = parseFloat(data.storage);
    if (data.name) backendData.name = data.name;

    await (vmService as any).updateVm(vmid, backendData);
    await refreshVMs();
    await refreshQuota();
  };

  return (
    <VMContext.Provider value={{
      vms,
      loading,
      reservations,
      clusterStatus,
      quota,
      refreshVMs,
      refreshClusterStatus,
      refreshQuota,
      addVM,
      deleteVM,
      startVM,
      stopVM,
      rebootVM,
      pauseVM,
      extendVM,
      updateVM,
      refreshSingleVM
    }}>
      {children}
    </VMContext.Provider>
  );
};
