import { useState } from 'react';
import axios from 'axios';
import { Search, ShieldAlert, CheckCircle, AlertTriangle, BookOpen, Skull, Zap, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { clsx } from 'clsx';

const SecurityCheck = () => {
    const [checkEmail, setCheckEmail] = useState('');
    const [breachResult, setBreachResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Simulation States
    const [simLoading, setSimLoading] = useState(false);
    const [simResult, setSimResult] = useState(null);

    const handleSimulation = async (type) => {
        setSimLoading(true);
        setSimResult(null);
        toast.info(`Initiating ${type.toUpperCase()} simulation...`, { autoClose: 1000, theme: "dark" });

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('/api/threats/simulate',
                { attackType: type },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Artificial delay for effect
            setTimeout(() => {
                setSimResult(data);
                setSimLoading(false);
                toast.success('Simulation Completed', { theme: "dark" });
            }, 1500);

        } catch (error) {
            console.error(error);
            toast.error('Simulation Failed', { theme: "dark" });
            setSimLoading(false);
        }
    };

    const handleBreachCheck = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/api/threats/breach-check', { email: checkEmail });
            setBreachResult(data);
            if (data.exposed) {
                toast.error('Warning: Exposure Detected', { theme: "dark" });
            } else {
                toast.success('No breaches found in simulation', { theme: "dark" });
            }
        } catch (error) {
            toast.error('Check failed');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header */}
            <div className="border-b border-cyber-border/50 pb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Activity className="text-cyber-primary" size={24} />
                    <h2 className="text-3xl font-bold text-white tracking-tight">SECURITY DIAGNOSTICS</h2>
                </div>
                <p className="text-cyber-muted text-sm max-w-2xl">
                    Advanced vulnerability scanning and controlled cyber-attack simulation lab.
                    Test your defenses against common vector signatures.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
                {/* BREACH CHECKER */}
                <div className="bg-cyber-card border border-cyber-border rounded-xl p-8 relative overflow-hidden flex flex-col h-full">
                    {/* Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="flex items-start gap-4 mb-8 relative z-10">
                        <div className="p-3 bg-cyber-primary/10 border border-cyber-primary/20 rounded-lg">
                            <Skull className="w-6 h-6 text-cyber-primary animate-pulse-slow" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-wide">Identity Breach Scanner</h3>
                            <p className="text-cyber-muted text-xs mt-1 uppercase tracking-widest">Simulated Dark Web Search</p>
                        </div>
                    </div>

                    <form onSubmit={handleBreachCheck} className="space-y-6 relative z-10 flex-1">
                        <div>
                            <label className="text-[10px] text-cyber-muted uppercase font-bold mb-2 block tracking-widest">Target Email Identity</label>
                            <div className="flex">
                                <span className="bg-black/50 border border-r-0 border-cyber-border rounded-l-lg px-3 flex items-center text-cyber-muted">
                                    <Search size={16} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    className="flex-1 bg-black/50 border border-l-0 border-cyber-border rounded-r-lg px-4 py-3 text-white focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/50 outline-none transition-all text-sm"
                                    placeholder="user@example.com"
                                    value={checkEmail}
                                    onChange={(e) => setCheckEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {breachResult && (
                            <div className={`p-4 rounded-lg border backdrop-blur-sm animate-fade-in ${breachResult.exposed ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    {breachResult.exposed ? <AlertTriangle className="text-red-500" size={18} /> : <CheckCircle className="text-green-500" size={18} />}
                                    <h4 className={`text-sm font-bold tracking-wide uppercase ${breachResult.exposed ? 'text-red-500' : 'text-green-500'}`}>
                                        {breachResult.exposed ? 'Exposure Detected' : 'Clean Identity'}
                                    </h4>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {breachResult.exposed
                                        ? `Identity found in ${breachResult.breaches.length} simulated data dumps.`
                                        : 'No compromise markers found in the simulated database.'}
                                </p>
                            </div>
                        )}

                        <div className="mt-auto pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-cyber-primary hover:bg-cyan-400 text-black font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all uppercase tracking-widest text-xs"
                            >
                                {loading ? 'Scanning Deep Web...' : 'Initiate Deep Scan'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* EDUCATION & PROTOCOLS */}
                <div className="bg-cyber-card border border-cyber-border rounded-xl p-8 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="p-3 bg-cyber-secondary/10 border border-cyber-secondary/20 rounded-lg">
                            <BookOpen className="w-6 h-6 text-cyber-secondary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-wide">Defense Protocols</h3>
                            <p className="text-cyber-muted text-xs mt-1 uppercase tracking-widest">Recommended Actions</p>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10 flex-1">
                        {[
                            { title: 'PASSWORD HYGIENE', desc: 'Algorithmically generate unique credentials for every access point.', id: '01' },
                            { title: 'PHISHING DEFENSE', desc: 'Inspect header signatures. Treat all unverified links as hostile.', id: '02' },
                            { title: 'ENDPOINT SECURITY', desc: 'Maintain latest patches. Encrypt local storage volumes.', id: '03' }
                        ].map((item) => (
                            <div key={item.id} className="group p-4 bg-black/40 border border-cyber-border rounded-lg hover:border-cyber-secondary/50 hover:bg-white/5 transition-all cursor-default">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-cyber-secondary font-bold text-xs tracking-wider group-hover:text-white transition-colors">{item.title}</h4>
                                    <span className="text-[10px] font-mono text-cyber-muted opacity-50 group-hover:opacity-100 transition-opacity">PROP_{item.id}</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ATTACK SIMULATION LAB */}
            <div className="relative rounded-xl border border-cyber-border overflow-hidden bg-black/40">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

                <div className="p-8 md:p-12 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 text-purple-400 border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 rounded-full mb-6">
                        <Zap size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Attack Simulation Lab</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Controlled Threat Environment</h3>
                    <p className="text-cyber-muted max-w-2xl mx-auto text-sm mb-10 leading-relaxed">
                        Safely visualize offensive cyber vectors in a contained sandbox.
                        No external packets are transmitted. This is for educational pattern recognition only.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-3xl mx-auto">
                        <button
                            onClick={() => handleSimulation('ddos')}
                            disabled={simLoading}
                            className="flex-1 py-6 px-8 bg-black/50 border border-cyber-primary/30 hover:border-cyber-primary text-white rounded-xl hover:bg-cyber-primary/5 hover:shadow-[0_0_30px_rgba(255,0,85,0.15)] transition-all disabled:opacity-50 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-primary group-hover:shadow-[0_0_10px_#ff0055] transition-all"></div>
                            <h4 className="font-bold text-lg mb-1 group-hover:text-cyber-primary transition-colors">DDoS Vector</h4>
                            <p className="text-xs text-cyber-muted uppercase tracking-widest">Distributed Denial of Service</p>
                        </button>

                        <button
                            onClick={() => handleSimulation('phishing')}
                            disabled={simLoading}
                            className="flex-1 py-6 px-8 bg-black/50 border border-purple-500/30 hover:border-purple-500 text-white rounded-xl hover:bg-purple-500/5 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] transition-all disabled:opacity-50 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 group-hover:shadow-[0_0_10px_#bc13fe] transition-all"></div>
                            <h4 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">Social Vector</h4>
                            <p className="text-xs text-cyber-muted uppercase tracking-widest">Phishing & Deception</p>
                        </button>
                    </div>

                    {simResult && (
                        <div className="mt-12 max-w-3xl mx-auto text-left animate-slide-up">
                            <div className="bg-[#050505] border border-cyber-border rounded-lg overflow-hidden shadow-2xl">
                                <div className={`px-4 py-2 border-b border-cyber-border flex justify-between items-center ${simResult.attack === 'DDoS' ? 'bg-red-900/10' : 'bg-purple-900/10'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                                    </div>
                                    <span className="font-mono text-xs text-gray-500">{simResult.attack.toUpperCase()}_LOG.TXT</span>
                                </div>
                                <div className="p-6 font-mono text-xs sm:text-sm">
                                    <div className="flex items-start gap-2 text-green-500 mb-2">
                                        <span>$</span>
                                        <p>initiate_defense_protocol --target={simResult.attack}</p>
                                    </div>
                                    <p className="text-gray-300 mb-6 pl-4 border-l border-gray-800">{simResult.message}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {simResult.effects.map((effect, idx) => (
                                            <div key={idx} className="bg-white/5 p-3 rounded border border-white/5 flex items-start gap-3">
                                                <span className="text-cyber-primary opacity-70">[{idx < 10 ? `0${idx + 1}` : idx + 1}]</span>
                                                <span className="text-gray-400">{effect}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/5 px-4 py-2 text-[10px] text-center text-gray-500 uppercase tracking-wider">
                                    // End of Simulation Stream //
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityCheck;
