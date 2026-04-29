import mongoose, { Schema, Document, Model } from 'mongoose';

// ── Page View ─────────────────────────────────────────────────────────────
export interface IPageView extends Document {
  path: string;
  query?: string;
  order?: string;
  page?: number;
  videoId?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>(
  {
    path: { type: String, required: true, index: true },
    query: String,
    order: String,
    page: Number,
    videoId: { type: String, index: true },
    ip: String,
    userAgent: String,
    referrer: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// ── Search Event ──────────────────────────────────────────────────────────
export interface ISearchEvent extends Document {
  query: string;
  resultsCount: number;
  createdAt: Date;
}

const SearchEventSchema = new Schema<ISearchEvent>(
  {
    query: { type: String, required: true, index: true },
    resultsCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// ── Video View ────────────────────────────────────────────────────────────
export interface IVideoView extends Document {
  videoId: string;
  title: string;
  createdAt: Date;
}

const VideoViewSchema = new Schema<IVideoView>(
  {
    videoId: { type: String, required: true, index: true },
    title: { type: String, default: '' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

function getModel<T extends Document>(name: string, schema: Schema): Model<T> {
  return (mongoose.models[name] as Model<T>) || mongoose.model<T>(name, schema);
}

export const PageView = () => getModel<IPageView>('PageView', PageViewSchema);
export const SearchEvent = () => getModel<ISearchEvent>('SearchEvent', SearchEventSchema);
export const VideoView = () => getModel<IVideoView>('VideoView', VideoViewSchema);

// ── Feedback ──────────────────────────────────────────────────────────────
export interface IFeedback extends Document {
  type: 'bug' | 'suggestion' | 'content' | 'other';
  message: string;
  contact?: string;      // optional email/name
  page?: string;         // URL where feedback was submitted
  userAgent?: string;
  status: 'open' | 'reviewed' | 'resolved';
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    type: { type: String, enum: ['bug', 'suggestion', 'content', 'other'], required: true, index: true },
    message: { type: String, required: true },
    contact: String,
    page: String,
    userAgent: String,
    status: { type: String, enum: ['open', 'reviewed', 'resolved'], default: 'open', index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Feedback = () => getModel<IFeedback>('Feedback', FeedbackSchema);
