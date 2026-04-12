import api from '../utils/api';

export interface VM {
    id: string;
    proxmox_vmid: number;
    name: string;
    description: string | null;
    vcpu: number;
    ram_gb: number;
    storage_gb: number;
    status: string;
    lease_start: string;
    lease_end: string;
    ip_address: string | null;
}

export interface VMListResponse {
    items: VM[];
}

export const vmService = {
    getVms: async (): Promise<VM[]> => {
        const response = await api.get<VMListResponse>('/vms');
        return response.data.items;
    },

    createVm: async (data: any) => {
        const response = await api.post<VM>('/vms', data);
        return response.data;
    },

    getVmDetails: async (id: string): Promise<VM> => {
        const response = await api.get<VM>(`/vms/${id}`);
        return response.data;
    },

    stopVm: async (id: string) => {
        const response = await api.post<{ message: string }>(`/vms/${id}/stop`);
        return response.data;
    },

    deleteVm: async (id: string) => {
        await api.delete(`/vms/${id}`);
    },

    extendLease: async (id: string, additionalHours: number) => {
        const response = await api.post<VM>(`/vms/${id}/extend`, { additional_hours: additionalHours });
        return response.data;
    },

    downloadSshKey: async (id: string) => {
        const response = await api.get<{ ssh_public_key: string; warning: string }>(`/vms/${id}/ssh-key`);
        return response.data;
    }
};
