"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Icon } from '@/components/Icon';

interface SSHTerminalProps {
    vmid: string;
    onClose: () => void;
}

export default function SSHTerminal({ vmid, onClose }: SSHTerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<Terminal | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const [status, setStatus] = useState<string>('Connecting...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        // Initialize xterm.js
        const term = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: '"Cascadia Code", Menlo, Monaco, "Courier New", monospace',
            theme: {
                background: '#030610',
                foreground: '#a2a9b4',
                cursor: '#5267df',
                selectionBackground: 'rgba(82, 103, 223, 0.3)',
                black: '#030610',
                red: '#ff5f56',
                green: '#27c93f',
                yellow: '#ffbd2e',
                blue: '#5267df',
                magenta: '#d33682',
                cyan: '#2aa198',
                white: '#a2a9b4',
            }
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);
        fitAddon.fit();
        xtermRef.current = term;

        // WebSocket connection
        const token = localStorage.getItem('horizon_token');
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
        const wsUrl = API_URL.replace('http', 'ws') + `/vms/ssh/${vmid}?token=${token}`;
        
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
            setStatus('Connected');
            term.focus();
            // Send initial resize
            const dims = fitAddon.proposeDimensions();
            if (dims) {
                ws.send(JSON.stringify({ type: 'resize', cols: dims.cols, rows: dims.rows }));
            }
        };

        ws.onmessage = (event) => {
            term.write(event.data);
        };

        ws.onclose = (event) => {
            setStatus('Disconnected');
            if (event.code !== 1000 && event.code !== 1001) {
                setError(`Connection closed: ${event.reason || 'Unknown error'}`);
            }
        };

        ws.onerror = () => {
            setError('WebSocket error occurred');
        };

        // Terminal data to WebSocket
        term.onData((data) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(data);
            }
        });

        // Handle resize
        const handleResize = () => {
            fitAddon.fit();
            const dims = fitAddon.proposeDimensions();
            if (dims && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'resize', cols: dims.cols, rows: dims.rows }));
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            term.dispose();
            ws.close();
        };
    }, [vmid]);

    return (
        <div className="ssh-terminal-modal">
            <div className="ssh-terminal-container">
                <div className="ssh-terminal-header">
                    <div className="ssh-header-left">
                        <Icon name="console" size={16} />
                        <span>Terminal SSH - VM ID: {vmid}</span>
                        <span className={`status-dot ${status.toLowerCase()}`}>{status}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                {error && (
                    <div className="terminal-error">
                        <Icon name="error" size={16} />
                        {error}
                        <button className="btn-primary" onClick={() => window.location.reload()}>Réessayer</button>
                    </div>
                )}

                <div 
                    ref={terminalRef} 
                    className="xterm-wrapper"
                    style={{ visibility: error ? 'hidden' : 'visible' }}
                />
            </div>

            <style jsx>{`
                .ssh-terminal-modal {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(4px);
                    padding: 20px;
                }
                .ssh-terminal-container {
                    width: 100%;
                    max-width: 1000px;
                    height: 80vh;
                    background: #030610;
                    border: 1px solid var(--g1-border);
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
                .ssh-terminal-header {
                    padding: 12px 20px;
                    background: #060a1a;
                    border-bottom: 1px solid var(--g1-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .ssh-header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .status-dot {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    text-transform: uppercase;
                    color: var(--g1-muted);
                }
                .status-dot.connected { color: var(--g1-accent); }
                .status-dot.connected::before {
                    content: '';
                    width: 6px; height: 6px;
                    background: var(--g1-accent);
                    border-radius: 50%;
                }
                .close-btn {
                    background: none;
                    border: none;
                    color: var(--g1-muted);
                    font-size: 24px;
                    cursor: pointer;
                    line-height: 1;
                }
                .close-btn:hover { color: #fff; }
                .xterm-wrapper {
                    flex: 1;
                    padding: 10px;
                    overflow: hidden;
                }
                .terminal-error {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    color: #ff5f56;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}
