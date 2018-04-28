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

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService, private router: Router) {
    // console.log(this.firebaseService.arrayTest1);
    console.log("______in step 2______");

    this.receiveTest1 = this.firebaseService.arrayTest1;
    console.log(this.receiveTest1);
    console.log(this.receiveTest1[4]);

    this.receiveQuestion = this.receiveTest1[4];
    this.question_list_display = this.receiveQuestion;

  }

  ngOnInit() {

  }

  moveUp(value, index) {
    swal({
      title: 'Up!',
      showConfirmButton: false,
      timer: 500
    })
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
    swal({
      title: 'Down!',
      showConfirmButton: false,
      timer: 500
    })
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
    swal({
      title: 'Are you sure?',
      text: "go to the next step",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, to go!'
    }).then((result) => {
      if (result.value) {
        this.question_list_display.forEach(element => {
          console.log(element);
          arrayTest2pack.push(element);
        });
        // console.log(arrayTest2pack);
        this.firebaseService.arrayTest2 = arrayTest2pack;
        console.log(this.firebaseService.arrayTest2); 
        this.router.navigate(['dashboard', 'test', 'test-step3'])
      }
     
    })
  }
}