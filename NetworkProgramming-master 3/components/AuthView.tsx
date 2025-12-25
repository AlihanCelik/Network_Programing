import { useState, useEffect } from 'react';

interface AuthViewProps {
    onLogin: (user: any) => void;
}

export default function AuthView({ onLogin }: AuthViewProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleSubmit = async () => {
        setError('');
        const endpoint = isLogin ? '/api/login' : '/api/register';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                if (isLogin) {
                    onLogin(data.user);
                } else {
                    // Auto login after register
                    const loginRes = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const loginData = await loginRes.json();
                    if (loginData.success) {
                        onLogin(loginData.user);
                    } else {
                        setIsLogin(true); // Fallback
                    }
                }
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (e) {
            setError('Connection error');
        }
    };

    if (!mounted) return null;

    return (
        <div className="auth-container fade-in">
            <div className="auth-box">
                <div className="auth-header">
                    <h2>FOOTBALLER TACTICS</h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? 'Enter the Stadium' : 'Sign Professional Contract'}
                    </p>
                </div>

                <div className="auth-toggle-pill" style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: 4, borderRadius: 12, marginBottom: '2rem' }}>
                    <button
                        className={isLogin ? 'active' : ''}
                        style={{
                            flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                            background: isLogin ? 'var(--primary)' : 'transparent',
                            color: isLogin ? '#000' : 'var(--text-muted)',
                            fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                        onClick={() => { setIsLogin(true); setError(''); }}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? 'active' : ''}
                        style={{
                            flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                            background: !isLogin ? 'var(--primary)' : 'transparent',
                            color: !isLogin ? '#000' : 'var(--text-muted)',
                            fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                        onClick={() => { setIsLogin(false); setError(''); }}
                    >
                        Register
                    </button>
                </div>

                <div className="input-group">
                    <label>Username</label>
                    <input
                        className="glass-input"
                        placeholder="Manager Name"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        className="glass-input"
                        type="password"
                        placeholder="Security Code"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && <div className="error-banner">{error}</div>}

                <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleSubmit}>
                    {isLogin ? 'AUTHENTICATE' : 'JOIN LEAGUE'}
                </button>
            </div>
        </div>
    );
}
