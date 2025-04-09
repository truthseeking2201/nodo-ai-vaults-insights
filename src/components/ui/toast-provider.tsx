
import React from 'react';
import { Toaster } from '@/components/ui/sonner';

export function ToastProvider() {
  return (
    <Toaster position="top-right" richColors closeButton toastOptions={{
      classNames: {
        toast: "bg-nodo-darker border border-white/10 text-white glass-card",
        title: "text-white font-medium",
        description: "text-white/70 text-sm",
        success: "bg-green-950/50 border-green-500/20",
        error: "bg-red-950/50 border-red-500/20",
        warning: "bg-amber-950/50 border-amber-500/20",
        info: "bg-blue-950/50 border-blue-500/20"
      }
    }} />
  );
}
