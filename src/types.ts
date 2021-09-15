export interface Painting {
  numColors: number;
  iterations: string[];
  renderContent: (colors: string[], outline: string, iterations: string[], index: number) => string;
}
