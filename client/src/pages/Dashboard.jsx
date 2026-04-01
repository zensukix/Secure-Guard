import { useEffect, useState } from 'react';
import axios from 'axios';
import { Shield, Key, AlertOctagon, Activity, ChevronRight, Globe, Lock, Search, CheckCircle, AlertTriangle, XCircle, FileText, Info, Zap, Cpu, ArrowUpRight, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, icon: Icon, to, color, desc, stat }) => (
    <Link to={to} className="group relative bg-[#0a0a0d] border border-cyber-border rounded-xl p-6 hover:border-cyber-primary/50 transition-all duration-500 hover:-translate-y-1 block overflow-hidden h-full flex flex-col">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon size={48} className={color} />
        </div>

        <div className="flex-1 relative z-10">
            <div className={`w-10 h-10 rounded-lg bg-black/40 border border-cyber-border flex items-center justify-center mb-4 text-white group-hover:border-cyber-primary/30 transition-colors`}>
                <Icon size={20} className={color} />
            </div>
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">{title}</h3>
            <p className="text-[11px] text-cyber-muted mb-4 leading-relaxed font-sans">{desc}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
            <div className="flex flex-col">
                <span className="text-[10px] text-cyber-muted uppercase tracking-tighter">Status</span>
                <span className={`text-[10px] font-bold font-mono ${color}`}>{stat || 'OPERATIONAL'}</span>
            </div>
            <ChevronRight size={14} className="text-cyber-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
    </Link>
);

