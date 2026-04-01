import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Lock, Shield, User, Mail, ArrowRight } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(username, email, password);
        if (success) navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.05),transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50"></div>

            {/* Animated Grid lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="h-full w-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
            </div>

            <div className="w-full max-w-[440px] relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-black border border-cyber-border rounded text-[8px] text-cyber-muted font-mono uppercase tracking-[0.5em] z-20 shadow-2xl">
                    Registration Protocol Initiated
                </div>

                <div className="bg-[#0a0a0d]/90 backdrop-blur-2xl border border-white/5 p-10 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,1)] relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 rounded-xl bg-red-500/5 border border-red-500/20 mb-6 group hover:scale-110 transition-transform cursor-pointer">
                            <UserPlus className="w-10 h-10 text-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all" />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-widest uppercase italic">NEW IDENTITY</h2>
                        <p className="text-cyber-muted text-[10px] uppercase tracking-[0.3em] font-mono mt-3 opacity-60">Provisioning Secure Node Access</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-cyber-muted uppercase tracking-widest pl-1">Agent Codename</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted group-focus-within:text-red-500 transition-colors" />
                                <input
                                    type="text"
                                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all font-mono text-sm placeholder:text-gray-700"
                                    placeholder="Enter Codename..."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-cyber-muted uppercase tracking-widest pl-1">Communications UID (Email)</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted group-focus-within:text-red-500 transition-colors" />
                                <input
                                    type="email"
                                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all font-mono text-sm placeholder:text-gray-700"
                                    placeholder="Enter Email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-cyber-muted uppercase tracking-widest pl-1">Master Access Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted group-focus-within:text-red-500 transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all font-mono text-sm placeholder:text-gray-700"
                                    placeholder="Create Strong Key..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_35px_rgba(239,68,68,0.4)] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2 group"
                        >
                            Establish Identity <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-cyber-muted text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                            Secure Link Exists?
                            <Link to="/login" className="text-red-500 font-bold hover:text-white transition-colors flex items-center gap-1 group">
                                Access Terminal <Shield size={12} className="group-hover:scale-110 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Status indicators */}
                <div className="mt-6 flex justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[7px] text-white uppercase font-mono">SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-[7px] text-white uppercase font-mono">AES-256 Ready</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
