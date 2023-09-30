import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChartyChartyBangBang';

  public data1 = Array.from({length: 10}, (n, i) => {
    return {
      Date: new Date().setDate(new Date().getDate()) - 1000*60*60*24*i,
      Close: Math.random() * 40
    }
  }).reverse();

  public data2 = Array.from({length: 10}, (n, i) => {
    return {
      Date: new Date().setDate(new Date().getDate()) - 1000*60*60*24*i,
      Close: Math.random() * 40
    }
  }).reverse();
}
