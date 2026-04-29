'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';

const navItems = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '🎬', label: 'Reels', href: '/reels' },
  { icon: '🔥', label: 'Trending', href: '/?order=top-weekly' },
  { icon: '💎', label: 'Popular', href: '/?order=most-popular' },
  { icon: '⭐', label: 'Top Rated', href: '/?order=top-rated' },
  { icon: '⏱️', label: 'Long', href: '/?order=longest' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, isCollapsed, closeMobile } = useSidebar();

  return (
    <aside className={`sidebar-fixed ${isCollapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`}>
      <Link href="/" className="sidebar-logo" onClick={closeMobile}>
        🔥
      </Link>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={closeMobile}
            >
              <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>{item.icon}</span>
              <span className="link-text">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '0 12px' }}>
        <button className="sidebar-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}>
          <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>⚙️</span>
          <span className="link-text">Settings</span>
        </button>
      </div>
    </aside>
  );
}
