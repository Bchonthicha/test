import { Component, OnInit } from '@angular/core';
import { StudentExam } from '../inteterfaces/studentExam';
import { Exam } from '../inteterfaces/exam';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from "primeng/accordion";
import { ExcelService } from '../services/excel.service';
import { FirebaseService } from '../services/firebase.service';
import { QuestionExam } from '../inteterfaces/questionExam';
import { Router } from '@angular/router';
import * as html2canvas from 'html2canvas';
import swal from 'sweetalert2'

declare let jsPDF;

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

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

  //รหัสแบบทดสอบนั้น
  testID: any;

  //ตัวแปรดึงค่ามาจาก database
  dataExam: any;
  ExamDoc: AngularFirestoreDocument<Exam>;
  students: Observable<StudentExam[]>;
  studentExamCollection: AngularFirestoreCollection<StudentExam>;

  //array ที่ใช้เอาไปแสดงผล
  studentShow = [];
  scoreGraph = [];
  codeGraph = [];

  //รายละเอียดส่วนหัวของรายงาน
  amount: number;
  subject_name: string;
  chapter_name: string;
  description: string;
  type: any;
  date: any;
  exam_code: string;

  //questions
  questions: Observable<QuestionExam[]>;
  questionExamCollection: AngularFirestoreCollection<QuestionExam>;

  //number of question doing
  doing: number;
  studentExportObj = [];
  options: any;

  constructor(private afs: AngularFirestore, private router: Router, private excelService: ExcelService, private firebaseService: FirebaseService) {
    this.options = {
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }
        ]
      }
    }

    //สำหรับใช้ export excel
    this.studentExportObj = [];
    this.doing = 0;
    this.excelService = excelService;
    this.testID = this.firebaseService.Test_id_new;
    //this.testID = "205100_0_18658896000";   //รหัสแบบทดสอบนั้น
    // this.testID="201100_0_1524996176902";
    //---data in exam
    this.ExamDoc = this.afs.doc<Exam>(`/exam/${this.testID}`)
    this.dataExam = this.ExamDoc.valueChanges()
    this.dataExam.take(1).subscribe(data => {
      //รายละเอียดส่วนหัวของรายงาน

      this.amount = data.amount;
      this.subject_name = data.subject_name;
      this.chapter_name = data.chapter_name;
      this.description = data.description;

      switch (data.type) {
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

      this.date = data.date;
      this.exam_code = data.exam_code;
    })
    //---question in exam
    this.questionExamCollection = this.afs.collection<QuestionExam>(`/exam/${this.testID}/questions`)
    this.questions = this.questionExamCollection.valueChanges()

    this.questions.take(1).subscribe(ques => {
      this.doing=0;

      ques.forEach(data => {

        if (data.status == true) {
          this.doing = this.doing + 1;
          
        }
      })
    });
    //---student in exam
    this.studentExamCollection = this.afs.collection<StudentExam>(`/exam/${this.testID}/students`, ref => ref.orderBy('score'))
    this.students = this.studentExamCollection.valueChanges()

    this.students.take(1).subscribe(stu => {

      stu.forEach((data, index) => {

        this.studentShow.push(data)
        this.sum = 0;
        this.scoreGraph.push(data.score);
        this.codeGraph.push(data.nickname);
        //test show sort score
        // this.studentShow.sort(function (obj1, obj2) {
        //   // มากไปน้อย
        //   return obj2.score - obj1.score
        // });
        //คำนวน MAX, MIN
        this.max = Math.max.apply(null, this.scoreGraph);
        this.min = Math.min.apply(null, this.scoreGraph);
        this.sum = this.scoreGraph.reduce((previous, current) => current += previous);
        this.avg = (this.sum / this.scoreGraph.length).toFixed(2);
        this.std = this.standardDeviation().toFixed(2)

        ///add to DB
        let cal = {
          max: this.max,
          min: this.min,
          sd: this.std,
          average: this.avg
        }
        const ExamRef = this.afs.doc<Exam>(`/exam/${this.testID}`);
        ExamRef.update(cal);

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

    //to data export
    this.studentShow.forEach((data, indax) => {

      let studentExport = {
        student_id: data.code,
        student_name: data.nickname,
        student_fullname:data.name,
        score: data.score
      }
      this.studentExportObj.push(studentExport)
    })
    //
    this.excelService.exportAsExcelFile(this.studentExportObj, this.exam_code);
  }
  exitTest() {
    this.router.navigate(['dashboard', 'test'])
  }
  ngOnInit() {
  }

  generatePDF() {
    let temp = this.exam_code + '.pdf';

    html2canvas(document.getElementById('content')).then(function (canvas) {
      document.body.appendChild(canvas);
      var pdf = new jsPDF('p', 'pt', 'a4');

      pdf.addHTML(canvas, function () {
        pdf.save(temp);
      });
    });
  }
}
