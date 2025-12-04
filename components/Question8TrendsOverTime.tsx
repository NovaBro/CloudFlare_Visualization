import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Question8TrendsOverTime: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions - 50% scale (NO controls, NO stats/legend boxes)
    const width = 475;  // 950 * 0.5
    const chartHeight = 250;  // 500 * 0.5
    const margin = {top: 40, right: 60, bottom: 20, left: 45};  // 50% of original

    // Load data
    d3.csv('/files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv')
      .then((csvData: any[]) => {
        
        // Process data by month
        const processedData = csvData.map(d => ({
          start_date: new Date(d.start_date),
          duration_hours: parseFloat(d.duration) || 0,
        })).filter(d => !isNaN(d.duration_hours) && d.duration_hours >= 0);

        // Group by year-month
        const grouped = d3.rollup(
          processedData,
          v => ({
            monthly_outages: v.length,
            avg_duration: d3.mean(v, d => d.duration_hours) || 0,
            total_duration: d3.sum(v, d => d.duration_hours)
          }),
          d => {
            const date = d.start_date;
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          }
        );

        const monthly_trends = Array.from(grouped, ([year_month, metrics]) => ({
          year_month,
          ...metrics
        })).sort((a, b) => a.year_month.localeCompare(b.year_month));

        // Create SVG
        const svg = d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", chartHeight);

        // Background
        svg.append("rect")
          .attr("width", width)
          .attr("height", chartHeight)
          .attr("fill", "#ffffff");

        // Scales
        const xScale = d3.scalePoint()
          .domain(monthly_trends.map(d => d.year_month))
          .range([margin.left, width - margin.right])
          .padding(0.5);

        const yScaleFrequency = d3.scaleLinear()
          .domain([0, d3.max(monthly_trends, d => d.monthly_outages)! * 1.2])
          .range([chartHeight - margin.bottom, margin.top]);

        const yScaleDuration = d3.scaleLinear()
          .domain([0, d3.max(monthly_trends, d => d.avg_duration)! * 1.2])
          .range([chartHeight - margin.bottom, margin.top]);

        // Calculate linear regression for trend
        const n = monthly_trends.length;
        const indices = monthly_trends.map((_, i) => i);
        const frequencies = monthly_trends.map(d => d.monthly_outages);

        const sumX = d3.sum(indices);
        const sumY = d3.sum(frequencies);
        const sumXY = d3.sum(indices.map((x, i) => x * frequencies[i]));
        const sumX2 = d3.sum(indices.map(x => x * x));

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        const trendData = monthly_trends.map((d, i) => ({
          year_month: d.year_month,
          trend_value: Math.max(0, slope * i + intercept)
        }));

        const trendDirection = slope > 0.05 ? "Increasing" : slope < -0.05 ? "Decreasing" : "Stable";
        const trendColor = slope > 0.05 ? "#ef4444" : slope < -0.05 ? "#10b981" : "#f59e0b";

        // Grid lines
        svg.append("g")
          .attr("class", "grid")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(yScaleFrequency)
            .tickSize(-(width - margin.left - margin.right))
            .tickFormat(() => ''))
          .call(g => g.selectAll(".tick line")
            .attr("stroke", "#f1f5f9")
            .attr("stroke-dasharray", "3,3")
            .attr("stroke-width", 0.5))
          .call(g => g.select(".domain").remove());

        // X-axis
        const xAxis = svg.append("g")
          .attr("transform", `translate(0,${chartHeight - margin.bottom})`)
          .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter((d, i) => i % Math.ceil(monthly_trends.length / 10) === 0)))
          .call(g => g.selectAll("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.5em")
            .style("font-size", "6px")  // 12 * 0.5
            .style("fill", "#64748b")
            .style("font-weight", "500"));

        xAxis.call(g => g.select(".domain")
          .attr("stroke", "#cbd5e1")
          .attr("stroke-width", 0.75));  // 1.5 * 0.5

        // Y-axis (Frequency - Left)
        svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(yScaleFrequency).ticks(5))
          .call(g => g.select(".domain").attr("stroke", "#3b82f6").attr("stroke-width", 1))
          .call(g => g.selectAll(".tick text")
            .attr("fill", "#3b82f6")
            .attr("font-weight", "600")
            .attr("font-size", "6px"));  // 12 * 0.5

        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -(chartHeight - margin.bottom + margin.top) / 2)
          .attr("y", 12.5)  // 25 * 0.5
          .attr("text-anchor", "middle")
          .attr("fill", "#3b82f6")
          .attr("font-weight", "700")
          .attr("font-size", "7px")  // 14 * 0.5
          .text("Monthly Outage Count");

        // Y-axis (Duration - Right)
        svg.append("g")
          .attr("transform", `translate(${width - margin.right},0)`)
          .call(d3.axisRight(yScaleDuration).ticks(5))
          .call(g => g.select(".domain").attr("stroke", "#a855f7").attr("stroke-width", 1))
          .call(g => g.selectAll(".tick text")
            .attr("fill", "#a855f7")
            .attr("font-weight", "600")
            .attr("font-size", "6px"));

        svg.append("text")
          .attr("transform", "rotate(90)")
          .attr("x", (chartHeight - margin.bottom + margin.top) / 2)
          .attr("y", -width + 12.5)
          .attr("text-anchor", "middle")
          .attr("fill", "#a855f7")
          .attr("font-weight", "700")
          .attr("font-size", "7px")
          .text("Avg Duration (hours)");

        // Area under frequency curve
        const areaFrequency = d3.area<any>()
          .x(d => xScale(d.year_month)!)
          .y0(chartHeight - margin.bottom)
          .y1(d => yScaleFrequency(d.monthly_outages))
          .curve(d3.curveMonotoneX);

        svg.append("path")
          .datum(monthly_trends)
          .attr("fill", "rgba(59, 130, 246, 0.08)")
          .attr("d", areaFrequency);

        // Frequency line
        const lineFrequency = d3.line<any>()
          .x(d => xScale(d.year_month)!)
          .y(d => yScaleFrequency(d.monthly_outages))
          .curve(d3.curveMonotoneX);

        svg.append("path")
          .datum(monthly_trends)
          .attr("fill", "none")
          .attr("stroke", "#3b82f6")
          .attr("stroke-width", 1.75)  // 3.5 * 0.5
          .attr("d", lineFrequency)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round");

        // Frequency points
        svg.selectAll(".freq-point")
          .data(monthly_trends)
          .join("circle")
          .attr("class", "freq-point")
          .attr("cx", d => xScale(d.year_month)!)
          .attr("cy", d => yScaleFrequency(d.monthly_outages))
          .attr("r", 2.5)  // 5 * 0.5
          .attr("fill", "#3b82f6")
          .attr("stroke", "white")
          .attr("stroke-width", 1.25);  // 2.5 * 0.5

        // Duration line
        const lineDuration = d3.line<any>()
          .x(d => xScale(d.year_month)!)
          .y(d => yScaleDuration(d.avg_duration))
          .curve(d3.curveMonotoneX);

        svg.append("path")
          .datum(monthly_trends)
          .attr("fill", "none")
          .attr("stroke", "#a855f7")
          .attr("stroke-width", 1.4)  // 2.8 * 0.5
          .attr("stroke-dasharray", "3.5,2")  // 7,4 * 0.5
          .attr("d", lineDuration)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round");

        // Duration points
        svg.selectAll(".dur-point")
          .data(monthly_trends)
          .join("circle")
          .attr("class", "dur-point")
          .attr("cx", d => xScale(d.year_month)!)
          .attr("cy", d => yScaleDuration(d.avg_duration))
          .attr("r", 2)  // 4 * 0.5
          .attr("fill", "#a855f7")
          .attr("stroke", "white")
          .attr("stroke-width", 1);  // 2 * 0.5

        // Trend line
        const lineTrend = d3.line<any>()
          .x(d => xScale(d.year_month)!)
          .y(d => yScaleFrequency(d.trend_value));

        svg.append("path")
          .datum(trendData)
          .attr("fill", "none")
          .attr("stroke", trendColor)
          .attr("stroke-width", 1.75)  // 3.5 * 0.5
          .attr("stroke-dasharray", "4.5,2.5")  // 9,5 * 0.5
          .attr("d", lineTrend)
          .style("opacity", 0.85)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round");

        // Title
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", 16)  // 32 * 0.5
          .attr("text-anchor", "middle")
          .attr("font-size", "13px")  // 26 * 0.5
          .attr("font-weight", "800")
          .attr("fill", "#0f172a")
          .text("Internet Outage Trends");

        // Subtitle with trend direction
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", 31)  // 62 * 0.5
          .attr("text-anchor", "middle")
          .attr("font-size", "7.5px")  // 15 * 0.5
          .attr("fill", trendColor)
          .attr("font-weight", "700")
          .text(`Trend: ${trendDirection} | Slope: ${slope.toFixed(4)} outages/month`);

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setIsLoading(false);
      });

  }, []);

  return (
    <div>
      {isLoading && <div style={{fontSize: '12px', padding: '10px'}}>Loading trends...</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};
