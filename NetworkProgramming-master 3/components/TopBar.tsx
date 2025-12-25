import React from 'react';

interface User {
    username: string;
    wins: number;
    losses: number;
    coins: number;
}

interface TopBarProps {
    user?: User | null;
    connected?: boolean;
    onLeave?: () => void;
}

export default function TopBar({ user, connected, onLeave }: TopBarProps) {
    return (
        <header className="top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {onLeave && (
                    <button className="btn-icon" onClick={onLeave} title="Back to Lobby">
                        ←
                    </button>
                )}
                <div className="brand">
                    <h1 className="text-gradient">FOOTBALLER TACTICS</h1>
                </div>
            </div>

            <div className="top-bar-right" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {user ? (
                    <div className="status-pill glass-panel" style={{ padding: '8px 20px', borderRadius: '30px' }}>
                        <span style={{ color: '#fff', fontWeight: 700 }}>{user.username}</span>
                        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)', margin: '0 12px' }}></div>

                        <span title="Wins" style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
                            <span style={{ color: 'var(--primary)' }}>W</span>
                            <span style={{ color: '#fff' }}>{user.wins}</span>
                        </span>

                        <span title="Coins" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span>🪙</span>
                            <span style={{ color: 'var(--gold)', fontWeight: 800 }}>{user.coins}</span>
                        </span>
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        Guest Mode
                    </div>
                )}

                {connected !== undefined && (
                    <div
                        className={`status-dot ${connected ? 'online' : 'offline'}`}
                        title={connected ? "Server Online" : "Server Offline"}
                    ></div>
                )}
            </div>
        </header>
    );
}
