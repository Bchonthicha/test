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
import { DocumentReference } from '@firebase/firestore-types';

// import { Router } from '@angular/router';
@Component({
  selector: 'app-test-step3',
  templateUrl: './test-step3.component.html',
  styleUrls: ['./test-step3.component.css']
})
export class TestStep3Component implements OnInit {

  todayDate: any;
  receiveTest1: any;
  receiveTest2: any;
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

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private firebaseService: FirebaseService) {
    //test show sort time
    let Hero = [
      { name: "Robin Van Persie", age: 28, time: '7/1/2561 16:49:58' },
      { name: "Theo Walcott", age: 22, time: '5/2/2561 16:49:58' },
      { name: "Bacary Sagna", age: 26, time: '27/2/2560 16:45:58' }
    ].sort(function (obj1, obj2) {
      // Ascending: first age less than the previous
      return obj1.age - obj2.age;
    });
    console.log("-------------------" + Hero);
    //

    //section or group
    const sectionRef: AngularFirestoreCollection<Section> = this.afs.collection<Section>(`/sections`);
    this.groupList = sectionRef.valueChanges()

  }

  onChange(name) {

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
      console.log(student.code);
      return student;
    });
  }

  StartSelectStudent() {
    //หา คนใน studentListAdd ที่ selected โดยที่ถ้า selected จะ return true
    let selectStudent = _.filter(this.studentListAdd, (student: StudentCheckBox) => {
      console.log(student.selected);
      return student.selected;
    });

    //หา student ที่ selectStudent มีค่าเป็น true
    _.forEach(selectStudent, (student: StudentCheckBox) => {
      console.log(student.code);

    })
    /*
     alert("std");
 
     let arrayTest3pack = [];
 
     // console.log(this.std_list_display);
     this.std_list_display.forEach((item, index) => {
       //console.log(item);
       //console.log(item.selected);
       if (item.selected == true) {
         console.log(item);
         //arrayTest3pack.push(item.student_id);
         // console.log(arrayTest3pack);
         this.ObjStudent_detail = {
           "student_id": item.student_id,
           "student_name": item.student_name,
           "score": 0,
           "url": item.url,
           "student_answer": [""]
         }
         console.log(this.ObjStudent_detail);
 
         arrayTest3pack.push(this.ObjStudent_detail);
         this.firebaseService.arrayTest3 = arrayTest3pack;
         console.log(arrayTest3pack);
       }
     });
     this.receiveTest1 = this.firebaseService.arrayTest1;
     this.receiveTest2 = this.firebaseService.arrayTest2;
     this.receiveTest3 = this.firebaseService.arrayTest3;
     console.log(this.receiveTest1);
     console.log(this.receiveTest2);
     console.log(this.receiveTest3);
 
     //this.todayDate = new Date().toUTCString();
     this.todayDate = new Date().toLocaleString();
     console.log(this.todayDate);
     //Add item with Custom IDs In Firebase
     const key = this.firebaseService.Test_id_new;
     const data2 = {
       category_id: this.receiveTest1[0],
       topic_id: this.receiveTest1[1],
       test_date: this.todayDate,
       test_numQuestion: this.receiveTest1[2],     //ต้องแก้เป็น test_numQuestion
       test_description: this.receiveTest1[3],
       question: this.receiveTest2,
       students: this.receiveTest3,
       test_status: true
     }
     console.log(key + "++++" + data2);
 
     //create TestScore to database
     console.log(this.std_list_display);
 
     //Add item with Custom IDs In Firebase to Test table
     this.db.list("/Test").set(key, data2);
  */
  }

  ngOnInit() { }
}