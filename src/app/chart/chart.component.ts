import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import {DataPoint} from '../models/dataPoint';

type PlotType = (SVGSVGElement & Plot.Plot) | (HTMLElement & Plot.Plot);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() name: string = 'Unnamed';
  @Input() data: DataPoint[] = [];

  @ViewChild('chartychart') chartElement?: ElementRef;

  private plot?: PlotType;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.plot = this.createPlot();
    this.renderer.appendChild(this.chartElement?.nativeElement, this.plot);
  }

  private createPlot(): PlotType {
    const dateFormatter = d3.timeFormat('%Y-%m-%d');

    const plot: PlotType = Plot.plot({
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
        Plot.lineY(this.data, {x: 'date', y: 'value'}),
        Plot.ruleX(this.data, Plot.pointerX({x: 'date', py: 'value', stroke: 'red'})),
        Plot.dot(this.data, Plot.pointerX({x: 'date', y: 'value', stroke: 'red'})),
        Plot.text(this.data, Plot.pointerX({
          px: 'date',
          py: 'value',
          dy: -17,
          frameAnchor: 'top-left',
          fontVariant: 'tabular-nums',
          text: (d: DataPoint) => [`Date ${Plot.formatIsoDate(d.date)}`, `Value ${d.value.toFixed(2)}`].join('   ')
        })),
        Plot.crosshair(this.data, {x: 'date', y: 'value'})
      ],
      color: {
        legend: true
      }
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

    return plot;
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

    const newPlot = this.createPlot();
    this.renderer.removeChild(this.chartElement?.nativeElement, this.plot);
    this.renderer.appendChild(this.chartElement?.nativeElement, newPlot);
    this.plot = newPlot;
  }
}
