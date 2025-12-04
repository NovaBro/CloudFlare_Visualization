# CloudPulse Dashboard Implementation

## Instructions to Run Locally

**Prerequisites:**  Node.js


1. Remove existing dependencies (node_modules folder) - only the first time
   `rm -rf node_modules/`
2. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`
4. Navigate to: 
   http://localhost:3001/ (or the links displayed on your terminal)


## Objective

A **comprehensive dashboard** that displays all 8 research questions from the final Observable notebook, with each visualization rendered directly from the Observable code.

## What Was Built

### 1. **ComprehensiveDashboard Component**
Location: `components/ComprehensiveDashboard.tsx`

A full-featured dashboard that displays:
- **Question 1**: Geographic Distribution (World Map) - `graph1`
- **Question 2**: Outage Types & Scope (Stacked Bar Chart) - `graph2`
- **Question 3**: Temporal Patterns (Monthly Timeline) - `monthlyTimeline`
- **Question 4**: Root Causes (Donut + Sunburst Charts) - `donutChart` + `sunburstChart`
- **Question 5**: Duration Analysis (Bar Chart) - `durationBarChart`
- **Question 6**: Network Failures (ASN Chart) - `networkBarChart`
- **Question 7**: Fragility Index (Heatmap) - `cell-77`
- **Question 8**: Temporal Trends (Interactive) - `cell-82`

### 2. **Key Features**
#### Embedded Observable Visualizations
All visualizations are embedded directly using the `NotebookEmbed` component:
```tsx
<NotebookEmbed 
  notebookId="c234e5b925ac43ec" 
  cellName="graph1" 
  className="w-full h-[500px]" 
/>
```

#### Summary Statistics
- Total Events: **179 outages**
- Government-Directed: **47.2%**
- Avg Technical Duration: **28 hours**
- Frequency Trend: **+22%**

## File Structure

```
ROOT_FOLDER/
├── components/
│   ├── ComprehensiveDashboard.tsx  ← NEW: Main dashboard component
│   ├── NotebookEmbed.tsx           ← Embeds Observable cells
│   ├── FragilityHeatmap.tsx        ← Custom D3 heatmap
│   ├── MonthlyTrendsChart.tsx      ← Custom trends chart
│   └── ...
├── App.tsx                         ← Updated with new slide
├── constants.ts                    ← Updated with dashboard slide
├── types.ts                        ← Updated with COMPREHENSIVE_DASHBOARD type
└── README.md     
```

## Design Principles

### Color Coding
- **Blue** (#3b82f6): Geography & Network
- **Red** (#ef4444): Outage Types & Political
- **Orange** (#f59e0b): Temporal Patterns
- **Purple** (#a855f7): Root Causes
- **Yellow** (#fbbf24): Duration
- **Cyan** (#06b6d4): Networks/ASN
- **Emerald** (#10b981): Fragility Index
- **Indigo** (#6366f1): Future Trends

## Technical Implementation

### Observable Integration
Each visualization cell from the Observable notebook is referenced by its exact cell name:
- `graph1` - World map (Question 1)
- `graph2` - Stacked bar chart (Question 2)
- `monthlyTimeline` - Seasonal timeline (Question 3)
- `donutChart` - Cause distribution (Question 4a)
- `sunburstChart` - Hierarchical view (Question 4b)
- `durationBarChart` - Duration analysis (Question 5)
- `networkBarChart` - ASN failures (Question 6)
- `cell-77` - Fragility heatmap (Question 7)
- `cell-82` - Temporal trends (Question 8)

## Navigation Structure

The application includes:
1. The Story
2. The Dataset
3. **Questions 1-8** (Individual slides)
4. **Complete Dashboard** Shows all 8 together
5. Summary Dashboard (Executive view)
6. Conclusion

## Key Insights Displayed

### Question 1 (Geography)
> Iraq, Iran, Pakistan show highest outage concentrations. Middle East dominates global disruptions.

### Question 2 (Types)
> Iraq experiences nationwide and regional outages. Democratic nations show only network-level disruptions.

### Question 3 (Temporal)
> May-June shows peak outages. Political events and power strain can possibly contribute to mid-year spikes.

### Question 4 (Causes)
> 47.2% government-directed. Power outages 15.9%. Political control dominates technical failures.

### Question 5 (Duration)
> Weather outages last 916h avg. Technical: 28h. Political: 6.5h. Infrastructure decay outlasts politics.

### Question 6 (Networks)
> ASEarthlink-DMCC-IQ (Iraq) leads with 21 failures. Iraqi and Syrian networks dominate high-risk category.

### Question 7 (Fragility)
> Mayotte & Iraq most fragile. Fragility = Frequency + Impact + Diversity. Multiple failure modes increase unpredictability.

### Question 8 (Trends)
> Frequency increasing (+22%). Duration decreasing (-15%). Better automation but rising climate & cyber stress.

## Educational Value

This dashboard serves as a comprehensive view of:
- **Spatial Analysis**: Where outages occur
- **Temporal Analysis**: When they happen
- **Causal Analysis**: Why they occur
- **Impact Analysis**: How severe they are
- **Network Analysis**: Which systems fail
- **Predictive Analysis**: Future trends

## Future Enhancements

Potential improvements:
1. **Filter Controls**: Add date range, region, or cause filters
2. **Export Functionality**: Download insights as PDF/CSV
3. **Interactive Linking**: Click on one visualization to filter others
4. **Real-Time Data**: Connect to live Cloudflare API
5. **Comparison Mode**: Side-by-side time period comparison

## Notes

- The Observable embeds use iframes, so they maintain full interactivity
- Each embedded cell is loaded from: `https://observablehq.com/embed/c234e5b925ac43ec?cells={cellName}`
- The dashboard is fully accessible via keyboard navigation (arrow keys)
- All visualizations are responsive and adapt to container size

---