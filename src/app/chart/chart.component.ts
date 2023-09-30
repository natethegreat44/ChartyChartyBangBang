import {AfterViewInit, Component, Input} from '@angular/core';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import {concatWith} from "rxjs";

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
        Plot.lineY(this.data, {x: "Date", y: "Close",})
      ],
    });

    // Works, but hard to get to the data
    // plot.addEventListener('click', (e: Event) => {
    //   const pe = <PointerEvent>e;
    //   console.log(`click: ${pe.x}, ${pe.y}`);
    // });

    // Works also, same problem
    d3.select(plot)
      .on('click', (d, i) =>
      {
        const scale = d3.scaleTime(this.data.map((d: any) => d.Date));
        const x = d.offsetX;
        const date = scale.invert(x);

        window.alert(`You clicked on ${date}`);
      });

    const div = document.querySelector(`#${this.divName}`)!;

    div.append(plot);
  }

  get divName(): string {
    return `div_${this.name}`;
  }
}
