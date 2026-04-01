import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Eye, Copy, Trash2, Key, X, Lock, ShieldAlert, Wifi, Globe, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { clsx } from 'clsx';

const Vault = () => {
    const [passwords, setPasswords] = useState([]);
    const [analysis, setAnalysis] = useState({ total: 0, reused: [], aging: [], weak: [], overallScore: 100 });
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [revealedId, setRevealedId] = useState(null);
    const [revealedValue, setRevealedValue] = useState('');
    const [formData, setFormData] = useState({ title: '', username: '', password: '', url: '', category: 'Other' });
    const [strengthScore, setStrengthScore] = useState(0);

    const categories = ['Email', 'Banking', 'Social Media', 'Work', 'Other'];

    const fetchPasswords = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/passwords', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPasswords(data);

            const analRes = await axios.get('/api/passwords/analyze', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnalysis(analRes.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchPasswords(); }, []);

    // Simulated Strength Checker
    useEffect(() => {
        const pwd = formData.password;
        let score = 0;
        if (pwd.length > 8) score += 20;
        if (pwd.length > 12) score += 20;
        if (/[A-Z]/.test(pwd)) score += 20;
        if (/[0-9]/.test(pwd)) score += 20;
        if (/[^a-zA-Z0-9]/.test(pwd)) score += 20;
        setStrengthScore(score);
    }, [formData.password]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to Clipboard', { theme: "dark" });
    };

    const handleReveal = async (id) => {
        if (revealedId === id) {
            setRevealedId(null);
            setRevealedValue('');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(`/api/passwords/${id}/reveal`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRevealedId(id);
            setRevealedValue(data.password);
        } catch (error) {
            const msg = error.response?.data?.message || 'Decryption Error';
            // Specific check for key length
            if (msg.includes('key length')) toast.error(`Critical: Server Encryption Key Mismatch. Please contact admin.`);
            else toast.error('Access Denied: ' + msg);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently redact this record from the vault?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/passwords/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.info('Record Expunged', { theme: "dark" });
            fetchPasswords();
        } catch (error) {
            toast.error('Deletion Failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/passwords', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Credential Encrypted & Secured', { theme: "dark" });
            setShowModal(false);
            setFormData({ title: '', username: '', password: '', url: '', category: 'Other' });
            fetchPasswords();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Save Failed');
        }
    };

    const filtered = passwords.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* HERO HEADER */}
            <div className="relative rounded-xl border border-cyber-border overflow-hidden p-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-cyber-black to-[#0f141a]">
                <div className="relative z-10">
                    <span className="text-[10px] font-bold text-cyber-secondary uppercase tracking-widest mb-2 block border border-cyber-secondary/30 rounded-full px-3 py-1 w-fit">
                        AES-256 Encrypted Storage
                    </span>
                    <h2 className="text-3xl font-bold text-white tracking-tight">SECURE VAULT</h2>
                    <p className="text-cyber-muted mt-2 max-w-lg text-sm">
                        Military-grade protection for your digital identity.
                        Regularly rotate credentials to maintain a high security health score.
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="relative z-10 flex items-center gap-2 bg-cyber-secondary text-black px-6 py-3 rounded font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]"
                >
                    <Plus size={18} />
                    ADD RECORD
                </button>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyber-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
            </div>

            {/* ANALYSIS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl">
                    <p className="text-xs text-cyber-muted uppercase font-bold mb-1">Vault Health</p>
                    <div className="flex items-center gap-2">
                        <ShieldAlert className={analysis.overallScore < 70 ? 'text-red-500' : 'text-green-500'} size={20} />
                        <span className={`text-2xl font-bold ${analysis.overallScore < 70 ? 'text-red-500' : 'text-green-500'}`}>{analysis.overallScore}%</span>
                    </div>
                </div>
                <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl">
                    <p className="text-xs text-cyber-muted uppercase font-bold mb-1">Breach Value</p>
                    <div className="flex items-center gap-2">
                        <Wifi className="text-cyber-primary" size={20} />
                        <span className="text-2xl font-bold text-white">0</span>
                    </div>
                </div>
                <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl">
                    <p className="text-xs text-cyber-muted uppercase font-bold mb-1">Weak Passwords</p>
                    <span className={`text-2xl font-bold ${analysis.weak.length > 0 ? 'text-yellow-500' : 'text-white'}`}>{analysis.weak.length}</span>
                </div>
                <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl">
                    <p className="text-xs text-cyber-muted uppercase font-bold mb-1">Total Records</p>
                    <span className="text-2xl font-bold text-white">{passwords.length}</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative group">
                <Search className="absolute left-4 top-3.5 text-cyber-muted group-focus-within:text-cyber-secondary transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search encrypted database..."
                    className="w-full bg-cyber-card border border-cyber-border rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyber-secondary focus:outline-none transition-colors"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* VAULT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {filtered.map(p => {
                    const isReused = analysis.reused.includes(p._id);
                    const isWeak = analysis.weak.includes(p._id);

                    return (
                        <div key={p._id} className={`bg-cyber-card border rounded-xl p-6 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full ${isReused || isWeak ? 'border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-cyber-border hover:border-cyber-secondary/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)]'}`}>
                            {/* Card Status Indicator Line */}
                            <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${isReused || isWeak ? 'bg-red-500' : 'bg-cyber-secondary'}`}></div>

                            <div>
                                <div className="flex justify-between items-start mb-4 pl-3">
                                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 group-hover:bg-white/5 transition-colors">
                                        <Lock size={20} className={isReused || isWeak ? 'text-red-500' : 'text-cyber-secondary'} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-white/5 px-2 py-1 rounded bg-black/20">
                                        {p.category}
                                    </span>
                                </div>

                                <div className="pl-3 mb-6">
                                    <h3 className="text-lg font-bold text-white truncate group-hover:text-cyber-secondary transition-colors">{p.title}</h3>
                                    <p className="text-sm text-gray-500 truncate font-mono mt-1 opacity-70">{p.username}</p>
                                </div>

                                <div className="pl-3 bg-black/30 rounded border border-white/5 p-3 flex justify-between items-center mb-4 transition-colors hover:border-white/10">
                                    <span className={clsx("font-mono text-xs truncate max-w-[150px]", revealedId === p._id ? "text-cyber-primary" : "text-gray-600 tracking-[3px]")}>
                                        {revealedId === p._id ? revealedValue : '••••••••••••'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleReveal(p._id)} className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded" title="Decrypt & Reveal">
                                            <Eye size={16} />
                                        </button>
                                        {revealedId === p._id && (
                                            <button onClick={() => handleCopy(revealedValue)} className="text-gray-500 hover:text-cyber-primary transition-colors p-1 hover:bg-white/10 rounded" title="Copy to Clipboard">
                                                <Copy size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pl-3 pt-4 border-t border-white/5 flex justify-between items-center text-xs mt-auto">
                                <div>
                                    {isReused ? (
                                        <span className="text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={12} /> REUSED_PWD</span>
                                    ) : isWeak ? (
                                        <span className="text-yellow-500 font-bold flex items-center gap-1"><AlertTriangle size={12} /> WEAK_ENTROPY</span>
                                    ) : (
                                        <span className="text-green-500 font-bold flex items-center gap-1"><CheckCircle className="inline" size={12} /> AES_SECURE</span>
                                    )}
                                </div>
                                <button onClick={() => handleDelete(p._id)} className="text-gray-600 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-500/10">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CREATE MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
                    <div className="bg-[#0f141a] border border-cyber-border w-full max-w-lg rounded-xl shadow-2xl relative overflow-hidden animate-slide-up">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-cyber-border flex justify-between items-center bg-black/40">
                            <h3 className="text-white font-bold text-lg flex items-center gap-3">
                                <div className="p-2 bg-cyber-secondary/10 rounded text-cyber-secondary border border-cyber-secondary/20"><Key size={20} /></div>
                                New Credential
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors hover:rotate-90 duration-300"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] text-cyber-muted uppercase font-bold mb-2 block tracking-widest">Title</label>
                                    <input required className="w-full bg-black/50 border border-cyber-border rounded-lg px-4 py-3 text-white focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary/50 outline-none transition-all text-sm"
                                        value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Corporate Google" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-cyber-muted uppercase font-bold mb-2 block tracking-widest">Category</label>
                                    <select className="w-full bg-black/50 border border-cyber-border rounded-lg px-4 py-3 text-white focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary/50 outline-none transition-all text-sm appearance-none"
                                        value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] text-cyber-muted uppercase font-bold mb-2 block tracking-widest">Username / ID</label>
                                <input className="w-full bg-black/50 border border-cyber-border rounded-lg px-4 py-3 text-white focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary/50 outline-none transition-all text-sm"
                                    value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} placeholder="email@company.com" />
                            </div>

                            <div>
                                <label className="text-[10px] text-cyber-muted uppercase font-bold mb-2 block tracking-widest">Password Secret</label>
                                <div className="relative">
                                    <input required type="password" className="w-full bg-black/50 border border-cyber-border rounded-lg px-4 py-3 text-white focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary/50 outline-none font-mono text-sm pr-10"
                                        value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                    <Lock className="absolute right-3 top-3 text-gray-600" size={16} />
                                </div>
                                {/* Strength Meter */}
                                <div className="mt-3">
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 mb-1">
                                        <span>Entropy Strength</span>
                                        <span className={strengthScore > 80 ? 'text-green-500' : strengthScore > 50 ? 'text-yellow-500' : 'text-red-500'}>
                                            {strengthScore}%
                                        </span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${strengthScore > 80 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : strengthScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${strengthScore}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full py-4 rounded-lg bg-gradient-to-r from-cyber-secondary to-cyan-500 hover:to-cyan-400 text-black font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-[1.01]">
                                    Encrypt & Save Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vault;
