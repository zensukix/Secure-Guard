import { Link, useLocation } from 'react-router-dom';
import { Shield, Lock, Globe, Activity, FileText, LogOut, LayoutDashboard, Server, Info, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const groups = [
        {
            label: "CORE",
            items: [
                { name: 'Command Center', path: '/dashboard', icon: LayoutDashboard },
                { name: 'Password Vault', path: '/vault', icon: Lock },
            ]
        },
        {
            label: "INTELLIGENCE",
            items: [
                { name: 'Threat Map', path: '/threat-map', icon: Globe },
                { name: 'Website Safety', path: '/website-safety', icon: Search },
                { name: 'Network Scanner', path: '/scanner', icon: Server },
            ]
        },
        {
            label: "AWARENESS",
            items: [
                { name: 'Cyber Awareness', path: '/awareness', icon: Info },
                { name: 'Audit Logs', path: '/logs', icon: Activity },
            ]
        }
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-[#050505] border-r border-cyber-border/50 flex flex-col z-50">
            <div className="h-16 flex items-center justify-center md:justify-start md:pl-7 border-b border-cyber-border bg-[#000]">
                <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-cyber-primary animate-pulse-slow" />
                    <h1 className="hidden md:block text-xl font-bold tracking-[0.2em] text-white">
                        SECURE<span className="text-cyber-primary">GUARD</span>
                    </h1>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 space-y-6 px-3 custom-scrollbar">
                {groups.map((group, idx) => (
                    <div key={idx}>
                        <div className="hidden md:flex items-center gap-2 px-4 mb-2 opacity-50">
                            <span className="h-px w-3 bg-cyber-muted"></span>
                            <h3 className="text-[10px] font-bold text-cyber-muted uppercase tracking-widest">
                                {group.label}
                            </h3>
                        </div>
                        <div className="space-y-1">
                            {group.items.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={clsx(
                                            "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 relative group overflow-hidden",
                                            isActive
                                                ? "bg-cyber-primary/10 text-white border border-cyber-primary/20"
                                                : "text-gray-500 hover:text-white hover:bg-white/5 active:scale-95"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyber-primary rounded-r shadow-[0_0_8px_#00f3ff]"></div>
                                        )}
                                        <Icon size={18} className={clsx("transition-colors", isActive ? "text-cyber-primary drop-shadow-[0_0_3px_rgba(0,243,255,0.5)]" : "group-hover:text-white")} />
                                        <span className={clsx("hidden md:block text-sm font-medium tracking-wide", isActive ? "text-white" : "group-hover:text-white")}>
                                            {link.name}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-cyber-border/50 bg-[#000]">
                <button
                    onClick={logout}
                    className="flex w-full items-center justify-center md:justify-start gap-4 px-4 py-3 text-red-500 hover:text-white hover:bg-red-500/10 rounded-lg transition-all group border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={20} />
                    <span className="hidden md:block font-medium tracking-wide">Logout System</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
