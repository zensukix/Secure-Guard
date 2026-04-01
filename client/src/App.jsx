import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import ThreatMap from './pages/ThreatMap';
import ActivityLogs from './pages/ActivityLogs';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import SecurityCheck from './pages/SecurityCheck';
import NetworkScanner from './pages/NetworkScanner';
import CyberAwareness from './pages/CyberAwareness';
import Landing from './pages/Landing';
import WebsiteSafety from './pages/WebsiteSafety';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#0b0f14]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-cyber-primary font-mono text-sm animate-pulse">ESTABLISHING SECURE CONNECTION...</p>
            </div>
        </div>
    );
    if (!user) return <Navigate to="/login" />;
    return children;
};

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen text-cyber-text overflow-hidden bg-[#0b0f14]">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative ml-20 md:ml-64 transition-all duration-300">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
                <Header />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative z-1 custom-scrollbar scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

            {/* Public Landing Page - No Sidebar/Header */}
            <Route path="/" element={<Landing />} />

            {/* Public Website Safety - One of the free tools also accessible without login if needed, 
                but per sidebar it's protected. Let's make it protected as requested. */}

            {/* Protected Routes - Wrapped in Layout */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Layout><Dashboard /></Layout>
                </ProtectedRoute>
            } />

            <Route path="/vault" element={
                <ProtectedRoute>
                    <Layout><Vault /></Layout>
                </ProtectedRoute>
            } />

            <Route path="/scanner" element={
                <ProtectedRoute>
                    <Layout><NetworkScanner /></Layout>
                </ProtectedRoute>
            } />

            <Route path="/threat-map" element={
                <ProtectedRoute>
                    <Layout><ThreatMap /></Layout>
                </ProtectedRoute>
            } />

            <Route path="/website-safety" element={
                <ProtectedRoute>
                    <Layout><WebsiteSafety /></Layout>
                </ProtectedRoute>
            } />

            {/* Keep security-check for backward compatibility/internal links */}
            <Route path="/security-check" element={
                <ProtectedRoute>
                    <Layout><SecurityCheck /></Layout>
                </ProtectedRoute>
            } />

            <Route path="/logs" element={
                <ProtectedRoute>
                    <Layout><ActivityLogs /></Layout>
                </ProtectedRoute>
            } />

            <Route path="/awareness" element={
                <ProtectedRoute>
                    <Layout><CyberAwareness /></Layout>
                </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
