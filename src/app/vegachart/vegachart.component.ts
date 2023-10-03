import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import embed, {Mode, VisualizationSpec} from 'vega-embed';
import {random, range} from 'lodash';

export interface Point2D {
  x: number;
  y: number;
}

export interface VisOptions {
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  xType?: 'quantitative' | 'ordinal' | 'nominal';
  yType?: 'quantitative' | 'ordinal' | 'nominal';
  fontSize?: number;
  xAxisDomain?: [number, number];
  yAxisDomain?: [number, number];
  zoomToFit?: boolean;
}

@Component({
  selector: 'app-vegachart',
  templateUrl: './vegachart.component.html',
  styleUrls: ['./vegachart.component.css']
})
export class VegachartComponent implements AfterViewInit {
  @ViewChild('vegachart') graph?: ElementRef;

  async ngAfterViewInit() {
    const values: Point2D[][] = range(1202).map(x => [{x, y: x + random(50)}, {x, y: x + random(50)}]);
    const series: string[] = ['thing1', 'thing2'];

    await this.lineChart(this.graph?.nativeElement, {values, series});
  }

  private async lineChart(
    container: HTMLElement,
    data: { values: Point2D[][], series: string[] },
    opts: VisOptions = {},
  ): Promise<void> {
    const spec: VisualizationSpec = {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "description": "A basic line chart example.",
      "width": 500,
      "height": 200,
      "padding": 5,

      "signals": [
        {
          "name": "interpolate",
          "value": "linear",
          "bind": {
            "input": "select",
            "options": [
              "basis",
              "cardinal",
              "catmull-rom",
              "linear",
              "monotone",
              "natural",
              "step",
              "step-after",
              "step-before"
            ]
          }
        }
      ],

      "data": [
        {
          "name": "table",
          "values": [
            {"x": 0, "y": 28, "c": 0}, {"x": 0, "y": 20, "c": 1},
            {"x": 1, "y": 43, "c": 0}, {"x": 1, "y": 35, "c": 1},
            {"x": 2, "y": 81, "c": 0}, {"x": 2, "y": 10, "c": 1},
            {"x": 3, "y": 19, "c": 0}, {"x": 3, "y": 15, "c": 1},
            {"x": 4, "y": 52, "c": 0}, {"x": 4, "y": 48, "c": 1},
            {"x": 5, "y": 24, "c": 0}, {"x": 5, "y": 28, "c": 1},
            {"x": 6, "y": 87, "c": 0}, {"x": 6, "y": 66, "c": 1},
            {"x": 7, "y": 17, "c": 0}, {"x": 7, "y": 27, "c": 1},
            {"x": 8, "y": 68, "c": 0}, {"x": 8, "y": 16, "c": 1},
            {"x": 9, "y": 49, "c": 0}, {"x": 9, "y": 25, "c": 1}
          ]
        }
      ],

      "scales": [
        {
          "name": "x",
          "type": "point",
          "range": "width",
          "domain": {"data": "table", "field": "x"}
        },
        {
          "name": "y",
          "type": "linear",
          "range": "height",
          "nice": true,
          "zero": true,
          "domain": {"data": "table", "field": "y"}
        },
        {
          "name": "color",
          "type": "ordinal",
          "range": "category",
          "domain": {"data": "table", "field": "c"}
        }
      ],

      "axes": [
        {"orient": "bottom", "scale": "x"},
        {"orient": "left", "scale": "y"}
      ],

      "marks": [
        {
          "type": "group",
          "from": {
            "facet": {
              "name": "series",
              "data": "table",
              "groupby": "c"
            }
          },
          "marks": [
            {
              "type": "line",
              "from": {"data": "series"},
              "encode": {
                "enter": {
                  "x": {"scale": "x", "field": "x"},
                  "y": {"scale": "y", "field": "y"},
                  "stroke": {"scale": "color", "field": "c"},
                  "strokeWidth": {"value": 2}
                },
                "update": {
                  "interpolate": {"signal": "interpolate"},
                  "strokeOpacity": {"value": 1}
                },
                "hover": {
                  "strokeOpacity": {"value": 0.5}
                }
              }
            }
          ]
        }
      ]
    };


    const embedOpts = {
      actions: false,
      mode: 'vega-lite' as Mode,
      defaultStyle: false,
    };

    await embed(container, spec, embedOpts);
  }

}
