import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  constructor() {
        //ลองคำนวนเพื่อใช้สรุป
        let hii = [10, 30, 10];
        console.log(hii);
        console.log(Math.max.apply(null, hii));
        console.log(Math.min.apply(null, hii));
        // console.log(Math.sqrt(this.variance(hii)));
        let sum = hii.reduce((previous, current) => current += previous);
        let avg = (sum / hii.length).toFixed(2);
        console.log(avg);
        //
   }

  ngOnInit() {
  }

}
