import React from 'react';
import { User, Post } from '../types';
import { ICONS } from '../constants';

interface ProfileViewProps {
  user: User;
  posts: Post[];
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, posts }) => {
  // Destructure icons for cleaner usage and to ensure they are captured in the component scope
  const { Heart, Message } = ICONS;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-violet-600">
          <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full border-4 border-slate-950 object-cover" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-light">{user.username}</h2>
            <div className="flex gap-2 justify-center">
              <button className="px-6 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-lg transition-colors">Edit Profile</button>
              <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start gap-10 mb-6">
            <div className="text-center md:text-left"><span className="font-bold">{posts.length}</span> <span className="text-slate-400">posts</span></div>
            <div className="text-center md:text-left"><span className="font-bold">{user.followers}</span> <span className="text-slate-400">followers</span></div>
            <div className="text-center md:text-left"><span className="font-bold">{user.following}</span> <span className="text-slate-400">following</span></div>
          </div>
          
          <div>
            <p className="font-bold">{user.fullName}</p>
            <p className="text-slate-400 whitespace-pre-wrap">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="border-t border-slate-800 pt-1">
        <div className="flex justify-center gap-12 mb-6">
          <button className="py-4 border-t border-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            Posts
          </button>
          <button className="py-4 text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            Reels
          </button>
          <button className="py-4 text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Tagged
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-1 md:gap-8">
          {posts.map(post => (
            <div key={post.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-md md:rounded-xl">
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-6 text-white font-bold">
                <span className="flex items-center gap-1"><Heart className="w-5 h-5 fill-current" /> {post.likes}</span>
                <span className="flex items-center gap-1"><Message className="w-5 h-5 fill-current" /> {post.comments.length}</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-3 py-20 text-center text-slate-500">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full border border-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
              </div>
              <h3 className="text-xl font-light mb-2 text-white">No Posts Yet</h3>
              <p className="text-sm">Start sharing your moments with the world.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;