import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Question4DonutChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale
    const margin = {top: 45, right: 95, bottom: 40, left: 0};  // 50% of original
    const width = 450;  // 900 * 0.5
    const height = 350;  // 700 * 0.5
    const radius = Math.min(width, height) / 2.5;
    const innerRadius = radius * 0.5;
    
    const chart_width = width - margin.left - margin.right;
    const chart_height = height - margin.top - margin.bottom;

    // Load data
    d3.csv('./files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv')
      .then((csvData: any[]) => {
        
        // Process cause data
        const causeData = csvData.map(d => ({
          cause: d.cause || 'Unknown'
        }));

        const grouped = d3.rollup(
          causeData,
          v => v.length,
          d => d.cause
        );

        const total = causeData.length;
        const causeDistribution = Array.from(grouped, ([cause_category, outage_count]) => ({
          cause_category,
          outage_count,
          percentage: ((outage_count / total) * 100).toFixed(1)
        })).sort((a, b) => b.outage_count - a.outage_count);

        // Create SVG
        const svg = d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .style("background", "#f9fafb");

        const g = svg.append("g")
          .attr("transform", `translate(${margin.left + chart_width/2},${margin.top + chart_height/2})`);

        // Color scale
        const donutColors = d3.schemePaired;
        const colorScale = d3.scaleOrdinal()
          .domain(causeDistribution.map(d => d.cause_category))
          .range(donutColors);

        // Pie generator
        const pie = d3.pie<any>()
          .value(d => d.outage_count)
          .sort(null);

        // Arc generator
        const arc = d3.arc<any>()
          .innerRadius(innerRadius + 5)  // 10 * 0.5
          .outerRadius(radius - 5);

        const arcHover = d3.arc<any>()
          .innerRadius(innerRadius)
          .outerRadius(radius);

        // Create slices
        const slices = g.selectAll('.slice')
          .data(pie(causeDistribution))
          .join('g')
          .attr('class', 'slice');

        // Add paths
        const paths = slices.append('path')
          .attr('d', arc)
          .attr('fill', d => colorScale(d.data.cause_category) as string)
          .attr('stroke', 'white')
          .attr('stroke-width', 1)  // 2 * 0.5
          .style('cursor', 'pointer')
          .style('opacity', 0.9);

        // Center text
        const centerText = g.append('g')
          .attr('class', 'center-text');

        centerText.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '-0.5em')
          .style('font-size', '8px')  // 16 * 0.5
          .style('font-weight', 'bold')
          .style('fill', '#333')
          .text('Total');

        centerText.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '1em')
          .style('font-size', '11px')  // 22 * 0.5
          .style('font-weight', 'bold')
          .style('fill', '#2563eb')
          .text(causeData.length);

        centerText.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '2.5em')
          .style('font-size', '7px')  // 14 * 0.5
          .style('fill', '#666')
          .text('Outages');

        // Tooltip
        const tooltip = g.append('g')
          .attr('class', 'tooltip')
          .style('display', 'none')
          .style("pointer-events", "none");

        tooltip.append('rect')
          .attr('width', 90)  // 180 * 0.5
          .attr('height', 35)  // 70 * 0.5
          .attr('fill', 'white')
          .attr('stroke', '#2563eb')
          .attr('stroke-width', 1)  // 2 * 0.5
          .attr('rx', 2.5);  // 5 * 0.5

        tooltip.append('text')
          .attr('class', 'tooltip-cause')
          .attr('x', 45)
          .attr('y', 12.5)
          .attr('text-anchor', 'middle')
          .attr('font-weight', 'bold')
          .attr('font-size', '6.5px');  // 13 * 0.5

        tooltip.append('text')
          .attr('class', 'tooltip-count')
          .attr('x', 45)
          .attr('y', 22.5)
          .attr('text-anchor', 'middle')
          .attr('font-size', '6px');  // 12 * 0.5

        tooltip.append('text')
          .attr('class', 'tooltip-percent')
          .attr('x', 45)
          .attr('y', 30)
          .attr('text-anchor', 'middle')
          .attr('font-size', '5.5px')  // 11 * 0.5
          .attr('fill', '#666');

        // Hover interactions
        paths
          .on('mouseover', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('d', arcHover)
              .style('opacity', 1);

            tooltip.style('display', null);
            tooltip.select('.tooltip-cause').text(d.data.cause_category);
            tooltip.select('.tooltip-count').text(`${d.data.outage_count} outages`);
            tooltip.select('.tooltip-percent').text(`${d.data.percentage}% of total`);

            // Position tooltip
            const [x, y] = arc.centroid(d);
            tooltip.attr('transform', `translate(${x - 45},${y - 50})`);
          })
          .on('mouseout', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('d', arc)
              .style('opacity', 0.9);

            tooltip.style('display', 'none');
          });

        // Legend
        const legend = svg.append("g")
          .attr('transform', `translate(${width - margin.right - 10},${margin.top})`)
          .attr("class", "legend");

        legend.selectAll("legend-item")
          .data(causeDistribution)
          .enter()
          .append("g")
          .attr("transform", (d, i) => `translate(0, ${i * 11})`)  // 22 * 0.5
          .each(function(d) {
            const g = d3.select(this);

            g.append("rect")
              .attr("width", 7)  // 14 * 0.5
              .attr("height", 7)
              .attr("fill", colorScale(d.cause_category) as string)
              .attr("stroke", "#000000")
              .attr("stroke-width", 0.5);

            g.append("text")
              .attr("x", 10)
              .attr("y", 5.5)
              .style("font-size", "5.5px")  // 11 * 0.5
              .style("font-weight", "600")
              .text(d.cause_category.length > 12 ? d.cause_category.substring(0, 12) + '...' : d.cause_category);

            g.append("text")
              .attr("x", 95)
              .attr("y", 5.5)
              .style("font-size", "5.5px")
              .style("fill", "#000000")
              .attr("text-anchor", "end")
              .text(`${d.percentage}%`);
          });

        // Title
        svg.append('text')
          .attr('x', margin.left + chart_width / 2)
          .attr('y', 15)  // 30 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')  // 20 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text('Outage Cause Classification');

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setIsLoading(false);
      });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading causes...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};
