import React, { useState } from 'react';
import { Shield, Search, Globe, CheckCircle, AlertTriangle, XCircle, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebsiteSafety = () => {
    const [checkUrl, setCheckUrl] = useState('');
    const [checkResult, setCheckResult] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleCheck = (e) => {
        e.preventDefault();
        if (!checkUrl) return;

        setIsChecking(true);
        setCheckResult(null);

        // Simulate Analysis Delay
        setTimeout(() => {
            const lowerUrl = checkUrl.toLowerCase();
            let result = {
                status: 'SAFE',
                score: 95,
                color: 'text-green-500',
                bg: 'bg-green-500/10',
                border: 'border-green-500/30',
                details: []
            };

            // Simulated Logic for demonstration
            if (lowerUrl.includes('http:') && !lowerUrl.includes('https:')) {
                result.status = 'CAUTION';
                result.score = 65;
                result.color = 'text-yellow-500';
                result.bg = 'bg-yellow-500/10';
                result.border = 'border-yellow-500/30';
                result.details.push({ label: 'Connection Protocol', value: 'Unencrypted (HTTP)', status: 'warning' });
            } else {
                result.details.push({ label: 'Connection Protocol', value: 'Encrypted (HTTPS)', status: 'good' });
            }

            if (lowerUrl.includes('suspicious') || lowerUrl.includes('free-money') || lowerUrl.includes('login-verify')) {
                result.status = 'HIGH RISK';
                result.score = 20;
                result.color = 'text-red-500';
                result.bg = 'bg-red-500/10';
                result.border = 'border-red-500/30';
                result.details.push({ label: 'Phishing Pattern', value: 'Detected', status: 'bad' });
                result.details.push({ label: 'Domain Reputation', value: 'Poor', status: 'bad' });
            } else {
                result.details.push({ label: 'Phishing Pattern', value: 'Clean', status: 'good' });
                result.details.push({ label: 'Domain Reputation', value: 'Good', status: 'good' });
            }

            // Randomize other checks for "realism" if clean
            if (result.status === 'SAFE') {
                result.details.push({ label: 'Malware Status', value: 'Clean', status: 'good' });
                result.details.push({ label: 'Domain Age', value: '> 5 Years', status: 'good' });
            }

            setCheckResult(result);
            setIsChecking(false);
        }, 2000);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex items-center gap-4 border-b border-cyber-border/50 pb-6">
                <Link to="/dashboard" className="p-2 border border-cyber-border rounded-lg hover:bg-white/5 hover:text-white transition-colors group">
                    <ArrowLeft size={20} className="text-gray-500 group-hover:text-white" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Globe className="text-cyber-primary" size={32} />
                        WEBSITE SAFETY CHECKER
                    </h2>
                    <p className="text-cyber-muted text-sm mt-1 max-w-2xl">
                        Verify URL integrity, SSL status, and reputation before clicking.
                        <span className="opacity-50 ml-2">Simple heuristics analysis protocol.</span>
                    </p>
                </div>
            </div>

            {/* CHECKER PANEL */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Search size={200} />
                </div>
                {/* Decorative background blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4 mb-10">
                        <div className="flex-1 relative group">
                            <span className="absolute left-0 top-0 bottom-0 px-4 flex items-center justify-center bg-black/30 border-r border-cyber-border rounded-l-lg z-10">
                                <Globe className="text-cyber-muted group-focus-within:text-cyber-primary transition-colors" size={20} />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter full URL (e.g., https://example.com)..."
                                className="w-full pl-16 bg-black/50 border border-cyber-border rounded-lg py-4 text-white focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary/50 outline-none font-mono text-sm transition-all shadow-inner"
                                value={checkUrl}
                                onChange={(e) => setCheckUrl(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isChecking}
                            className="bg-cyber-secondary text-black font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] whitespace-nowrap"
                        >
                            {isChecking ? 'Analyzing...' : 'Scan URL'}
                        </button>
                    </form>

                    {checkResult && (
                        <div className="animate-slide-up bg-[#050505]/80 backdrop-blur-md rounded-xl border border-cyber-border overflow-hidden shadow-2xl">
                            {/* Result Header */}
                            <div className={`p-8 flex items-center justify-between border-b border-cyber-border relative overflow-hidden`}>
                                <div className={`absolute inset-0 opacity-10 ${checkResult.bg}`}></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    {checkResult.status === 'SAFE' && <CheckCircle className={checkResult.color} size={48} />}
                                    {checkResult.status === 'CAUTION' && <AlertTriangle className={checkResult.color} size={48} />}
                                    {checkResult.status === 'HIGH RISK' && <XCircle className={checkResult.color} size={48} />}

                                    <div>
                                        <h4 className={`text-3xl font-bold ${checkResult.color} tracking-tight`}>{checkResult.status}</h4>
                                        <p className="text-cyber-muted text-xs uppercase tracking-[0.2em] mt-1 opacity-70">Simulated Threat Analysis</p>
                                    </div>
                                </div>
                                <div className="text-center relative z-10 w-24 h-24 flex flex-col justify-center items-center bg-black/40 rounded-full border border-white/10">
                                    <div className={`text-2xl font-bold ${checkResult.score > 80 ? 'text-green-500' : checkResult.score > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {checkResult.score}
                                    </div>
                                    <p className="text-[10px] text-cyber-muted uppercase tracking-wider">Score</p>
                                </div>
                            </div>

                            {/* Result Details */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {checkResult.details.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                        <span className={`font-mono font-bold text-sm ${item.status === 'good' ? 'text-green-400' : item.status === 'bad' ? 'text-red-400' : 'text-yellow-400'}`}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="px-8 pb-8 text-center">
                                <p className="text-xs text-gray-500 bg-black/40 border border-white/5 p-4 rounded-lg font-mono">
                                    <span className="text-cyber-primary font-bold mr-2">&gt; RECOMMENDATION:</span>
                                    {checkResult.status === 'SAFE' ? 'This website appears standard. Always practice caution.' : 'Avoid entering personal data or credentials on this site.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2 text-cyber-muted text-[10px] uppercase tracking-wider bg-cyber-card border border-cyber-border/50 px-6 py-2 rounded-full opacity-60 hover:opacity-100 transition-opacity">
                    <Info size={12} />
                    <span>DISCLAIMER: This tool simulates website security checks for educational awareness. No real scanning is performed.</span>
                </div>
            </div>
        </div>
    );
};

export default WebsiteSafety;
