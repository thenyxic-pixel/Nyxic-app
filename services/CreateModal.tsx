
import React, { useState, useRef } from 'react';
import { ICONS } from '../constants';
import { generateCaption, generateImageWithAI } from '../services/gemini';

interface CreateModalProps {
  onClose: () => void;
  onPost: (imageUrl: string, caption: string) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onPost }) => {
  const [step, setStep] = useState<'upload' | 'refine'>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setStep('refine');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiImageGen = async () => {
    if (!aiPrompt) return;
    setIsLoading(true);
    try {
      const generated = await generateImageWithAI(aiPrompt);
      setImage(generated);
      setStep('refine');
    } catch (err) {
      alert("Failed to generate image. Try another prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestCaption = async () => {
    setIsLoading(true);
    try {
      const base64 = image?.split(',')[1];
      const suggested = await generateCaption(aiPrompt || undefined, base64);
      setCaption(suggested);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <button onClick={onClose} className="text-slate-400 hover:text-white">Cancel</button>
          <h2 className="font-bold">New Post</h2>
          <button 
            onClick={() => image && onPost(image, caption)}
            disabled={!image || isLoading}
            className="text-violet-500 font-bold hover:text-violet-400 disabled:opacity-50"
          >
            Share
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'upload' ? (
            <div className="space-y-8">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-violet-500/50 hover:bg-slate-800/20 transition-all group"
              >
                <ICONS.Plus className="w-12 h-12 text-slate-700 group-hover:text-violet-500 mb-4" />
                <p className="text-slate-400 font-medium">Select photo from device</p>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or use AI Imagination</span></div>
              </div>

              <div className="space-y-4">
                <textarea
                  placeholder="Describe an image you'd like to create..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <button 
                  onClick={handleAiImageGen}
                  disabled={!aiPrompt || isLoading}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? 'Thinking...' : <><ICONS.Sparkles /> Generate with AI</>}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 h-full">
              <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
                {image && <img src={image} className="w-full h-full object-cover" />}
              </div>
              <div className="space-y-4 flex flex-col">
                <div className="flex-1">
                   <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Caption</label>
                    <button 
                      onClick={handleSuggestCaption}
                      disabled={isLoading}
                      className="text-xs flex items-center gap-1 text-violet-400 hover:text-violet-300 font-bold"
                    >
                      <ICONS.Sparkles className="w-3 h-3" /> {isLoading ? 'Generating...' : 'Suggest with AI'}
                    </button>
                  </div>
                  <textarea
                    placeholder="Write a caption..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none h-40"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Post Details</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Location</span>
                      <span className="text-slate-200">Global</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Advanced AI tagging</span>
                      <span className="text-green-500">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
