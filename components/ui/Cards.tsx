import React from 'react';

export const StatCard: React.FC<{ label: string; value: string; desc?: string; icon?: React.ReactNode; color?: string }> = ({ 
  label, value, desc, icon, color = "bg-slate-800" 
}) => (
  <div className={`${color} p-6 rounded-xl border border-slate-700 shadow-lg hover:border-slate-500 transition-colors duration-300`}>
    <div className="flex justify-between items-start mb-4">
      <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{label}</div>
      {icon && <div className="text-white opacity-80">{icon}</div>}
    </div>
    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{value}</div>
    {desc && <p className="text-slate-400 text-sm">{desc}</p>}
  </div>
);

export const InfoBox: React.FC<{ title: string; children: React.ReactNode; borderColor?: string }> = ({ 
  title, children, borderColor = "border-slate-600" 
}) => (
  <div className={`bg-slate-850/50 p-6 rounded-lg border-l-4 ${borderColor} h-full`}>
    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
    <div className="text-slate-300 space-y-2 leading-relaxed">
      {children}
    </div>
  </div>
);