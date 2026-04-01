import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Server, Shield, AlertTriangle, Terminal, Activity, ArrowRight, RefreshCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import { clsx } from 'clsx';

const NetworkScanner = () => {
    const [target, setTarget] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastScan, setLastScan] = useState(null);
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/scans/history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleScan = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('/api/scans/run', { target }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Simulate realistic scan delay
            setTimeout(() => {
                setLastScan(data);
                toast.success('Network Reconnaissance Complete', { theme: "dark" });
                setLoading(false);
                fetchHistory();
            }, 2000);

        } catch (error) {
            toast.error('Scan Failed', { theme: "dark" });
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="border-b border-cyber-border/50 pb-6">
                <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Server className="text-cyber-primary" size={32} />
                    NETWORK RECONNAISSANCE
                </h2>
                <p className="text-cyber-muted text-sm mt-1 max-w-2xl">
                    Active fingerprinting and service discovery protocol.
                    <span className="ml-2 text-cyber-secondary font-mono text-xs border border-cyber-secondary/30 px-2 py-0.5 rounded">SIMULATED ENVIRONMENT</span>
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)] min-h-[600px]">
                {/* SCANNER INPUT & RESULTS */}
                <div className="lg:col-span-2 bg-cyber-card border border-cyber-border rounded-xl p-8 relative overflow-hidden shadow-2xl flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-blue-500 to-purple-500 opacity-70"></div>

                    <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1 group">
                            <span className="absolute left-0 top-0 bottom-0 px-4 flex items-center justify-center bg-black/30 border-r border-cyber-border rounded-l-lg z-10">
                                <Terminal className="text-cyber-muted w-5 h-5 group-focus-within:text-cyber-primary transition-colors" />
                            </span>
                            <input
                                type="text"
                                required
                                className="w-full pl-14 bg-black/50 border border-cyber-border rounded-lg py-4 text-white font-mono focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/50 outline-none transition-all placeholder:text-gray-700 text-sm"
                                placeholder="Target IP (e.g., 192.168.1.5) or Domain"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-cyber-primary hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-lg uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] whitespace-nowrap"
                        >
                            {loading ? 'Initializing...' : 'Start Scan'}
                        </button>
                    </form>

                    {loading && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="font-mono text-sm text-cyber-secondary p-8 bg-black/40 rounded-xl border border-cyber-border/50 max-w-md w-full">
                                <div className="flex items-center gap-3 mb-4 border-b border-cyber-border/30 pb-2">
                                    <RefreshCcw className="animate-spin" size={16} />
                                    <span className="font-bold tracking-widest uppercase">Executing Scan Protocol</span>
                                </div>
                                <div className="space-y-2 opacity-80">
                                    <p className="flex justify-between"><span>&gt; Initializing handshake</span> <span className="text-green-500">OK</span></p>
                                    <p className="flex justify-between"><span>&gt; Pinging target {target}</span> <span className="text-green-500 animate-pulse">...</span></p>
                                    <p>&gt; Scanning TCP ports [0-1024]...</p>
                                    <p className="animate-pulse text-cyber-primary">&gt; Analyzing service banners...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && !lastScan && (
                        <div className="flex-1 flex flex-col items-center justify-center text-cyber-muted opacity-50">
                            <Activity size={64} className="mb-4 text-cyber-secondary" />
                            <p className="uppercase tracking-widest text-xs">Awaiting Target Designation</p>
                        </div>
                    )}

                    {lastScan && !loading && (
                        <div className="space-y-6 animate-slide-up bg-black/20 rounded-xl border border-white/5 p-4 flex-1 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between p-4 bg-[#050505] rounded-lg border border-cyber-border shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-primary/10 to-transparent pointer-events-none"></div>
                                <div>
                                    <p className="text-white font-bold text-lg tracking-wide">{lastScan.target}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${lastScan.riskScore > 50 ? 'border-red-500/30 text-red-500 bg-red-500/10' : 'border-green-500/30 text-green-500 bg-green-500/10'}`}>
                                            Risk Score: {lastScan.riskScore}/100
                                        </span>
                                        <span className="text-xs text-cyber-muted">{lastScan.openPorts.length} Open Ports</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="px-3 py-1 bg-green-900/20 text-green-500 border border-green-500/30 text-[10px] uppercase font-bold tracking-wider rounded">
                                        HOST ONLINE
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                                <div className="bg-[#050505] rounded-lg border border-white/10 p-4 flex flex-col">
                                    <h4 className="text-xs font-bold text-cyber-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Activity size={12} /> Open Ports
                                    </h4>
                                    <div className="overflow-hidden rounded border border-white/5 flex-1">
                                        <table className="w-full text-left text-xs font-mono">
                                            <thead className="bg-white/5 text-gray-500">
                                                <tr>
                                                    <th className="p-3">PORT</th>
                                                    <th className="p-3">SERVICE</th>
                                                    <th className="p-3 text-right">STATE</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {lastScan.openPorts.map((p, i) => (
                                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                                        <td className="p-3 text-cyber-primary font-bold">{p.port}</td>
                                                        <td className="p-3 text-gray-300">{p.service}</td>
                                                        <td className="p-3 text-right text-green-500 uppercase">{p.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-[#050505] rounded-lg border border-white/10 p-4 flex flex-col">
                                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <AlertTriangle size={12} /> Vulnerabilities
                                    </h4>
                                    <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 max-h-[250px]">
                                        {lastScan.vulnerabilities.length > 0 ? lastScan.vulnerabilities.map((vuln, i) => (
                                            <div key={i} className="p-3 bg-red-900/10 border border-red-500/20 rounded hover:border-red-500/40 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-red-400 font-bold text-[10px]">{vuln.id}</span>
                                                    <span className="text-[10px] uppercase font-bold text-red-200 bg-red-500/30 px-1.5 py-0.5 rounded">{vuln.severity}</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 leading-relaxed">{vuln.description}</p>
                                            </div>
                                        )) : (
                                            <div className="h-full flex flex-col items-center justify-center text-center p-4 border border-dashed border-white/10 rounded">
                                                <Shield className="text-green-500 mb-2 opacity-50" size={24} />
                                                <p className="text-xs text-cyber-muted">No critical vulnerabilities detected based on current signatures.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* HISTORY SIDEBAR */}
                <div className="bg-cyber-card border border-cyber-border rounded-xl flex flex-col overflow-hidden h-full shadow-lg">
                    <div className="p-4 border-b border-cyber-border bg-black/40">
                        <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                            <RefreshCcw size={12} /> Scan History
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar bg-black/20">
                        {history.length === 0 && (
                            <div className="p-8 text-center text-cyber-muted text-xs italic">
                                No scan records found.
                            </div>
                        )}
                        {history.map((h) => (
                            <div key={h._id}
                                className={`p-3 rounded-lg border transition-all cursor-pointer group ${lastScan && lastScan._id === h._id ? 'bg-cyber-primary/10 border-cyber-primary/50' : 'bg-black/40 border-cyber-border hover:border-white/30 hover:bg-white/5'}`}
                                onClick={() => { setLastScan(h); setLoading(false); }}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-mono text-xs font-bold ${lastScan && lastScan._id === h._id ? 'text-white' : 'text-gray-300'}`}>{h.target}</span>
                                    <span className={`text-[10px] uppercase font-bold px-1.5 rounded ${h.riskScore > 50 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                        Risk: {h.riskScore}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[10px] text-cyber-muted font-mono">{new Date(h.timestamp).toLocaleDateString()}</span>
                                    <ArrowRight size={12} className={`text-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 ${lastScan && lastScan._id === h._id ? 'opacity-100 translate-x-0' : ''}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkScanner;
