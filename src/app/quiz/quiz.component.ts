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
import swal from 'sweetalert2'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  //สำหรับค่าที่ส่งมาแบบ pubilc จาก step ต่างๆ
  receiveTest1: any;
  receiveTest2: any;
  receiveTest3: any;
  receiveTest3_2: any;
  //สำหรับการดึงค่าจาก database ในตาราง testList
  testList: any;

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

    const examRefLocal = this.afs.doc<Exam>(`/exam/${this.testID}`)
    this.examObservable = examRefLocal.valueChanges()

    const answerRefLocal = this.afs.doc(`/answers/${this.testID}`)
    this.ansObservable = answerRefLocal.valueChanges()

    this.examObservable.subscribe(exam => {
      this.examStatus = exam.status;
      //exam data detail
      if (this.examStatus == "pause") {
        swal({
          type: 'success',
          title: 'Quiz Paused!'
        }).then(() => {
          this.router.navigate(['dashboard'])
        })

      } else if (this.examStatus == "finish") {
        swal({
          type: 'success',
          title: 'Quiz finished!'
        }).then(() => {
          this.router.navigate(['dashboard', 'test', 'scores'])
        })

      } else {
        this.examDataDetail((studentList) => {
          this.afs.doc(`/answers/${this.testID}`).valueChanges().forEach(element => {
            this.answerProcessList(element)
            this.scoreProcess(element)
          });
        });
      }
    });


    //---
    this.isValidProcess = false;
    this.isValidNext = true;

    this.ansObservable.subscribe(ans => {

      this.AnsObservableResult = ans;

      this.answerProcessList(this.AnsObservableResult)
      this.scoreProcess(this.AnsObservableResult)
    })

  }

  answerProcessList(ans) {
    const array_testList = [];

    let pack_array_testList = {};
    this.student_temp.forEach(stu => {

      this.answer = ans[stu.code][this.Q_index];

      if (this.answer != undefined) {

        //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
        pack_array_testList = {
          student_id: stu.code,
          student_name: stu.nickname,
          score: stu.score,
          url: stu.url,
          answer: this.answer
        }
        //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
        array_testList.push(pack_array_testList);  //unshift เพิ่มเข้าข้างหน้า
        console.log(array_testList);                     //ที่ตรงกับที่กำลังทำ     
      }
    })
    this.array_testList = array_testList;
    console.log(this.array_testList);

  }

  scoreProcess(ans) {
    // console.log("ans in scoreProcess=", ans);

    //ค่าผลเฉลยตามชนิดของแบบทดสอบ
    if (this.examType == 1) {
      this.answerCheck = this.answerType1;
    } else {
      this.answerCheck = this.Q_answer_index;
    }

    let new_score;

    const array_testListProcess = [];
    this.student_temp.forEach(stu => {

      this.answer = ans[stu.code][this.Q_index];
      // console.log(this.answer);

      let pack_array_testList = {};
      //ตรวจคำตอบ
      if (this.answer != undefined) {             //ได้รับคำตอบมา
        // console.log("input=" + this.answer + "ans= " + this.answerCheck);

        if (this.answer == this.answerCheck) { //คำตอบถูก
          new_score = stu.score + 1;         //บวกคะแนนเพิ่ม
          this.answerCheckImg = "assets/dist/img/corract.png";

        } else {
          this.answerCheckImg = "assets/dist/img/incorract.png";
          new_score = stu.score;
        }
        //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
        pack_array_testList = {
          student_id: stu.code,
          student_name: stu.nickname,
          score: new_score,
          url: stu.url,
          answer: this.answerCheckImg
        }
        // console.log(pack_array_testList);

      } else {                                   //ไม่ได้รับคำตอบมา ไม่มีคะแนนบวกเพิ่ม
        new_score = stu.score;
        //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
        pack_array_testList = {
          student_id: stu.code,
          student_name: stu.nickname,
          score: new_score,
          url: stu.url,
          answer: "assets/dist/img/question.png"
        }
        // console.log(pack_array_testList);
      }

      //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
      array_testListProcess.push(pack_array_testList);  //เพิ่มเข้าข้างหลัง
    })
    this.array_testListProcess = array_testListProcess;
  }

  examDataDetail(callback) {

    //---exam data detail
    const examRefLocal = this.afs.doc<Exam>(`/exam/${this.testID}`)
    this.examObservable = examRefLocal.valueChanges()


    this.examObservable.forEach(exam => {

      this.examSubDisplay = exam.subject_name;
      this.examChapDisplay = exam.chapter_name;
      this.examDesDisplay = exam.description;
      this.examType = exam.type;
      this.examStatus = exam.status;
      this.current_question = exam.current_question;

      this.total_num = exam.amount;
      this.total_num_cal = exam.amount;

      if (this.current_question == 0) {
        this.doing_percent = 0;
      } else {
        this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(1);;
      }
    })

    //---student in exam
    this.studentExamCollection = this.afs.collection<StudentExam>(`/exam/${this.testID}/students`, ref => ref.orderBy('code'))
    this.students = this.studentExamCollection.valueChanges()

    this.students.forEach(stu => {

      if (!this.isExamDataDetailLoaded) {
        stu.forEach(data1 => {
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

      this.questionObj = _.filter(ques, ['indax', this.current_question]);
      this.question_show = this.questionObj[0].question;
      this.Q_no = this.questionObj[0].code;
      this.Q_index = this.questionObj[0].indax;

      this.updateAllInfo()

      if (this.examType == 1) {
        this.choice_show = null;
        this.Q_answer_index = this.questionObj[0].answer;
        this.answerType1 = this.questionObj[0].choice[this.Q_answer_index];

      } else {
        this.choice_show = this.questionObj[0].choice;
        this.Q_answer_index = this.questionObj[0].answer;

      }
    })


  }
  ngOnInit() {

  }

  ProcessAnswer() {
    this.isValidNext = false;
    this.isValidProcess = true;
    this.isprocess = true;

    swal({
      type: 'success',
      title: 'processed',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      //update status

      let question_status = {
        status: true
      }
      const examRef = this.afs.doc<QuestionExam>(`exam/${this.testID}/questions/${this.Q_no}`);
      examRef.update(question_status)
    })

  }

  NextQuestion() {


    this.array_testListProcess.forEach((d, indax) => {
      //update ค่า score ใน database
      let newScoreUp = {
        score: d.score
      }
      const examRef = this.afs.doc<StudentExam>(`exam/${this.testID}/students/${d.student_id}`);
      examRef.update(newScoreUp)
      //ต้อง update ค่า score ใน student_temp
      this.student_temp[indax].score = d.score;
    })

    this.array_testList = [];
    this.array_testListProcess = [];

    this.isValidNext = true;
    this.isValidProcess = false;
    this.isprocess = false;

    //เริ่มข้อคำถามใหม่ 

    if (this.current_question < this.total_num - 1) {

      this.current_question = this.current_question + 1;
      let newCrrent_question = {
        current_question: this.current_question
      }
      const examRef = this.afs.doc<Exam>(`exam/${this.testID}/`);
      examRef.update(newCrrent_question)

    } else {
      this.current_question = this.current_question + 1;
      this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(1);

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
    swal({
      title: 'Are you sure?',
      text: "pause this Quiz!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pause it!'
    }).then((result) => {
      if (result.value) {
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
    })
  }

  stopTest() {
    swal({
      title: 'Are you sure?',
      text: "stop this Quiz!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, stop it!'
    }).then((result) => {
      if (result.value) {

        const statusUpdate = {
          status: "finish"
        };
        const examRef = this.afs.doc<Exam>(`exam/${this.testID}`);
        examRef.update(statusUpdate).then(() => {
          //go to dashboard page
          this.router.navigate(['dashboard', 'test', 'scores'])
        })
      }
    })
  }

  SkipQuestion() {
    swal({
      title: 'Are you sure?',
      text: "skip this question!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, skip it!'
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Skipped',
          showConfirmButton: false,
          timer: 1500
        })
        this.isValidNext = true;
        this.isValidProcess = false;
        this.isprocess = false;

        //update question status
        // let question_status = {
        //   status: false
        // }
        // const examRef = this.afs.doc<QuestionExam>(`exam/${this.testID}/questions/${this.Q_no}`);
        // examRef.update(question_status)

        if (this.current_question < this.total_num - 1) {

          this.current_question = this.current_question + 1;
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
          this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(1);

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
    })
  }

  updateAllInfo() {
    this.answerProcessList(this.AnsObservableResult)
    this.scoreProcess(this.AnsObservableResult)
  }

}
