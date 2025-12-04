import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SimpleChartProps {
  data: any[];
  type: 'bar' | 'line' | 'scatter' | 'pie';
  height?: number;
  xKey?: string;
  yKey?: string;
  color?: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  type,
  height = 400,
  xKey = 'x',
  yKey = 'y',
  color = '#3b82f6'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;

    const width = svgRef.current.clientWidth;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (type === 'bar') {
      const xScale = d3.scaleBand()
        .domain(data.map(d => d[xKey]))
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yKey]) || 0])
        .range([innerHeight, 0]);

      g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d[xKey]))
        .attr('y', d => yScale(d[yKey]))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d[yKey]))
        .style('fill', color)
        .style('opacity', 0.7);

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      g.append('g')
        .call(d3.axisLeft(yScale));
    }
  }, [data, type, height, xKey, yKey, color]);

  return <svg ref={svgRef} style={{ width: '100%', height, backgroundColor: '#0f172a' }} />;
};
