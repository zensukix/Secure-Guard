import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ShieldCheck, Terminal, Cpu, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50"></div>

            {/* Animated Grid lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="h-full w-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
            </div>

            <div className="w-full max-w-[420px] relative">
                {/* Decorative brackets */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-cyber-primary/20 rounded-tl-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-cyber-primary/20 rounded-br-3xl pointer-events-none"></div>

                <div className="bg-[#0a0a0d]/80 backdrop-blur-xl border border-white/5 p-10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,1)] relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 rounded-full bg-cyber-primary/5 border border-cyber-primary/20 mb-6 group hover:scale-110 transition-transform cursor-pointer">
                            <ShieldCheck className="w-10 h-10 text-cyber-primary group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] transition-all" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-widest uppercase italic">SECURE ACCESS</h2>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <span className="h-[1px] w-4 bg-cyber-border"></span>
                            <p className="text-cyber-muted text-[10px] uppercase tracking-[0.3em] font-mono">PROTOCOL v2.4</p>
                            <span className="h-[1px] w-4 bg-cyber-border"></span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-bold text-cyber-muted uppercase tracking-widest pl-1">Identity UID (Email)</label>
                                <Terminal size={12} className="text-cyber-muted opacity-30" />
                            </div>
                            <input
                                type="email"
                                className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/20 transition-all font-mono text-sm placeholder:text-gray-700"
                                placeholder="name@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-bold text-cyber-muted uppercase tracking-widest pl-1">Encryption Key (Password)</label>
                                <Lock size={12} className="text-cyber-muted opacity-30" />
                            </div>
                            <input
                                type="password"
                                className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/20 transition-all font-mono text-sm placeholder:text-gray-700"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 bg-cyber-primary text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_35px_rgba(0,243,255,0.4)] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2 group"
                        >
                            Establish Link <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-cyber-muted text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                            Unauthorized?
                            <Link to="/register" className="text-cyber-secondary font-bold hover:text-white transition-colors flex items-center gap-1 group">
                                Register Device <Cpu size={12} className="group-hover:rotate-12 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer labels */}
                <div className="mt-8 flex justify-between px-2 opacity-20 pointer-events-none">
                    <span className="text-[8px] text-white font-mono uppercase">Node: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                    <span className="text-[8px] text-white font-mono uppercase tracking-[0.5em]">SECUREPASSGUARD</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
