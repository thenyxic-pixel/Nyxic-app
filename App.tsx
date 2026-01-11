
import React, { useState, useEffect } from 'react';
import { Post, AppTab } from './types';
import { MOCK_POSTS, CURRENT_USER, ICONS } from './constants';
import NavBar from './components/NavBar';
import PostCard from './components/PostCard';
// Fixed: Corrected import path for CreateModal which is in the services directory
import CreateModal from './services/CreateModal';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        // Trigger haptic feedback if available in mobile browser
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(10);
        }
        return {
          ...post,
          likes: isLiked ? post.likes + 1 : post.likes - 1,
          isLiked
        };
      }
      return post;
    }));
  };

  const handlePost = (imageUrl: string, caption: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: CURRENT_USER.id,
      username: CURRENT_USER.username,
      userAvatar: CURRENT_USER.avatar,
      imageUrl,
      caption,
      likes: 0,
      timestamp: 'Just now',
      isLiked: false,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
    setActiveTab('home');
  };

  const handleTabChange = (tab: AppTab) => {
    if (tab === 'create') {
      setIsCreateModalOpen(true);
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[100]">
        <div className="relative">
          <h1 className="font-outfit text-6xl font-black bg-gradient-to-br from-violet-400 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent animate-pulse">
            NYXIC
          </h1>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex pb-16 md:pb-0 md:pl-64">
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-1 w-full max-w-4xl mx-auto safe-pt">
        {/* Header (Mobile Only) */}
        <header className="md:hidden flex items-center justify-between p-4 sticky top-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 z-40">
          <h1 className="font-outfit text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            NYXIC
          </h1>
          <div className="flex gap-4">
            <button className="text-slate-200 active:scale-90 transition-transform"><ICONS.Heart /></button>
            <button className="text-slate-200 rotate-12 active:scale-90 transition-transform"><ICONS.Send /></button>
          </div>
        </header>

        {/* Stories bar (Home Tab Only) */}
        {activeTab === 'home' && (
          <div className="py-4 border-b border-slate-900 overflow-x-auto scrollbar-hide flex gap-4 px-4 no-scrollbar">
            {['Your Story', 'stargazer', 'neon_noir', 'cosmic_explorer', 'minimalist', 'art_vibe'].map((user, i) => (
              <div key={user} className="flex flex-col items-center gap-1 min-w-[72px]">
                <div className={`p-[2px] rounded-full ${i === 0 ? 'bg-slate-700' : 'bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-violet-600'}`}>
                  <div className="p-1 bg-slate-950 rounded-full">
                    <img src={`https://picsum.photos/seed/${user}/100/100`} className="w-14 h-14 rounded-full object-cover" alt={user} />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 truncate w-16 text-center">{user}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content */}
        <div className="pb-10 pt-4 px-2 md:px-0">
          {activeTab === 'home' && (
            <div className="mt-4">
              {posts.map(post => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
              ))}
            </div>
          )}

          {activeTab === 'explore' && (
            <div className="grid grid-cols-3 gap-0.5 md:gap-1 px-0.5">
              {[...Array(24)].map((_, i) => (
                <div key={i} className={`aspect-square relative group overflow-hidden ${i % 7 === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img src={`https://picsum.photos/seed/exp${i}/600/600`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="px-4 space-y-6 pt-4">
              <h2 className="text-xl font-bold">Activity</h2>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/notif${i}/50/50`} className="w-10 h-10 rounded-full border border-slate-800" />
                    <div className="flex-1 text-sm">
                      <span className="font-bold">user_{i+102}</span> liked your photo. <span className="text-slate-500">2h</span>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-slate-800 overflow-hidden">
                       <img src={posts[i % posts.length].imageUrl} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <ProfileView user={CURRENT_USER} posts={posts.filter(p => p.userId === CURRENT_USER.id)} />
          )}
        </div>
      </main>

      {/* Suggested Users Sidebar (Desktop Only) */}
      <aside className="hidden lg:block w-80 p-8 pt-10 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 mb-6">
          <img src={CURRENT_USER.avatar} className="w-14 h-14 rounded-full border border-slate-700" />
          <div className="flex-1">
            <p className="font-bold text-sm">{CURRENT_USER.username}</p>
            <p className="text-slate-500 text-xs">{CURRENT_USER.fullName}</p>
          </div>
          <button className="text-violet-500 text-xs font-bold hover:text-white transition-colors">Switch</button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-slate-500 font-bold text-sm">Suggested for you</p>
          <button className="text-xs font-bold hover:text-slate-300">See All</button>
        </div>

        <div className="space-y-4">
          {['nova_art', 'pixel_pro', 'zenith_vibe', 'luna_design'].map(u => (
            <div key={u} className="flex items-center gap-3">
              <img src={`https://picsum.photos/seed/${u}/40/40`} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="text-xs font-bold">{u}</p>
                <p className="text-[10px] text-slate-500">Suggested for you</p>
              </div>
              <button className="text-violet-500 text-xs font-bold hover:text-violet-400">Follow</button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-[10px] text-slate-600 uppercase tracking-widest space-y-4">
          <p className="flex flex-wrap gap-x-2">
            <span>About</span> • <span>Help</span> • <span>Press</span> • <span>API</span> • <span>Jobs</span> • <span>Privacy</span> • <span>Terms</span>
          </p>
          <p>© 2024 NYXIC BY ALEX</p>
        </div>
      </aside>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onPost={handlePost} 
        />
      )}
    </div>
  );
};

export default App;
