import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 min-w-[320px] p-4 rounded-xl shadow-2xl border ${
          type === 'success'
            ? 'bg-[#151821] border-green-500/30'
            : 'bg-[#151821] border-red-500/30'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
        )}
        <p className="text-white text-sm flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
