'use client';

import React, { Suspense, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, isCollapsed, toggleCollapsed, closeMobile } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const pathname = usePathname();
  const displayCollapsed = isCollapsed && !isHovered;
  const isReels = pathname === '/reels';

  return (
    <div className={`main-layout ${displayCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Wrapper for Hover detection on Desktop */}
      <div 
        className="sidebar-wrapper desktop-only"
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Sidebar forceFull={isHovered} />
      </div>

      {/* Sidebar for Mobile (Drawer style) */}
      <div className="mobile-only">
        <Sidebar />
      </div>
      
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeMobile}
      />

      <div className="main-content">
        <Suspense>
          <Navbar />
        </Suspense>
        <main className={`${isReels ? 'reels-main-wrapper' : 'page-container'} mb-16 lg:mb-0`}>
          {children}
        </main>
        {!isReels && <Footer />}
        <MobileBottomNav />
      </div>
    </div>
  );
}
