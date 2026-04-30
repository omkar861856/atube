import Link from 'next/link';

export const metadata = {
  title: 'AdultTube — Reels (Coming Soon)',
  description: 'Short vertical adult videos for quick browsing. Feature coming soon!',
};

export default function ReelsComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height))] bg-black text-center p-6">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-silver/10 flex items-center justify-center animate-pulse">
          <svg className="w-12 h-12 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-silver text-black text-[10px] font-black rounded uppercase tracking-widest">Soon</div>
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">
        REELS ARE <span className="text-silver">EVOLVING.</span>
      </h1>
      
      <p className="text-text-secondary text-lg max-w-lg mb-10 leading-relaxed">
        We're rebuilding the Reels experience from the ground up to bring you the most immersive vertical video feed on the web. Stay tuned.
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
