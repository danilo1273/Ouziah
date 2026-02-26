import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn, Loader2, AlertCircle, UserPlus, ArrowRight } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import logo from '../assets/logo.jpg';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showNotification } = useNotification();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();

            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: trimmedEmail,
                    password: trimmedPassword,
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email: trimmedEmail,
                    password: trimmedPassword,
                });
                if (error) throw error;
                showNotification('success', 'Cadastro realizado com sucesso! Verifique seu e-mail para confirmar seu acesso.');
            }
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Erro ao processar solicitação');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#1b110b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <img src={logo} alt="Ouziah Logo" className="mx-auto h-24 w-24 object-contain mb-6" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">
                    {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                    Experiência Premium Ouziah Sports
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/5 backdrop-blur-md py-8 px-4 shadow-2xl border border-white/10 sm:rounded-2xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                                E-mail
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl shadow-sm placeholder-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 sm:text-sm transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Senha
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl shadow-sm placeholder-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 sm:text-sm font-mono tracking-[0.3em] transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-xl text-sm font-black text-[#1b110b] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? <LogIn className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                                    {isLogin ? 'Entrar' : 'Cadastrar'}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors gap-2"
                        >
                            {isLogin ? 'Ainda não é membro?' : 'Já possui uma conta?'}
                            <span className="text-white flex items-center gap-1 group">
                                {isLogin ? 'Cadastre-se' : 'Faça Login'}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
