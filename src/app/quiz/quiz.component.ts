import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Exam } from '../inteterfaces/exam';
import { StudentExam } from '../inteterfaces/studentExam';
import { QuestionExam } from '../inteterfaces/questionExam';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  //สำหรับการจำลอง รับคำตอบเข้ามา
  eiei: any;
  tesssttext1: any;
  tesssttext2: any;

  //สำหรับค่าที่ส่งมาแบบ pubilc จาก step ต่างๆ
  receiveTest1: any;
  receiveTest2: any;
  receiveTest3: any;
  receiveTest3_2: any;
  //สำหรับการดึงค่าจาก database ในตาราง testList
  testList: any;
  dataObj_pre: any;

  //["Q5", "Q4", "Q3"]
  q_id: any;

  //จำนวนคำถามที่มี รับมาจาก database
  total_num: any;
  //จำนวนคำถามสำหรับคำนวน
  total_num_cal: any;
  //ตัวเลขปของงคำถามมัจจุบัน
  // current_num: any;

  //รหัส test ที่แสดงอยู่ตอนนี้
  testID: any;

  //สำหรับเก็บค่าเพื่อแสดงในส่วนของรายการคำตอบที่รับเข้ามา และ ประมวลผล
  pack_array_testList: any;
  array_testList = [];

  //new
  studentExamCollection: AngularFirestoreCollection<StudentExam>;
  students: Observable<StudentExam[]>;

  questionExamCollection: AngularFirestoreCollection<QuestionExam>;
  questions: Observable<QuestionExam[]>;
  questionsList: any;
  examObservable: Observable<Exam>
  examSubDisplay: any;
  examChapDisplay: any;
  examDesDisplay: any;
  //ตัวเลขเปอร์เซ็นต์ที่แสดง
  doing_percent: any;
  question_show: any;
  choice_show: any;
  //รหัส question ที่แสดงอยู่ตอนนี้
  Q_no: any;
  //ผลเฉลยของคำถามที่แสดงอยู่ตอนนี้
  Q_answer_index: any;
  //ตำแหน่งคำถาม
  Q_index: any;
  //เฉลยของคำถามแบบคำตอบสั้น
  answerType1: any;
  examType: any;
  examStatus: any;
  ansObservable: any;
  student_temp = [];
  answer: any;
  array_testListProcess = [];
  answerCheck: any;
  answerCheckImg: any;
  current_question: any;
  questionObj: any;

  isprocess: Boolean = false;

  isValidProcess: Boolean = false;
  isValidNext: boolean = true;

  isExamDataDetailLoaded = false;

  AnsObservableResult: any;

  constructor(private router: Router, private afs: AngularFirestore, private db: AngularFireDatabase, private firebaseService: FirebaseService) {
    this.array_testListProcess = [];
    this.array_testList = [];

    //list pubilc for test step
    this.receiveTest1 = this.firebaseService.arrayTest1;
    this.receiveTest2 = this.firebaseService.arrayTest2;
    this.receiveTest3 = this.firebaseService.arrayTest3;
    this.receiveTest3_2 = this.firebaseService.arrayTest3_2;
    this.testID = this.firebaseService.Test_id_new;

    console.log(this.receiveTest1);
    // console.log(this.receiveTest2);
    console.log(this.receiveTest3);
    console.log(this.receiveTest3_2);
    console.log(this.testID);

    const examRefLocal = this.afs.doc<Exam>(`/exam/${this.testID}`)
    this.examObservable = examRefLocal.valueChanges()


    const answerRefLocal = this.afs.doc(`/answers/${this.testID}`)
    this.ansObservable = answerRefLocal.valueChanges()

    this.examObservable.forEach(exam => {
      console.log(exam.status);
      this.examStatus = exam.status;
      //exam data detail
      if (this.examStatus == "pause") {
        alert("status = " + this.examStatus);
        this.router.navigate(['dashboard'])
      } else {
        this.examDataDetail((studentList) => {
          this.afs.doc(`/answers/${this.testID}`).valueChanges().forEach(element => {
            console.log(element);
            this.answerProcessList(element)
            this.scoreProcess(element)
          });
        });
      }
    });


    //---
    this.isValidProcess = false;
    this.isValidNext = true;

    //call inputAnswer
    // setInterval(() => {
    //   this.inputAnswer();
    // }, 5000);

    // this.inputAnswer();

    //list answer
    this.ansObservable.subscribe(ans => {
      this.AnsObservableResult = ans;
      console.log(this.AnsObservableResult);

      this.answerProcessList(this.AnsObservableResult)
      this.scoreProcess(this.AnsObservableResult)
    })

  }

  answerProcessList(ans) {
    console.log(this.Q_no);
    const array_testList = [];
    console.log("ans in answerProcessList=", ans);
    let pack_array_testList = {};
    this.student_temp.forEach(stu => {

      console.log(stu);
      console.log(stu.code);
      console.log(this.Q_no);
      console.log(ans[stu.code][this.Q_no]);

      this.answer = ans[stu.code][this.Q_no];
      console.log(this.answer);

      if (this.answer != undefined) {

        console.log(stu.code + "in" + this.Q_no + "==" + this.answer);
        //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
        pack_array_testList = {
          student_id: stu.code,
          student_name: stu.name,
          score: stu.score,
          url: stu.url,
          answer: this.answer
        }
        //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
        //this.array_testList.unshift(this.pack_array_testList);  //unshift เพิ่มเข้าข้างหน้า
        array_testList.push(pack_array_testList);  //unshift เพิ่มเข้าข้างหน้า
        console.log(array_testList);                     //ที่ตรงกับที่กำลังทำ     
      }
    })
    this.array_testList = array_testList;
  }

  scoreProcess(ans) {
    console.log("ans in scoreProcess=", ans);

    //ค่าผลเฉลยตามชนิดของแบบทดสอบ
    if (this.examType == 1) {
      this.answerCheck = this.answerType1;
    } else {
      this.answerCheck = this.Q_answer_index;
    }

    console.log("ansObservable");
    let new_score;

    const array_testListProcess = [];
    this.student_temp.forEach(stu => {

      console.log(stu);
      console.log(stu.code);
      console.log("นี่ฉันเองงงงงงงงงงงงงงงงง   " + stu.score);
      console.log(this.Q_no);
      // this.array_testList = [];
      this.answer = ans[stu.code][this.Q_no];
      console.log(this.answer);

      let pack_array_testList = {};
      //ตรวจคำตอบ
      if (this.answer != undefined) {             //ได้รับคำตอบมา
        console.log("input=" + this.answer + "ans= " + this.answerCheck);

        if (this.answer == this.answerCheck) { //คำตอบถูก
          new_score = stu.score + 1;         //บวกคะแนนเพิ่ม
          console.log(new_score);
          // stu.score = stu.score + 1;
          console.log(stu.code + "in" + this.Q_no + "==" + this.answer + "===" + this.answerCheck);
          this.answerCheckImg = "assets/dist/img/corract.png";
          //update ค่า score ใน database
          // let newScoreUp = {
          //   score: stu.score + 1
          // }
          // const examRef = this.afs.doc<StudentExam>(`exam/${this.testID}/students/${stu.code}`);
          // examRef.update(newScoreUp)
        } else {
          this.answerCheckImg = "assets/dist/img/incorract.png";
          new_score = stu.score;
        }
        //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
        pack_array_testList = {
          student_id: stu.code,
          student_name: stu.name,
          // score: stu.score,
          score: new_score,
          url: stu.url,
          answer: this.answerCheckImg
        }
        console.log(pack_array_testList);

      } else {                                   //ไม่ได้รับคำตอบมา ไม่มีคะแนนบวกเพิ่ม
        new_score = stu.score;
        //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
        pack_array_testList = {
          student_id: stu.code,
          student_name: stu.name,
          score: new_score,
          url: stu.url,
          answer: "assets/dist/img/question.png"
        }
        console.log(pack_array_testList);
      }

      //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
      array_testListProcess.push(pack_array_testList);  //เพิ่มเข้าข้างหลัง
      console.log(array_testListProcess);     //ที่ตรงกับที่กำลังทำ     
      // this.array_testListProcess = this.array_testList;     //เอาไว้ใช่ในการ update new score ใน DB
    })
    this.array_testListProcess = array_testListProcess;
    console.log(this.array_testListProcess);
  }

  examDataDetail(callback) {
    console.log("examDataDetail");
    console.log("status   =  " + this.examStatus);

    //---exam data detail
    const examRefLocal = this.afs.doc<Exam>(`/exam/${this.testID}`)
    this.examObservable = examRefLocal.valueChanges()
    console.log(this.examObservable);

    this.examObservable.forEach(exam => {
      console.log(exam);

      this.examSubDisplay = exam.subject_name;
      this.examChapDisplay = exam.chapter_name;
      this.examDesDisplay = exam.description;
      this.examType = exam.type;
      this.examStatus = exam.status;
      this.current_question = exam.current_question;

      console.log("status   =  " + this.examStatus);

      console.log(this.examSubDisplay, this.examChapDisplay, this.examDesDisplay);
      this.total_num = exam.amount;
      this.total_num_cal = exam.amount;

      if (this.current_question == 0) {
        this.doing_percent = 0;
      } else {
        this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(2);;
      }
    })

    //---student in exam
    this.studentExamCollection = this.afs.collection<StudentExam>(`/exam/${this.testID}/students`, ref => ref.orderBy('code'))
    this.students = this.studentExamCollection.valueChanges()

    this.students.forEach(stu => {
      console.log(stu);

      if (!this.isExamDataDetailLoaded) {
        stu.forEach(data1 => {
          console.log(data1.code);
          this.student_temp.push(data1);
        })
        callback(this.student_temp)
      }
      this.isExamDataDetailLoaded = true
    })
    //---question in exam
    this.questionExamCollection = this.afs.collection<QuestionExam>(`/exam/${this.testID}/questions`, ref => ref.orderBy('indax'))
    this.questions = this.questionExamCollection.valueChanges()

    this.questions.forEach(ques => {
      console.log(ques);
      console.log(_.filter(ques, ['indax', this.current_question]));
      this.questionObj = _.filter(ques, ['indax', this.current_question]);
      this.question_show = this.questionObj[0].question;
      this.Q_no = this.questionObj[0].code;
      this.updateAllInfo()
      if (this.examType == 1) {
        this.choice_show = null;
        this.Q_answer_index = this.questionObj[0].answer;
        this.answerType1 = this.questionObj[0].choice[this.Q_answer_index];
        console.log("ans= " + this.answerType1);
      } else {
        this.choice_show = this.questionObj[0].choice;
        this.Q_answer_index = this.questionObj[0].answer;
        console.log("ans= " + this.Q_answer_index);

      }
    })


  }
  ngOnInit() {

  }

  TestStuList() {
    //รับแล้วเอาไปเก็บในDB

    console.log(this.tesssttext1);
    console.log(this.tesssttext2);

  }

  inputAnswer() {
    this.isprocess = false;
    console.log("inputAnswer");
    console.log(this.ansObservable);
    console.log(this.students);
  }

  ProcessAnswer() {
    this.isValidNext = false;
    this.isValidProcess = true;
    this.isprocess = true;



    console.log("process answer");
    // const answerRefLocal = this.afs.doc(`/answers/${this.testID}`)
    // this.ansObservable = answerRefLocal.valueChanges()
    console.log(this.ansObservable);
    console.log(this.students);



  }

  NextQuestion() {

    console.log(this.array_testListProcess);
    this.array_testListProcess.forEach((d,indax )=> {
      console.log(d.student_id + "=" + d.score);
      //update ค่า score ใน database
      let newScoreUp = {
        score: d.score
      }
      const examRef = this.afs.doc<StudentExam>(`exam/${this.testID}/students/${d.student_id}`);
      examRef.update(newScoreUp)
      //ต้อง update ค่า score ใน student_temp
      this.student_temp[indax].score = d.score;
      console.log(this.student_temp[indax].score);
      
    })
    console.log(this.student_temp);
    
    this.array_testList = [];
    this.array_testListProcess = [];

    this.isValidNext = true;
    this.isValidProcess = false;
    this.isprocess = false;

    //เริ่มข้อคำถามใหม่ 

    if (this.current_question < this.total_num - 1) {

      console.log("NextQuestion");
      this.current_question = this.current_question + 1;

      console.log(this.current_question);
      //update current_question
      let newCrrent_question = {
        current_question: this.current_question
      }
      const examRef = this.afs.doc<Exam>(`exam/${this.testID}/`);
      examRef.update(newCrrent_question)

      //call examDataDetail
      //this.examDataDetail();

    } else {
      this.current_question = this.current_question + 1;
      console.log(this.current_question);
      console.log("finish");
      this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(2);

      //update examStatus
      const statusUpdate = {
        status: "finish"
      };
      const examRef = this.afs.doc<Exam>(`exam/${this.testID}`);
      examRef.update(statusUpdate).then(() => {
        //go to display scores page
        this.router.navigate(['dashboard', 'test', 'scores'])
      });
    }

  }

  pauseTest() {
    console.log("pause");

    //update examStatus
    const statusUpdate = {
      status: "pause"
    };
    const examRef = this.afs.doc<Exam>(`exam/${this.testID}`);
    examRef.update(statusUpdate).then(() => {
      //go to dashboard page
      this.router.navigate(['dashboard'])
    })
  }

  SkipQuestion() {
    this.isValidNext = true;
    this.isValidProcess = false;
    this.isprocess = false;

    console.log("skip");
    console.log("old " + this.current_question);
    //update question status
    let question_status = {
      status: false
    }
    const examRef = this.afs.doc<QuestionExam>(`exam/${this.testID}/questions/${this.Q_no}`);
    examRef.update(question_status)

    if (this.current_question < this.total_num - 1) {
      console.log("new " + this.current_question);
      this.current_question = this.current_question + 1;
      console.log(this.current_question);
      // //update current_question
      let newCrrent_question = {
        current_question: this.current_question
      }
      const examRef = this.afs.doc<Exam>(`exam/${this.testID}/`);
      examRef.update(newCrrent_question)

      //call examDataDetail
      // this.examDataDetail();

    } else {
      this.current_question = this.current_question + 1;
      console.log(this.current_question);
      console.log("finish");
      this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(2);

      //update examStatus
      const statusUpdate = {
        status: "finish"
      };
      const examRef = this.afs.doc<Exam>(`exam/${this.testID}`);
      examRef.update(statusUpdate).then(() => {
        //go to display scores page
        this.router.navigate(['dashboard', 'test', 'scores'])
      });
    }
  }

  updateAllInfo() {
    this.answerProcessList(this.AnsObservableResult)
    this.scoreProcess(this.AnsObservableResult)
  }
}
