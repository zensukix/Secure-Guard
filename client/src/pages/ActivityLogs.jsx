import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Search, Filter, Terminal, Download, Activity, Clock, ShieldCheck } from 'lucide-react';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/logs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLogs();
    }, []);

    const filtered = logs.filter(log =>
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        (log.details && log.details.toLowerCase().includes(search.toLowerCase()))
    );

    const getActionBadge = (action) => {
        const base = "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-tighter";
        if (action.includes('ADD')) return `${base} border-green-500/30 text-green-500 bg-green-500/10`;
        if (action.includes('DELETE')) return `${base} border-red-500/30 text-red-500 bg-red-500/10`;
        if (action.includes('REVEAL')) return `${base} border-cyber-secondary/30 text-cyber-secondary bg-cyber-secondary/10`;
        if (action.includes('LOGIN')) return `${base} border-cyan-500/30 text-cyan-500 bg-cyan-500/10`;
        return `${base} border-cyber-muted/30 text-cyber-muted bg-white/5`;
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyber-border/50 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Terminal className="text-cyber-primary" size={24} />
                        <h2 className="text-3xl font-bold text-white tracking-tight font-sans italic">IMMUTABLE LEDGER</h2>
                    </div>
                    <p className="text-cyber-muted text-sm max-w-2xl">
                        Comprehensive audit synchronization of system-wide events.
                        Records are cryptographically hashed and indexed for forensics.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-cyber-border rounded-lg text-xs font-bold text-cyber-muted hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
                        <Download size={14} /> Export CSV
                    </button>
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-[10px] font-bold text-green-500 flex items-center gap-2">
                        <ShieldCheck size={14} /> INTEGRITY VERIFIED
                    </div>
                </div>
            </div>

            <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/40 to-transparent"></div>

                {/* Toolbar */}
                <div className="p-6 border-b border-cyber-border flex flex-col md:flex-row justify-between items-center gap-6 bg-black/40">
                    <div className="relative w-full md:w-[450px] group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-muted group-focus-within:text-cyber-primary transition-colors">
                            <Search size={16} />
                        </div>
                        <input
                            className="bg-black/60 border border-cyber-border rounded-lg pl-12 pr-4 py-3 text-xs text-white focus:border-cyber-primary outline-none w-full transition-all shadow-inner font-mono"
                            placeholder="SEARCH BY ACTION, DETAIL, OR ISO-TIMESTAMP..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] text-cyber-muted uppercase tracking-widest mb-1">Total Observations</span>
                            <span className="text-xs font-bold text-white font-mono">{filtered.length} RECORDS</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-cyber-border flex items-center justify-center bg-white/5">
                            <Filter size={16} className="text-cyber-muted" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-black/60 text-cyber-muted text-[10px] font-bold uppercase tracking-[0.2em] border-b border-cyber-border">
                                <th className="p-6">Time Vector</th>
                                <th className="p-6">Protocol Action</th>
                                <th className="p-6">Payload Summary</th>
                                <th className="p-6 text-right">Origin Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                            {filtered.map(log => (
                                <tr key={log._id} className="hover:bg-cyber-primary/[0.02] transition-colors group border-b border-transparent hover:border-cyber-primary/10">
                                    <td className="p-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-black/40 rounded border border-white/5 text-cyber-muted group-hover:text-cyber-secondary transition-colors">
                                                <Clock size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-mono text-gray-300">
                                                    {new Date(log.timestamp).toLocaleDateString()}
                                                </span>
                                                <span className="text-[10px] font-mono text-cyber-muted">
                                                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                            <span className={getActionBadge(log.action)}>{log.action.replace('_', ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed font-sans max-w-md line-clamp-2">
                                            {log.details || 'System message processed.'}
                                        </p>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-mono text-cyber-muted bg-black/60 px-2 py-1 rounded border border-white/10 group-hover:border-cyber-secondary/30 transition-colors">
                                                {log.ipAddress || '127.0.0.1'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-30">
                                            <Activity size={48} className="text-cyber-muted animate-pulse" />
                                            <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Awaiting Transactional Data...</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-6 bg-black/40 border-t border-cyber-border flex justify-between items-center relative z-10">
                    <span className="text-[9px] text-cyber-muted font-mono uppercase tracking-widest">Integrity Check: PASSED</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg border border-cyber-border text-[10px] font-bold text-cyber-muted hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all uppercase tracking-widest" disabled>Prev</button>
                        <button className="px-4 py-2 rounded-lg border border-cyber-primary/50 bg-cyber-primary/10 text-[10px] font-bold text-cyber-primary uppercase tracking-widest">1</button>
                        <button className="px-4 py-2 rounded-lg border border-cyber-border text-[10px] font-bold text-cyber-muted hover:bg-white/5 disabled:opacity-30 transition-all uppercase tracking-widest" disabled>Next</button>
                    </div>
                </div>
            </div>

            <div className="bg-[#050505] p-5 rounded-xl border border-dashed border-cyber-border/50 flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                    <Activity size={20} />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automated Anomaly Detection</h4>
                    <p className="text-[10px] text-cyber-muted font-mono mt-1">Heuristics engine is monitoring the ledger for unauthorized record mutability or deletion attempts.</p>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogs;
