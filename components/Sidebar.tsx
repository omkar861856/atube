'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <aside className="sidebar-fixed">
      <Link href="/" className="sidebar-logo">
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
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span className="tooltip">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto' }}>
        <button className="sidebar-link" title="Settings">
          <span style={{ fontSize: '20px' }}>⚙️</span>
          <span className="tooltip">Settings</span>
        </button>
      </div>
    </aside>
  );
}
