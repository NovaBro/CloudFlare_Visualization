import React, { useState, useEffect } from 'react';
import { SLIDES } from './constants';
import { SlideType } from './types';
import { SlideLayout } from './components/SlideLayout';
import { TopCountriesChart, TrendsChart, DurationScopeChart, CausesPieChart, FragilityChart } from './components/charts/Charts';
import { StatCard, InfoBox } from './components/ui/Cards';
import { NotebookEmbed } from './components/NotebookEmbed';
import { FragilityHeatmap } from './components/FragilityHeatmap';
import { MonthlyTrendsChart } from './components/MonthlyTrendsChart';
import { ComprehensiveDashboard } from './components/ComprehensiveDashboard';
import { 
  Globe, 
  Activity, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  ServerCrash, 
  Menu,
  ChevronRight,
  ChevronLeft,
  Database,
  ThermometerSun,
  Timer,
  Gavel,
  CloudOff,
  Unplug,
  MapPin,
  Network
} from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) setCurrentSlideIndex(p => p + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(p => p - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    if (window.innerWidth < 768) setIsSidebarOpen(false); // Close mobile sidebar on select
  };

  const currentSlideData = SLIDES[currentSlideIndex];

  // Render specific content based on slide ID
  const renderSlideContent = () => {
    switch (currentSlideData.id) {
      case SlideType.STORY:
        return (
          <div className="h-full flex flex-col gap-6 overflow-y-auto">
            {/* Intro Header */}
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 mb-4">
                When the World Goes Offline
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-5xl">
                Imagine waking up, reaching for ChatGPT to draft an email, only to realize it’s down. 
                These aren’t just tech glitches—they are shockwaves that ripple through our daily lives, disrupting commerce, communication, and critical services.
              </p>
            </div>

            {/* The 3 Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
              {/* Card 1: Cloudflare */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-blue-500 transition-colors">
                <div className="h-32 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-blue-900/10"></div>
                   <CloudOff className="w-16 h-16 text-blue-500 relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                   {/* Decorative elements */}
                   <div className="absolute top-3 right-3 flex gap-1">
                     <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                   </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2 text-lg">The Global Blackout</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A Cloudflare outage took down millions of apps and websites simultaneously, leaving people frustrated and businesses paralyzed globally.
                  </p>
                </div>
              </div>

              {/* Card 2: AWS */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-orange-500 transition-colors">
                <div className="h-32 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-orange-900/10"></div>
                   <ServerCrash className="w-16 h-16 text-orange-500 relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="p-5">
                   <h3 className="font-bold text-white mb-2 text-lg">The Human Error</h3>
                   <p className="text-sm text-slate-400 leading-relaxed">
                     An AWS outage, blamed on a simple misconfiguration by an intern, took down major services across the entire internet infrastructure.
                   </p>
                </div>
              </div>

              {/* Card 3: Red Sea */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden group hover:border-red-500 transition-colors">
                <div className="h-32 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-red-900/10"></div>
                   <Unplug className="w-16 h-16 text-red-500 relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                   <div className="absolute bottom-8 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                </div>
                <div className="p-5">
                   <h3 className="font-bold text-white mb-2 text-lg">Submarine Cable Cut</h3>
                   <p className="text-sm text-slate-400 leading-relaxed">
                     A submarine cable in the Red Sea was severed, physically cutting off entire nations from global connectivity instantly.
                   </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Mission */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col lg:flex-row gap-8 items-center mt-auto">
               <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-6 h-6 text-teal-400" />
                    Why CloudPulse Exists
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    We turn chaotic outage signals into clarity. By analyzing millions of events, we uncover patterns in global fragility to answer: 
                    <span className="text-white font-semibold"> Where does the internet fail? Why? And how can we fix it?</span>
                  </p>
               </div>
               <div className="hidden lg:block w-px h-24 bg-slate-700"></div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 min-w-[300px]">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600"><Globe className="w-5 h-5 text-blue-400"/></div>
                    <span className="text-xs text-slate-400 font-medium uppercase">Map Risk</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600"><Timer className="w-5 h-5 text-orange-400"/></div>
                    <span className="text-xs text-slate-400 font-medium uppercase">Measure Impact</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600"><ShieldCheck className="w-5 h-5 text-teal-400"/></div>
                    <span className="text-xs text-slate-400 font-medium uppercase">Build Resilience</span>
                  </div>
               </div>
            </div>
          </div>
        );

      case SlideType.DATASET:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Column: Context & Methods */}
            <div className="flex flex-col gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Database className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Source & Collection</h3>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  To uncover the hidden fragility of global connectivity, we relied on data from the <strong>Cloudflare Radar Outage Center</strong>, accessed through their public Radar API. We focused on the most recent year of available data, capturing <span className="text-white font-bold">179 outage events</span> that illustrate when, where, and why networks fail.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Using the API, we queried outage records with parameters that collected up to 500 events over the past 52 weeks, returning information in CSV format. Each record represents a real disruption in the digital world, detected by Cloudflare’s monitoring of network traffic, DNS resolution, and global reachability.
                </p>
                
                {/* Tech Viz / API Snippet */}
                <div className="mt-6 bg-slate-950 p-4 rounded-md font-mono text-xs text-emerald-400 border border-slate-800 shadow-inner">
                   <div className="flex justify-between items-center text-slate-500 mb-2 border-b border-slate-800 pb-2">
                     <span>GET /radar/annotations/outages</span>
                     <span className="text-emerald-500">200 OK</span>
                   </div>
                   <div>{"{"}</div>
                   <div className="pl-4">"limit": <span className="text-blue-400">500</span>,</div>
                   <div className="pl-4">"dateRange": <span className="text-blue-400">"52w"</span>,</div>
                   <div className="pl-4">"format": <span className="text-blue-400">"CSV"</span></div>
                   <div>{"}"}</div>
                </div>
              </div>

              {/* Conclusion / Impact statement */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 mt-auto">
                <p className="text-slate-300 italic text-sm leading-relaxed">
                  "Each of the 179 events is more than just a data point—they are snapshots of how digital life can suddenly pause, providing the foundation for the insights and visualizations we present in CloudPulse."
                </p>
              </div>
            </div>

            {/* Right Column: Attributes */}
            <div className="flex flex-col h-full">
               <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-teal-400" /> Data Dimensions
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2">
                    {/* Attribute Cards */}
                    {[
                      { icon: <MapPin className="w-5 h-5 text-red-400"/>, label: "Location", desc: "The country or region affected." },
                      { icon: <Network className="w-5 h-5 text-blue-400"/>, label: "ASN", desc: "The autonomous system impacted." },
                      { icon: <Globe className="w-5 h-5 text-purple-400"/>, label: "Type", desc: "Scale: national, regional, or local." },
                      { icon: <Activity className="w-5 h-5 text-orange-400"/>, label: "Scope", desc: "City, state, or network segment." },
                      { icon: <AlertTriangle className="w-5 h-5 text-yellow-400"/>, label: "Cause", desc: "Shutdowns, infrastructure, weather." },
                      { icon: <Timer className="w-5 h-5 text-teal-400"/>, label: "Duration", desc: "Time measures recovery speed." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
                        <div className="mt-1 shrink-0">{item.icon}</div>
                        <div>
                          <div className="font-bold text-white text-sm">{item.label}</div>
                          <div className="text-xs text-slate-400 mt-1 leading-snug">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-700">
                     <h4 className="text-sm font-bold text-white mb-3">Derived Metrics</h4>
                     <div className="flex gap-2 flex-wrap">
                        {['Frequency', 'Duration', 'Severity', 'Fragility Index'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-300 border border-slate-700 font-medium">
                            {tag}
                          </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );

      case SlideType.Q1_GEOGRAPHY:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-blue-900/20 to-slate-900/20 p-6 rounded-lg border border-blue-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 1: Where does the internet falter the most?
              </h2>
              <p className="text-slate-300 text-lg">
                World map visualization showing the spatial distribution of outages by country and frequency.
              </p>
            </div>
            
            {/* Full-width visualization */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Interactive World Map: Outage Hotspots</h3>
              <div className="flex-1 min-h-[500px]">
                <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="graph1" className="w-full h-full" />
              </div>
            </div>
          </div>
        );

      case SlideType.Q2_ACTORS:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-red-900/20 to-slate-900/20 p-6 rounded-lg border border-red-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 2: What types of outages dominate different regions?
              </h2>
              <p className="text-slate-300 text-lg">
                Stacked bar chart comparing the scope and magnitude of disruptions across national, regional, and network-level outages.
              </p>
            </div>

            {/* Full-width visualization */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Top Countries by Outage Count</h3>
              {/*
                Use a viewport-based height so the chart fills available space without forcing the
                document to grow larger than the viewport. The arbitrary Tailwind height class
                below uses calc to reserve space for the header and bottom descriptions.
                If you need a different fit, we can tweak the `18rem` value.
              */}
              <div className="flex-1 min-h-[300px] h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)]">
                <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="graph2" className="w-full h-full" />
              </div>
            </div>
          </div>
        );

      case SlideType.Q3_MOTIVES:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-orange-900/20 to-slate-900/20 p-6 rounded-lg border border-orange-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 3: When do outages occur most frequently? Are there temporal patterns?
              </h2>
              <p className="text-slate-300 text-lg">
                Interactive timeline showing monthly/weekly density of outages worldwide with seasonal and temporal patterns.
              </p>
            </div>

            {/* Full-width visualization */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Outage Trends Over Time</h3>
              <div className="flex-1 min-h-[300px] h-[calc(100vh-18rem)] max-h-[calc(100vh-18rem)]">
                <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="monthlyTimeline" className="w-full h-full" />
              </div>
            </div>
          </div>
        );

      case SlideType.Q4_TACTICS:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 p-6 rounded-lg border border-red-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 4: What kinds of breakdowns cripple the web?
              </h2>
              <p className="text-slate-300 text-lg">
                Donut and sunburst charts classifying outages by cause: political shutdowns, natural disasters, and infrastructural failures.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full flex-1">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col">
                <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <Gavel className="w-5 h-5" /> Causes Distribution
                </h3>
                <div className="flex-1 min-h-[400px]">
                  <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="donutChart" className="w-full h-full" />
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col">
                <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <Gavel className="w-5 h-5" /> Cause Hierarchy
                </h3>
                <div className="flex-1 min-h-[400px]">
                  <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="sunburstChart" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case SlideType.Q5_IMPACT:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-yellow-900/20 to-slate-900/20 p-6 rounded-lg border border-yellow-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 5: How long do outages typically last, and what does this reveal?
              </h2>
              <p className="text-slate-300 text-lg">
                Bar chart showing duration vs. cause, revealing how different types of breakdowns affect recovery times.
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Duration by Cause</h3>
              <div className="flex-1 min-h-[400px]">
                <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="durationBarChart" className="w-full h-full" />
              </div>
            </div>
          </div>
        );

      case SlideType.Q6_COMPARISON:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-blue-900/20 to-slate-900/20 p-6 rounded-lg border border-blue-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 6: Which networks or ASNs experience repeated failures?
              </h2>
              <p className="text-slate-300 text-lg">
                Bar chart of top failed networks showing which Autonomous Systems are most vulnerable to repeated disruptions.
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Network & ASN Failures</h3>
              <div className="flex-1 min-h-[400px]">
                <NotebookEmbed notebookId="c234e5b925ac43ec" cellName="networkBarChart" className="w-full h-full" />
              </div>
            </div>
          </div>
        );

      case SlideType.Q7_CLIMATE:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-emerald-900/20 to-slate-900/20 p-6 rounded-lg border border-emerald-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 7: Which regions show the highest resilience or fragility?
              </h2>
              <p className="text-slate-300 text-lg">
                Derived "fragility index" visualized as comparative charts ranking each country's vulnerability to outages.
              </p>
            </div>

            {/* Custom D3 Fragility Heatmap Component */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col h-full flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Regional Fragility Analysis - Multi-Metric Heat Map</h3>
              <FragilityHeatmap />
            </div>
          </div>
        );

      case SlideType.Q8_FUTURE:
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="bg-gradient-to-r from-purple-900/20 to-slate-900/20 p-6 rounded-lg border border-purple-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Question 8: Are outages becoming more or less frequent over time?
              </h2>
              <p className="text-slate-300 text-lg">
                Rolling trend line visualizing total outage count and average duration over months and years, revealing 2025 outlook.
              </p>
            </div>

            {/* Custom Monthly Trends Component */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">2020-2024 Outage Trends</h3>
              <div className="flex-1 min-h-[300px] overflow-hidden">
                <MonthlyTrendsChart />
              </div>
            </div>
          </div>
        );

      case SlideType.COMPREHENSIVE_DASHBOARD:
        return <ComprehensiveDashboard />;

      case SlideType.CONCLUSION:
        return (
          <div className="flex flex-col h-full gap-6 overflow-y-auto">
            
            {/* Main Summary */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-3">A Fragmented and Fragile Internet</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Our analysis of <span className="text-blue-400 font-bold">179 outages</span> shows that global internet failure is uneven, systemic, and often intentional. Instability is concentrated in a small set of regions—especially <span className="text-white font-semibold">Iraq, Iran, Pakistan, Libya, and Syria</span>—driven less by infrastructure weakness than by political intervention and conflict.
              </p>
            </div>

            {/* Two Columns: Political vs Technical */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Political */}
               <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="w-5 h-5 text-red-400" />
                    <h4 className="font-bold text-white">Political Control</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Nearly half of all outages are government-directed and nationwide, revealing the internet as a tool of control and information suppression, not just a technical system.
                  </p>
               </div>

               {/* Technical/Climate */}
               <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-amber-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold text-white">Infrastructure & Climate</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Weather and infrastructure failures are rarer but far more destructive, producing the longest outages. Mid-year spikes link to summer power loads and global weather activity.
                  </p>
               </div>
            </div>

            {/* Trend Note */}
            <div className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
               <TrendingUp className="w-8 h-8 text-emerald-400 shrink-0" />
               <p className="text-slate-300 text-sm">
                 <strong className="text-white">Resilience is improving:</strong> Despite rising frequency, outages are getting shorter and easier to recover from, indicating better redundancy and operational response.
               </p>
            </div>

            {/* Bottom Line */}
            <div className="mt-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-xl border border-blue-500/30">
               <h4 className="text-blue-300 font-bold uppercase text-xs tracking-widest mb-2">The Bottom Line</h4>
               <p className="text-white text-lg font-medium leading-relaxed italic">
                 "The global internet is not a uniform utility—it is an unequal, contested, and evolving system, shaped by politics, climate, and infrastructure. Improving stability will require policy reform, resilient design, and proactive risk management, not just faster networks."
               </p>
            </div>
          </div>
        );

      default:
        return <div>Slide content not found</div>;
    }
  };

  // Sidebar grouping logic
  let lastGroup: string | undefined = undefined;

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-slate-800 p-2 rounded-md border border-slate-700"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar Navigation */}
      <nav className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 fixed md:relative z-40 w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col shrink-0`}>
        <div className="p-6 border-b border-slate-800">
           <div className="flex items-center gap-2 font-bold text-xl tracking-wider text-white">
             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
             CloudPulse
           </div>
           <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Global Outage Intel</div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {SLIDES.map((slide, index) => {
              let header = null;
              // Render grouping header if group changes
              if (slide.group !== lastGroup) {
                 if (slide.group === 'QUESTIONS') {
                    header = (
                      <li key={`header-${index}`} className="px-6 mt-4 mb-2 flex items-center gap-2 text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider">Questions</span>
                        <div className="h-px flex-1 bg-slate-800"></div>
                      </li>
                    );
                 }
                 lastGroup = slide.group;
              }

              const isSubItem = slide.group === 'QUESTIONS';

              return (
                <React.Fragment key={slide.id}>
                  {header}
                  <li>
                    <button
                      onClick={() => goToSlide(index)}
                      className={`w-full text-left py-2 text-sm flex items-center justify-between group transition-colors 
                        ${currentSlideIndex === index 
                          ? 'text-blue-400 font-medium' 
                          : 'text-slate-400 hover:text-white'
                        } 
                        ${isSubItem ? 'pl-8 pr-6 border-l-2 border-transparent hover:border-slate-700 ml-6' : 'px-6'}
                        ${isSubItem && currentSlideIndex === index ? '!border-blue-500 bg-slate-800/30' : ''}
                      `}
                    >
                      <span className="truncate">{slide.navLabel}</span>
                      {currentSlideIndex === index && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
                    </button>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-600">
           Data Source: Cloudflare Radar<br/>
           Version 1.2.0
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        {/* Top Progress Bar */}
        <div className="h-1 bg-slate-800 w-full">
           <div 
             className="h-full bg-blue-500 transition-all duration-500 ease-out"
             style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
           ></div>
        </div>

        {/* Slide View */}
        <div className="flex-1 overflow-hidden relative bg-slate-950">
           <SlideLayout data={currentSlideData}>
             {renderSlideContent()}
           </SlideLayout>
        </div>

        {/* Floating Navigation Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-30">
           <button 
             onClick={prevSlide}
             disabled={currentSlideIndex === 0}
             className="p-3 rounded-full bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           <button 
             onClick={nextSlide}
             disabled={currentSlideIndex === SLIDES.length - 1}
             className="p-3 rounded-full bg-blue-600 border border-blue-500 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/50 transition-all"
           >
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>
      </main>
    </div>
  );
};

export default App;