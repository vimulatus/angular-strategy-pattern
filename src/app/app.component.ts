import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { randNumber } from '@ngneat/falso';
import { SortingStrategyService } from './strategies/sorting-strategy.service';
import { SortingStrategy } from './strategies/sorting-strategy.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'strategy-pattern';

  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  protected arrSize = signal(randNumber({ min: 100, max: 500 }));

  private canvasOffset = signal(10); // in pixels

  private data = signal<number[]>([]);
  private min = 1000000;
  private max = 1;

  ngOnInit() {
    this.initArray();
    this.setStrategy(SortingStrategy.QuickSort);
    this.draw();
  }

  private initArray() {
    for (let i = 0; i < this.arrSize(); i++) {
      const x = randNumber({ min: 10, max: 100000 });
      if (x < this.min) {
        this.min = x;
      }
      if (x > this.max) {
        this.max = x;
      }
      this.data().push(x);
    }
  }

  private elementWidth = computed(() => {
    return (
      (this.canvas().nativeElement.width - this.canvasOffset() * 2) /
      this.arrSize()
    );
  });
  private maxElementHeight = computed(() => {
    return (this.canvas().nativeElement.height * 2) / 3;
  });

  private getCoords(num: number, idx: number) {
    const width = this.elementWidth();
    const height = (this.maxElementHeight() / this.max) * num;

    const x = width * idx + this.canvasOffset();
    const y = 0;

    return {
      width,
      height,
      x,
      y,
    };
  }

  private draw() {
    const canvasRef = this.canvas().nativeElement.getContext('2d');
    canvasRef?.clearRect(
      0,
      0,
      this.canvas().nativeElement.width,
      this.canvas().nativeElement.height,
    );
    canvasRef?.beginPath();
    this.data().forEach((num, idx) => {
      const coords = this.getCoords(num, idx);

      canvasRef?.roundRect(coords.x, coords.y, coords.width, coords.height);
    });
    canvasRef?.stroke();
    canvasRef?.closePath();
  }

  protected timeElapsed = signal(0);

  private sortingStrategy = inject(SortingStrategyService);

  setStrategy(strategy: SortingStrategy) {
    this.sortingStrategy.setStrategy(strategy);
  }

  protected sort() {
    const startTime = new Date().getTime();
    this.sortingStrategy.sort(this.data());
    const endTime = new Date().getTime();

    this.timeElapsed.set(endTime - startTime);
    this.draw();
  }
}
