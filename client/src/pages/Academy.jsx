import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, CheckCircle, Lock, Layout, ShieldAlert, Award, Star, Play, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { clsx } from 'clsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Academy = () => {
    const [userProgress, setUserProgress] = useState({ academyProgress: [], xp: 0, level: 'Cadet' });
    const [activeModule, setActiveModule] = useState(null);
    const [loading, setLoading] = useState(true);

    // Interactive States
    const [entropyPassword, setEntropyPassword] = useState('');
    const [quizAnswers, setQuizAnswers] = useState({});

    // Phishing Sim State
    const [emailStep, setEmailStep] = useState(0);

    const modules = [
        {
            id: 'm1',
            title: 'Password Entropy 101',
            desc: 'Visualizing brute-force resistance.',
            level: 'Beginner',
            xp: 20,
            type: 'simulator_entropy',
            content: {
                intro: "Entropy measures the randomness of a password. Higher entropy = harder to crack.",
                task: "Create a password with > 60 bits of entropy to pass."
            }
        },
        {
            id: 'm2',
            title: 'Phishing Defense',
            desc: 'Spotting social engineering attacks.',
            level: 'Intermediate',
            xp: 30,
            type: 'simulator_phishing',
            content: {
                intro: "Phishing relies on urgency and fear. Always inspect the sender and links.",
                emails: [
                    {
                        subject: "URGENT: Account Suspension",
                        sender: "security@paypa1.com",
                        body: "Your account has been flagged. Click here to verify immediately.",
                        isPhishing: true,
                        reason: "Sender domain typocraft (paypa1.com) + Urgency."
                    },
                    {
                        subject: "Project Update",
                        sender: "alice@company.com",
                        body: "Attached is the Q3 report we discussed.",
                        isPhishing: false,
                        reason: "Standard business communication from known internal domain."
                    }
                ]
            }
        },
        {
            id: 'm3',
            title: 'Encryption Mechanics',
            desc: 'How AES-256 secures your data.',
            level: 'Advanced',
            xp: 40,
            type: 'simulator_encryption',
            content: {
                intro: "See how Plaintext + Key + IV becomes Ciphertext."
            }
        },
        {
            id: 'm4',
            title: 'Breach Case Studies',
            desc: 'Analyzing the Yahoo 2013 leak.',
            level: 'Expert',
            xp: 50,
            type: 'simulator_breach',
            content: {
                timeline: [
                    { year: 2013, event: "Attackers forge cookies using stolen source code." },
                    { year: 2014, event: "500 Million accounts compromised." },
                    { year: 2016, event: "Breach validated. 3 Billion total affected." }
                ]
            }
        }
    ];

    const fetchProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/academy/progress', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserProgress(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchProgress(); }, []);

    const calculateEntropy = (pwd) => {
        const pool = (/[a-z]/.test(pwd) ? 26 : 0) + (/[A-Z]/.test(pwd) ? 26 : 0) + (/[0-9]/.test(pwd) ? 10 : 0) + (/[^a-zA-Z0-9]/.test(pwd) ? 32 : 0);
        if (pool === 0 || !pwd) return 0;
        return Math.floor(Math.log2(Math.pow(pool, pwd.length)));
    };

    const handleComplete = async (mod, score = 100) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('/api/academy/complete', {
                moduleId: mod.id,
                xpEarned: mod.xp,
                score
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserProgress({ ...userProgress, ...data });
            toast.success(`Module Complete! +${mod.xp} XP`, { theme: "dark" });
            setActiveModule(null);
            // Reset states
            setEntropyPassword('');
            setEmailStep(0);
        } catch (error) {
            toast.error('Failed to save progress');
        }
    };

    const isCompleted = (id) => userProgress.academyProgress?.some(p => p.moduleId === id && p.status === 'completed');

    // -- RENDER SIMULATORS -- //

    const EntropySim = ({ mod }) => {
        const entropy = calculateEntropy(entropyPassword);
        const timeToCrack = entropy < 40 ? "Instantly" : entropy < 60 ? "Days" : entropy < 80 ? "Centuries" : "Milennia";
        const color = entropy < 40 ? "text-red-500" : entropy < 60 ? "text-yellow-500" : "text-green-500";

        return (
            <div className="space-y-6">
                <p className="text-gray-300">{mod.content.intro}</p>
                <div className="bg-cyber-black p-6 rounded border border-cyber-border">
                    <label className="block text-xs uppercase text-cyber-muted mb-2 font-bold">Test Password Strength</label>
                    <input
                        type="text"
                        className="w-full bg-cyber-black border border-cyber-border rounded p-3 text-white font-mono focus:border-cyber-primary outline-none"
                        value={entropyPassword}
                        onChange={e => setEntropyPassword(e.target.value)}
                        placeholder="Type a password..."
                    />

                    <div className="mt-6 flex justify-between items-center text-center">
                        <div>
                            <p className="text-xs text-cyber-muted uppercase">Bits of Entropy</p>
                            <p className={`text-4xl font-bold ${color}`}>{entropy}</p>
                        </div>
                        <div>
                            <p className="text-xs text-cyber-muted uppercase">Est. Crack Time</p>
                            <p className="text-xl text-white font-mono">{timeToCrack}</p>
                        </div>
                    </div>
                </div>
                {entropy > 60 && (
                    <button onClick={() => handleComplete(mod)} className="w-full py-4 bg-green-600 font-bold rounded text-white animate-pulse">
                        Pass Challenge
                    </button>
                )}
            </div>
        );
    };

    const PhishingSim = ({ mod }) => {
        const currentEmail = mod.content.emails[emailStep];

        const handleDecision = (isPhishing) => {
            if (isPhishing === currentEmail.isPhishing) {
                toast.success("Correct Identify!", { theme: "dark" });
                if (emailStep < mod.content.emails.length - 1) {
                    setEmailStep(s => s + 1);
                } else {
                    handleComplete(mod);
                }
            } else {
                toast.error("Incorrect. Review the criteria.", { theme: "dark" });
            }
        };

        return (
            <div className="space-y-6">
                <p className="text-gray-300">{mod.content.intro}</p>
                <div className="bg-white text-black p-6 rounded-lg shadow-xl relative">
                    <div className="border-b pb-2 mb-4">
                        <p className="font-bold">Subject: {currentEmail.subject}</p>
                        <p className="text-sm text-gray-600">From: <span className="font-mono bg-gray-200 px-1">{currentEmail.sender}</span></p>
                    </div>
                    <p className="mb-8">{currentEmail.body}</p>

                    <div className="flex gap-4">
                        <button onClick={() => handleDecision(false)} className="flex-1 py-2 bg-gray-200 rounded font-bold hover:bg-gray-300">Legitimate</button>
                        <button onClick={() => handleDecision(true)} className="flex-1 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700">Phishing</button>
                    </div>
                </div>
                <p className="text-xs text-cyber-muted text-center">* This is a simulated email for educational purposes.</p>
            </div>
        );
    };

    // Generic placeholder for other sims to save space in this artifact
    const GenericSim = ({ mod }) => (
        <div className="space-y-6 text-center">
            <p className="text-gray-300 mb-8">{mod.desc}</p>
            <div className="p-10 border-2 border-dashed border-cyber-muted rounded flex items-center justify-center">
                <p className="text-cyber-primary animate-pulse">Interactive Module Simulation Running...</p>
            </div>
            <button onClick={() => handleComplete(mod)} className="w-full py-3 bg-cyber-primary font-bold rounded">Complete Training</button>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* HEADER DASHBOARD */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-cyber-primary/20 rounded-full border border-cyber-primary">
                        <Award className="w-10 h-10 text-cyber-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{userProgress.level}</h2>
                        <p className="text-cyber-muted text-sm font-mono mt-1">Classified Personnel</p>
                    </div>
                </div>

                <div className="flex bg-cyber-black/50 p-4 rounded-lg border border-cyber-border gap-8">
                    <div className="text-center">
                        <p className="text-xs text-cyber-muted uppercase font-bold">Experience</p>
                        <p className="text-xl text-yellow-400 font-bold font-mono">{userProgress.xp} XP</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-cyber-muted uppercase font-bold">Modules</p>
                        <p className="text-xl text-white font-bold font-mono">{userProgress.academyProgress?.filter(p => p.status === 'completed').length}/{modules.length}</p>
                    </div>
                </div>
            </div>

            {/* MODULE GRID (Hidden when active) */}
            {!activeModule && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {modules.map((mod, i) => {
                        const completed = isCompleted(mod.id);
                        const locked = i > 0 && !isCompleted(modules[i - 1].id);

                        return (
                            <div key={mod.id} className={`bg-cyber-card backdrop-blur-md border rounded-xl p-6 relative overflow-hidden transition-all group ${locked ? 'opacity-50 border-cyber-border' : 'border-cyber-border hover:border-cyber-primary/50'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={clsx("px-2 py-1 text-[10px] font-bold uppercase rounded border",
                                        mod.level === 'Beginner' ? 'bg-green-900/20 text-green-400 border-green-500/30' :
                                            mod.level === 'Intermediate' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30' :
                                                'bg-red-900/20 text-red-400 border-red-500/30'
                                    )}>
                                        {mod.level}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-yellow-500">+{mod.xp} XP</span>
                                        {completed ? <CheckCircle className="text-green-500 w-5 h-5" /> : locked ? <Lock className="text-gray-500 w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-cyber-muted"></div>}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{mod.title}</h3>
                                <p className="text-cyber-muted text-sm mb-6 h-10">{mod.desc}</p>

                                <button
                                    onClick={() => !locked && setActiveModule(mod)}
                                    disabled={locked}
                                    className={`w-full py-3 rounded text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${completed ? 'bg-green-900/20 text-green-400 border border-green-500/30' : locked ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-cyber-black border border-cyber-border hover:bg-cyber-primary hover:text-white'}`}
                                >
                                    {completed ? 'Review Module' : locked ? 'Locked' : <><Play size={16} /> Start Module</>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ACTIVE MODULE SIMULATOR */}
            {activeModule && (
                <div className="animate-fade-in bg-cyber-card border border-cyber-border rounded-xl p-8 max-w-4xl mx-auto relative shadow-2xl">
                    <button onClick={() => setActiveModule(null)} className="absolute top-4 right-4 p-2 text-cyber-muted hover:text-white">Exit Training</button>

                    <div className="mb-8 border-b border-cyber-border pb-6">
                        <h2 className="text-3xl font-bold text-white">{activeModule.title}</h2>
                        <p className="text-cyber-primary font-mono text-sm mt-1">Interactive Training Environment</p>
                    </div>

                    {activeModule.type === 'simulator_entropy' && <EntropySim mod={activeModule} />}
                    {activeModule.type === 'simulator_phishing' && <PhishingSim mod={activeModule} />}
                    {(activeModule.type === 'simulator_encryption' || activeModule.type === 'simulator_breach') && <GenericSim mod={activeModule} />}

                </div>
            )}
        </div>
    );
};

export default Academy;
