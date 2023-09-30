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
    const line = Plot.lineY(this.data, {x: "Date", y: "Close",});

    const plot = Plot.plot({
      marks: [
        line
      ],
    });

    // Works, but hard to get to the data
    // plot.addEventListener('click', (e: Event) => {
    //   const pe = <PointerEvent>e;
    //   console.log(`click: ${pe.x}, ${pe.y}`);
    // });

    // Works also, same problem
    d3.select(plot)
      .on('click', (d: PointerEvent, _) =>
      {
        //https://stackoverflow.com/questions/33210447/how-to-plot-time-data-on-a-d3-js-line-graph
        const scale = d3.scaleTime()
          .domain([this.data[0].Date, this.data[this.data.length-1].Date])
          .range( [0, plot.clientWidth]);
        const date = scale.invert(d.offsetX);

        window.alert(`You clicked on ${date}%`);
      });

    const div = document.querySelector(`#${this.divName}`)!;

    div.append(plot);
  }

  get divName(): string {
    return `div_${this.name}`;
  }
}
