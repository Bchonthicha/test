import { Component, OnInit } from '@angular/core';

// import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
// import { FirebaseService } from '../services/firebase.service';
// import { Observable } from 'rxjs/Observable';

//new
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Student } from '../inteterfaces/student';
import { StudentCheckBox } from '../inteterfaces/student-check-box';
import * as _ from "lodash";
import { Section } from '../inteterfaces/section';
import { Exam } from '../inteterfaces/exam';
import { StudentExam } from '../inteterfaces/studentExam';
import { QuestionExam } from '../inteterfaces/questionExam';
import { DocumentReference } from '@firebase/firestore-types';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

// import { Router } from '@angular/router';
@Component({
  selector: 'app-test-step3',
  templateUrl: './test-step3.component.html',
  styleUrls: ['./test-step3.component.css']
})
export class TestStep3Component implements OnInit {

  todayDate: any;

  receiveTest3: any;

  GroupList: AngularFireList<any>;
  SelectThisGroup = [];
  arrayVal_Group = [];    //array ของชื่อกลุ่มที่นำไปแสดง
  dataObj: Observable<any>;

  arrayKey_Group = [];    //array ของ key ของกลุ่มที่แสดง
  student_id_list_of_Group: any;

  arrayStudent_id = [];
  arrayStudent_name = [];
  std_list_display = [];

  groupForm: any;

  selectedAll: any;

  ObjStudent_detail: any;

  ///////////////////// new
  // AngularFire Ref
  studentCollection: AngularFirestoreCollection<Student>;
  // Firestore database observable
  studentsObservable: Observable<Student>;
  groupList: Observable<Section[]>;           //ชื่อกลุ่มที่นำไปแสดง
  sectionRefLocal: AngularFirestoreDocument<Section>
  sectionObservable: Observable<Section>
  studentListLocal: AngularFirestoreDocument<Student>

  members: Observable<Student>[]

  // Temporary Variable =ชั่วคราว
  isSelect: boolean
  studentListAdd = [];
  now: any;    //timestamp now
  receiveTest1: any;
  receiveTest2: any;
  subject_code: any;
  chapter_code: any;
  exam_code: any;
  examData: Exam;
  studentExam: StudentExam;
  questionExam: QuestionExam;

  isdataStudent: boolean = false;
  student_ans={};

  constructor(private router: Router, private afs: AngularFirestore, private db: AngularFireDatabase, private firebaseService: FirebaseService) {
   this.isdataStudent =false;

    console.log("_____________step 3____________");
    console.log(this.firebaseService.arrayTest1);
    console.log(this.firebaseService.arrayTest2);
    this.receiveTest1 = this.firebaseService.arrayTest1;
    this.receiveTest2 = this.firebaseService.arrayTest2;

    //section or group
    const sectionRef: AngularFirestoreCollection<Section> = this.afs.collection<Section>(`/sections`);
    this.groupList = sectionRef.valueChanges()

    // console.log(this.receiveTest1[0].code);
    this.subject_code = this.receiveTest1[0].code;
    this.chapter_code = this.receiveTest1[1].code;

  }

  onChange(name) {
    this.isdataStudent = true;
    this.preAddStudentDialog();
    console.log(name);
    // this.studentCollection = this.afs.collection<Student>('/students', ref => ref.orderBy('code'));
    this.sectionRefLocal = this.afs.doc<Section>(`/sections/${name}`)
    this.sectionObservable = this.sectionRefLocal.valueChanges()
    // Extract Ref to Student Object 
    this.sectionObservable.forEach(section => {
      // console.log(section.members);
      section.members.forEach(student => {
        // console.log(student.path)   //students/570510637
        this.studentListLocal = this.afs.doc<Student>(`${student.path}`)
        this.studentsObservable = this.studentListLocal.valueChanges()

        this.studentsObservable.forEach(d => {
          this.studentListAdd.push(d);
          // console.log(d);
          // console.log(this.studentListAdd);
        })
      })
    })
  }

  preAddStudentDialog() {
    this.studentListAdd = [];
    this.isSelect = false;
    this.studentListAdd = _.map(this.studentListAdd, (student: StudentCheckBox) => {
      student.selected = false;
      return student;
    });
  }

