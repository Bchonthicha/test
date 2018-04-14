import { Component, OnInit } from '@angular/core';
import { StudentExam } from '../inteterfaces/studentExam';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from "primeng/accordion";
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  sum: any;
  avg: any;
  std: any;
  max: any;
  min: any;

  isbar:boolean=true;
  isline:boolean=false;

  data: any;
  testID: any;
  students: Observable<StudentExam[]>;
  studentExamCollection: AngularFirestoreCollection<StudentExam>;
  studentShow = [];
  scoreGraph = [];
  codeGraph = [];
  // lineChart
  //ข้อมูลชุดเดียว แต่ละชุดมีหลายค่า
  public lineChartData: Array<any>;
  //ใส่รหัสนักศึกษา
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels: Array<any>;
  public lineChartType: string = 'line';

  constructor(private afs: AngularFirestore,private excelService: ExcelService ) {
    this.excelService = excelService;

    this.testID = "205100_0_18658896000";
    //---student in exam
    this.studentExamCollection = this.afs.collection<StudentExam>(`/exam/${this.testID}/students`, ref => ref.orderBy('score'))
    this.students = this.studentExamCollection.valueChanges()

    this.students.subscribe(stu => {
      console.log(stu);
      stu.forEach((data, index) => {
        console.log(data);
        this.studentShow.push(data)

        console.log(data.score);
        this.sum = 0;
        this.scoreGraph.push(data.score);
        this.codeGraph.push(data.code);
        //test show sort indax
        this.studentShow.sort(function (obj1, obj2) {
          // Ascending: first age less than the previous
          return obj2.score - obj1.score
        });
        console.log(this.scoreGraph);
        console.log("คำนวณ");
        //ลองคำนวนเพื่อใช้สรุป
        console.log(this.scoreGraph);
        this.max = Math.max.apply(null, this.scoreGraph);
        console.log("Max = " + this.max);
        this.min = Math.min.apply(null, this.scoreGraph);
        console.log("Min = " + this.min);
        // console.log(Math.sqrt(this.variance(hii)));

        this.sum = this.scoreGraph.reduce((previous, current) => current += previous);
        console.log("sum" + this.sum);

        this.avg = (this.sum / this.scoreGraph.length).toFixed(2);
        console.log("AVG = " + this.avg);
        this.std = this.standardDeviation().toFixed(2)
        console.log("STD = " + this.std);

        console.log(index, this.std.length - 1);
        this.data = {
          labels: this.codeGraph,
          datasets: [
            {
              label: 'Test scores',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.scoreGraph
            },
          ]
        }
      })
    })
  }

  standardDeviation() {
    var avg = this.avg;

    var squareDiffs = this.scoreGraph.map(function (value) {
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });

    var avgSquareDiff = this.average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  }
  average(data) {
    var sum = data.reduce(function (sum, value) {
      return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
  }


  //-------function สลับการแสดงผลรหว่างกราฟ

  barBtn(){
    this.isbar=true;
    this.isline=false;
  }
  lineBtn(){
    this.isline=true;
    this.isbar=false;
  }
  exportToExcel(event) {
    this.excelService.exportAsExcelFile(this.studentShow, this.testID);
  }
  ngOnInit() {
  }

}
