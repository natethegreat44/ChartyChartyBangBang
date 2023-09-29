import {AfterViewInit, Component, Input} from '@angular/core';
import * as Plot from '@observablehq/plot';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() name: string = 'Unnamed';
  @Input() data: any; // lazy, lazy, lazy

  ngAfterViewInit() {
    const plot = Plot.plot({
      marks: [
        Plot.lineY(this.data, {x: "Date", y: "Close"})
      ]
    })

    const div = document.querySelector(`#${this.divName}`)!;

    div.append(plot);
  }

  get divName(): string {
    return `div_${this.name}`;
  }
}
