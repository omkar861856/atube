'use client';

import React, { Suspense } from 'react';
import { useSidebar } from './SidebarContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, isCollapsed, toggleCollapsed, closeMobile } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  // Determine actual display state
  // On desktop: if it's collapsed, it can expand on hover
  const displayCollapsed = isCollapsed && !isHovered;

  return (
    <div className={`main-layout ${displayCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div 
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ height: '100%' }}
      >
        <Sidebar forceFull={isHovered} />
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
        <main className="page-container">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
