import React from 'react';
import { SlideData } from '../types';

interface SlideLayoutProps {
  data: SlideData;
  children: React.ReactNode;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ data, children }) => {
  return (
    <div className="h-full w-full flex flex-col p-6 md:p-12 overflow-y-auto animate-fade-in">
      <div className="mb-8 border-b border-slate-700 pb-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          {data.title}
        </h2>
        <p className="text-xl text-slate-400 font-light">
          {data.subtitle}
        </p>
      </div>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};