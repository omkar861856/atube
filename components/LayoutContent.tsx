'use client';

import React, { Suspense } from 'react';
import { useSidebar } from './SidebarContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, isCollapsed, closeMobile } = useSidebar();

  return (
    <div className={`main-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar />
      
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeMobile}
      />

      <div className="main-content">
        <Suspense>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
