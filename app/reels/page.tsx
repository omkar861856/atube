import Link from 'next/link';

export const metadata = {
  title: 'AdultTube — Reels (Coming Soon)',
  description: 'Short vertical adult videos for quick browsing. Feature coming soon!',
};

export default function ReelsComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-black text-center px-6 py-20">
      <div className="relative mb-12">
        <div 
          style={{ width: '120px', height: '120px' }}
          className="rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse"
        >
          <svg 
            style={{ width: '60px', height: '60px' }}
            className="text-white/20" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 px-3 py-1 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
          Evolution
        </div>
      </div>
      
      <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
        Reels <span className="text-white/20">v2.0</span>
      </h1>
      
      <p className="text-white/40 text-lg sm:text-xl max-w-xl mb-12 leading-relaxed font-medium">
        We're engineering a revolutionary vertical experience. The next generation of AdultTube Reels is currently in development.
      </p>
      
      <Link 
        href="/"
        className="px-10 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-silver transition-all transform hover:scale-105"
      >
        Explore HD Videos
      </Link>
    </div>
  );
}
