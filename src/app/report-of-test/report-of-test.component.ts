import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-of-test',
  templateUrl: './report-of-test.component.html',
  styleUrls: ['./report-of-test.component.css']
})
export class ReportOfTestComponent  {
// lineChart
//ข้อมูหลายชุด แต่ละชุดมีหลายค่า
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40]
    ,[58, 28, 40, 69, 16, 22, 60],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  //ใส่รหัสนักศึกษา
  public lineChartLabels:Array <any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';

 
  // Pie
  // public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  // public pieChartData:number[] = [300, 500, 100];


 //-------function สลับการแสดงผลรหว่างกราฟ
  public randomizeType():void {   
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';

  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  
  constructor() { }
  ngOnInit() {
  }
}