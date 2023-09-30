import {Component} from '@angular/core';
import {DataPoint} from "./models/dataPoint";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChartyChartyBangBang';

  numberOfPoints = 10;

  public data1: DataPoint[] = Array.from({length: this.numberOfPoints}, (n, i) => {
    return {
      date: new Date(2023, 0, i),
      value: 25 + Math.random() * 40
    }
  });

  public data2: DataPoint[] = Array.from({length: this.numberOfPoints}, (n, i) => {
    return {
      date: new Date(2023, 0, i),
      value: 12 + Math.random() * 20
    }
  });
}

