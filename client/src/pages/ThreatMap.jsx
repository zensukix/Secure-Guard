import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Crosshair, Globe, Radio, Shield, Zap, AlertOctagon } from 'lucide-react';

const MapController = () => {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
};

const ThreatMap = () => {
    const [attacks, setAttacks] = useState([]);
    const [attackLog, setAttackLog] = useState([]);
    const [stats, setStats] = useState({ blocked: 0, critical: 0 });

    useEffect(() => {
        const fetchThreats = async () => {
            try {
                const { data } = await axios.get('/api/threats/live');
                setAttacks(data);
                setAttackLog(prev => [...data, ...prev].slice(0, 20));
                setStats(prev => ({
                    blocked: prev.blocked + Math.floor(Math.random() * 5),
                    critical: data.filter(d => d.type === 'DDoS').length
                }));
            } catch (error) {
                console.error("Simulation error", error);
            }
        };

        fetchThreats();
        const interval = setInterval(fetchThreats, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 animate-fade-in overflow-hidden pb-6">
            {/* MAIN INTELLIGENCE PANEL */}
            <div className="flex-1 bg-cyber-black border border-cyber-border rounded-xl overflow-hidden relative group">
                {/* HUD Header */}
                <div className="absolute top-0 left-0 right-0 z-[500] p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-[0.2em] font-display">
                            <Globe className="text-cyber-primary" />
                            GLOBAL THREAT INTEL
                        </h2>
                        <p className="text-cyber-muted text-xs font-mono uppercase mt-1 pl-9">
                            Real-time Attack Vectors & Anomaly Detection
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-red-500 font-mono">{stats.critical}</div>
                            <div className="text-[10px] text-cyber-muted uppercase tracking-widest">Active Critical</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-cyber-primary font-mono">{stats.blocked}</div>
                            <div className="text-[10px] text-cyber-muted uppercase tracking-widest">Threats Neutralized</div>
                        </div>
                    </div>
                </div>

                {/* VISUAL OVERLAYS */}
                <div className="absolute inset-0 pointer-events-none z-[400] opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 pointer-events-none z-[400] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]"></div>
                <div className="absolute bottom-10 left-10 z-[500] pointer-events-none">
                    <div className="p-4 border border-cyber-border/50 bg-black/80 backdrop-blur rounded flex items-center gap-4">
                        <div className="animate-pulse">
                            <Radio className="text-red-500" size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-red-500 font-bold uppercase tracking-widest">Simulation Active</div>
                            <div className="text-[10px] text-gray-500 font-mono">Live Data Stream: CONNECTED</div>
                        </div>
                    </div>
                </div>

                <MapContainer center={[20, 0]} zoom={2} minZoom={2} maxZoom={5} zoomControl={false} dragging={true} scrollWheelZoom={true} className="h-full w-full bg-[#050505] grayscale-[20%] contrast-[1.2]">
                    <MapController />
                    <TileLayer
                        attribution='&copy; OctoSec'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {attacks.map((attack) => (
                        <CircleMarker
                            key={attack.id}
                            center={[attack.source.lat, attack.source.lng]}
                            radius={3}
                            pathOptions={{ color: '#ff0055', fillColor: '#ff0055', fillOpacity: 0.9, weight: 0 }}
                        >
                            <Popup className="cyber-popup" closeButton={false}>
                                <div className="p-2 bg-black border border-red-500/50 text-white text-xs font-mono shadow-[0_0_15px_rgba(255,0,85,0.4)]">
                                    <strong className="text-[#ff0055] block mb-1 uppercase tracking-wider">Source Detected</strong>
                                    {attack.type} from {attack.source.name}
                                </div>
                            </Popup>
                        </CircleMarker>
                    ))}

                    {attacks.map((attack) => (
                        <CircleMarker
                            key={`${attack.id}-target`}
                            center={[attack.target.lat, attack.target.lng]}
                            radius={3}
                            pathOptions={{ color: '#00f3ff', fillColor: '#00f3ff', fillOpacity: 0.9, weight: 0 }}
                        >
                            <div className="animate-ping absolute inset-0 rounded-full bg-cyan-400 opacity-75"></div>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>

            {/* SIDEBAR INTEL FEED */}
            <div className="w-full md:w-96 bg-cyber-black/50 border-l border-cyber-border backdrop-blur-sm flex flex-col">
                <div className="p-6 border-b border-cyber-border bg-black/40">
                    <h3 className="text-white font-bold flex items-center gap-3 tracking-widest text-sm uppercase">
                        <Zap className="text-yellow-500" size={16} />
                        Live Event Log
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {attackLog.map((log, idx) => (
                        <div key={`${log.id}-${idx}`} className="group p-3 rounded hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-cyber-primary font-mono text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <span className={`font-bold uppercase ${log.type === 'DDoS' ? 'text-red-500' : 'text-cyber-secondary'}`}>
                                    [{log.type}]
                                </span>
                                <span className="text-cyber-muted text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-gray-400 flex items-center gap-2 text-[10px]">
                                <span className="text-white">{log.source.name}</span>
                                <span className="text-cyber-muted opacity-50">----------------&gt;</span>
                                <span className="text-white">{log.target.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-cyber-border bg-black/60 text-[10px] text-cyber-muted text-center font-mono uppercase tracking-widest">
                    * Simulated Environment. No real attacks performing.
                </div>
            </div>
        </div>
    );
};

export default ThreatMap;
