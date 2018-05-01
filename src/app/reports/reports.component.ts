import { Component, OnInit } from '@angular/core';
import { StudentExam } from '../inteterfaces/studentExam';
import { QuestionExam } from '../inteterfaces/questionExam';
import { Exam } from '../inteterfaces/exam';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from "primeng/accordion";
import { ExcelService } from '../services/excel.service';
import { Chapter } from '../inteterfaces/chapter';
import { Subject } from '../inteterfaces/subject';
import * as html2canvas from 'html2canvas';
// import * as jsPDF from 'jspdf';

declare let jsPDF;

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

  //student
  students: Observable<StudentExam[]>;
  studentExamCollection: AngularFirestoreCollection<StudentExam>;

  //questions
  questions: Observable<QuestionExam[]>;
  questionExamCollection: AngularFirestoreCollection<QuestionExam>;

  //array ที่ใช้เอาไปแสดงผล
  studentShow = [];
  scoreGraph = [];
  codeGraph = [];

  //number of question doing
  doing: number;

  studentExportObj = [];
  options: any;

  constructor(private afs: AngularFirestore, private excelService: ExcelService) {
    this.studentExportObj = [];
    //สำหรับใช้ export excel
    this.excelService = excelService;
    //Exam
    const ExamRef: AngularFirestoreCollection<Exam> = this.afs.collection<Exam>(`/exam`);
    this.ExamList = ExamRef.valueChanges()

    this.ExamListShow = [];
    this.ExamList.subscribe(data => {
    
      data.forEach(d => {
        if (d.status == "finish") {
          this.ExamListShow.push(d);
        }
      })
    })
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
  }

  ngOnInit() {
  }

  onChange(dataExam) {
    this.studentExportObj = [];
    this.doing = 0;

    this.isdataExam = true;
    this.studentShow = [];
    this.scoreGraph = [];
    this.codeGraph = [];
    //รายละเอียดส่วนหัวของรายงาน
    this.amount = dataExam.amount;
    this.subject_name = dataExam.subject_name;
    this.chapter_name = dataExam.chapter_name;
    this.description = dataExam.description;

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

    //---question in exam
    this.questionExamCollection = this.afs.collection<QuestionExam>(`/exam/${this.exam_code}/questions`)
    this.questions = this.questionExamCollection.valueChanges()
    this.questions.subscribe(ques => {

      ques.forEach(data => {
        if (data.status == true) {
          this.doing = this.doing + 1;
        }
      })
    });
    //---student in exam
    this.studentExamCollection = this.afs.collection<StudentExam>(`/exam/${this.exam_code}/students`, ref => ref.orderBy('score'))
    this.students = this.studentExamCollection.valueChanges()

    this.students.subscribe(stu => {

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

        this.max = dataExam.max;
        this.min = dataExam.min;
        this.sum = this.scoreGraph.reduce((previous, current) => current += previous);
        this.avg = dataExam.average;
        this.std = dataExam.sd;

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
