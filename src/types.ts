export interface Article {
  id: string;
  title: string;
  subhead?: string;
  excerpt: string;
  kicker?: string;
  category: string;
  byline: string;
  date: string;
  readTime: string;
  commentsCount: number;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  paragraphs: string[];
  pullQuote?: string;
  takeaways?: string[];
  audioMinutes?: number;
  pageNumber?: string;
  tags?: string[];
  isOpinion?: boolean;
  authorAvatar?: string;
  authorRole?: string;
}

export interface CommentItem {
  id: string;
  articleId: string;
  author: string;
  location: string;
  timestamp: string;
  text: string;
  upvotes: number;
  isEditorsPick?: boolean;
}

export type SectionType =
  | 'frontpage'
  | 'u.s.'
  | 'world'
  | 'business'
  | 'arts'
  | 'lifestyle'
  | 'opinion'
  | 'audio'
  | 'games'
  | 'cooking'
  | 'wirecutter'
  | 'the athletic';

export type ReadingMode = 'normal' | 'sepia' | 'night';
