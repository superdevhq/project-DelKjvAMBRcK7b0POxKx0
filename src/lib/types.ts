
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
  adCount: number;
  commentCount: number;
  userId: string;
}

export interface Ad {
  id: string;
  campaignId: string;
  name: string;
  facebookId: string;
  status: 'active' | 'paused';
  lastScanned?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  adId: string;
  facebookCommentId: string;
  author: string;
  content: string;
  createdAt: string;
  replied: boolean;
  replyContent?: string;
  replyStatus: 'pending' | 'sent' | 'failed' | 'none';
  replyCreatedAt?: string;
}

export interface AISettings {
  tone: 'professional' | 'friendly' | 'enthusiastic' | 'helpful';
  maxLength: number;
  includeEmojis: boolean;
  customPrompt?: string;
  blacklistedWords: string[];
  responseTemplates: string[];
}
