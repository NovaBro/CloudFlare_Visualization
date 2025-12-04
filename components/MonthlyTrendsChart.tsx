import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

interface MonthlyTrendData {
  year_month: string;
  monthly_outages: number;
  avg_duration: number;
  total_duration: number;
  outage_severity: number;
}

export const MonthlyTrendsChart: React.FC = () => {
  const [data, setData] = useState<MonthlyTrendData[]>([]);
  const [showTrendLine, setShowTrendLine] = useState(true);
  const [showDurationLine, setShowDurationLine] = useState(true);
  const [smoothingLevel, setSmoothingLevel] = useState('none');
  const [loading, setLoading] = useState(true);

  // Load and process data
  useEffect(() => {
    fetch('/files/2614a2dce3b871b3c8f2161d7b0041b5f20aa849b30a1a242cf170bd5c92e61e6a3e0d3b9f61c35261a94a51797ec190ad4828ab2d3df52932337f1ed1a5caea.csv')
      .then(res => res.text())
      .then(csv => {
        const rows = csv.split('\n').slice(1).filter(row => row.trim());
        const dataRaw = rows.map(row => {
          const cols = row.split(',');
          const startDate = new Date(cols[6]);
          const endDate = new Date(cols[7]);
          const durationMs = endDate.getTime() - startDate.getTime();
          const durationHours = durationMs / (1000 * 60 * 60);

          return {
            start_date: startDate,
            end_date: endDate,
            duration_hours: durationHours
          };
        });

        // Calculate monthly trends
        const grouped = d3.rollup(
          dataRaw,
          v => ({
            monthly_outages: v.length,
            avg_duration: d3.mean(v, d => d.duration_hours) || 0,
            total_duration: d3.sum(v, d => d.duration_hours) || 0,
            outage_severity: (d3.mean(v, d => d.duration_hours) || 0) * (v.length / 12)
          }),
          d => {
            const date = d.start_date;
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          }
        );

        const result = Array.from(grouped, ([year_month, metrics]) => ({
          year_month,
          ...metrics
        })).sort((a, b) => a.year_month.localeCompare(b.year_month));

        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  // Render chart
  useEffect(() => {
    if (data.length === 0) return;

    const containerRef = document.getElementById('monthly-trends-chart');
    if (!containerRef) return;

    // Clear previous content
    containerRef.innerHTML = '';

    // Apply smoothing if needed
    let chartData = data;
    if (smoothingLevel !== 'none') {
      const windowSize = parseInt(smoothingLevel);
      chartData = data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(windowSize / 2));
        const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
        const window = data.slice(start, end);

        return {
          ...d,
          monthly_outages: d3.mean(window, x => x.monthly_outages) || 0,
          avg_duration: d3.mean(window, x => x.avg_duration) || 0,
          total_duration: d3.mean(window, x => x.total_duration) || 0
        };
      });
    }

    const width = 950;
    const chartHeight = 500;
    const margin = { top: 80, right: 120, bottom: 40, left: 90 };

    // Create SVG
    const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', chartHeight);

    // Background
    svg.append('rect')
      .attr('width', width)
      .attr('height', chartHeight)
      .attr('fill', '#ffffff');

    // Scales
    const xScale = d3.scalePoint()
      .domain(chartData.map(d => d.year_month))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yScaleFrequency = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.monthly_outages)! * 1.2])
      .range([chartHeight - margin.bottom, margin.top]);

    const yScaleDuration = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.avg_duration)! * 1.2])
      .range([chartHeight - margin.bottom, margin.top]);

    // Calculate linear regression for trend
    const n = chartData.length;
    const indices = chartData.map((_, i) => i);
    const frequencies = chartData.map(d => d.monthly_outages);

    const sumX = d3.sum(indices);
    const sumY = d3.sum(frequencies);
    const sumXY = d3.sum(indices.map((x, i) => x * frequencies[i]));
    const sumX2 = d3.sum(indices.map(x => x * x));

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trendData = chartData.map((d, i) => ({
      year_month: d.year_month,
      trend_value: Math.max(0, slope * i + intercept)
    }));

    const trendDirection = slope > 0.05 ? 'Increasing' : slope < -0.05 ? 'Decreasing' : 'Stable';
    const trendColor = slope > 0.05 ? '#ef4444' : slope < -0.05 ? '#10b981' : '#f59e0b';

    // Grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScaleFrequency)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat(() => ''))
      .call(g => g.selectAll('.tick line')
        .attr('stroke', '#f1f5f9')
        .attr('stroke-dasharray', '3,3')
        .attr('stroke-width', 1))
      .call(g => g.select('.domain').remove());

    // X-axis
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${chartHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter((_, i) => i % Math.ceil(chartData.length / 10) === 0)))
      .call(g => g.selectAll('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .style('font-size', '12px')
        .style('fill', '#64748b')
        .style('font-weight', '500'));

    xAxis.call(g => g.select('.domain')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5));

    // Y-axis (Frequency - Left)
    const yAxisLeft = svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScaleFrequency))
      .call(g => g.select('.domain').attr('stroke', '#3b82f6').attr('stroke-width', 2))
      .call(g => g.selectAll('.tick text')
        .attr('fill', '#3b82f6')
        .attr('font-weight', '600')
        .attr('font-size', '12px'));

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(chartHeight - margin.bottom + margin.top) / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('fill', '#3b82f6')
      .attr('font-weight', '700')
      .attr('font-size', '14px')
      .attr('letter-spacing', '0.3px')
      .text('Monthly Outage Count');

    // Y-axis (Duration - Right)
    if (showDurationLine) {
      svg.append('g')
        .attr('transform', `translate(${width - margin.right},0)`)
        .call(d3.axisRight(yScaleDuration))
        .call(g => g.select('.domain').attr('stroke', '#a855f7').attr('stroke-width', 2))
        .call(g => g.selectAll('.tick text')
          .attr('fill', '#a855f7')
          .attr('font-weight', '600')
          .attr('font-size', '12px'));

      svg.append('text')
        .attr('transform', 'rotate(90)')
        .attr('x', (chartHeight - margin.bottom + margin.top) / 2)
        .attr('y', -width + 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#a855f7')
        .attr('font-weight', '700')
        .attr('font-size', '14px')
        .attr('letter-spacing', '0.3px')
        .text('Avg Duration (hours)');
    }

    // Area under frequency curve
    const areaFrequency = d3.area()
      .x(d => xScale(d.year_month))
      .y0(chartHeight - margin.bottom)
      .y1(d => yScaleFrequency(d.monthly_outages))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(chartData)
      .attr('fill', 'rgba(59, 130, 246, 0.08)')
      .attr('d', areaFrequency);

    // Frequency line
    const lineFrequency = d3.line<MonthlyTrendData>()
      .x(d => xScale(d.year_month))
      .y(d => yScaleFrequency(d.monthly_outages))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3.5)
      .attr('d', lineFrequency)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '12px 16px')
      .style('background', 'rgba(15, 23, 42, 0.95)')
      .style('color', 'white')
      .style('border-radius', '8px')
      .style('font-size', '13px')
      .style('pointer-events', 'none')
      .style('opacity', '0')
      .style('z-index', '1000')
      .style('border', '1px solid rgba(255, 255, 255, 0.1)')
      .style('box-shadow', '0 8px 24px rgba(0,0,0,0.25)');

    // Frequency points
    svg.selectAll('.freq-point')
      .data(chartData)
      .join('circle')
      .attr('class', 'freq-point')
      .attr('cx', d => xScale(d.year_month))
      .attr('cy', d => yScaleFrequency(d.monthly_outages))
      .attr('r', 5)
      .attr('fill', '#3b82f6')
      .attr('stroke', 'white')
      .attr('stroke-width', 2.5)
      .style('cursor', 'pointer')
      .style('opacity', 0.9)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('r', 7)
          .style('opacity', 1)
          .attr('stroke-width', 3);

        tooltip.style('opacity', 1)
          .html(`<div style="font-weight: 700; margin-bottom: 4px;">${d.year_month}</div>
                 <div>Outages: ${d.monthly_outages.toFixed(1)}</div>
                 <div>Avg Duration: ${d.avg_duration.toFixed(1)}h</div>
                 <div>Total: ${d.total_duration.toFixed(0)}h</div>`)
          .style('left', (event.pageX + 12) + 'px')
          .style('top', (event.pageY - 32) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 5)
          .style('opacity', 0.9)
          .attr('stroke-width', 2.5);
        tooltip.style('opacity', 0);
      });

    // Duration line (if enabled)
    if (showDurationLine) {
      const lineDuration = d3.line<MonthlyTrendData>()
        .x(d => xScale(d.year_month))
        .y(d => yScaleDuration(d.avg_duration))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(chartData)
        .attr('fill', 'none')
        .attr('stroke', '#a855f7')
        .attr('stroke-width', 2.8)
        .attr('stroke-dasharray', '7,4')
        .attr('d', lineDuration)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round');

      // Duration points
      svg.selectAll('.dur-point')
        .data(chartData)
        .join('circle')
        .attr('class', 'dur-point')
        .attr('cx', d => xScale(d.year_month))
        .attr('cy', d => yScaleDuration(d.avg_duration))
        .attr('r', 4)
        .attr('fill', '#a855f7')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          d3.select(this)
            .attr('r', 6)
            .attr('stroke-width', 2.5);

          tooltip.style('opacity', 1)
            .html(`<div style="font-weight: 700; margin-bottom: 4px;">${d.year_month}</div>
                   <div>Avg Duration: ${d.avg_duration.toFixed(1)}h</div>
                   <div>Total Duration: ${d.total_duration.toFixed(0)}h</div>`)
            .style('left', (event.pageX + 12) + 'px')
            .style('top', (event.pageY - 32) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('r', 4)
            .attr('stroke-width', 2);
          tooltip.style('opacity', 0);
        });
    }

    // Trend line (if enabled)
    if (showTrendLine) {
      const lineTrend = d3.line<typeof trendData[0]>()
        .x(d => xScale(d.year_month))
        .y(d => yScaleFrequency(d.trend_value));

      svg.append('path')
        .datum(trendData)
        .attr('fill', 'none')
        .attr('stroke', trendColor)
        .attr('stroke-width', 3.5)
        .attr('stroke-dasharray', '9,5')
        .attr('d', lineTrend)
        .style('opacity', 0.85)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round');
    }

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 32)
      .attr('text-anchor', 'middle')
      .attr('font-size', '26px')
      .attr('font-weight', '800')
      .attr('fill', '#0f172a')
      .attr('letter-spacing', '0.5px')
      .text('Internet Outage Trends: Frequency & Duration Analysis');

    // Subtitle with trend direction
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 62)
      .attr('text-anchor', 'middle')
      .attr('font-size', '15px')
      .attr('fill', trendColor)
      .attr('font-weight', '700')
      .attr('letter-spacing', '0.4px')
      .text(`Trend: ${trendDirection} | Slope: ${slope.toFixed(4)} outages/month`);

    containerRef.appendChild(svg.node()!);

    // Statistics
    const avgMonthly = d3.mean(chartData, d => d.monthly_outages)?.toFixed(1) || '0';
    const avgDuration = d3.mean(chartData, d => d.avg_duration)?.toFixed(1) || '0';
    const maxMonth = chartData.reduce((max, d) => d.monthly_outages > max.monthly_outages ? d : max);
    const volatility = (d3.deviation(chartData, d => d.monthly_outages) || 0).toFixed(2);

    return () => {
      tooltip.remove();
    };
  }, [data, showTrendLine, showDurationLine, smoothingLevel]);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-slate-400">Loading data...</div>;
  }

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full text-slate-400">No data available</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-500 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle Trend Line */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs text-slate-800 uppercase tracking-wide">Trend Line</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTrendLine}
              onChange={(e) => setShowTrendLine(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-indigo-600 rounded"
            />
            <span className="text-xs text-slate-600 font-medium">{showTrendLine ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        {/* Toggle Duration Line */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs text-slate-800 uppercase tracking-wide">Duration Line</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showDurationLine}
              onChange={(e) => setShowDurationLine(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-indigo-600 rounded"
            />
            <span className="text-xs text-slate-600 font-medium">{showDurationLine ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        {/* Smoothing Level Selector */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs text-slate-800 uppercase tracking-wide">Data Smoothing</label>
          <select
            value={smoothingLevel}
            onChange={(e) => setSmoothingLevel(e.target.value)}
            className="px-3 py-2 border-2 border-slate-300 rounded-lg bg-white text-xs font-semibold cursor-pointer text-slate-800 transition hover:border-indigo-500 hover:shadow-md"
          >
            <option value="none">No Smoothing</option>
            <option value="3">3-Month Average</option>
            <option value="6">6-Month Average</option>
            <option value="12">12-Month Average</option>
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div id="monthly-trends-chart" className="w-full overflow-x-auto"></div>
    </div>
  );
};
