import { searchVideos } from '@/lib/api';
import ReelClient from './ReelClient';

export const metadata = {
  title: 'AdultTube — Reels',
  description: 'Short vertical adult videos for quick browsing.',
};

export default async function ReelsPage() {
  const data = await searchVideos({ 
    query: 'vertical mobile pov amateur', 
    per_page: 40, 
    order: 'most-popular' 
  });

  return (
    <ReelClient initialVideos={data.videos} />
  );
}
