import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Globe, Lock, ChevronRight, Activity, Search, Zap } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyber-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Navbar */}
            <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <Shield className="text-cyber-primary w-8 h-8 animate-pulse-slow" />
                    <span className="text-2xl font-black tracking-widest italic">SECURE<span className="text-cyber-primary">GUARD</span></span>
                </div>
                <div className="flex gap-8 items-center">
                    <Link to="/login" className="text-cyber-muted hover:text-white transition-all text-xs font-bold uppercase tracking-[0.3em]">Session_Login</Link>
                    <Link to="/register" className="px-8 py-3 bg-cyber-primary text-black font-black text-xs uppercase tracking-[0.2em] rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_35px_rgba(0,243,255,0.5)] transition-all transform hover:scale-105 active:scale-95">
                        Establish Connection
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-cyber-primary/30 rounded-full bg-cyber-primary/5 text-cyber-primary text-[10px] font-bold tracking-[0.25em] animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-primary shadow-[0_0_5px_#00f3ff]"></div>
                        SYSTEM ENCRYPTION STATUS: ACTIVE
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter">
                        SHIELD YOUR<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyan-400 to-cyber-secondary">IDENTITY.</span>
                    </h1>

                    <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed font-mono opacity-80">
                        // INITIALIZING SECURE OPS...<br />
                        The industry-standard cryptographic bastion for credential orchestration and preemptive threat intelligence.
                        Zero-trust architecture. AES-256 standard.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 pt-4">
                        <Link to="/register" className="px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group text-xs shadow-2xl">
                            Deploy Defense <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                        </Link>
                        <Link to="/website-safety" className="px-10 py-5 bg-black/40 border border-white/10 text-white font-bold uppercase tracking-[0.2em] rounded-xl hover:border-cyber-primary hover:text-cyber-primary transition-all flex items-center justify-center gap-3 text-xs backdrop-blur-md">
                            <Search size={18} /> URL Integrity Check
                        </Link>
                    </div>
                </div>

                {/* Visual / Dashboard Preview */}
                <div className="flex-1 relative w-full h-[600px] hidden lg:flex items-center justify-end">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary/10 to-cyber-secondary/10 rounded-full blur-[150px] opacity-40"></div>

                    <div className="relative z-10 w-full max-w-md bg-[#0a0a0d] border border-white/5 rounded-2xl p-8 shadow-[0_0_100px_rgba(0,0,0,1)] perspective-1000 rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-all duration-1000 ease-out">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary/40 to-transparent"></div>

                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyber-primary/10 rounded-lg border border-cyber-primary/20">
                                    <Activity size={20} className="text-cyber-primary" />
                                </div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Live Threat Node</span>
                            </div>
                            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-[8px] font-bold text-green-500 uppercase tracking-widest">
                                Operational
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="h-32 bg-black/80 rounded-xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                                    <Lock size={100} />
                                </div>
                                <div className="flex justify-between items-start">
                                    <p className="text-[10px] text-cyber-muted uppercase tracking-widest">Vault Shield</p>
                                    <Shield size={14} className="text-cyber-secondary" />
                                </div>
                                <div className="text-3xl font-black text-white tracking-tighter">99.9%</div>
                                <div className="w-full h-1 bg-gray-900 rounded-full mt-2">
                                    <div className="w-[99.9%] h-full bg-cyber-primary shadow-[0_0_10px_#00f3ff]"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/60 rounded-xl border border-white/5 p-5">
                                    <Globe className="text-cyber-primary mb-3" size={18} />
                                    <div className="text-[8px] text-cyber-muted uppercase tracking-widest">Global IP</div>
                                    <div className="text-sm font-bold text-white mt-1 font-mono">1.0.0.1_ERR</div>
                                </div>
                                <div className="bg-black/60 rounded-xl border border-white/5 p-5">
                                    <Zap className="text-yellow-500 mb-3" size={18} />
                                    <div className="text-[8px] text-cyber-muted uppercase tracking-widest">Attack Vectors</div>
                                    <div className="text-sm font-bold text-white mt-1 font-mono">03_DET_MOD</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-black py-32 border-t border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <h2 className="text-[10px] font-bold text-cyber-primary uppercase tracking-[0.5em] mb-4">Core Ecosystem</h2>
                            <h3 className="text-4xl font-bold text-white tracking-tight">MISSION-CRITICAL MODULES</h3>
                        </div>
                        <p className="text-gray-500 text-sm max-w-sm font-mono leading-relaxed">
                            Interconnected defense segments designed to handle enterprise-scale digital assets and communications.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<Lock className="text-cyber-secondary" size={28} />}
                            title="Encrypted Vault"
                            desc="AES-256-GCM authenticated encryption for credential synchronization across all enterprise nodes."
                        />
                        <FeatureCard
                            icon={<Search className="text-cyber-primary" size={28} />}
                            title="Safety Heuristics"
                            desc="Recursive URL analysis protocol to identify and neutralize phishing vectors and malware distribution."
                        />
                        <FeatureCard
                            icon={<Globe className="text-purple-500" size={28} />}
                            title="Global Intel Map"
                            desc="Real-time visualization of geopolitical threat intensity and ongoing DDoS operations."
                        />
                        <FeatureCard
                            icon={<Shield className="text-green-500" size={28} />}
                            title="Information Hub"
                            desc="Internal briefing center for tactical awareness, password hygiene, and operational security."
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-16 text-center bg-[#030303] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-3 opacity-30">
                            <Shield className="text-white w-6 h-6" />
                            <span className="text-sm font-bold tracking-[0.4em] uppercase">SecurePassGuard System</span>
                        </div>

                        <div className="max-w-3xl border border-dashed border-white/10 p-6 rounded-xl">
                            <p className="text-cyber-muted text-[10px] uppercase tracking-[0.2em] leading-loose italic">
                                LEGAL_SECURITY_DISCLAIMER: This platform is authorized for academic research and cybersecurity simulation only.
                                No offensive packets are transmitted outside the sandbox environment.
                                All data is processed using hardened cryptographic standards.
                            </p>
                        </div>

                        <div className="flex gap-10 text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-4">
                            <span>Status: Operational</span>
                            <span>Version: 2.4.0_Stable</span>
                            <span>Region: Global_Admin</span>
                        </div>

                        <p className="text-gray-700 text-[10px] mt-8">© 2025 SecurePassGuard. Developed for secure environments.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 bg-[#0a0a0d] border border-white/5 hover:border-cyber-primary/30 transition-all rounded-2xl group relative overflow-hidden h-full flex flex-col">
        <div className="mb-8 w-14 h-14 bg-black border border-white/5 rounded-xl flex items-center justify-center group-hover:border-cyber-primary/50 transition-colors shadow-inner">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-4 tracking-wide uppercase italic">{title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed font-sans">{desc}</p>

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-cyber-primary uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                Access Module <ChevronRight size={12} />
            </span>
        </div>
    </div>
);

export default Landing;
