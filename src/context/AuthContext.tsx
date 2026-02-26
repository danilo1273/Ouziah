import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
    id: string;
    email: string | null;
    role: 'admin' | 'customer';
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
    let logoutTimer: number | null = null;

    useEffect(() => {
        async function getProfile(userId: string) {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (!error && data) {
                setProfile(data as Profile);
            }
        }

        // Check active sessions
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                getProfile(session.user.id);
            }
            setLoading(false);
        });

        // Listen for changes on auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                getProfile(currentUser.id);
                resetTimer();
            } else {
                setProfile(null);
                clearTimer();
            }
            setLoading(false);
        });

        // Activity monitoring for auto-logout
        const resetTimer = () => {
            if (logoutTimer) window.clearTimeout(logoutTimer);
            logoutTimer = window.setTimeout(() => {
                supabase.auth.signOut();
            }, TIMEOUT_DURATION);
        };

        const clearTimer = () => {
            if (logoutTimer) window.clearTimeout(logoutTimer);
        };

        const handleActivity = () => {
            if (user) resetTimer();
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('scroll', handleActivity);
        window.addEventListener('click', handleActivity);

        return () => {
            subscription.unsubscribe();
            clearTimer();
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            window.removeEventListener('click', handleActivity);
        };
    }, [user]);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, profile, session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
