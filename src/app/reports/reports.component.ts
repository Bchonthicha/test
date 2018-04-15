import { Component, OnInit } from '@angular/core';
import { StudentExam } from '../inteterfaces/studentExam';
import { Exam } from '../inteterfaces/exam';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from "primeng/accordion";
import { ExcelService } from '../services/excel.service';
import { Chapter } from '../inteterfaces/chapter';
import { Subject } from '../inteterfaces/subject';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  //
  isdataExam: boolean = false;

  chapterList: Observable<Chapter[]>;
  ExamList: Observable<Exam[]>;
  ExamListShow = [];
  SelectSubject = "";

  //รายละเอียดส่วนหัวของรายงาน
  amount: number;
  subject_name: string;
  chapter_name: string;
  description: string;
  type: any;
  date: any;
  exam_code: string;

  //การคำนวนค่าทางคณิตศาสตร์
  sum: any;
  avg: any;
  std: any;
  max: any;
  min: any;

  //สลับการแสดงผลระหว่างแบบ bar และแบบ line
  isbar: boolean = true;
  isline: boolean = false;

  // barChart
  data1: any;
  // lineChart
  data2: any;

  students: Observable<StudentExam[]>;
  studentExamCollection: AngularFirestoreCollection<StudentExam>;

  //array ที่ใช้เอาไปแสดงผล
  studentShow = [];
  scoreGraph = [];
  codeGraph = [];

  constructor(private afs: AngularFirestore, private excelService: ExcelService) {
    //สำหรับใช้ export excel
    this.excelService = excelService;
    //Exam
    const ExamRef: AngularFirestoreCollection<Exam> = this.afs.collection<Exam>(`/exam`);
    this.ExamList = ExamRef.valueChanges()

    this.ExamListShow = [];
    this.ExamList.subscribe(data => {
      console.log(data);
      data.forEach(d => {
        console.log(d.status);
        if (d.status == "finish") {
          console.log(d);
          this.ExamListShow.push(d);
        }
      })
      // console.log(data.status);

    })
  }

  ngOnInit() {
  }
  onChange(dataExam) {
    console.log("change");
    console.log(dataExam);
    this.isdataExam = true;
    this.studentShow = [];
    this.scoreGraph = [];
    this.codeGraph = [];
    //รายละเอียดส่วนหัวของรายงาน
    this.amount = dataExam.amount;
    this.subject_name = dataExam.subject_name;
    this.chapter_name = dataExam.chapter_name;
    this.description = dataExam.description;
    console.log(dataExam.type);
    switch (dataExam.type) {
      case 1: {
        //statements; 
        this.type = "คำตอบสั้น";
        break;
      }
      case 2: {
        //statements; 
        this.type = "คำถามแบบ 2 ตัวเลือก ";
        break;
      }
      case 3: {
        //statements; 
        this.type = "คำตอบสั้น 3 ตัวเลือก";
        break;
      }
      case 4: {
        //statements; 
        this.type = "คำตอบสั้น 4 ตัวเลือก";
        break;
      }
    }

    this.date = dataExam.date;
    this.exam_code = dataExam.exam_code;

    //---student in exam
    this.studentExamCollection = this.afs.collection<StudentExam>(`/exam/${this.exam_code}/students`, ref => ref.orderBy('score'))
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
        //test show sort score
        this.studentShow.sort(function (obj1, obj2) {
          // มากไปน้อย
          return obj2.score - obj1.score
        });
        console.log(this.scoreGraph);
        console.log("คำนวณ");
        //คำนวน MAX, MIN
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
        //bar
        this.data1 = {
          labels: this.codeGraph,
          datasets: [
            {
              label: 'Test scores bar',
              backgroundColor: '#86c5f9',
              borderColor: '#3da2f5',
              data: this.scoreGraph
            },
          ]
        }
        //line
        this.data2 = {
          labels: this.codeGraph,
          datasets: [
            {
              label: 'Test scores line',
              backgroundColor: '#ffcce6',
              borderColor: '#ff80bf',
              data: this.scoreGraph
            },
          ]
        }
      })
    })
  }

  //-------function หาค่า SD
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

  barBtn() {
    this.isbar = true;
    this.isline = false;
  }
  lineBtn() {
    this.isline = true;
    this.isbar = false;
  }

  //-------function export เป็น excel file
  exportToExcel(event) {
    this.excelService.exportAsExcelFile(this.studentShow, this.exam_code);
  }
}
