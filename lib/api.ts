import { EpornerSearchResponse, EpornerVideo, SortOrder } from './types';

const BASE_URL = 'https://www.eporner.com/api/v2/video';

// Browser-like headers so Eporner doesn't block the server-side request
const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.eporner.com/',
  Origin: 'https://www.eporner.com',
};

export interface SearchParams {
  query?: string;
  per_page?: number;
  page?: number;
  thumbsize?: 'small' | 'medium' | 'big';
  order?: SortOrder;
  gay?: 0 | 1 | 2;
  lq?: 0 | 1 | 2;
}

const EMPTY_RESPONSE: EpornerSearchResponse = {
  count: 0,
  start: 0,
  per_page: 24,
  page: 1,
  total_count: 0,
  total_pages: 0,
  videos: [],
};

export async function searchVideos(params: SearchParams = {}): Promise<EpornerSearchResponse> {
  const {
    query = 'all',
    per_page = 30,
    page = 1,
    thumbsize = 'big',
    order = 'latest',
    gay = 0,
    lq = 1,
  } = params;

  const url = new URL(`${BASE_URL}/search/`);
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(per_page));
  url.searchParams.set('page', String(page));
  url.searchParams.set('thumbsize', thumbsize);
  url.searchParams.set('order', order);
  url.searchParams.set('gay', String(gay));
  url.searchParams.set('lq', String(lq));
  url.searchParams.set('format', 'json');

  try {
    const res = await fetch(url.toString(), {
      headers: FETCH_HEADERS,
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[Eporner] search failed: HTTP ${res.status}`);
      return EMPTY_RESPONSE;
    }

    const data = await res.json();
    // API returns an array [] when no results
    if (Array.isArray(data)) return EMPTY_RESPONSE;
    return data as EpornerSearchResponse;
  } catch (err) {
    console.error('[Eporner] search fetch error:', err);
    return EMPTY_RESPONSE;
  }
}

export async function getVideoById(id: string): Promise<EpornerVideo | null> {
  const url = new URL(`${BASE_URL}/id/`);
  url.searchParams.set('id', id);
  url.searchParams.set('thumbsize', 'big');
  url.searchParams.set('format', 'json');

  try {
    const res = await fetch(url.toString(), {
      headers: FETCH_HEADERS,
      next: { revalidate: 600 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    // Empty result: API returns [] when video not found
    if (Array.isArray(data) || !data?.id) return null;
    const video = data as EpornerVideo;
    if (!video.embed) {
      video.embed = `https://www.eporner.com/embed/${video.id}/`;
    }
    return video;
  } catch (err) {
    console.error('[Eporner] id fetch error:', err);
    return null;
  }
}

export function formatViews(views: any): string {
  const v = Number(views) || 0;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return String(v);
}

export function formatDuration(seconds: any): string {
  const sTotal = Math.floor(Number(seconds)) || 0;
  if (sTotal <= 0) return '00:00';
  const h = Math.floor(sTotal / 3600);
  const m = Math.floor((sTotal % 3600) / 60);
  const s = sTotal % 60;
  
  const parts = [];
  if (h > 0) parts.push(String(h).padStart(2, '0'));
  parts.push(String(m).padStart(2, '0'));
  parts.push(String(s).padStart(2, '0'));
  
  return parts.join(':');
}

export function formatDate(dateStr: any): string {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return 'Recently'; }
}
