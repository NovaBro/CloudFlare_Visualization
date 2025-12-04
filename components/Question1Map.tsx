import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// ISO2 to ISO3 country code mapping
const iso2ToIso3: Record<string, string> = {
  'AF': 'AFG', 'AE': 'ARE', 'AO': 'AGO', 'AU': 'AUS', 'CA': 'CAN', 'CH': 'CHE',
  'CL': 'CHL', 'CM': 'CMR', 'CN': 'CHN', 'CO': 'COL', 'CU': 'CUB', 'CW': 'CUW',
  'CZ': 'CZE', 'DO': 'DOM', 'EG': 'EGY', 'ES': 'ESP', 'FI': 'FIN', 'FR': 'FRA',
  'GB': 'GBR', 'GE': 'GEO', 'GI': 'GIB', 'GL': 'GRL', 'GY': 'GUY', 'HK': 'HKG',
  'HN': 'HND', 'HT': 'HTI', 'ID': 'IDN', 'IE': 'IRL', 'IQ': 'IRQ', 'IR': 'IRN',
  'IT': 'ITA', 'JM': 'JAM', 'KE': 'KEN', 'KN': 'KNA', 'KP': 'PRK', 'LK': 'LKA',
  'LY': 'LBY', 'MA': 'MAR', 'MK': 'MKD', 'MM': 'MMR', 'MV': 'MDV', 'MW': 'MWI',
  'NE': 'NER', 'NG': 'NGA', 'NP': 'NPL', 'PA': 'PAN', 'PH': 'PHL', 'PK': 'PAK',
  'PR': 'PRI', 'PT': 'PRT', 'RE': 'REU', 'RU': 'RUS', 'SD': 'SDN', 'SE': 'SWE',
  'SY': 'SYR', 'TH': 'THA', 'TZ': 'TZA', 'UA': 'UKR', 'US': 'USA', 'VC': 'VCT',
  'VU': 'VUT', 'YE': 'YEM', 'YT': 'MYT', 'ZA': 'ZAF',
};

export const Question1Map: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale
    const width = 350;  // 700 * 0.5
    const height = 250;  // 500 * 0.5
    const margins = {top: 0, bottom: 25, left: 0, right: 25};  // Minimal margins on top and left

    const svg = d3.select(svgRef.current)
      .attr('width', width + margins.left + margins.right)
      .attr('height', height + margins.top + margins.bottom);

    const chart = svg.append('g')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', `translate(${margins.left}, ${margins.top})`);

    chart.append('text')
      .attr("transform", `translate(${width/2}, ${8})`)  // Much closer to top (was -margins.top/2)
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text('Visualization 1: Countries vs Log of Outages Count');

    // Load and process data
    Promise.all([
      d3.csv('/files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv'),
      d3.json('/files/89f81b1e8af0be836adcbbb1d37f7118947f0d21fdaaee4760b867433d09f169d6c4f1579de34e9311e6235b2433f02a327fc84f8e909ff30cbeb0dade4eb919.json')
    ]).then(([csvData, worldData]: [any[], any]) => {
      
      // Aggregate data by country
      const countryCountsMap = new Map<string, {count: number, name: string, iso3: string}>();
      
      csvData.forEach((row: any) => {
        const countryCode = row.country_code;
        const countryName = row.country;
        
        if (countryCode && countryCode !== '' && countryName) {
          const iso3 = iso2ToIso3[countryCode] || countryCode;
          
          if (countryCountsMap.has(iso3)) {
            countryCountsMap.get(iso3)!.count += 1;
          } else {
            countryCountsMap.set(iso3, {
              count: 1,
              name: countryName,
              iso3: iso3
            });
          }
        }
      });

      // Create data array with log counts
      const aggregatedData = Array.from(countryCountsMap.values()).map(d => ({
        ...d,
        log_count: Math.log(d.count + 1)  // +1 to avoid log(0)
      }));

      // Create mappers
      const mapper_count = new Map();
      aggregatedData.forEach(d => mapper_count.set(d.iso3, d.count));
      
      const mapper_log = new Map();
      aggregatedData.forEach(d => mapper_log.set(d.iso3, d.log_count));

      const mapper_country = new Map();
      aggregatedData.forEach(d => mapper_country.set(d.iso3, d.name));

      const log_counts = aggregatedData.map(d => d.log_count);
      const c_scale = d3.scaleSequential(d3.interpolateWarm)
        .domain([d3.min(log_counts) || 0, d3.max(log_counts) || 4]);

      const projection = d3.geoNaturalEarth1()
        .scale(65)  // 130 * 0.5
        .translate([width / 2, height / 2]);

      // Tooltip
      const tooltip = createTooltip(chart, 65, 27.5);  // 130 * 0.5, 55 * 0.5

      // Mouse event handlers
      const onmouseover = (event: any, d: any) => {
        const [x, y] = d3.pointer(event);
        if (mapper_country.get(d.id)) {
          tooltip.select('text#field1')
            .text(`Country: ${mapper_country.get(d.id)}`);
        } else {
          tooltip.select('text#field1')
            .text(`ISO3: ${d.id}`);
        }
        
        tooltip.select('text#field2')
          .text(`Outages: ${mapper_count.get(d.id) || 'No Data'}`);
        tooltip.select('text#field3')
          .text(`Log Outages: ${mapper_log.get(d.id)?.toFixed(2) || 'No Data'}`);
        
        tooltip
          .raise()
          .attr('transform', `translate(${x},${y-20})`)  // 40 * 0.5
          .style('visibility','visible');
      };

      const onmousemove = (event: any, d: any) => {
        const [x, y] = d3.pointer(event);
        tooltip.attr('transform', `translate(${x},${y-20})`);
      };

      const onmouseleave = (event: any, d: any) => {
        tooltip.style('visibility','hidden');
      };

      // Draw map
      chart.append("g")
        .selectAll("path")
        .data(worldData.features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection) as any)
        .attr("fill", (d: any) => {
          let p = mapper_log.get(d.id);
          return p ? c_scale(p) : "#fff";
        })
        .style("stroke", "#000")
        .style("stroke-width", "0.5")
        .on('mouseover', onmouseover)
        .on('mousemove', onmousemove)
        .on('mouseleave', onmouseleave);

      setIsLoading(false);
    }).catch(error => {
      console.error('Error loading data:', error);
      setIsLoading(false);
    });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading map...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};

function createTooltip(parent: any, width: number, height: number) {
  const tooltip = parent.append("g")
    .style("pointer-events", "none")
    .style("visibility", "hidden");

  tooltip.append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr("fill", "black")
    .attr("rx", 3)  // 6 * 0.5
    .attr("ry", 3)
    .attr("opacity", 0.8);

  tooltip.append("text")
    .attr('id','field1')
    .attr("fill", "white")
    .attr("font-size", 6)  // 12 * 0.5
    .attr("x", 2.5)  // 5 * 0.5
    .attr("y", 7.5)  // 15 * 0.5
    .text('Temp Text');
  
  tooltip.append("text")
    .attr('id','field2')
    .attr("fill", "white")
    .attr("font-size", 6)
    .attr("x", 2.5)
    .attr("y", 15)  // 30 * 0.5
    .text('Temp Text');

  tooltip.append("text")
    .attr('id','field3')
    .attr("fill", "white")
    .attr("font-size", 6)
    .attr("x", 2.5)
    .attr("y", 22.5)  // 45 * 0.5
    .text('Temp Text');

  return tooltip;
}
