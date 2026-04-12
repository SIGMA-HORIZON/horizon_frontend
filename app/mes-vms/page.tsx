"use client";

import React, { useState, useEffect } from 'react';
import { vmService, VM } from '../services/vm.service';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MesVMs = () => {
    const [vms, setVms] = useState<VM[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchVms = async () => {
            try {
                setLoading(true);
                const data = await vmService.getVms();
                setVms(data);
            } catch (err: any) {
                console.error('Error fetching VMs:', err);
                setError('Impossible de récupérer la liste des machines virtuelles.');
                if (err.response?.status === 401) {
                    router.push('/connexion');
                }
            } finally {
                setLoading(false);
            }
        };

        if (!authService.isAuthenticated()) {
            router.push('/connexion');
        } else {
            fetchVms();
        }
    }, [router]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'running':
                return '#00e676'; // Vibrant green
            case 'stopped':
                return '#ff5252'; // Vibrant red
            case 'provisioning':
                return '#2196f3'; // Blue
            case 'suspended':
                return '#ff9800'; // Orange
            default:
                return '#9e9e9e';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#050B15] text-white">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-cyan-400 font-medium animate-pulse">Initialisation de la flotte...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8 pt-24 font-['DM_Sans',sans-serif]">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></span>
                            <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">Infrastucture</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Mes Machines Virtuelles</h1>
                        <p className="text-slate-400 mt-2">Gérez vos instances de calcul haute performance sur le cluster Horizon.</p>
                    </div>

                    <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-900/40 flex items-center gap-2 group active:scale-95">
                        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Déployer une instance
                    </button>
                </div>

                {error ? (
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center gap-4 text-red-400">
                        <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p>{error}</p>
                    </div>
                ) : vms.length === 0 ? (
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-20 rounded-3xl text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aucune machine active</h3>
                        <p className="text-slate-400 max-w-md mx-auto mb-8">Vous n'avez pas encore déployé de machine virtuelle. Commencez par en créer une via le bouton de déploiement.</p>
                        <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all">
                            Explorer les catalogues
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vms.map((vm) => (
                            <div key={vm.id} className="group bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 p-6 rounded-3xl transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-3 bg-slate-800 rounded-2xl group-hover:bg-cyan-900/30 transition-colors">
                                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-slate-800">
                                        <span
                                            className="w-2 h-2 rounded-full animate-pulse"
                                            style={{ backgroundColor: getStatusColor(vm.status) }}
                                        ></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            {vm.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{vm.name}</h3>
                                <p className="text-xs text-slate-500 font-mono mt-1">ID: {vm.id.substring(0, 8)}... — VMID: {vm.proxmox_vmid}</p>

                                <div className="grid grid-cols-3 gap-4 my-8">
                                    <div className="text-center">
                                        <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">CPU</div>
                                        <div className="text-white font-bold">{vm.vcpu} vCores</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">RAM</div>
                                        <div className="text-white font-bold">{vm.ram_gb} Go</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Disk</div>
                                        <div className="text-white font-bold">{vm.storage_gb} Go</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-2xl border border-slate-800">
                                        <div className="text-slate-400 text-xs">Adresse IP</div>
                                        <div className="text-cyan-400 font-mono text-sm font-bold">{vm.ip_address || 'En attente...'}</div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => router.push(`/dashboard/mes-vms/${vm.id}`)}
                                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
                                        >
                                            Détails
                                        </button>
                                        <button
                                            className="p-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 text-slate-400 rounded-xl transition-all"
                                            title="Arrêter"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MesVMs;
