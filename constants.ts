import { SlideType, SlideData, CountryRanking, CauseData, TrendData, ScatterPoint } from './types';

export const SLIDES: SlideData[] = [
  { id: SlideType.STORY, title: "The Story", subtitle: "When the World Goes Offline", navLabel: "The Story" },
  { id: SlideType.DATASET, title: "The Dataset", subtitle: "Cloudflare Radar Outage Center (CROC)", navLabel: "The Dataset" },
  { id: SlideType.Q1_GEOGRAPHY, navLabel: "Question 1", group: 'QUESTIONS' },
  { id: SlideType.Q2_ACTORS, navLabel: "Question 2", group: 'QUESTIONS' },
  { id: SlideType.Q3_MOTIVES, navLabel: "Question 3", group: 'QUESTIONS' },
  { id: SlideType.Q4_TACTICS, navLabel: "Question 4", group: 'QUESTIONS' },
  { id: SlideType.Q5_IMPACT, navLabel: "Question 5", group: 'QUESTIONS' },
  { id: SlideType.Q6_COMPARISON, navLabel: "Question 6", group: 'QUESTIONS' },
  { id: SlideType.Q7_CLIMATE, navLabel: "Question 7", group: 'QUESTIONS' },
  { id: SlideType.Q8_FUTURE, navLabel: "Question 8", group: 'QUESTIONS' },
  { id: SlideType.COMPREHENSIVE_DASHBOARD, title: "Complete Analysis Dashboard", subtitle: "All 8 Visualizations Side by Side", navLabel: "Complete Dashboard" },
  { id: SlideType.CONCLUSION, title: "Conclusion", subtitle: "From Outage Logs to Actionable Insight", navLabel: "Conclusion" },
];

export const TOP_COUNTRIES: CountryRanking[] = [
  { country: 'Iraq', outages: 145, region: 'Middle East' },
  { country: 'Iran', outages: 112, region: 'Middle East' },
  { country: 'Pakistan', outages: 98, region: 'South Asia' },
  { country: 'Libya', outages: 76, region: 'Africa' },
  { country: 'Syria', outages: 65, region: 'Middle East' },
  { country: 'Yemen', outages: 45, region: 'Middle East' },
  { country: 'Sudan', outages: 42, region: 'Africa' },
];

export const CAUSE_DISTRIBUTION: CauseData[] = [
  { name: 'Political Control', value: 45, color: '#ef4444' }, // Red
  { name: 'Power Failure', value: 30, color: '#f59e0b' }, // Amber
  { name: 'Cable Cuts/Tech', value: 15, color: '#3b82f6' }, // Blue
  { name: 'Weather/Climate', value: 10, color: '#10b981' }, // Emerald
];

export const TREND_DATA: TrendData[] = [
  { year: '2020', frequency: 320, duration: 34 },
  { year: '2021', frequency: 380, duration: 32 },
  { year: '2022', frequency: 410, duration: 29 },
  { year: '2023', frequency: 450, duration: 28 },
  { year: '2024', frequency: 549, duration: 24 }, // +22% freq, -15% duration approx
];

export const OUTAGE_TYPE_SCATTER: ScatterPoint[] = [
  { cause: 'Govt Shutdown (Exam)', duration: 6, scope: 95, z: 20 },
  { cause: 'Govt Shutdown (Protest)', duration: 18, scope: 85, z: 40 },
  { cause: 'Submarine Cable Cut', duration: 72, scope: 30, z: 50 },
  { cause: 'Power Grid Failure', duration: 28, scope: 45, z: 60 },
  { cause: 'Weather (Cyclone)', duration: 48, scope: 25, z: 30 },
  { cause: 'DNS Misconfig', duration: 4, scope: 60, z: 25 },
];

export const FRAGILITY_SCORES = [
  { country: 'Mayotte', duration: 90, frequency: 30, diversity: 20, label: 'Duration Risk' },
  { country: 'Iraq', duration: 20, frequency: 95, diversity: 40, label: 'Freq. Risk' },
  { country: 'Syria', duration: 40, frequency: 60, diversity: 90, label: 'Cause Diversity' },
  { country: 'Chad', duration: 70, frequency: 50, diversity: 30, label: 'Infra Risk' },
  { country: 'Myanmar', duration: 24, frequency: 80, diversity: 50, label: 'Political Risk' },
];