export enum SlideType {
  STORY = 'STORY',
  DATASET = 'DATASET',
  Q1_GEOGRAPHY = 'Q1_GEOGRAPHY',
  Q2_ACTORS = 'Q2_ACTORS',
  Q3_MOTIVES = 'Q3_MOTIVES',
  Q4_TACTICS = 'Q4_TACTICS',
  Q5_IMPACT = 'Q5_IMPACT',
  Q6_COMPARISON = 'Q6_COMPARISON',
  Q7_CLIMATE = 'Q7_CLIMATE',
  Q8_FUTURE = 'Q8_FUTURE',
  COMPREHENSIVE_DASHBOARD = 'COMPREHENSIVE_DASHBOARD',
  DASHBOARD = 'DASHBOARD',
  CONCLUSION = 'CONCLUSION',
}

export interface SlideData {
  id: SlideType;
  title?: string;
  subtitle?: string;
  navLabel: string;
  group?: 'QUESTIONS';
}

export interface CountryRanking {
  country: string;
  outages: number;
  region: string;
}

export interface CauseData {
  name: string;
  value: number;
  color: string;
}

export interface TrendData {
  year: string;
  frequency: number;
  duration: number; // in hours
}

export interface ScatterPoint {
  cause: string;
  duration: number; // x
  scope: number; // y (0-100% impact)
  z: number; // bubble size
}