  createSelectAll() {
    this.studentListAdd = _.map(this.studentListAdd, (student: StudentCheckBox) => {
      student.selected = this.isSelect;
      // console.log(student.code);
      return student;
    });
  }

  StartSelectStudent() {
    let arrayTest3pack = [];
    let arrayTest3pack2 = [];

    //---หา คนใน studentListAdd ที่ selected โดยที่ถ้า selected จะ return true
    let selectStudent = _.filter(this.studentListAdd, (student: StudentCheckBox) => {
      // console.log(student.selected);
      return student.selected;
    });

    console.log(selectStudent.length);

    if (selectStudent.length == 0) {
      swal({
        type: 'error',
        title: 'Unsuccessful',
        text: 'Please select students.',
        // showConfirmButton: false,
        // timer: 1500
      })
    } else {
      swal({
        title: 'Are you sure?',
        text: "go to the Quiz",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, to go!'
      }).then((result) => {
        if (result.value) {
        console.log(selectStudent);

        //set timestamp
        this.now = Date.now();
        console.log(this.now); // shows current timestamp

        //set exam code 
        this.subject_code = this.receiveTest1[0].code;
        this.chapter_code = this.receiveTest1[1].code;

        this.exam_code = this.subject_code + "_" + this.chapter_code + "_" + this.now
        console.log(this.exam_code);
        this.firebaseService.Test_id_new = this.exam_code;    //subject_chapter_timestamp : 205100_ch0_1523089877262


        this.examData = {
          amount: this.receiveTest1[2],
          chapter_code: this.receiveTest1[1].code,
          chapter_name: this.receiveTest1[1].name,
          current_question: 0,
          date: this.now,
          description: this.receiveTest1[3],
          exam_code: this.exam_code,
          status: "active",
          subject_code: this.receiveTest1[0].code,
          subject_name: this.receiveTest1[0].name,
          type: this.receiveTest1[5],
          max: null,
          min: null,
          sd: null,
          average: null
        }

        console.log(this.examData);
        //---add data detail in exam
        const examRef: AngularFirestoreDocument<Exam> = this.afs.doc<Exam>(`/exam/${this.exam_code}`);
        examRef.set(this.examData);

        //---หา student ที่ selectStudent มีค่าเป็น true
        _.forEach(selectStudent, (student: StudentCheckBox) => {
          // console.log(student.code, student.name, student.url);

          this.studentExam = {
            code: student.code,
            name: student.name,
            nickname:student.nickname,
            score: 0,
            url: student.url
          }
          console.log(this.studentExam);

          //---add students in exam
          const StudentExamRef: AngularFirestoreDocument<StudentExam> = this.afs.doc<StudentExam>(`/exam/${this.exam_code}/students/${student.code}`)
          StudentExamRef.set(this.studentExam);
          arrayTest3pack.push(this.studentExam);
          
          //---add students code in answers
          // this.question_obj[student.code] = null;
          this.student_ans[student.code] = {};
          const AnswersRef: AngularFirestoreDocument<object> = this.afs.doc<object>(`/answers/${this.exam_code}/`)
          AnswersRef.set(this.student_ans);
        })
        console.log(arrayTest3pack);

        this.receiveTest2.forEach((question, index) => {
          console.log(question, index);
          this.questionExam = {
            answer: question.answer,
            choice: question.choice,
            // code: question.key,
            code: question.code,
            indax: index,
            question: question.question,
            status: false
          }
          console.log(this.questionExam);
          //---add questions in exam
          const QuestionExamRef: AngularFirestoreDocument<QuestionExam> = this.afs.doc<QuestionExam>(`/exam/${this.exam_code}/questions/${question.code}`)
          QuestionExamRef.set(this.questionExam);

          arrayTest3pack2.push(this.questionExam);
        })

        this.firebaseService.arrayTest3 = arrayTest3pack;
        console.log(arrayTest3pack);

        this.firebaseService.arrayTest3_2 = arrayTest3pack2;
        console.log(arrayTest3pack2);

        this.router.navigate(['dashboard', 'test', 'quiz'])
      }
    })
    }
  }

  ngOnInit() { }
}