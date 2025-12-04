import React from 'react';
import { NotebookEmbed } from './NotebookEmbed';
import { Question1Map } from './Question1Map';
import { Question3MonthlyTimeline } from './Question3MonthlyTimeline';
import { Question4DonutChart } from './Question4DonutChart';
import { Question5DurationChart } from './Question5DurationChart';
import { Question6NetworkChart } from './Question6NetworkChart';
import { Question7FragilityHeatmap } from './Question7FragilityHeatmap';
import { Question8TrendsOverTime } from './Question8TrendsOverTime';
import { Activity, Globe, TrendingUp, Gavel, Timer, ShieldCheck, Network, BarChart } from 'lucide-react';

/**
 * Comprehensive Dashboard displaying all 8 questions from the Observable notebook
 * All questions 1, 3, 4, 5, 6, 7, 8 are rendered directly with D3.js at 50% scale
 * Only Question 2 remains as Observable embed
 */
export const ComprehensiveDashboard: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-white p-8">
      {/* Grid Layout for all visualizations - Equal spacing, no containers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        
        {/* Question 1 & 3: Combined column - World Map + Timeline */}
        <div className="w-full flex flex-col items-start justify-start space-y-0">
          <Question1Map />
          <div className="-mt-6">
            <Question3MonthlyTimeline />
          </div>
        </div>

        {/* Question 2: Outage Types by Region */}
        <div className="w-full h-[500px]">
          <NotebookEmbed 
            notebookId="c234e5b925ac43ec" 
            cellName="graph2" 
            className="w-full h-full" 
          />
        </div>

        {/* Question 4: Root Causes - Donut Chart - Direct D3 Rendering at 50% */}
        <div className="w-full">
          <Question4DonutChart />
        </div>

        {/* Question 5: Duration Analysis - Direct D3 Rendering at 50% */}
        <div className="w-full">
          <Question5DurationChart />
        </div>

        {/* Question 6: Network/ASN Failures - Direct D3 Rendering at 50% */}
        <div className="w-full">
          <Question6NetworkChart />
        </div>

        {/* Question 7: Fragility Index - Full Width - Direct D3 Rendering at 50% */}
        <div className="w-full xl:col-span-2">
          <Question7FragilityHeatmap />
        </div>

        {/* Question 8: Trends Over Time - Full Width - Direct D3 Rendering at 50% */}
        <div className="w-full xl:col-span-2">
          <Question8TrendsOverTime />
        </div>

      </div>
    </div>
  );
};
