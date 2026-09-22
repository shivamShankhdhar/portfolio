'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </ThemeProvider>
  );
}
