import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0A0A0A] border-l-4 border-[#E10600] text-white px-5 py-4 rounded-r-lg shadow-2xl shadow-red-900/40 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-md">
      <div className="p-2 bg-[#E10600]/20 text-[#E10600] rounded-full">
        <CheckCircle2 className="w-5 h-5 text-[#E10600]" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-red-500">NIKE ASSIST</p>
        <p className="text-sm font-semibold text-white">{toastMessage}</p>
      </div>
    </div>
  );
};
