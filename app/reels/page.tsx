import { searchVideos } from '@/lib/api';
import ReelClient from './ReelClient';

export const metadata = {
  title: 'AdultTube — Reels',
  description: 'Short vertical adult videos for quick browsing.',
};

export default async function ReelsPage() {
  // Fetch initial batch and filter for vertical directly on the server
  // This avoids 500 errors in production caused by fetching from localhost
  let verticalVideos: any[] = [];
  let currentPage = 1;
  let attempts = 0;

  try {
    while (verticalVideos.length < 3 && attempts < 5) {
      const data = await searchVideos({
        query: 'vertical mobile',
        per_page: 50,
        page: currentPage,
        order: 'most-popular',
      });

      if (!data.videos || data.videos.length === 0) break;

      const filtered = data.videos.filter(v => Number(v.width) < Number(v.height));
      verticalVideos = [...verticalVideos, ...filtered];
      
      currentPage++;
      attempts++;
    }
  } catch (error) {
    console.error('Error fetching reels:', error);
  }

  return (
    <ReelClient initialVideos={verticalVideos.slice(0, 3)} />
  );
}
