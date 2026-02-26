import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
    type: 'success' | 'error' | 'info';
    message: string;
    onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay to trigger animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-400" />,
        error: <XCircle className="h-5 w-5 text-red-400" />,
        info: <Info className="h-5 w-5 text-blue-400" />,
    };

    const bgColors = {
        success: 'bg-green-500/10 border-green-500/20',
        error: 'bg-red-500/10 border-red-500/20',
        info: 'bg-blue-500/10 border-blue-500/20',
    };

    return (
        <div
            className={`
        pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out max-w-md w-full
        ${bgColors[type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
      `}
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="flex-1">
                <p className="text-sm font-bold text-white leading-relaxed">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}
