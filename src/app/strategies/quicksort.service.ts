import { Injectable } from '@angular/core';
import { ISortingStrategy } from './sorting-strategy.interface';

@Injectable({
  providedIn: 'root',
})
export class QuicksortService implements ISortingStrategy {
  private partition(arr: number[], start: number, end: number): number {
    const pivot = arr[end];

    let i = start;
    for (let j = start; j < end; j++) {
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    [arr[i], arr[end]] = [arr[end], arr[i]];

    return i;
  }

  private quicksort(arr: number[], start: number, end: number): number[] {
    if (start < end) {
      const pivot = this.partition(arr, start, end);

      return [
        ...this.quicksort(arr, start, pivot - 1),
        pivot,
        ...this.quicksort(arr, pivot + 1, end),
      ];
    }

    return arr;
  }

  sort(arr: number[]): number[] {
    let start = 0;
    let end = arr.length;

    return this.quicksort(arr, start, end);
  }
}
