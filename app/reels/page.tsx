import { searchVideos } from '@/lib/api';
import ReelClient from './ReelClient';

export const metadata = {
  title: 'AdultTube — Reels',
  description: 'Short vertical adult videos for quick browsing.',
};

export default async function ReelsPage() {
  const data = await searchVideos({ 
    query: 'tiktok pov short mobile vertical', 
    per_page: 20, 
    order: 'most-popular' 
  });

  return (
    <div className="reels-container">
      <ReelClient videos={data.videos} />
    </div>
  );
}
