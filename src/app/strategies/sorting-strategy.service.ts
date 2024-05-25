import { Injectable, Injector, inject } from '@angular/core';
import { ISortingStrategy, SortingStrategy } from './sorting-strategy.interface';
import { QuicksortService } from './quicksort.service';
import { BubbleSortService } from './bubble-sort.service';

@Injectable({
  providedIn: 'root',
})
export class SortingStrategyService implements ISortingStrategy {
  private strategy!: ISortingStrategy;
  private readonly injector = inject(Injector);

  public hasChosenStrategy(): boolean {
    return !!this.strategy;
  }

  public setStrategy(strategy: SortingStrategy) {
    switch (strategy) {
      case SortingStrategy.QuickSort: {
        this.strategy = this.injector.get(QuicksortService);
        break;
      }
      case SortingStrategy.BubbleSort: {
        this.strategy = this.injector.get(BubbleSortService);
        break;
      }
    }
  }

  public sort(arr: number[]): number[] {
    return this.strategy.sort(arr);
  }
}
