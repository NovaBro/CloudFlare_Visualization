import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Question6NetworkChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale
    const width = 450;  // 900 * 0.5
    const height = 300;  // 600 * 0.5
    const margin = {top: 30, right: 15, bottom: 120, left: 90};  // 50% of original

    // Helper function
    const getShortASN = (asnName: string) => {
      return asnName.split(";")[0];
    };

    // Load data
    d3.csv('/files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv')
      .then((csvData: any[]) => {
        
        // Process network data
        const networkData = csvData
          .filter(d => d.asn != null && d.asn !== '' && d.asn !== 'null')
          .map(d => ({
            asn_number: String(d.asn),
            asn_name: d.asn_name || 'Unknown Network'
          }));

        // Group by ASN
        const grouped = d3.rollup(
          networkData,
          v => v.length,
          d => d.asn_number,
          d => d.asn_name
        );

        const result: any[] = [];
        for (const [asn, names] of grouped) {
          for (const [name, count] of names) {
            result.push({
              asn_number: asn,
              asn_name: name,
              failure_count: count
            });
          }
        }

        const asnFailures = result.sort((a, b) => b.failure_count - a.failure_count);
        
        // Top 15 networks for visualization
        const topNetworks = asnFailures.slice(0, 15);

        // Create SVG
        const svg = d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", height);

        // Scales
        const x = d3.scaleBand()
          .domain(topNetworks.map(d => `AS${getShortASN(d.asn_name)}`))
          .range([margin.left, width - margin.right])
          .padding(0.2);

        const y = d3.scaleLinear()
          .domain([0, d3.max(topNetworks, d => d.failure_count)!])
          .nice()
          .range([height - margin.bottom, margin.top]);

        // Color function based on risk level
        const getColor = (count: number) => {
          if (count >= 3) return '#FF4444';  // High risk - red
          if (count === 2) return '#FFA500';  // Medium risk - orange
          return '#4CAF50';  // Low risk - green
        };

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
          .data(topNetworks)
          .join('rect')
          .attr('class', 'bar')
          .attr('x', d => x(`AS${getShortASN(d.asn_name)}`)!)
          .attr('y', d => y(d.failure_count))
          .attr('width', x.bandwidth())
          .attr('height', d => y(0) - y(d.failure_count))
          .attr('fill', d => getColor(d.failure_count))
          .attr('opacity', 0.85)
          .style('cursor', 'pointer');

        // Value labels on bars
        svg.selectAll('.bar-label')
          .data(topNetworks)
          .join('text')
          .attr('class', 'bar-label')
          .attr('x', d => x(`AS${getShortASN(d.asn_name)}`)! + x.bandwidth() / 2)
          .attr('y', d => y(d.failure_count) - 4)  // -8 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '5.5px')  // 11 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text(d => `${d.failure_count}`);

        // Tooltip
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .style('display', 'none')
          .style("pointer-events", "none");

        tooltip.append('rect')
          .attr('width', 130)  // 260 * 0.5
          .attr('height', 45)  // 90 * 0.5
          .attr('fill', 'white')
          .attr('stroke', '#2563eb')
          .attr('stroke-width', 1)  // 2 * 0.5
          .attr('rx', 2.5);  // 5 * 0.5

        const tooltipText = tooltip.append('text')
          .attr('x', 65)
          .attr('text-anchor', 'middle');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-asn')
          .attr('x', 65)
          .attr('y', 10)
          .attr('font-weight', 'bold')
          .attr('font-size', '6.5px');  // 13 * 0.5

        tooltipText.append('tspan')
          .attr('class', 'tooltip-name')
          .attr('x', 65)
          .attr('y', 19)
          .attr('font-size', '5.5px')
          .attr('fill', '#666');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-count')
          .attr('x', 65)
          .attr('y', 28)
          .attr('font-size', '6px');

        tooltipText.append('tspan')
          .attr('class', 'tooltip-risk')
          .attr('x', 65)
          .attr('y', 37)
          .attr('font-size', '5.5px')
          .attr('font-weight', 'bold');

        // Hover interactions
        bars
          .on('mouseover', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('opacity', 1);

            const riskLevel = d.failure_count >= 3 ? 'High Risk' : 
                             d.failure_count === 2 ? 'Medium Risk' : 'Low Risk';

            tooltip.style('display', null);
            tooltip.select('.tooltip-asn').text(`AS${getShortASN(d.asn_name)}`);
            const shortName = getShortASN(d.asn_name);
            tooltip.select('.tooltip-name').text(
              shortName.length > 20 ? shortName.substring(0, 17) + '...' : shortName
            );
            tooltip.select('.tooltip-count').text(`${d.failure_count} failure${d.failure_count > 1 ? 's' : ''}`);
            tooltip.select('.tooltip-risk')
              .text(riskLevel)
              .attr('fill', getColor(d.failure_count));

            const xPos = x(`AS${getShortASN(d.asn_name)}`)! + x.bandwidth() / 2;
            const yPos = y(d.failure_count);

            let tooltipX = xPos - 62.5;  // 125 * 0.5
            let tooltipY = yPos - 55;  // 110 * 0.5

            if (tooltipX < margin.left) tooltipX = margin.left;
            if (tooltipX + 125 > width - margin.right) tooltipX = width - margin.right - 125;
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
          .attr('transform', 'rotate(-45)')
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
          .text('ASN (Autonomous System Number)');

        svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', 10)  // 20 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '6.5px')
          .attr('fill', '#374151')
          .text('Number of Failures');

        // Title
        svg.append('text')
          .attr('x', width / 2)
          .attr('y', 12.5)  // 25 * 0.5
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')  // 18 * 0.5
          .attr('font-weight', 'bold')
          .attr('fill', '#1f2937')
          .text('Network Failure Frequency Analysis');

        // Legend - NO LEGEND per user request ("just viulization")
        // Removed legend section

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setIsLoading(false);
      });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading network data...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};
