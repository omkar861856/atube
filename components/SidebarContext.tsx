'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleOpen: () => void;
  toggleCollapsed: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load preference
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setIsCollapsed(true);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);
  
  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  const closeMobile = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, isCollapsed, toggleOpen, toggleCollapsed, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
}
