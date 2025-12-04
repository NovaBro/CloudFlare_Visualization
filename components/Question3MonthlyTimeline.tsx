import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Question3MonthlyTimeline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale
    const width = 450;  // 900 * 0.5
    const height = 200;  // 400 * 0.5
    const margin = {top: 25, right: 15, bottom: 35, left: 35};  // 50% of original

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Load and process data
    d3.csv('/files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv')
      .then((csvData: any[]) => {
        
        // Process data to extract month
        const processedData = csvData.map(d => {
          const startDate = new Date(d.start_date);
          const monthNum = startDate.getMonth() + 1;
          
          // Determine season
          let season = '';
          if (monthNum === 12 || monthNum === 1 || monthNum === 2) season = 'Winter';
          else if (monthNum >= 3 && monthNum <= 5) season = 'Spring';
          else if (monthNum >= 6 && monthNum <= 8) season = 'Summer';
          else season = 'Fall';
          
          return {
            month_num: monthNum,
            season: season
          };
        });

        // Group by month
        const grouped = d3.rollup(
          processedData,
          v => v.length,
          d => d.month_num
        );

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const monthlyData = [];
        for (let i = 1; i <= 12; i++) {
          monthlyData.push({
            month: i,
            month_name: monthNames[i - 1],
            count: grouped.get(i) || 0
          });
        }

        // Scales
        const x = d3.scaleLinear()
          .domain([1, 12])
          .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
          .domain([0, d3.max(monthlyData, d => d.count) || 0])
          .nice()
          .range([height - margin.bottom, margin.top]);

        // Seasonal background colors
        const seasons = [
          {name: 'Winter', start: 0.5, end: 2.5, color: '#e0f2fe'},
          {name: 'Spring', start: 2.5, end: 5.5, color: '#d1fae5'},
          {name: 'Summer', start: 5.5, end: 8.5, color: '#fed7aa'},
          {name: 'Fall', start: 8.5, end: 11.5, color: '#fee2e2'},
          {name: 'Winter', start: 11.5, end: 12.5, color: '#e0f2fe'}
        ];

        // Add seasonal backgrounds
        svg.selectAll('.season-bg')
          .data(seasons)
          .join('rect')
          .attr('class', 'season-bg')
          .attr('x', d => x(d.start))
          .attr('y', margin.top)
          .attr('width', d => x(d.end) - x(d.start))
          .attr('height', height - margin.top - margin.bottom)
          .attr('fill', d => d.color)
          .attr('opacity', 0.4);

        // Add season labels
        const seasonLabels = [
          {name: 'Winter', x: 1.5},
          {name: 'Spring', x: 4},
          {name: 'Summer', x: 7},
          {name: 'Fall', x: 10},
        ];

        svg.selectAll('.season-label')
          .data(seasonLabels)
          .join('text')
          .attr('class', 'season-label')
          .attr('x', d => x(d.x))
          .attr('y', margin.top - 2.5)  // 5 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '5.5px')  // 11 * 0.5
          .attr('fill', '#6b7280')
          .attr('font-style', 'italic')
          .text(d => d.name);

        // Grid lines
        svg.append('g')
          .attr('class', 'grid')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x)
            .tickSize(-height + margin.top + margin.bottom)
            .tickFormat(() => '')
            .ticks(12))
          .call(g => g.select('.domain').remove())
          .call(g => g.selectAll('.tick line')
            .attr('stroke', '#e5e7eb')
            .attr('stroke-dasharray', '2,2'));

        svg.append('g')
          .attr('class', 'grid')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y)
            .tickSize(-width + margin.left + margin.right)
            .tickFormat(() => ''))
          .call(g => g.select('.domain').remove())
          .call(g => g.selectAll('.tick line')
            .attr('stroke', '#e5e7eb')
            .attr('stroke-dasharray', '2,2'));

        // Line generator
        const line = d3.line<any>()
          .x(d => x(d.month))
          .y(d => y(d.count))
          .curve(d3.curveMonotoneX);

        // Draw line
        svg.append('path')
          .datum(monthlyData)
          .attr('fill', 'none')
          .attr('stroke', '#2563eb')
          .attr('stroke-width', 1.5)  // 3 * 0.5
          .attr('d', line);

        // Season color mapping for markers
        const seasonColors: Record<number, string> = {
          1: '#3b82f6', 2: '#3b82f6',
          3: '#10b981', 4: '#10b981', 5: '#10b981',
          6: '#f59e0b', 7: '#f59e0b', 8: '#f59e0b',
          9: '#ef4444', 10: '#ef4444', 11: '#ef4444',
          12: '#3b82f6'
        };

        // Add markers
        const markers = svg.selectAll('.marker')
          .data(monthlyData)
          .join('circle')
          .attr('class', 'marker')
          .attr('cx', d => x(d.month))
          .attr('cy', d => y(d.count))
          .attr('r', 3)  // 6 * 0.5
          .attr('fill', d => seasonColors[d.month])
          .attr('stroke', '#1e3a8a')
          .attr('stroke-width', 1)  // 2 * 0.5
          .style('cursor', 'pointer');

        // Tooltip
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .style('display', 'none');

        tooltip.append('rect')
          .attr('width', 60)  // 120 * 0.5
          .attr('height', 25)  // 50 * 0.5
          .attr('fill', 'white')
          .attr('stroke', '#2563eb')
          .attr('stroke-width', 1)  // 2 * 0.5
          .attr('rx', 2.5);  // 5 * 0.5

        tooltip.append('text')
          .attr('class', 'tooltip-month')
          .attr('x', 30)  // 60 * 0.5
          .attr('y', 10)  // 20 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-weight', 'bold')
          .attr('font-size', '6.5px');  // 13 * 0.5

        tooltip.append('text')
          .attr('class', 'tooltip-count')
          .attr('x', 30)
          .attr('y', 19)  // 38 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6px');  // 12 * 0.5

        // Hover interactions
        markers
          .on('mouseover', function(event, d: any) {
            d3.select(this)
              .transition()
              .duration(150)
              .attr('r', 4.5);  // 9 * 0.5

            tooltip.style('display', null);
            tooltip.select('.tooltip-month').text(d.month_name);
            tooltip.select('.tooltip-count').text(`${d.count} outages`);

            const xPos = x(d.month);
            const yPos = y(d.count);

            let tooltipX = xPos - 30;  // 60 * 0.5
            let tooltipY = yPos - 35;  // 70 * 0.5

            if (tooltipX < margin.left) tooltipX = margin.left;
            if (tooltipX + 60 > width - margin.right) tooltipX = width - margin.right - 60;
            if (tooltipY < margin.top) tooltipY = yPos + 10;

            tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`);
          })
          .on('mouseout', function() {
            d3.select(this)
              .transition()
              .duration(150)
              .attr('r', 3);

            tooltip.style('display', 'none');
          });

        // Axes
        svg.append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x)
            .tickValues(d3.range(1, 13))
            .tickFormat(d => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(d)-1]))
          .call(g => g.selectAll('.tick text')
            .attr('font-size', '5.5px'));  // 11 * 0.5

        svg.append('g')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(6))
          .call(g => g.selectAll('.tick text')
            .attr('font-size', '5.5px'));

        // Axis labels
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', height - 7.5)  // 15 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')  // 13 * 0.5
          .attr('fill', '#374151')
          .text('Month of Year');

        svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', 10)  // 20 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')
          .attr('fill', '#374151')
          .text('Number of Outages');

        // Title
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', 12.5)  // 25 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')  // 18 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text('Monthly Outage Frequency Timeline');

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setIsLoading(false);
      });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading timeline...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};
