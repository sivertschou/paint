export interface Painting {
  name: string;
  numColors: number;
  iterations: string[];
  renderContent: (colors: string[], outline: string, iterations: string[], index: number) => string;
}
