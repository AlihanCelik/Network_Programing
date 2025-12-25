import { useState, useEffect } from 'react';
import LeagueSelector from './LeagueSelector';
import TopBar from './TopBar';

interface User {
    username: string;
    wins: number;
    losses: number;
    coins: number;
}

interface RoomInfo {
    id: string;
    players: number;
    status: 'waiting' | 'playing';
    host: string;
    hasPassword: boolean;
}

interface LeaderboardItem {
    username: string;
    wins: number;
    coins: number;
}

interface LobbyViewProps {
    user: User;
    rooms: RoomInfo[];
    onlineCounts: { amateur: number, pro: number, elite: number };
    connected: boolean;
    onCreateRoom: (roomName: string, password?: string, entryFee?: number) => void;
    onJoinRoom: (roomId: string, hasPassword: boolean) => void;
    onRefresh: () => void;
    onJoinLeague: (leagueId: string) => void;
}

export default function LobbyView({
    user, rooms, onlineCounts, connected, onCreateRoom, onJoinRoom, onRefresh, onJoinLeague
}: LobbyViewProps) {
    const [activeTab, setActiveTab] = useState<'leagues' | 'custom' | 'leaderboard'>('leagues');

    // Custom room state
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomPassword, setNewRoomPassword] = useState('');
    const [newRoomEntryFee, setNewRoomEntryFee] = useState('');
    const [showCreate, setShowCreate] = useState(false);

    // Leaderboard State
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

    useEffect(() => {
        if (activeTab === 'leaderboard') {
            fetch('/api/leaderboard')
                .then(res => res.json())
                .then(data => setLeaderboard(data))
                .catch(err => console.error('Failed to load leaderboard', err));
        }
    }, [activeTab]);

    return (
        <div className="dashboard-container fade-in">
            {/* Top Bar - Shared */}
            <TopBar user={user} connected={connected} />

            <div className="main-content">
                {/* Sidebar Navigation */}
                <nav className="sidebar">
                    <button
                        className={`nav-item ${activeTab === 'leagues' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leagues')}
                    >
                        <span className="icon">🏆</span>
                        Tournaments
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'custom' ? 'active' : ''}`}
                        onClick={() => setActiveTab('custom')}
                    >
                        <span className="icon">🏠</span>
                        Custom Rooms
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        <span className="icon">📊</span>
                        Rankings
                    </button>
                </nav>

                {/* Content Area */}
                <div className="content-area glass-panel">
                    {activeTab === 'leagues' && (
                        <LeagueSelector onJoinLeague={onJoinLeague} onlineCounts={onlineCounts} />
                    )}

                    {activeTab === 'leaderboard' && (
                        <div className="leaderboard-view fade-in" style={{ padding: '2rem' }}>
                            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Global Rankings
                            </h2>

                            <div className="leaderboard-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {leaderboard.map((item, index) => {
                                    let rankClass = 'rank-other';
                                    let icon = <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold', color: '#666' }}>#{index + 1}</span>;

                                    if (index === 0) {
                                        rankClass = 'rank-gold';
                                        icon = <span style={{ fontSize: '1.5rem' }}>🥇</span>;
                                    } else if (index === 1) {
                                        rankClass = 'rank-silver';
                                        icon = <span style={{ fontSize: '1.5rem' }}>🥈</span>;
                                    } else if (index === 2) {
                                        rankClass = 'rank-bronze';
                                        icon = <span style={{ fontSize: '1.5rem' }}>🥉</span>;
                                    }

                                    const isMe = item.username === user.username;

                                    return (
                                        <div key={item.username}
                                            className={`leaderboard-item ${rankClass}`}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '1rem 2rem',
                                                background: isMe ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                                border: isMe ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                boxShadow: index < 3 ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {icon}
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: index < 3 ? '1.2rem' : '1rem', fontWeight: 'bold', color: isMe ? 'var(--primary)' : '#fff' }}>
                                                        {item.username}
                                                    </span>
                                                    {index < 3 && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ELITE PLAYER</span>}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '2rem' }}>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>WINS</span>
                                                    <span style={{ fontWeight: 'bold', color: '#fff' }}>{item.wins}</span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>COINS</span>
                                                    <span style={{ fontWeight: 'bold', color: '#ffd700' }}>{item.coins}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {leaderboard.length === 0 && <p style={{ color: '#666', textAlign: 'center' }}>No rankings yet.</p>}
                            </div>
                        </div>
                    )}


                    {activeTab === 'custom' && (
                        <div className="custom-rooms-view fade-in">
                            <div className="view-header">
                                <h3>Private Matches</h3>
                                <button className="refresh-btn" onClick={onRefresh}>↻ Refresh List</button>
                            </div>

                            <div className="room-list">
                                {rooms.length === 0 ? (
                                    <div className="empty-message">No private rooms active.</div>
                                ) : (
                                    rooms.map(room => (
                                        <div key={room.id} className="room-row">
                                            <div className="room-details">
                                                <span className="room-id">{room.id}</span>
                                                {room.hasPassword && <span className="lock">🔒</span>}
                                                <span className="host">Host: {room.host}</span>
                                            </div>
                                            <div className="room-action">
                                                {(room as any).entryFee > 0 && (
                                                    <span className="entry-fee">🪙 {(room as any).entryFee}</span>
                                                )}
                                                <span className="players-count">{room.players}/2</span>
                                                {room.players < 2 && room.status === 'waiting' && (
                                                    <button className="join-btn-small" onClick={() => onJoinRoom(room.id, room.hasPassword)}>
                                                        JOIN
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="create-room-section">
                                {!showCreate ? (
                                    <button className="create-btn-main" onClick={() => setShowCreate(true)}>+ Create Private Room</button>
                                ) : (
                                    <div className="create-form">
                                        <input
                                            placeholder="Room Name"
                                            value={newRoomName}
                                            onChange={e => setNewRoomName(e.target.value)}
                                        />
                                        <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                                            <input
                                                placeholder="Password (Optional)"
                                                type="password"
                                                value={newRoomPassword}
                                                onChange={e => setNewRoomPassword(e.target.value)}
                                                style={{ flex: 1 }}
                                            />
                                            <input
                                                placeholder="Entry Fee (Coins)"
                                                type="number"
                                                min="0"
                                                value={newRoomEntryFee}
                                                onChange={e => setNewRoomEntryFee(e.target.value)}
                                                style={{ width: '150px' }}
                                            />
                                        </div>
                                        <div className="form-buttons">
                                            <button className="confirm-btn" onClick={() => {
                                                const fee = newRoomEntryFee ? parseInt(newRoomEntryFee) : 0;
                                                onCreateRoom(newRoomName, newRoomPassword, fee);
                                                setNewRoomName('');
                                                setNewRoomPassword('');
                                                setNewRoomEntryFee('');
                                                setShowCreate(false);
                                            }}>Create</button>
                                            <button className="cancel-btn" onClick={() => setShowCreate(false)}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
