"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { Check } from "lucide-react";

type ToastStore = {
  message: string;
  visible: boolean;
  show: (msg: string) => void;
  hide: () => void;
};

export const useToast = create<ToastStore>((set) => ({
  message: "",
  visible: false,
  show: (msg) => set({ message: msg, visible: true }),
  hide: () => set({ visible: false }),
}));

export default function Toast() {
  const { message, visible, hide } = useToast();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(hide, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, hide]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] toast-enter">
      <div className="flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium">
        <Check className="w-4 h-4 text-green-400" />
        {message}
      </div>
    </div>
  );
}
