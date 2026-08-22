'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder to avoid layout shift
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const getIcon = () => {
    if (resolvedTheme === 'dark') return <FiMoon size={20} />;
    return <FiSun size={20} />;
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-foreground/20 hover:bg-foreground/60 transition-colors text-foreground hover:text-background flex items-center justify-center cursor-pointer"
      aria-label="Toggle Theme"
      title={`Current Theme: ${theme}`}
    >
      {getIcon()}
    </button>
  );
}
