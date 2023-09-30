import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChartyChartyBangBang';

  numberOfPoints = 10;

  public data1 = Array.from({length: this.numberOfPoints}, (n, i) => {
    return {
      Date: new Date(2023, 0, i),
      Close: 25 + Math.random() * 40
    }
  });

  public data2 = Array.from({length: this.numberOfPoints}, (n, i) => {
    return {
      Date: new Date(2023, 0, i),
      Close: 12 + Math.random() * 20
    }
  });
}