const SecurityCheckerWidget = () => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('idle');
    const [result, setResult] = useState(null);

    const checkSafety = (e) => {
        e.preventDefault();
        if (!url) return;
        setStatus('scanning');
        setTimeout(() => {
            const lower = url.toLowerCase();
            if (lower.includes('http:')) {
                setStatus('caution');
                setResult({ msg: 'Insecure Protocol', sub: 'Input uses legacy HTTP protocol' });
            } else if (lower.includes('risk') || lower.includes('hack')) {
                setStatus('risk');
                setResult({ msg: 'Threat Detected', sub: 'Matches known blacklist signature' });
            } else {
                setStatus('safe');
                setResult({ msg: 'Clean Signature', sub: 'Verified SSL & Reputation' });
            }
        }, 2000);
    };

    return (
        <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 md:p-8 relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-primary/40"></div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Cpu size={20} className="text-cyber-primary" />
                            NETWORK HEURISTICS
                        </h3>
                        <p className="text-cyber-muted text-[11px] uppercase tracking-widest mt-1">Real-time URL Integrity Protocol</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-cyber-border rounded-full">
                        <Radio size={12} className="text-green-500 animate-pulse" />
                        <span className="text-[9px] text-cyber-muted font-bold uppercase tracking-tighter">Live Monitor</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mt-auto">
                    <form onSubmit={checkSafety} className="flex-1">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <Search size={16} className="text-cyber-muted group-focus-within:text-cyber-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="bg-black/80 border border-cyber-border rounded-lg pl-12 pr-4 py-4 text-white w-full focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/20 outline-none font-mono text-xs transition-all shadow-inner"
                                placeholder="ENTER TARGET URL..."
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={status === 'scanning'}
                            className="mt-4 w-full bg-cyber-primary text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-xs shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                        >
                            {status === 'scanning' ? 'Scanning Kernel...' : 'Execute Analysis'}
                        </button>
                    </form>

                    <div className="lg:w-64 h-32 lg:h-auto bg-black border border-cyber-border rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">
                        {status === 'idle' && (
                            <div className="text-center opacity-30 px-4">
                                <Globe size={32} className="mx-auto mb-2 text-cyber-muted" />
                                <span className="text-[9px] uppercase tracking-widest font-bold">Waiting for input</span>
                            </div>
                        )}

                        {status === 'scanning' && (
                            <div className="flex flex-col items-center gap-2 animate-pulse">
                                <Activity className="text-cyber-primary mb-2" size={32} />
                                <span className="text-cyber-primary text-[10px] font-mono tracking-[0.3em]">PROCESSING</span>
                            </div>
                        )}

                        {status !== 'idle' && status !== 'scanning' && result && (
                            <div className={`text-center animate-slide-up p-4 w-full h-full flex flex-col items-center justify-center relative`}>
                                <div className={`absolute inset-0 opacity-10 ${status === 'safe' ? 'bg-green-500' : status === 'caution' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                {status === 'safe' && <Shield className="text-green-500 mb-2" size={32} />}
                                {status === 'caution' && <AlertTriangle className="text-yellow-500 mb-2" size={32} />}
                                {status === 'risk' && <XCircle className="text-red-500 mb-2" size={32} />}

                                <h4 className={`text-sm font-bold uppercase tracking-widest ${status === 'safe' ? 'text-green-500' : status === 'caution' ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {status}
                                </h4>
                                <p className="text-[9px] text-white font-mono mt-1 opacity-60 px-2 line-clamp-1">{result.msg}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Dashboard = () => {
    const [stats, setStats] = useState({ activeThreats: 0, recentActivity: [] });
    const threatData = [
        { time: '00:00', value: 12 }, { time: '04:00', value: 18 }, { time: '08:00', value: 45 },
        { time: '12:00', value: 25 }, { time: '16:00', value: 60 }, { time: '20:00', value: 30 },
        { time: '23:59', value: 42 }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/logs', { headers: { Authorization: `Bearer ${token}` } });
                setStats(p => ({ ...p, recentActivity: data.slice(0, 4) }));
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        const interval = setInterval(() => setStats(p => ({ ...p, activeThreats: Math.floor(Math.random() * 50) + 10 })), 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-fade-in pb-12 overflow-x-hidden">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden rounded-2xl bg-[#08080a] border border-cyber-border min-h-[450px] flex items-center shadow-2xl">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)] opacity-50"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                {/* Matrix-like lines */}
                <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
                    <div className="grid grid-cols-12 h-full w-full">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-cyan-500/20 h-full"></div>
                        ))}
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-10 p-8 md:p-12 relative z-10 items-center">
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="px-2 py-0.5 bg-cyber-primary/10 text-cyber-primary text-[10px] font-bold uppercase tracking-[0.25em] border border-cyber-primary/30 rounded">SYSTEM ONLINE</span>
                            <div className="h-[1px] w-12 bg-cyber-border"></div>
                            <span className="text-cyber-muted text-[10px] font-mono">v2.4.0-STABLE</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
                            COMMAND<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyan-400 to-blue-500">CENTER.</span>
                        </h1>

                        <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed max-w-lg font-mono opacity-80">
                            &gt; Initializing defensive subroutines...<br />
                            &gt; Encrypting user telemetry...<br />
                            &gt; Monitoring global threat vectors...
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/vault" className="group relative px-8 py-4 bg-cyber-primary text-black font-bold uppercase tracking-widest rounded-lg text-xs overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    <Key size={16} /> Open Vault
                                </span>
                            </Link>
                            <Link to="/threat-map" className="px-8 py-4 bg-black/40 text-white border border-white/10 font-bold uppercase tracking-widest rounded-lg text-xs hover:bg-white/5 transition-all flex items-center gap-2 backdrop-blur-md">
                                <Globe size={16} /> Global Intel
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-2 hidden lg:flex justify-center items-center relative">
                        <div className="relative w-72 h-72">
                            <div className="absolute inset-0 border-[1px] border-cyber-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-4 border-[1px] border-dashed border-blue-500/20 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                            <div className="absolute inset-8 border-[1px] border-cyber-primary/5 rounded-full"></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-8 bg-black/80 rounded-full border border-cyber-primary/20 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                                    <Shield className="w-24 h-24 text-cyber-primary" strokeWidth={0.5} />
                                </div>
                            </div>

                            {/* Mini Stat 1 */}
                            <div className="absolute -top-4 right-0 p-3 bg-black/90 border border-cyber-border rounded-lg shadow-2xl animate-bounce-slow">
                                <p className="text-[8px] text-cyber-muted uppercase tracking-widest mb-1">Health Index</p>
                                <p className="text-sm font-bold text-green-500 font-mono">99.8%</p>
                            </div>

                            {/* Mini Stat 2 */}
                            <div className="absolute bottom-4 -left-8 p-3 bg-black/90 border border-cyber-border rounded-lg shadow-2xl">
                                <p className="text-[8px] text-cyber-muted uppercase tracking-widest mb-1">Active Blocks</p>
                                <p className="text-sm font-bold text-cyber-primary font-mono">{stats.activeThreats}k</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRODUCT FEATURE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FeatureCard
                    title="Key Management"
                    to="/vault"
                    icon={Key}
                    color="text-cyber-secondary"
                    desc="AES-256 encrypted credential orchestration for secured identities."
                />
                <FeatureCard
                    title="Global Intel"
                    to="/threat-map"
                    icon={Globe}
                    color="text-purple-500"
                    desc="Holographic visualization of active DDoS and phishing vectors."
                    stat="LIVE UPDATING"
                />
                <FeatureCard
                    title="Tactical Awareness"
                    to="/awareness"
                    icon={Info}
                    color="text-green-400"
                    desc="Intelligence briefings on human-element exploits and malware."
                />
                <FeatureCard
                    title="Event Logs"
                    to="/logs"
                    icon={FileText}
                    color="text-blue-400"
                    desc="Immutable ledger of all internal system state changes."
                    stat="SYNCED"
                />
            </div>

            {/* MIDDLE SECTION: SCANNER & GRAPH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-full">
                    <SecurityCheckerWidget />
                </div>

                <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 relative overflow-hidden flex flex-col shadow-lg">
                    <div className="absolute -right-10 -bottom-10 p-4 opacity-[0.03] pointer-events-none">
                        <Activity size={200} className="text-red-500" />
                    </div>

                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <h3 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                <Zap size={14} className="text-red-500" />
                                Threat Intensity
                            </h3>
                            <p className="text-[10px] text-cyber-muted uppercase tracking-tighter mt-0.5">Global aggregated sensor data</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[160px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={threatData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                                    itemStyle={{ color: '#ef4444' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={1} fillOpacity={1} fill="url(#colorThreat)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-[10px] text-cyber-muted font-mono relative z-10">
                        <span>L-SIG: HIGH</span>
                        <span className="text-red-500">PEAK DETECTED</span>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: ACTIVITY LOGS */}
            <div className="bg-[#050505] border border-cyber-border rounded-xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Radio size={14} className="text-cyber-primary" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Latest Audit Records</h3>
                    </div>
                    <Link to="/logs" className="flex items-center gap-1 text-[10px] text-cyber-secondary hover:text-white transition-colors uppercase tracking-widest border-b border-cyber-secondary/30 pb-0.5 font-bold">
                        Full Ledger <ArrowUpRight size={10} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {stats.recentActivity.length > 0 ? stats.recentActivity.map(log => (
                        <div key={log._id} className="p-4 bg-black/40 border border-white/5 rounded-lg hover:border-cyber-primary/30 transition-all group flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] text-cyber-secondary font-bold uppercase tracking-tighter opacity-70">{log.action.replace('_', ' ')}</span>
                                <span className="text-[9px] text-cyber-muted font-mono">[{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                            </div>
                            <p className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors line-clamp-1">{log.details}</p>
                        </div>
                    )) : (
                        <div className="col-span-full py-8 text-center text-cyber-muted text-[10px] uppercase font-bold tracking-widest border border-dashed border-white/5 rounded-lg opacity-50">
                            Awaiting System Telemetry...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
