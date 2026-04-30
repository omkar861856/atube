import { searchVideos } from '@/lib/api';
import ReelClient from './ReelClient';

export const metadata = {
  title: 'AdultTube — Reels',
  description: 'Short vertical adult videos for quick browsing.',
};

export default async function ReelsPage() {
  // Fetch initial batch and filter for vertical
  const res = await fetch(`http://localhost:3000/api/videos/search?vertical=true&count=3`, {
    cache: 'no-store'
  });
  const data = await res.json();

  return (
    <ReelClient initialVideos={data.videos || []} />
  );
}
