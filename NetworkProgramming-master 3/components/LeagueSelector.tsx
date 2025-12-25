import React from 'react';

interface LeagueSelectorProps {
    onJoinLeague: (leagueId: string) => void;
    onlineCounts?: { amateur: number, pro: number, elite: number };
}

export default function LeagueSelector({ onJoinLeague, onlineCounts }: LeagueSelectorProps) {
    return (
        <div className="fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Available Tournaments
            </h3>

            <div className="leagues-grid">
                {/* Amateur */}
                <div className="league-card type-amateur">
                    <div className="card-header">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                        <div className="badge" style={{ background: '#a0a0a0', color: '#000', padding: '4px 12px', borderRadius: 4, display: 'inline-block', fontWeight: 'bold', fontSize: '0.8rem' }}>ROOKIE</div>
                        <h4>Amateur League</h4>
                    </div>
                    <div className="card-body">
                        <div className="stat-row">
                            <span>Entry Fee</span>
                            <span className="value">10 Coins</span>
                        </div>
                        <div className="stat-row">
                            <span>Prize Pool</span>
                            <span className="value" style={{ color: 'var(--primary)' }}>20 Coins</span>
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: '#a0a0a0' }}>
                            <span className="status-dot online"></span> {onlineCounts?.amateur || 0} Waiting
                        </div>
                    </div>
                    <button className="play-btn" onClick={() => onJoinLeague('amateur')}>
                        Enter Match
                    </button>
                </div>

                {/* Pro */}
                <div className="league-card type-pro">
                    <div className="card-header">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
                        <div className="badge" style={{ background: 'var(--gold)', color: '#000', padding: '4px 12px', borderRadius: 4, display: 'inline-block', fontWeight: 'bold', fontSize: '0.8rem' }}>COMPETITIVE</div>
                        <h4 style={{ color: 'var(--gold)' }}>Pro League</h4>
                    </div>
                    <div className="card-body">
                        <div className="stat-row">
                            <span>Entry Fee</span>
                            <span className="value">25 Coins</span>
                        </div>
                        <div className="stat-row">
                            <span>Prize Pool</span>
                            <span className="value" style={{ color: 'var(--gold)' }}>50 Coins</span>
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: '#a0a0a0' }}>
                            <span className="status-dot online"></span> {onlineCounts?.pro || 0} Waiting
                        </div>
                    </div>
                    <button className="play-btn" onClick={() => onJoinLeague('pro')} style={{ color: 'var(--gold)' }}>
                        Enter Match
                    </button>
                </div>

                {/* Elite */}
                <div className="league-card type-elite">
                    <div className="card-header">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
                        <div className="badge" style={{ background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: 4, display: 'inline-block', fontWeight: 'bold', fontSize: '0.8rem' }}>HIGH STAKES</div>
                        <h4 style={{ color: 'var(--accent)' }}>Elite League</h4>
                    </div>
                    <div className="card-body">
                        <div className="stat-row">
                            <span>Entry Fee</span>
                            <span className="value">50 Coins</span>
                        </div>
                        <div className="stat-row">
                            <span>Prize Pool</span>
                            <span className="value" style={{ color: 'var(--accent)' }}>100 Coins</span>
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: '#a0a0a0' }}>
                            <span className="status-dot online"></span> {onlineCounts?.elite || 0} Waiting
                        </div>
                    </div>
                    <button className="play-btn" onClick={() => onJoinLeague('elite')} style={{ color: 'var(--accent)' }}>
                        Enter Match
                    </button>
                </div>
            </div>
        </div>
    );
}
