
import { User, Campaign, Ad, Comment, AISettings } from '../lib/types';

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=7c3aed&color=fff'
};

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Summer Sale 2023',
    status: 'active',
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: '2023-06-15T14:30:00Z',
    adCount: 3,
    commentCount: 24,
    userId: 'user-1'
  },
  {
    id: 'campaign-2',
    name: 'Product Launch - XYZ',
    status: 'active',
    createdAt: '2023-05-15T09:00:00Z',
    updatedAt: '2023-06-10T11:20:00Z',
    adCount: 2,
    commentCount: 18,
    userId: 'user-1'
  },
  {
    id: 'campaign-3',
    name: 'Holiday Promotion',
    status: 'paused',
    createdAt: '2023-04-20T08:30:00Z',
    updatedAt: '2023-05-25T16:45:00Z',
    adCount: 4,
    commentCount: 32,
    userId: 'user-1'
  }
];

export const mockAds: Ad[] = [
  {
    id: 'ad-1',
    campaignId: 'campaign-1',
    name: 'Summer Sale - Clothing',
    facebookId: 'fb-ad-123456',
    status: 'active',
    lastScanned: '2023-06-15T12:30:00Z',
    createdAt: '2023-06-01T10:30:00Z',
    updatedAt: '2023-06-15T12:30:00Z'
  },
  {
    id: 'ad-2',
    campaignId: 'campaign-1',
    name: 'Summer Sale - Accessories',
    facebookId: 'fb-ad-123457',
    status: 'active',
    lastScanned: '2023-06-15T12:35:00Z',
    createdAt: '2023-06-01T10:35:00Z',
    updatedAt: '2023-06-15T12:35:00Z'
  },
  {
    id: 'ad-3',
    campaignId: 'campaign-1',
    name: 'Summer Sale - Footwear',
    facebookId: 'fb-ad-123458',
    status: 'paused',
    lastScanned: '2023-06-10T09:30:00Z',
    createdAt: '2023-06-01T10:40:00Z',
    updatedAt: '2023-06-10T09:30:00Z'
  },
  {
    id: 'ad-4',
    campaignId: 'campaign-2',
    name: 'XYZ Product - Features',
    facebookId: 'fb-ad-234561',
    status: 'active',
    lastScanned: '2023-06-14T15:30:00Z',
    createdAt: '2023-05-15T09:30:00Z',
    updatedAt: '2023-06-14T15:30:00Z'
  },
  {
    id: 'ad-5',
    campaignId: 'campaign-2',
    name: 'XYZ Product - Benefits',
    facebookId: 'fb-ad-234562',
    status: 'active',
    lastScanned: '2023-06-14T15:35:00Z',
    createdAt: '2023-05-15T09:35:00Z',
    updatedAt: '2023-06-14T15:35:00Z'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    adId: 'ad-1',
    facebookCommentId: 'fb-comment-111',
    author: 'Alice Johnson',
    content: 'Do you ship internationally?',
    createdAt: '2023-06-14T10:15:00Z',
    replied: true,
    replyContent: 'Yes, we ship to most countries worldwide! Shipping costs vary by location. Feel free to check our website for more details or contact our support team.',
    replyStatus: 'sent',
    replyCreatedAt: '2023-06-14T10:20:00Z'
  },
  {
    id: 'comment-2',
    adId: 'ad-1',
    facebookCommentId: 'fb-comment-112',
    author: 'Bob Smith',
    content: 'How long will the sale last?',
    createdAt: '2023-06-14T11:30:00Z',
    replied: true,
    replyContent: 'Our summer sale runs until the end of July! You have plenty of time to browse and find your perfect items. Don\'t miss out on these great deals!',
    replyStatus: 'sent',
    replyCreatedAt: '2023-06-14T11:35:00Z'
  },
  {
    id: 'comment-3',
    adId: 'ad-1',
    facebookCommentId: 'fb-comment-113',
    author: 'Carol Davis',
    content: 'Are there any discount codes available?',
    createdAt: '2023-06-15T09:45:00Z',
    replied: false,
    replyStatus: 'pending'
  },
  {
    id: 'comment-4',
    adId: 'ad-2',
    facebookCommentId: 'fb-comment-211',
    author: 'David Wilson',
    content: 'Do you have these in different colors?',
    createdAt: '2023-06-14T14:20:00Z',
    replied: true,
    replyContent: 'Yes! Our accessories come in a variety of colors. You can check all available options on our website. We currently have black, white, red, blue, and green in stock!',
    replyStatus: 'sent',
    replyCreatedAt: '2023-06-14T14:25:00Z'
  },
  {
    id: 'comment-5',
    adId: 'ad-4',
    facebookCommentId: 'fb-comment-411',
    author: 'Eva Brown',
    content: 'When will this product be available?',
    createdAt: '2023-06-13T16:10:00Z',
    replied: true,
    replyContent: 'Our XYZ product will be available for purchase starting next Monday! You can pre-order now on our website to secure yours as soon as they launch.',
    replyStatus: 'sent',
    replyCreatedAt: '2023-06-13T16:15:00Z'
  },
  {
    id: 'comment-6',
    adId: 'ad-4',
    facebookCommentId: 'fb-comment-412',
    author: 'Frank Miller',
    content: 'What makes this better than the previous model?',
    createdAt: '2023-06-14T08:50:00Z',
    replied: false,
    replyStatus: 'pending'
  }
];

export const mockAISettings: AISettings = {
  tone: 'professional',
  maxLength: 200,
  includeEmojis: true,
  customPrompt: 'You are a helpful customer service representative for our brand. Answer questions politely and concisely.',
  blacklistedWords: ['competitor', 'refund', 'complaint'],
  responseTemplates: [
    'Thank you for your interest in our products!',
    'We appreciate your question about our services.',
    'Thanks for reaching out to us!'
  ]
};

// Function to simulate API calls
export const fetchCampaigns = (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCampaigns);
    }, 500);
  });
};

export const fetchAds = (campaignId?: string): Promise<Ad[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (campaignId) {
        resolve(mockAds.filter(ad => ad.campaignId === campaignId));
      } else {
        resolve(mockAds);
      }
    }, 500);
  });
};

export const fetchComments = (adId?: string): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (adId) {
        resolve(mockComments.filter(comment => comment.adId === adId));
      } else {
        resolve(mockComments);
      }
    }, 500);
  });
};

export const fetchPendingComments = (): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments.filter(comment => comment.replyStatus === 'pending'));
    }, 500);
  });
};

export const fetchAISettings = (): Promise<AISettings> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAISettings);
    }, 500);
  });
};

export const generateAIReply = (comment: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock AI response based on the comment content
      if (comment.includes('ship')) {
        resolve('Yes, we ship to most countries worldwide! Shipping costs vary by location. Feel free to check our website for more details or contact our support team.');
      } else if (comment.includes('sale') || comment.includes('discount')) {
        resolve('Our current sale runs until the end of the month. You can use code SUMMER20 for an additional 20% off your purchase!');
      } else if (comment.includes('color') || comment.includes('size')) {
        resolve('We offer a variety of colors and sizes for this product. You can check all available options on our website or contact our support team for specific inquiries.');
      } else if (comment.includes('available') || comment.includes('when')) {
        resolve('This product is currently in stock and ready to ship! Orders placed before 2 PM are typically shipped the same day.');
      } else {
        resolve('Thank you for your interest in our products! If you have any specific questions, please let us know and we\'ll be happy to help.');
      }
    }, 1000);
  });
};
