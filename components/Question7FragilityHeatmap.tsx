import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Question7FragilityHeatmap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale (NO legend, NO sliders)
    const SVG_WIDTH = 500;  // 1000 * 0.5
    const SVG_HEIGHT = 350;  // 700 * 0.5
    const MARGIN_TOP = 60;  // 120 * 0.5
    const MARGIN_LEFT = 100;  // 200 * 0.5
    const MARGIN_RIGHT = 20;  // Minimal - no legend
    const MARGIN_BOTTOM = 40;  // 80 * 0.5

    // Load data
    d3.csv(`${import.meta.env.BASE_URL}files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv`)
      .then((csvData: any[]) => {
        
        // Process data by region with fixed weights
        const frequency_weight = 10;
        const impact_weight = 0.5;
        const diversity_weight = 5;

        const processedData = csvData.map(d => ({
          region: d.country || 'Unknown',
          cause: d.cause || 'Unknown',
          duration_hours: parseFloat(d.duration) || 0,
          start_date: new Date(d.start_date),
          end_date: new Date(d.end_date)
        })).filter(d => d.region && d.region !== 'Unknown' && !isNaN(d.duration_hours) && d.duration_hours >= 0);

        // Group by region
        const grouped = d3.rollup(
          processedData,
          v => ({
            total_outages: v.length,
            avg_duration: d3.mean(v, d => d.duration_hours) || 0,
            cause_types: new Set(v.map(d => d.cause)).size,
            frequency_score: v.length * frequency_weight,
            impact_score: (d3.mean(v, d => d.duration_hours) || 0) * impact_weight,
            diversity_score: new Set(v.map(d => d.cause)).size * diversity_weight,
            fragility_index: (v.length * frequency_weight) +
              ((d3.mean(v, d => d.duration_hours) || 0) * impact_weight) +
              (new Set(v.map(d => d.cause)).size * diversity_weight)
          }),
          d => d.region
        );

        const regional_metrics = Array.from(grouped, ([region, metrics]) => ({
          region,
          ...metrics
        }))
          .sort((a, b) => b.fragility_index - a.fragility_index)
          .slice(0, 20);

        // Metrics to show (all 4)
        const allMetrics = [
          {key: 'frequency_score', label: 'Frequency'},
          {key: 'impact_score', label: 'Impact'},
          {key: 'diversity_score', label: 'Diversity'},
          {key: 'fragility_index', label: 'Fragility Index'}
        ];

        // Calculate plot dimensions
        const plotX = MARGIN_LEFT;
        const plotY = MARGIN_TOP;
        const plotWidth = SVG_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
        const plotHeight = SVG_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

        // Create scales
        const xScale = d3.scaleBand()
          .domain(allMetrics.map(m => m.key))
          .range([0, plotWidth])
          .padding(0.2);

        const yScale = d3.scaleBand()
          .domain(regional_metrics.map(d => d.region))
          .range([0, plotHeight])
          .padding(0.1);

        const cellWidth = xScale.bandwidth();
        const cellHeight = yScale.bandwidth();

        // Create color scales for each metric
        const colorScales: any = {};
        allMetrics.forEach(metric => {
          const values = regional_metrics.map((d: any) => d[metric.key]);
          const minVal = Math.min(...values);
          const maxVal = Math.max(...values);
          const domain = (minVal === maxVal) ? [minVal, minVal + 1] : [minVal, maxVal];
          
          colorScales[metric.key] = d3.scaleSequential()
            .domain(domain)
            .interpolator(t => d3.interpolateSpectral(1 - t));
        });

        // Create SVG
        const svg = d3.select(svgRef.current)
          .attr('width', SVG_WIDTH)
          .attr('height', SVG_HEIGHT);

        // Background
        svg.append('rect')
          .attr('width', SVG_WIDTH)
          .attr('height', SVG_HEIGHT)
          .attr('fill', '#f8fafc');

        // Title
        svg.append('text')
          .attr('x', SVG_WIDTH / 2)
          .attr('y', 17.5)  // 35 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')  // 24 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1e293b')
          .text('Regional Internet Fragility Analysis');

        svg.append('text')
          .attr('x', SVG_WIDTH / 2)
          .attr('y', 30)  // 60 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')  // 13 * 0.5
          .attr('fill', '#64748b')
          .text('Darker Red = Higher Fragility');

        // Heatmap
        const heatmapG = svg.append('g')
          .attr('transform', `translate(${plotX}, ${plotY})`);

        // Draw all cells
        allMetrics.forEach(metric => {
          regional_metrics.forEach(region => {
            const cellValue = (region as any)[metric.key];
            const cellColor = colorScales[metric.key](cellValue);
            const textColor = d3.rgb(cellColor).brighter(2).hex() === '#ffffff' ? '#000' : '#fff';
            
            // Background rectangle
            heatmapG.append('rect')
              .attr('x', xScale(metric.key)!)
              .attr('y', yScale(region.region)!)
              .attr('width', cellWidth)
              .attr('height', cellHeight)
              .attr('fill', cellColor)
              .attr('stroke', '#e2e8f0')
              .attr('stroke-width', 0.5);  // 1 * 0.5

            // Cell value text
            heatmapG.append('text')
              .attr('x', xScale(metric.key)! + cellWidth / 2)
              .attr('y', yScale(region.region)! + cellHeight / 2)
              .attr('text-anchor', 'middle')
              .attr('dy', '0.35em')
              .attr('font-size', metric.key === 'fragility_index' ? '6.5px' : '5.5px')  // 13/11 * 0.5
              .attr('font-weight', metric.key === 'fragility_index' ? 'bold' : 'normal')
              .attr('fill', textColor)
              .text(cellValue.toFixed(1));
          });
        });

        // Y-axis Region names
        svg.append('g')
          .attr('transform', `translate(${plotX - 5}, ${plotY})`)  // 10 * 0.5
          .call(d3.axisLeft(yScale).tickSize(0))
          .call(g => g.select('.domain').remove())
          .call(g => g.selectAll('text')
            .attr('font-size', '6px')  // 12 * 0.5
            .attr('font-weight', 'bold')
            .attr('fill', '#334155')
            .attr('text-anchor', 'end'));

        // X-axis Metrics
        svg.append('g')
          .attr('transform', `translate(${plotX}, ${plotY - 15})`)  // 30 * 0.5
          .selectAll('text')
          .data(allMetrics)
          .join('text')
          .attr('x', m => xScale(m.key)! + cellWidth / 2)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')  // 13 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#2563eb')
          .text(m => m.label);

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setIsLoading(false);
      });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading heatmap...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};
