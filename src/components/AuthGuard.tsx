import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1b110b]">
                <Loader2 className="w-10 h-10 animate-spin text-white" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if trying to access admin area without admin role
    if (location.pathname.startsWith('/admin') && profile?.role !== 'admin') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#1b110b] p-6 text-center">
                <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-black text-white uppercase italic mb-2">Acesso Negado</h1>
                <p className="text-gray-400 mb-6 max-w-sm">Você não tem permissão para acessar o painel administrativo.</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2 bg-white text-[#1b110b] font-bold rounded-xl uppercase tracking-widest text-sm"
                    >
                        Voltar para Loja
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
