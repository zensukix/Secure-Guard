import React from 'react';
import { Shield, Lock, AlertTriangle, Wifi, FileWarning, Eye, CheckCircle, Info, Activity, ShieldAlert, Cpu } from 'lucide-react';

const CyberAwareness = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header Section */}
            <div className="border-b border-cyber-border/50 pb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="text-cyber-primary" size={24} />
                    <h2 className="text-3xl font-bold text-white tracking-tight font-sans">AWARENESS & EDUCATION</h2>
                </div>
                <p className="text-cyber-muted text-sm max-w-2xl">
                    Internal intelligence briefings and defensive protocols.
                    Understanding attack vectors is prerequisite to comprehensive security posture.
                </p>
            </div>

            {/* THREAT LANDSCAPE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                {/* Threat vector 1 */}
                <Card
                    icon={<Lock className="text-red-500" />}
                    title="Credentials Exploitation"
                    subtitle="Authentication Vector"
                    accentColor="border-red-500/30"
                >
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        Attackers utilize automated arrays to simulate login attempts or leverage leaked database hashes.
                    </p>
                    <div className="space-y-2">
                        <ThreatItem label="Entropy Exhaustion" desc="Brute-forcing low-character passwords." color="bg-red-500" />
                        <ThreatItem label="Credential Stuffing" desc="Reusing credentials across disparate systems." color="bg-red-500" />
                        <ThreatItem label="Hash Salting Failure" desc="Exploiting weak cryptographic implementations." color="bg-red-500" />
                    </div>
                </Card>

                {/* Threat vector 2 */}
                <Card
                    icon={<FileWarning className="text-orange-500" />}
                    title="Social Engineering"
                    subtitle="Human Interaction Vector"
                    accentColor="border-orange-500/30"
                >
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        Deceptive communications designed to bypass technical controls by targeting the human element.
                    </p>
                    <div className="space-y-2">
                        <ThreatItem label="Spear Phishing" desc="Targeted email campaigns with high-fidelity mimicry." color="bg-orange-500" />
                        <ThreatItem label="Visual Deception" desc="Mimicked UI/UX to harvest sensitive input data." color="bg-orange-500" />
                        <ThreatItem label="Executive Spoofing" desc="Impersonating authority to bypass protocol." color="bg-orange-500" />
                    </div>
                </Card>

                {/* Threat vector 3 */}
                <Card
                    icon={<AlertTriangle className="text-purple-500" />}
                    title="System Corruption"
                    subtitle="Infiltration Vector"
                    accentColor="border-purple-500/30"
                >
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        Deployment of autonomous scripts to neutralize data integrity or observe system states.
                    </p>
                    <div className="space-y-2">
                        <ThreatItem label="Ransomware Array" desc="Cryptographic locking of critical storage volumes." color="bg-purple-500" />
                        <ThreatItem label="Spyware Payload" desc="Low-noise observation of kernel-level activities." color="bg-purple-500" />
                        <ThreatItem label="Zero-Day Exploits" desc="Leveraging undisclosed kernel vulnerabilities." color="bg-purple-500" />
                    </div>
                </Card>

                {/* Threat vector 4 */}
                <Card
                    icon={<Wifi className="text-cyber-secondary" />}
                    title="Transmission Intercept"
                    subtitle="Network Layer Vector"
                    accentColor="border-cyber-secondary/30"
                >
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        Compromising data integrity during transit across unsecured or adversary-controlled nodes.
                    </p>
                    <div className="space-y-2">
                        <ThreatItem label="MITM Attack" desc="Intercepting traffic between client and gateway." color="bg-cyber-secondary" />
                        <ThreatItem label="Evil Twin Hotspot" desc="Broadcast of deceptive SSID to capture packets." color="bg-cyber-secondary" />
                        <ThreatItem label="SSL Stripping" desc="Downgrading secure TLS connections to plain text." color="bg-cyber-secondary" />
                    </div>
                </Card>
            </div>

            {/* DEFENSIVE PROTOCOLS (CHECKLIST) */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                    <ShieldAlert className="text-green-500" size={24} />
                    OPERATIONAL SECURITY PROTOCOLS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {[
                        { title: "Unique Identity", desc: "Never replicate passwords across internal systems." },
                        { title: "Vault Integration", desc: "Utilize SecurePassGuard for all credential storage." },
                        { title: "MFA Enforcement", desc: "Mandatory hardware or biometric multi-factor auth." },
                        { title: "Header Inspection", desc: "Always verify email DKIM/SPF signatures manually." },
                        { title: "Kernel Updates", desc: "Deploy security patches within 24 hours of release." },
                        { title: "Audit Log Review", desc: "Weekly review of all system access and activity logs." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-black/40 border border-white/5 rounded-lg">
                            <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={16} />
                            <div>
                                <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">{item.title}</h4>
                                <p className="text-[10px] text-gray-400 leading-relaxed font-mono">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* INCIDENCE CASE BRIEFINGS */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-cyber-muted uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Activity size={14} className="text-cyber-secondary" /> Historical Intelligence Briefings
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Briefing
                        title="The Yahoo Breach Topology"
                        stat="3B IMPACTS"
                        lesson="Session persistence can be exploited even with encrypted storage. Rotate session tokens frequently."
                        danger
                    />
                    <Briefing
                        title="Equifax Zero-Day Failure"
                        stat="147M IMPACTS"
                        lesson="The failure was administrative, not technical. Unpatched Apache Struts modules were the primary vector."
                    />
                </div>
            </div>

            {/* FOOTER DISCLAIMER */}
            <div className="bg-[#050505] border border-cyber-border/50 p-4 rounded-lg flex items-center justify-center gap-3">
                <Info size={14} className="text-cyber-muted shrink-0" />
                <p className="text-[10px] text-cyber-muted uppercase tracking-widest text-center">
                    Confidential Educational Resource • Defend Digital Identity • SecurePassGuard Intel v1.2
                </p>
            </div>
        </div>
    );
};

const Card = ({ icon, title, subtitle, children, accentColor }) => (
    <div className={`bg-cyber-card border rounded-xl p-6 flex flex-col h-full hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all ${accentColor} relative overflow-hidden group`}>
        <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            {React.cloneElement(icon, { size: 120 })}
        </div>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg group-hover:scale-110 transition-transform">
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
                <p className="text-[10px] text-cyber-muted uppercase tracking-[0.2em] font-mono">{subtitle}</p>
            </div>
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

const ThreatItem = ({ label, desc, color }) => (
    <div className="flex items-start gap-3 p-2 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/5">
        <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${color}`}></div>
        <div className="flex-1 min-w-0">
            <h5 className="text-[10px] font-bold text-white mb-0.5 uppercase tracking-wider truncate">{label}</h5>
            <p className="text-[9px] text-gray-500 truncate">{desc}</p>
        </div>
    </div>
);

const Briefing = ({ title, stat, lesson, danger }) => (
    <div className={`p-5 bg-black/40 border-l-2 rounded-r-lg flex flex-col sm:flex-row justify-between gap-4 transition-all hover:bg-white/5 ${danger ? 'border-red-500 hover:border-red-400' : 'border-cyber-secondary hover:border-cyan-400'}`}>
        <div className="flex-1">
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed italic">&gt; "{lesson}"</p>
        </div>
        <div className="text-right shrink-0 flex flex-col justify-center">
            <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${danger ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-cyber-secondary border-cyber-secondary/30 bg-cyber-secondary/10'}`}>
                {stat}
            </span>
        </div>
    </div>
);

export default CyberAwareness;
