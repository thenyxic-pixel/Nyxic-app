
export interface User {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export type AppTab = 'home' | 'explore' | 'create' | 'activity' | 'profile';
