import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Question5DurationChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale
    const width = 450;  // 900 * 0.5
    const height = 250;  // 500 * 0.5
    const margin = {top: 25, right: 15, bottom: 60, left: 40};  // 50% of original

    // Load data
    d3.csv('./files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv')
      .then((csvData: any[]) => {
        
        // Process duration data
        const durationData = csvData
          .filter(d => d.duration != null && d.duration >= 0)
          .map(d => ({
            cause: d.cause || 'Unknown',
            duration_hours: +d.duration
          }));

        // Group by cause
        const grouped = d3.rollup(
          durationData,
          v => ({
            outage_count: v.length,
            avg_duration: d3.mean(v, d => d.duration_hours) || 0,
            median_duration: d3.median(v, d => d.duration_hours) || 0,
            min_duration: d3.min(v, d => d.duration_hours) || 0,
            max_duration: d3.max(v, d => d.duration_hours) || 0
          }),
          d => d.cause
        );

        const durationByCause = Array.from(grouped, ([cause, stats]) => ({
          cause,
          ...stats
        })).sort((a, b) => b.avg_duration - a.avg_duration);

        // Create SVG
        const svg = d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", height);

        // Scales
        const x = d3.scaleBand()
          .domain(durationByCause.map(d => d.cause))
          .range([margin.left, width - margin.right])
          .padding(0.2);

        const y = d3.scaleLinear()
          .domain([0, d3.max(durationByCause, d => d.avg_duration)!])
          .nice()
          .range([height - margin.bottom, margin.top]);

        // Color scale
        const colorScale = d3.scaleSequential()
          .domain([0, durationByCause.length - 1])
          .interpolator(d3.interpolateRdYlBu);

        // Grid lines
        svg.append('g')
          .attr('class', 'grid')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y)
            .tickSize(-width + margin.left + margin.right)
            .tickFormat(() => ''))
          .call(g => g.select('.domain').remove())
          .call(g => g.selectAll('.tick line')
            .attr('stroke', '#e5e7eb')
            .attr('stroke-dasharray', '1,1')  // 2,2 * 0.5
            .attr('stroke-width', 0.5));

        // Bars
        const bars = svg.selectAll('.bar')
          .data(durationByCause)
          .join('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.cause)!)
          .attr('y', d => y(d.avg_duration))
          .attr('width', x.bandwidth())
          .attr('height', d => y(0) - y(d.avg_duration))
          .attr('fill', (d, i) => colorScale(i) as string)
          .attr('opacity', 0.85)
          .style('cursor', 'pointer');

        // Value labels on bars
        svg.selectAll('.bar-label')
          .data(durationByCause)
          .join('text')
          .attr('class', 'bar-label')
          .attr('x', d => x(d.cause)! + x.bandwidth() / 2)
          .attr('y', d => y(d.avg_duration) - 4)  // -8 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '5.5px')  // 11 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(d => `${d.avg_duration.toFixed(1)}h`);

        // Tooltip
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .style('display', 'none')
          .style("pointer-events", "none");

        tooltip.append('rect')
          .attr('width', 110)  // 220 * 0.5
          .attr('height', 60)  // 120 * 0.5
          .attr('fill', 'white')
          .attr('stroke', '#2563eb')
          .attr('stroke-width', 1)  // 2 * 0.5
          .attr('rx', 2.5);  // 5 * 0.5

        const tooltipText = tooltip.append('text')
          .attr('x', 55)
          .attr('text-anchor', 'middle');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-cause')
          .attr('x', 55)
          .attr('y', 10)
          .attr('font-weight', 'bold')
          .attr('font-size', '6.5px');  // 13 * 0.5

        tooltipText.append('tspan')
          .attr('class', 'tooltip-avg')
          .attr('x', 55)
          .attr('y', 20)
          .attr('font-size', '5.5px');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-median')
          .attr('x', 55)
          .attr('y', 29)
          .attr('font-size', '5.5px');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-range')
          .attr('x', 55)
          .attr('y', 38)
          .attr('font-size', '5.5px')
          .attr('fill', '#666');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-count')
          .attr('x', 55)
          .attr('y', 47)
          .attr('font-size', '5.5px')
          .attr('fill', '#666');

        // Hover interactions
        bars
          .on('mouseover', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('opacity', 1);

            tooltip.style('display', null);
            tooltip.select('.tooltip-cause').text(d.cause);
            tooltip.select('.tooltip-avg').text(`Avg: ${d.avg_duration.toFixed(1)} hours`);
            tooltip.select('.tooltip-median').text(`Median: ${d.median_duration.toFixed(1)} hours`);
            tooltip.select('.tooltip-range').text(`Range: ${d.min_duration.toFixed(1)} - ${d.max_duration.toFixed(1)}h`);
            tooltip.select('.tooltip-count').text(`Count: ${d.outage_count} outages`);

            const xPos = x(d.cause)! + x.bandwidth() / 2;
            const yPos = y(d.avg_duration);

            let tooltipX = xPos - 55;
            let tooltipY = yPos - 70;

            if (tooltipX < margin.left) tooltipX = margin.left;
            if (tooltipX + 110 > width - margin.right) tooltipX = width - margin.right - 110;
            if (tooltipY < margin.top) tooltipY = yPos + 10;

            tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`);
          })
          .on('mouseout', function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('opacity', 0.85);

            tooltip.style('display', 'none');
          });

        // X axis
        svg.append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x))
          .selectAll('text')
          .attr('transform', 'rotate(-45) translate(-5, 2.5)')  // translate(-10, 5) * 0.5
          .style('text-anchor', 'end')
          .attr('font-size', '5px');  // 10 * 0.5

        // Y axis
        svg.append('g')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(8))
          .call(g => g.selectAll('text').attr('font-size', '5px'));

        // Axis labels
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', height - 5)  // -10 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')  // 13 * 0.5
          .attr('fill', '#374151')
          .text('Outage Cause');

        svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', 10)  // 20 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')
          .attr('fill', '#374151')
          .text('Average Duration (Hours)');

        // Title
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', 12.5)  // 25 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')  // 18 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text('Average Outage Duration by Cause');

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setIsLoading(false);
      });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading duration data...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};
