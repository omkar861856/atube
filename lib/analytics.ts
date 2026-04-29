/**
 * Analytics helpers — all fire-and-forget, never throw to callers.
 * These run server-side (Server Components & Route Handlers).
 */
import connectDB from './db';
import { PageView, SearchEvent, VideoView } from './models';

interface PageViewParams {
  path: string;
  query?: string;
  order?: string;
  page?: number;
  videoId?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
}

export async function trackPageView(params: PageViewParams): Promise<void> {
  try {
    await connectDB();
    await PageView().create(params);
  } catch (err) {
    console.warn('[Analytics] trackPageView failed:', err);
  }
}

export async function trackSearch(query: string, resultsCount: number): Promise<void> {
  try {
    await connectDB();
    await SearchEvent().create({ query, resultsCount });
  } catch (err) {
    console.warn('[Analytics] trackSearch failed:', err);
  }
}

export async function trackVideoView(videoId: string, title: string): Promise<void> {
  try {
    await connectDB();
    await VideoView().create({ videoId, title });
  } catch (err) {
    console.warn('[Analytics] trackVideoView failed:', err);
  }
}
