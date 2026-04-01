import { useAuth } from '../context/AuthContext';
import { Bell, User, Wifi } from 'lucide-react';

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-border flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-cyber-primary/10 border border-cyber-primary/20 rounded-full">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse shadow-[0_0_8px_#ff0055]"></div>
                    <span className="text-xs font-bold text-cyber-primary tracking-wider">SYSTEM ONLINE</span>
                </div>
                <div className="flex items-center gap-2 text-cyber-muted text-xs font-mono">
                    <Wifi size={14} className="text-cyber-secondary" />
                    <span>ENCRYPTED CONNECTION</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative group text-cyber-muted hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-cyber-primary rounded-full animate-ping opacity-75"></span>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-cyber-primary rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-cyber-border pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white leading-none uppercase tracking-wide">{user?.username}</p>
                        <p className="text-[10px] text-cyber-secondary font-mono mt-1">SECURITY_LVL_5</p>
                    </div>
                    <div className="w-10 h-10 bg-cyber-card rounded-md border border-cyber-border flex items-center justify-center relative overflow-hidden group">
                        <User className="w-5 h-5 text-cyber-text group-hover:text-cyber-primary transition-colors" />
                        <div className="absolute inset-0 bg-cyber-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
