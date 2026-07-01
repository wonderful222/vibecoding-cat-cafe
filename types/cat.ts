export interface CatProfile {
  id: string;
  name: string;
  age: string;
  gender: string;
  image: string;
  heroImage: string;
  tags: string[];
  energy: "安静" | "适中" | "活泼";
  interaction: "慢热" | "亲近" | "主动";
  status: string;
  matchReason: string;
  bestFor: string;
  gentleTip: string;
  detail: string;
}
