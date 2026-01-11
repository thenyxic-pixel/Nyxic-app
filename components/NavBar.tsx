
import React from 'react';
import { ICONS, CURRENT_USER } from '../constants';
import { AppTab } from '../types';

interface NavBarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
  // Fixed: Use React.FC<any> to allow passing className and other props to dynamic icon components
  const tabs: { id: AppTab; icon: React.FC<any>; label: string }[] = [
    { id: 'home', icon: ICONS.Home, label: 'Home' },
    { id: 'explore', icon: ICONS.Search, label: 'Explore' },
    { id: 'create', icon: ICONS.Plus, label: 'Create' },
    { id: 'activity', icon: ICONS.Heart, label: 'Activity' },
    // Fixed: Profile icon component now receives and applies props like className
    { id: 'profile', icon: (props: any) => <img src={CURRENT_USER.avatar} className={`w-6 h-6 rounded-full border border-slate-700 ${props.className || ''}`} alt="Profile" />, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Nav - Enhanced with safe area support */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around items-center h-16 md:h-16 px-4 z-50 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex justify-around items-center w-full h-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-12 h-12 active:scale-75 ${
                activeTab === tab.id ? 'text-violet-400' : 'text-slate-400'
              }`}
            >
              {/* Fixed: tab.icon now accepts the className prop correctly after type update */}
              <tab.icon className={`${activeTab === tab.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]' : ''}`} />
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-slate-950 border-r border-slate-800 p-6 z-50">
        <h1 className="font-outfit text-3xl font-extrabold mb-10 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          NYXIC
        </h1>
        <div className="space-y-2 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-violet-400 font-semibold shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
              }`}
            >
              <tab.icon />
              <span className="text-lg">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-900/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <span>Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
