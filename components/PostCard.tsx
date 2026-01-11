
import React, { useState } from 'react';
import { Post } from '../types';
import { ICONS } from '../constants';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [showFullCaption, setShowFullCaption] = useState(false);

  return (
    <div className="max-w-xl mx-auto mb-8 bg-slate-950/50 rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={post.userAvatar} alt={post.username} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
          <div>
            <p className="font-semibold text-sm hover:text-violet-400 transition-colors cursor-pointer">{post.username}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white"><ICONS.More /></button>
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-slate-900 overflow-hidden" onDoubleClick={() => onLike(post.id)}>
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLike(post.id)}
              className={`transition-transform active:scale-125 ${post.isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-200'}`}
            >
              <ICONS.Heart className={post.isLiked ? 'fill-current' : ''} />
            </button>
            <button className="text-slate-200 hover:text-violet-400"><ICONS.Message /></button>
            <button className="text-slate-200 hover:text-violet-400"><ICONS.Send /></button>
          </div>
          <button className="text-slate-200 hover:text-violet-400"><ICONS.Bookmark /></button>
        </div>

        {/* Likes */}
        <p className="text-sm font-bold text-slate-100">{post.likes.toLocaleString()} likes</p>

        {/* Caption */}
        <div className="text-sm leading-relaxed">
          <span className="font-bold mr-2">{post.username}</span>
          <span className={showFullCaption ? '' : 'line-clamp-2'}>
            {post.caption}
          </span>
          {post.caption.length > 80 && (
            <button 
              onClick={() => setShowFullCaption(!showFullCaption)}
              className="text-slate-500 text-xs ml-1 hover:text-slate-300"
            >
              {showFullCaption ? 'less' : 'more'}
            </button>
          )}
        </div>

        {/* Comments section */}
        {post.comments.length > 0 && (
          <button className="text-slate-500 text-xs hover:text-slate-400">
            View all {post.comments.length} comments
          </button>
        )}

        <div className="pt-2 flex items-center gap-2 border-t border-slate-900 mt-2">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 bg-transparent text-sm focus:outline-none text-slate-300 placeholder:text-slate-600"
          />
          <button className="text-violet-500 font-semibold text-sm hover:text-violet-400 disabled:opacity-50">Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
