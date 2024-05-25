import { Injectable } from '@angular/core';
import { ISortingStrategy } from './sorting-strategy.interface';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortService implements ISortingStrategy {
  sort(arr: number[]): number[] {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    return arr;
  }
}
