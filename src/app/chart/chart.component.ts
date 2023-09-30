import {AfterViewInit, Component, Input} from '@angular/core';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() name: string = 'Unnamed';
  @Input() data: any; // lazy, lazy, lazy

  thePlot?: (SVGSVGElement & Plot.Plot) | (HTMLElement & Plot.Plot);

  ngAfterViewInit() {
    this.drawPlot();
  }

  private drawPlot() {
    const dateFormatter = d3.timeFormat("%Y-%m-%d");

    const plot = Plot.plot({
      x: {
        ticks: 10,
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
        Plot.lineY(this.data, {x: "Date", y: "Close"}),
        Plot.ruleX(this.data, Plot.pointerX({x: "Date", py: "Close", stroke: "red"})),
        Plot.dot(this.data, Plot.pointerX({x: "Date", y: "Close", stroke: "red"})),
        Plot.text(this.data, Plot.pointerX({
          px: "Date",
          py: "Close",
          dy: -17,
          frameAnchor: "top-left",
          fontVariant: "tabular-nums",
          text: (d) => [`Date ${Plot.formatIsoDate(d.Date)}`, `Close ${d.Close.toFixed(2)}`].join("   ")
        })),
        Plot.crosshair(this.data, {x: "Date", y: "Close"})
      ]
    });

    d3.select(plot)
      .on('click', (d: PointerEvent, _) => {
        //https://stackoverflow.com/questions/33210447/how-to-plot-time-data-on-a-d3-js-line-graph
        const scale = d3.scaleTime()
          .domain([this.data[0].Date, this.data[this.data.length - 1].Date])
          .range([0, plot.clientWidth]);
        const date = scale.invert(d.offsetX);

        window.alert(`You clicked on ${date}%`);
      });

    const div = document.querySelector(`#${this.divName}`)!;

    if (div.children.length > 0) {
      div.children[0].remove();
    }

    div.append(plot);

    this.thePlot = plot;
  }

  get divName(): string {
    return `div_${this.name}`;
  }

  addData(): void {
    const numberOfPoints = 10;
    const latestDate = this.data[this.data.length - 1].Date;

    for (let i = 0; i < numberOfPoints; i++) {
      const newDate = new Date(new Date().setDate(new Date(latestDate).getDate() + i));

      this.data.push({
        Date: newDate,
        Close: 25 + Math.random() * 40
      });
    }

    // https://observablehq.com/@fil/plot-animate-a-bar-chart/2

    console.log(`Added data, length is now ${this.data.length}`);
    console.log(JSON.stringify(this.data));

    // this.thePlot.
    // d3.select(this.thePlot).
    this.drawPlot();
  }
}
