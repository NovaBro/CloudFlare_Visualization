import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface RegionalMetric {
  region: string;
  total_outages: number;
  avg_duration: number;
  max_duration: number;
  cause_types: number;
  frequency_score: number;
  impact_score: number;
  diversity_score: number;
  fragility_index: number;
}

export const FragilityHeatmap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [frequencyWeight, setFrequencyWeight] = useState(10);
  const [impactWeight, setImpactWeight] = useState(0.5);
  const [diversityWeight, setDiversityWeight] = useState(5);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'frequency_score',
    'impact_score',
    'diversity_score',
    'fragility_index'
  ]);
  const [continentFilter, setContinentFilter] = useState('All');
  const [data, setData] = useState<RegionalMetric[]>([]);

  // Load and process data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/files/2614a2dce3b871b3c8f2161d7b0041b5f20aa849b30a1a242cf170bd5c92e61e6a3e0d3b9f61c35261a94a51797ec190ad4828ab2d3df52932337f1ed1a5caea.csv');
        const text = await response.text();
        const parsed = d3.csvParse(text, d3.autoType);

        // Process data
        const continentMap: Record<string, string> = {
          'TZ': 'Africa', 'IQ': 'Asia', 'JM': 'Americas', 'CM': 'Africa', 'IT': 'Europe', 'PK': 'Asia',
          'HT': 'Americas', 'GB': 'Europe', 'ID': 'Asia', 'AF': 'Asia', 'ZA': 'Africa', 'US': 'Americas',
          'GI': 'Europe', 'CU': 'Americas', 'AE': 'Asia', 'SY': 'Asia', 'IR': 'Asia', 'CO': 'Americas',
          'EG': 'Africa', 'DO': 'Americas', 'RU': 'Europe', 'AO': 'Africa', 'CN': 'Asia', 'VC': 'Americas',
          'YE': 'Asia', 'MV': 'Asia', 'SE': 'Europe', 'CZ': 'Europe', 'SD': 'Africa', 'MW': 'Africa',
          'KE': 'Africa', 'UG': 'Africa', 'ET': 'Africa', 'NG': 'Africa', 'GH': 'Africa', 'MA': 'Africa',
          'BR': 'Americas', 'MX': 'Americas', 'CA': 'Americas', 'AR': 'Americas', 'CL': 'Americas',
          'IN': 'Asia', 'JP': 'Asia', 'KR': 'Asia', 'SG': 'Asia', 'TH': 'Asia', 'VN': 'Asia',
          'DE': 'Europe', 'FR': 'Europe', 'ES': 'Europe', 'NL': 'Europe', 'BE': 'Europe',
          'AU': 'Oceania', 'NZ': 'Oceania'
        };

        const processedData = parsed.map((d: any) => {
          const countryCode = d['Annotations locations Details.code'] || d.annotations_locations_details_code || 'Unknown';
          const startDate = new Date(d['Annotations start Date'] || d.annotations_start_date || d.start_date);
          const endDate = new Date(d['Annotations end Date'] || d.annotations_end_date || d.end_date);
          const durationHours = d.duration_hours || (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

          return {
            region: d['Annotations locations Details.name'] || d.annotations_locations_details_name || d.region,
            cause: d['Annotations outage.outage Cause'] || d.annotations_outage_outage_cause || d.cause || 'Unknown',
            continent: continentMap[countryCode] || 'Other',
            duration_hours: durationHours
          };
        }).filter((d: any) => d.region && !isNaN(d.duration_hours) && d.duration_hours >= 0);

        // Filter by continent
        const filtered = continentFilter === 'All' 
          ? processedData 
          : processedData.filter((d: any) => d.continent === continentFilter);

        // Group by region
        const grouped = d3.rollup(
          filtered,
          (v: any[]) => ({
            total_outages: v.length,
            avg_duration: d3.mean(v, d => d.duration_hours) || 0,
            max_duration: d3.max(v, d => d.duration_hours) || 0,
            cause_types: new Set(v.map(d => d.cause)).size,
            frequency_score: v.length * frequencyWeight,
            impact_score: (d3.mean(v, d => d.duration_hours) || 0) * impactWeight,
            diversity_score: new Set(v.map(d => d.cause)).size * diversityWeight,
            fragility_index: 
              (v.length * frequencyWeight) +
              ((d3.mean(v, d => d.duration_hours) || 0) * impactWeight) +
              (new Set(v.map(d => d.cause)).size * diversityWeight)
          }),
          (d: any) => d.region
        );

        const metrics: RegionalMetric[] = Array.from(grouped, ([region, metrics]) => ({
          region,
          ...metrics
        }))
          .sort((a, b) => b.fragility_index - a.fragility_index)
          .slice(0, 20);

        setData(metrics);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [frequencyWeight, impactWeight, diversityWeight, continentFilter]);

  // Render heatmap
  useEffect(() => {
    if (!svgRef.current || data.length === 0 || selectedMetrics.length === 0) return;

    const SVG_WIDTH = 900;
    const SVG_HEIGHT = 500;
    const MARGIN_TOP = 80;
    const MARGIN_LEFT = 150;
    const MARGIN_RIGHT = 200;
    const MARGIN_BOTTOM = 60;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const allMetrics = [
      { key: 'frequency_score', label: 'Frequency' },
      { key: 'impact_score', label: 'Impact' },
      { key: 'diversity_score', label: 'Diversity' },
      { key: 'fragility_index', label: 'Fragility Index' }
    ];

    const metricsToShow = allMetrics.filter(m => selectedMetrics.includes(m.key));

    const plotX = MARGIN_LEFT;
    const plotY = MARGIN_TOP;
    const plotWidth = SVG_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
    const plotHeight = SVG_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

    const xScale = d3.scaleBand()
      .domain(metricsToShow.map(m => m.key))
      .range([0, plotWidth])
      .padding(0.2);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.region))
      .range([0, plotHeight])
      .padding(0.1);

    const cellWidth = xScale.bandwidth();
    const cellHeight = yScale.bandwidth();

    // Color scales
    const colorScales: Record<string, d3.ScaleSequential<string>> = {};
    metricsToShow.forEach(metric => {
      const values = data.map(d => (d as any)[metric.key]);
      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const domain = minVal === maxVal ? [minVal, minVal + 1] : [minVal, maxVal];

      colorScales[metric.key] = d3.scaleSequential()
        .domain(domain)
        .interpolator(t => d3.interpolateSpectral(1 - t));
    });

    // Background
    svg.append('rect')
      .attr('width', SVG_WIDTH)
      .attr('height', SVG_HEIGHT)
      .attr('fill', '#f8fafc');

    // Title
    svg.append('text')
      .attr('x', SVG_WIDTH / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1e293b')
      .text('Regional Internet Fragility Analysis - Multi-Metric Heat Map');

    svg.append('text')
      .attr('x', SVG_WIDTH / 2)
      .attr('y', 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('fill', '#64748b')
      .text('Darker Red = Higher Fragility | Each column normalized independently');

    // Heatmap
    const heatmapG = svg.append('g')
      .attr('transform', `translate(${plotX}, ${plotY})`);

    // Draw cells
    metricsToShow.forEach(metric => {
      data.forEach(region => {
        const cellValue = (region as any)[metric.key];
        const cellColor = colorScales[metric.key](cellValue);
        const brightness = d3.rgb(cellColor).r * 0.299 + d3.rgb(cellColor).g * 0.587 + d3.rgb(cellColor).b * 0.114;
        const textColor = brightness > 128 ? '#000' : '#fff';

        heatmapG.append('rect')
          .attr('x', xScale(metric.key)!)
          .attr('y', yScale(region.region)!)
          .attr('width', cellWidth)
          .attr('height', cellHeight)
          .attr('fill', cellColor)
          .attr('stroke', '#e2e8f0')
          .attr('stroke-width', 1);

        heatmapG.append('text')
          .attr('x', xScale(metric.key)! + cellWidth / 2)
          .attr('y', yScale(region.region)! + cellHeight / 2)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', metric.key === 'fragility_index' ? '13px' : '11px')
          .attr('font-weight', metric.key === 'fragility_index' ? 'bold' : 'normal')
          .attr('fill', textColor)
          .text(cellValue.toFixed(1));
      });
    });

    // Y-axis
    svg.append('g')
      .attr('transform', `translate(${plotX - 10}, ${plotY})`)
      .call(d3.axisLeft(yScale).tickSize(0))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('text')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('fill', '#334155')
        .attr('text-anchor', 'end'));

    // X-axis
    svg.append('g')
      .attr('transform', `translate(${plotX}, ${plotY - 30})`)
      .selectAll('text')
      .data(metricsToShow)
      .join('text')
      .attr('x', m => xScale(m.key)! + cellWidth / 2)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('font-size', '13px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2563eb')
      .text(m => m.label);

    // Legend
    const legendX = plotX + plotWidth + 20;
    const legendY = plotY + 20;
    const legendHeight = 150;

    const defs = svg.append('defs');
    const gradId = 'gradient-' + Math.random().toString(36).substr(2, 9);
    const gradient = defs.append('linearGradient')
      .attr('id', gradId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    [0, 0.25, 0.5, 0.75, 1].forEach(t => {
      gradient.append('stop')
        .attr('offset', (t * 100) + '%')
        .attr('stop-color', d3.interpolateSpectral(t));
    });

    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', 25)
      .attr('height', legendHeight)
      .attr('fill', `url(#${gradId})`)
      .attr('stroke', '#999')
      .attr('stroke-width', 1);

    svg.append('text')
      .attr('x', legendX - 5)
      .attr('y', legendY - 10)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2563eb')
      .text('Scale');

    svg.append('text')
      .attr('x', legendX + 35)
      .attr('y', legendY + 12)
      .attr('font-size', '11px')
      .attr('fill', '#e11d48')
      .text('High');

    svg.append('text')
      .attr('x', legendX + 35)
      .attr('y', legendY + legendHeight + 5)
      .attr('font-size', '11px')
      .attr('fill', '#22c55e')
      .text('Low');

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + legendHeight + 30)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#334155')
      .text('Formula:');

    const formulaLines = [
      `(Outages × ${frequencyWeight}) +`,
      `(Avg Dur × ${impactWeight.toFixed(1)}) +`,
      `(Causes × ${diversityWeight})`
    ];

    formulaLines.forEach((line, i) => {
      svg.append('text')
        .attr('x', legendX)
        .attr('y', legendY + legendHeight + 45 + (i * 12))
        .attr('font-size', '9px')
        .attr('fill', '#64748b')
        .text(line);
    });
  }, [data, selectedMetrics, frequencyWeight, impactWeight, diversityWeight]);

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Controls */}
      <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-800 p-2 rounded-lg">
            <label className="text-xs font-semibold text-slate-300 mb-1 block">
              Frequency Weight: {frequencyWeight}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={frequencyWeight}
              onChange={(e) => setFrequencyWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="bg-slate-800 p-2 rounded-lg">
            <label className="text-xs font-semibold text-slate-300 mb-1 block">
              Impact Weight: {impactWeight}
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={impactWeight}
              onChange={(e) => setImpactWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="bg-slate-800 p-2 rounded-lg">
            <label className="text-xs font-semibold text-slate-300 mb-1 block">
              Diversity Weight: {diversityWeight}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={diversityWeight}
              onChange={(e) => setDiversityWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="bg-slate-800 p-2 rounded-lg">
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Filter by Continent</label>
            <select
              value={continentFilter}
              onChange={(e) => setContinentFilter(e.target.value)}
              className="w-full px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs border border-slate-600"
            >
              <option>All</option>
              <option>Africa</option>
              <option>Americas</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {['frequency_score', 'impact_score', 'diversity_score', 'fragility_index'].map(metric => (
            <label key={metric} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric)}
                onChange={() => toggleMetric(metric)}
                className="w-3 h-3"
              />
              <span>{metric.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          💡 Adjust weights to recalculate fragility index. The heatmap updates dynamically based on your selections.
        </p>
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-lg p-4">
        <svg
          ref={svgRef}
          width="900"
          height="500"
          viewBox="0 0 900 500"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};
