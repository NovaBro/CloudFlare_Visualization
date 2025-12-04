import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Scatter, ZAxis, Cell, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { TOP_COUNTRIES, TREND_DATA, OUTAGE_TYPE_SCATTER, CAUSE_DISTRIBUTION, FRAGILITY_SCORES } from '../../constants';

// --- Global Landscape Chart ---
export const TopCountriesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={TOP_COUNTRIES}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
        <XAxis type="number" stroke="#94a3b8" />
        <YAxis dataKey="country" type="category" stroke="#e2e8f0" width={100} tick={{fontSize: 14, fontWeight: 'bold'}} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
          cursor={{fill: '#334155', opacity: 0.4}}
        />
        <Bar dataKey="outages" fill="#ef4444" radius={[0, 4, 4, 0]} name="Outage Events">
          {TOP_COUNTRIES.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={index < 3 ? '#ef4444' : '#f87171'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// --- Trends Chart ---
export const TrendsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={TREND_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" stroke="#94a3b8" />
        <YAxis yAxisId="left" stroke="#ef4444" label={{ value: 'Frequency', angle: -90, position: 'insideLeft', fill: '#ef4444' }} />
        <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" label={{ value: 'Avg Duration (hrs)', angle: 90, position: 'insideRight', fill: '#3b82f6' }} />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
        <Legend />
        <Bar yAxisId="left" dataKey="frequency" barSize={20} fill="#ef4444" fillOpacity={0.6} name="Frequency" />
        <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#3b82f6" strokeWidth={3} dot={{r: 6}} name="Avg Duration" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// --- Duration vs Scope Scatter ---
export const DurationScopeChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
        <XAxis type="number" dataKey="duration" name="Duration" unit="h" stroke="#94a3b8" label={{ value: 'Duration (Hours)', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} />
        <YAxis type="number" dataKey="scope" name="Scope" unit="%" stroke="#94a3b8" label={{ value: 'Pop. Impact (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }} 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-slate-800 border border-slate-600 p-3 rounded shadow-xl">
                  <p className="font-bold text-white">{data.cause}</p>
                  <p className="text-slate-300">Duration: {data.duration}h</p>
                  <p className="text-slate-300">Impact: {data.scope}%</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Scatter name="Events" data={OUTAGE_TYPE_SCATTER} fill="#8884d8">
            {OUTAGE_TYPE_SCATTER.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.scope > 80 ? '#ef4444' : '#3b82f6'} />
            ))}
        </Scatter>
        <ZAxis type="number" dataKey="z" range={[60, 400]} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// --- Causes Donut ---
export const CausesPieChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={CAUSE_DISTRIBUTION}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {CAUSE_DISTRIBUTION.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// --- Fragility Bubble/Scatter ---
export const FragilityChart: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FRAGILITY_SCORES} margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="frequency" type="number" stroke="#94a3b8" label={{value: 'Frequency Index', position: 'insideBottom', offset: -10, fill: '#94a3b8'}} domain={[0, 100]} />
                <YAxis dataKey="duration" type="number" stroke="#94a3b8" label={{value: 'Duration Severity', angle: -90, position: 'insideLeft', fill: '#94a3b8'}} domain={[0, 100]} />
                <Tooltip 
                    cursor={{strokeDasharray: '3 3'}}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-600 p-3 rounded shadow-xl">
                              <p className="font-bold text-white text-lg">{data.country}</p>
                              <p className="text-amber-400 font-semibold">{data.label}</p>
                              <div className="mt-2 text-xs text-slate-400">
                                  <div>Freq: {data.frequency}</div>
                                  <div>Dur: {data.duration}</div>
                                  <div>Div: {data.diversity}</div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                />
                <Scatter name="Countries" data={FRAGILITY_SCORES} fill="#8884d8">
                    {FRAGILITY_SCORES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.duration > 80 ? '#f59e0b' : (entry.frequency > 80 ? '#ef4444' : '#14b8a6')} />
                    ))}
                </Scatter>
                <ZAxis type="number" dataKey="diversity" range={[100, 1000]} name="Diversity" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}