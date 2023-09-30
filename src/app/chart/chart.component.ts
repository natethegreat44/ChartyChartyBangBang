import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

import {DataPoint} from "../models/dataPoint";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() name: string = 'Unnamed';
  @Input() data: DataPoint[] = [];

  @ViewChild("chartychart") chartElement?: ElementRef;

  ngAfterViewInit() {
    this.drawPlot();
  }

  private drawPlot() {
    const dateFormatter = d3.timeFormat("%Y-%m-%d");

    const plot = Plot.plot({
      x: {
        ticks: 5,
        label: null,
        labelArrow: 'none',
        tickFormat: (x) => dateFormatter(x)
      },
      y: {
        grid: true,
        label: null,
        labelArrow: 'none'
      },
      marks: [
        Plot.lineY(this.data, {x: "date", y: "value"}),
        Plot.ruleX(this.data, Plot.pointerX({x: "date", py: "value", stroke: "red"})),
        Plot.dot(this.data, Plot.pointerX({x: "date", y: "value", stroke: "red"})),
        Plot.text(this.data, Plot.pointerX({
          px: "date",
          py: "value",
          dy: -17,
          frameAnchor: "top-left",
          fontVariant: "tabular-nums",
          text: (d: DataPoint) => [`Date ${Plot.formatIsoDate(d.date)}`, `Value ${d.value.toFixed(2)}`].join("   ")
        })),
        Plot.crosshair(this.data, {x: "date", y: "value"})
      ]
    });

    d3.select(plot)
      .on('click', (d: PointerEvent, _) => {
        //https://stackoverflow.com/questions/33210447/how-to-plot-time-data-on-a-d3-js-line-graph
        const scale = d3.scaleTime()
          .domain([this.data[0].date, this.data[this.data.length - 1].date])
          .range([0, plot.clientWidth]);
        const date = scale.invert(d.offsetX);

        window.alert(`You clicked on ${date}%`);
      });

    // TODO: This very most likely isn't correct:
    //  - janky to remove & add this way
    //  - probably needs to be using Renderer2
    if(this.chartElement?.nativeElement.children.length > 0) {
      this.chartElement?.nativeElement.children[0].remove();
    }
    this.chartElement?.nativeElement!.appendChild(plot);
  }

  addData(): void {
    const numberOfPoints = 10;
    const latestDate = this.data[this.data.length - 1].date;

    const year = latestDate.getFullYear();
    const month = latestDate.getMonth();
    const date = latestDate.getDate();

    for (let i = 0; i < numberOfPoints; i++) {
      const newDate = new Date(year, month, date + i);

      this.data.push({
        date: newDate,
        value: 25 + Math.random() * 40
      });
    }

    // console.log(`Added data, length is now ${this.data.length}`);
    // console.log(JSON.stringify(this.data));

    // https://observablehq.com/@fil/plot-animate-a-bar-chart/2
    this.drawPlot();
  }
}
