import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Exam } from '../inteterfaces/exam';
import { StudentExam } from '../inteterfaces/studentExam';
import { QuestionExam } from '../inteterfaces/questionExam';
import { ActivatedRoute, Router } from '@angular/router';

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

  //ชื่อ topic ที่แสดง
  topic_name_display: any;

  //array ของ list รายการคำถามทั้งหมด
  question_display = [];
  //ผลแสดงคำถามที่แสดงในข้อนั้นๆ
  question_display2: any;
  //choice ที่นำไปแสดง
  choice_display: any;
  //จำนวนคำถามที่มี รับมาจาก database
  total_num: any;
  //จำนวนคำถามสำหรับคำนวน
  total_num_cal: any;
  //ตัวเลขปของงคำถามมัจจุบัน
  current_num: any;


  //ดึงค่าจาก database ในตาราง TestScore
  TestScoreList: AngularFireList<any>;
  dataObj2: any;

  //รหัส test ที่แสดงอยู่ตอนนี้
  testID: any;
  //รหัส Topic ที่แสดงอยู่ตอนนี้
  Topic: any;


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
  examType: any;
  examStatus: any;
  ansObservable: any;
  constructor(private router: Router, private afs: AngularFirestore, private db: AngularFireDatabase, private firebaseService: FirebaseService) {

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

    //
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

      console.log("status   =  " + this.examStatus);

      console.log(this.examSubDisplay, this.examChapDisplay, this.examDesDisplay);
      this.total_num = exam.amount;
      this.total_num_cal = exam.amount;
      this.current_num = 0;

      if (this.current_num == 0) {
        this.doing_percent = 0;
      } else {
        this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);;
      }
    })

    //---student in exam
    this.studentExamCollection = afs.collection<StudentExam>(`/exam/${this.testID}/students`, ref => ref.orderBy('code'))
    this.students = this.studentExamCollection.valueChanges()

    this.students.forEach(stu => {
      console.log(stu);
      stu.forEach(data1 => {
        console.log(data1.code);
      })
    })
    //---question in exam
    this.questionExamCollection = afs.collection<QuestionExam>(`/exam/${this.testID}/questions`, ref => ref.orderBy('code'))
    this.questions = this.questionExamCollection.valueChanges()

    this.questions.forEach(ques => {
      console.log(ques);
      // ques.forEach(data1 => {
      //   console.log(data1.code);
      //   console.log(data1.indax);
      // })

      //test show sort indax
      this.questionsList = ques.sort(function (obj1, obj2) {
        // Ascending: first age less than the previous
        return obj1.indax - obj2.indax;
      });
      // console.log(this.questionsList[this.current_num]);
      this.question_show = this.questionsList[this.current_num].question;
      // console.log(this.question_show);

      if (this.examType == 1) {
        this.choice_show = null;
      } else {
        this.choice_show = this.questionsList[this.current_num].choice;
      }


      // console.log(this.choice_show);
      this.Q_answer_index = this.questionsList[this.current_num].answer;
      // console.log(this.Q_answer_index);
      this.Q_no = this.questionsList[this.current_num].code;
      // console.log(this.Q_no);
      this.Q_index = this.questionsList[this.current_num].indax;
      // console.log(this.Q_index);

    })
  }

  ngOnInit() {
  }
  /*
  async test(){
     const key2 = await this.TestScore_id_pack;
    // const key2 ='TestScore1'
     const data_TestScore = await{
      Student_id: '2',
      Test_id: '2',
      Score: '2',
      Student_answer: [2]
    }
    console.log(data_TestScore);
    console.log(key2);
    await this.db.list("/TestScore").set(key2, data_TestScore);
  }*/



  TestStuList() {
    //รับแล้วเอาไปเก็บในDB
    this.array_testList = [];
    alert("listttt");
    console.log(this.testID);
    console.log(this.Topic);
    console.log(this.Q_no);

    const data = {
      Test_id: this.testID,
      topic_id: this.Topic,
      Questions_no: this.Q_no,
      student_id: this.tesssttext1,     //Sid
      Answer: this.tesssttext2          //answer

    }
    console.log(data);

    this.db.list("/TestList").push(data);

  }
  inputAnswer() {
    console.log("inputAnswer");

    const answerRefLocal = this.afs.doc(`/answers/${this.testID}`)
    this.ansObservable = answerRefLocal.valueChanges()
    console.log(this.ansObservable);

    this.ansObservable.forEach(d => {
      console.log(d["570510638"]["0"]);


  
      // let selectStudent = _.filter(d, (student: StudentCheckBox) => {

      //   return student.selected;
      // });
    })


    /*
    //database ของ TestList
    this.testList = this.db.list('/TestList');
    this.dataObj_pre = this.testList.snapshotChanges().map(changes => {
      // console.log("eiei: "+ this.dataObj);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    //ดึงค่าของแต่ล่ะ obj ของ TestList
    this.dataObj_pre.subscribe(data1 => {
      this.array_testList = [];
      console.log(data1);
      //console.log(data1.student[0].student_id);
      data1.forEach(data1_2 => {
        console.log(data1_2);
        console.log(data1_2.Questions_no);
        console.log(data1_2.Test_id);
        // เชคว่าที่มีนั้นตรงกับข้อ กับหัวข้อ และกับแบบทดสอบที่กำลังทำ
        if (data1_2.Questions_no == this.Q_no && data1_2.Test_id == this.testID) {
          console.log(data1_2.student[0]);
          console.log(data1_2.student[0].student_id);
          console.log(data1_2.student[0].url);
          console.log(data1_2.Answer);

          //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
          this.pack_array_testList = {
            student_id: data1_2.student[0].student_id,
            student_name: data1_2.student[0].Student_name,
            score: data1_2.student[0].score,
            url: data1_2.student[0].url,
            answer: data1_2.Answer
          }
          //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
          this.array_testList.unshift(this.pack_array_testList);  //unshift เพิ่มเข้าข้างหน้า
          console.log(this.array_testList);     //ที่ตรงกับที่กำลังทำ     
        }
      });
    });
    */
  }

  ProcessAnswer() {
    //ประมวลผลคำตอบในข้อนั้นๆ
    alert("ProcessAnswer");
    console.log("------------ProcessAnswer------------");

    console.log(this.array_testList);   //array ที่บรรจุค่า obj ที่แสดงอยู่ในส่วนที่มาจาก inputAnswer();
    console.log(this.Q_no);             //รหัสของคำถามนั้น
    console.log(this.Q_answer_index);   //เฉลย ตำแหน่งที่เป็นคำตอบที่ถูกต้อง

    //เรียงลำดับของ obj ใน array_testList โดยการเรียงจากมากไปน้อยของรหัสนักศึกษา
    this.array_testList.sort(function (obj1, obj2) {
      // Ascending: first student_id less than the previous
      return obj1.student_id - obj2.student_id;
    });

    //ดึงค่าของแต่ล่ะ obj ของ TestList เพื่อตรวจคำตอบ ของแต่ละคน
    this.array_testList.forEach(data_check => {
      console.log(data_check);
      console.log(data_check.answer);

      //ตรวจคำตอบ
      if (data_check.answer == this.Q_answer_index) { //คำตอบถูก
        console.log(data_check.answer + "===" + this.Q_answer_index);
        let new_score = data_check.score + 1;         //บวกคะแนนเพิ่ม
        console.log(new_score);
        data_check.score = new_score;
      }
    });
  }
  NextQuestion() {

    //เริ่มข้อคำถามใหม่

    if (this.current_num < this.total_num - 1) {
      alert("NextQuestion");
      this.current_num = this.current_num + 1;
      // console.log(this.current_num);

      // console.log(this.questionsList[this.current_num]);
      this.question_show = this.questionsList[this.current_num].question;
      // console.log(this.question_show);
      if (this.examType == 1) {
        this.choice_show = null;
      } else {
        this.choice_show = this.questionsList[this.current_num].choice;
      }
      // console.log(this.choice_show);
      this.Q_answer_index = this.questionsList[this.current_num].answer;
      // console.log(this.Q_answer_index);
      this.Q_no = this.questionsList[this.current_num].code;
      // console.log(this.Q_no);
      this.Q_index = this.questionsList[this.current_num].indax;
      // console.log(this.Q_index);

      this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);

    } else {
      this.current_num = this.current_num + 1;
      console.log(this.current_num);
      alert("หมด");
      this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);

      //update examStatus
      console.log("UpdateExam");

      const statusUpdate = {
        status: "finish"
      };
      //path to update
      const examRef = this.afs.doc<Exam>(`exam/${this.testID}`);
      examRef.update(statusUpdate).then(() => {
        console.log("update Subject");
        this.router.navigate(['dashboard', 'test', 'scores'])
      });
    }
  }

  PuaseTest() {
    alert("Puase");
    //update examStatus
    console.log("UpdateExam");

    const statusUpdate = {
      status: "puase"
    };
    //path to update
    const examRef = this.afs.doc<Exam>(`exam/${this.testID}`);
    examRef.update(statusUpdate).then(() => {
      console.log("update Subject");
      this.router.navigate(['dashboard'])
    })
  }
  SkipQuestion() {
    alert("Skip");
    this.total_num_cal = this.total_num_cal - 1;
    this.doing_percent = ((this.current_num / this.total_num_cal) * 100).toFixed(2);
  }

}
