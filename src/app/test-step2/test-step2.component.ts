import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-test-step2',
  templateUrl: './test-step2.component.html',
  styleUrls: ['./test-step2.component.css']
})
export class TestStep2Component implements OnInit {
  receiveTest1: any;
  receiveQid: any;

  dataObj: Observable<any>;
  QuestionList: AngularFireList<any>;
  Q_answer_index = [];
  Q_choice = [];
  Q_topic_id = [];
  Q_question = [];
  tmp = [];
  tmpQid = [];


  pack_question = [];
  question_list_display = [];
  //new
  receiveQuestion: any;
  
  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService,private router: Router) {
    // console.log(this.firebaseService.arrayTest1);
    console.log("______in step 2______");
   
    this.receiveTest1 = this.firebaseService.arrayTest1;
    console.log(this.receiveTest1);
    console.log(this.receiveTest1[4]);
    // ตำแหน่ง4 array คำถาม  [  {answer: 2, choice: Array(4), key: "0", question: "การที่พืชสังเคราะห์อาหารได้เอง เพราะพืชมีโครงสร้างใด"},
    //   {answer: 3, choice: Array(4), key: "3", question: "เซลล์ใดต่อไปนี้มีลักษณะค่อนข้างกลม"},
    //   {answer: 1, choice: Array(4), key: "1", question: "“เซลล์เยื่อหอม” หมายถึงส่วนใดของหัวหอม"}
    // ]
    this.receiveQuestion = this.receiveTest1[4];
    this.question_list_display =this.receiveQuestion;
    // console.log(this.question_list_display[0].choice);
    
    
/*
    //Database
    let sub_index = 0;
    console.log(this.receiveQid);
    this.receiveQid.forEach((item, index) => {
      console.log(item);

      let path = 'Questions/' + item;
      let ref2 = this.db.list(path).valueChanges();
      this.tmpQid.push(item);

      ref2.subscribe(data => {
        // console.log("size" + this.receiveQid.length);
        console.log(data);
        //
        this.tmp.push(data);

        // console.log(this.tmp[index]);
        let tem = {
          keyQ: this.receiveQid[index],
          answer_index: data[0],
          choice: data[1],
          question: data[2],
          topic_id: data[3],
          i: index
        }
        // console.log(data[1]);
        this.question_list_display.push(tem);
        console.log(this.question_list_display);
      });
    });
    console.log(this.tmpQid);
    */
  }

  ngOnInit() {

  }

  moveUp(value, index) {
    console.log(index);
    console.log(value);
    if (index > 0) {
      console.log("moveUp");
      const tmp = this.question_list_display[index - 1];
      this.question_list_display[index - 1] = this.question_list_display[index];
      this.question_list_display[index] = tmp;
      //update new value index in object
      this.question_list_display[index].i = index;
      this.question_list_display[index - 1].i = index - 1;
      console.log(this.question_list_display);
    }
  }
  moveDown(value, index) {
    console.log(index);
    console.log(this.question_list_display.length);

    if (index < this.question_list_display.length - 1) {
      console.log("moveDown");
      const tmp = this.question_list_display[index + 1];
      this.question_list_display[index + 1] = this.question_list_display[index];
      this.question_list_display[index] = tmp;
      //update new value index in object
      this.question_list_display[index].i = index;
      this.question_list_display[index + 1].i = index + 1;
      console.log(this.question_list_display);
    }
  }
  StartSelectQuestion() {
    let arrayTest2pack = [];
    let c = confirm("Are you sure to go to the next step?");
    if (c == true) {
    this.question_list_display.forEach(element => {
      console.log(element);
      arrayTest2pack.push(element);
    });
    // console.log(arrayTest2pack);
    this.firebaseService.arrayTest2 = arrayTest2pack;
    console.log(this.firebaseService.arrayTest2);
  }
  this.router.navigate(['dashboard','test','test-step3'])
}
}