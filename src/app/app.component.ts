import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChartyChartyBangBang';

  numberOfPoints = 100;

  public data1 = Array.from({length: this.numberOfPoints}, (n, i) => {
    return {
      Date: new Date().setDate(new Date().getDate() - i),
      Close: 25 + Math.random() * 40
    }
  }).reverse();

  public data2 = Array.from({length: this.numberOfPoints}, (n, i) => {
    return {
      Date: new Date().setDate(new Date().getDate() - i),
      Close: 12 + Math.random() * 20
    }
  }).reverse();
}
