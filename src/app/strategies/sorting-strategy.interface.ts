export interface ISortingStrategy {
  sort: (_: number[]) => number[];
}

export enum SortingStrategy {
  QuickSort,
  BubbleSort,
}
