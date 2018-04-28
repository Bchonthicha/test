import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
// import { FirebaseService } from '../services/firebase.service';
// import { Observable } from 'rxjs/Observable';

//new
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from '../inteterfaces/subject';
import { Chapter } from '../inteterfaces/chapter';
import { Question } from '../inteterfaces/question';
import * as _ from "lodash";
import { DocumentReference } from '@firebase/firestore-types';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-test-step1',
  templateUrl: './test-step1.component.html',
  styleUrls: ['./test-step1.component.css']
})
export class TestStep1Component implements OnInit {
  TestList: AngularFireList<any>;
  dataObj2: any;
  numoftestid: any;

  cat: any;
  selectcat: any;
  numOfitem: any;
  array_numOfitem = [];
  SelectThisCategory = [];
  SelectTopic: any;
  InputDescription: any;
  SelectNumofItem: any;
  ADDtopic_id: any;
  ADDarrayquestion_id = [];
  ADDarrayKey_cate: any;
  // for (const x in data) {
  //   if (data.hasOwnProperty(x)) {
  //     this.allDatabaseAssignment.push(data[x].dbname);   //ดึง dbname ออกมาใส่ใน array
  // }
  // }
  CategoryList: AngularFireList<any>;
  dataObj: Observable<any>;
  arrayKey_cate = [];   //array สำหับคีย์ของหมวดหมู่นั้น
  arrayVal_cate = [];   //array สำหรับแสดงหมวดหมู่
  arrayTopic_name = [];
  arrayNum_question = [];
  arrayquestion_id = [];
  choice_type: any;
  display_choice_type: any;
  display_arr_choice_type = [];

  ////new
  subjectList: Observable<Subject[]>;           //ชื่อsubjectที่นำไปแสดง
  chapterRefLocal: AngularFirestoreDocument<Chapter>
  chapterObservable: Observable<Chapter>
  chapterList: Observable<Chapter[]>;

  questionAllList = [];
  questionData: any;
  amount: number;
  amountList = [];
  subCode: any;
  chapterCode: any;
  questionTmp = [];

  SelectCategory = "";
  NumOfItemThis: any;

  questionCollection: AngularFirestoreCollection<Question>;
  chapterRef: AngularFirestoreDocument<Chapter>
  question_type: any;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private firebaseService: FirebaseService ,private router: Router) {
    /*
        this.CategoryList = this.db.list('/Category');
        this.dataObj = this.CategoryList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    
        let ref = this.db.database.ref('/Category').on("child_added", (snapshotChanges) => {
          console.log(snapshotChanges.key + ":" + snapshotChanges.val());
          this.arrayKey_cate.push(snapshotChanges.key);
          this.arrayVal_cate.push(snapshotChanges.val());
          // console.log(this.arrayKey_cate);
          // console.log(this.arrayVal_cate);
        });
    
        this.dataObj.forEach(data => {
          console.log(data);
          console.log("--------");
        });
    
        //
        this.TestList = this.db.list('/Test');  //Display Student  //เรียงตาม Student ID
        this.dataObj2 = this.TestList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
          // console.log("eiei: "+ this.dataObj);
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        // console.log(this.dataObj2);
    
        this.dataObj2.forEach((data, index) => {
          this.numoftestid = data.length + 1;
          console.log(this.numoftestid);
    
        });
        //
        */
    //subject
    const subjectRef: AngularFirestoreCollection<Subject> = this.afs.collection<Subject>(`/subjects`);
    this.subjectList = subjectRef.valueChanges()
    // this.subjectList.forEach(sub=>{
    //   console.log(sub);

    //   console.log(sub.length)
    //   if(sub.length>0 || !null|| !undefined){
    //     console.log(sub[0]);
    //     this.SelectCategory= sub[0].code;
    //     console.log(this.SelectCategory);
    //     this.onChange(sub[0].code);
    //   }
    // })
  }

  //-------function เมื่อเลือกCatagory select
  onChange(code) {
    this.SelectTopic = "";
    this.subCode = code.code;
    console.log(this.subCode);

    const chapterRef: AngularFirestoreCollection<Chapter> = this.afs.collection<Chapter>(`/subjects/${this.subCode}/chapters/`);
    this.chapterList = chapterRef.valueChanges()

    this.array_numOfitem = [];
    // this.choice_type = "";
    // this.array_numOfitem = [];
    // this.arrayTopic_name = [];
    // this.arrayNum_question = [];
    // this.display_arr_choice_type = [];
    // this.arrayquestion_id = [];
    // this.SelectTopic = "";
    // this.ADDarrayKey_cate = this.arrayKey_cate[index];
    // console.log(this.arrayKey_cate[index]);

    // this.arrayVal_cate[index].topic_id.forEach(item => {
    //   let path = 'Topics/' + item;
    //   // let tmp = this.db.list(path);

    //   let ref = this.db.database.ref(path).on("child_added", (snapshotChanges) => {

    //     if (snapshotChanges.key == "topic_name") {
    //       this.arrayTopic_name.push(snapshotChanges);
    //       // console.log(this.arrayTopic_name);  
    //     }
    //     else if (snapshotChanges.key == "num_question") {
    //       this.arrayNum_question.push(snapshotChanges);
    //     }
    //     else if (snapshotChanges.key == "choice_type") {
    //       this.choice_type = snapshotChanges.val();
    //       console.log(snapshotChanges.val());

    //       switch (this.choice_type) {
    //         case 1: {
    //           this.display_choice_type = "คำตอบสั้น";
    //           break;
    //         }
    //         case 2: {
    //           this.display_choice_type = "2 ตัวเลือก";
    //           break;
    //         }
    //         case 3: {
    //           this.display_choice_type = "3 ตัวเลือก";
    //           break;
    //         }
    //         case 4: {
    //           this.display_choice_type = "4 ตัวเลือก";
    //           break;
    //         }
    //       }
    //       console.log(this.display_choice_type);
    //       this.display_arr_choice_type.push(this.display_choice_type);
    //     }

    //     else if (snapshotChanges.key == "question_id") {
    //       this.arrayquestion_id.push(snapshotChanges);
    //     }
    //   });
    // });
  }

  //-------function เมื่อเลือก Chapter select แล้วแสดงส่วนของ Number of items
  numQuestion(chCode) {
    // console.log(chCode);
    // console.log(chCode.code);
    this.chapterCode = chCode.code;
    // console.log(chCode.name);
    let questionPath = chCode.questions.path;
    // console.log(questionPath);

    let questionDoc: AngularFirestoreDocument<Question> = this.afs.doc<Question>(`${questionPath}`)
    let questions = questionDoc.valueChanges();
    questions.forEach(data => {
      // console.log(data);
      this.questionData = data;
      this.amount = data.amount;
      console.log("typeeee" + data.type);
      this.question_type = data.type;
      ///////////////////////////////////////////////////////////มันผิด
      // console.log(data);
      console.log(data.question);
      // console.log(Object.values(data.question));
      this.questionAllList = Object.values(data.question)
      //  console.log(data.question[2]);
      // this.questionAllList = Object.values(data.question)   // มันเอามาแต่ value ไม่เอา key มา obj to array ex.:{0: {…}, 1: {…}, 2: {…}, 3: {…}, 4: {…}} => [{…}, {…}, {…}, {…}, {…}]
      console.log(this.questionAllList);

      this.amountList = [];
      for (var i = 1; i <= this.amount; i++) {
        this.array_numOfitem.push(i);
      }
    })
  }

  StartSelectTest(data: NgForm) {
    if (this.SelectCategory == "" || this.SelectTopic == undefined || this.InputDescription == undefined||this.InputDescription =="") {
      alert("Please enter all fields.");
    } else {
      let c = confirm("Are you sure to go to the next step?");
      if (c == true) {
        this.questionTmp = [];
        console.log("is meeeee");
        console.log(data.value);
        console.log(this.questionAllList);

        console.log(this.SelectNumofItem);
        if (this.SelectNumofItem == "" || this.SelectNumofItem == undefined) {
          this.NumOfItemThis = 1;
        } else {
          this.NumOfItemThis = this.SelectNumofItem;
        }
        if (this.NumOfItemThis == this.amount) {
          this.questionTmp = this.questionAllList;
          console.log(this.questionTmp);

        } else {
          let rand = -1;
          console.log("rand");

          console.log(rand);
          let i = 0;
          this.questionTmp = [];
          while (i < this.NumOfItemThis) {
            // rand = Math.floor(Math.random() * this.numOfitem);
            while (this.questionAllList[rand] == 0 || this.questionAllList[rand] == undefined) {
              // Math.floor(Math.random() *  max);
              rand = Math.floor(Math.random() * this.amount);
              //  console.log("random: " + rand);
            }
            // console.log("this " + this.questionAllList[rand]);
            // console.log("rand " + rand);
            this.questionTmp.push(this.questionAllList[rand]);
            console.log(this.questionTmp);
            this.questionAllList[rand] = 0;
            i++;
          }
        }
        //make type string to number
        let numOfItemThis_num = +  this.NumOfItemThis;

        //ต้องการ pack เพื่อส่งในใช้ใน test stap อื่นได้
        let arrayTest1pack = [];
        arrayTest1pack.push(this.SelectCategory, this.SelectTopic, numOfItemThis_num, this.InputDescription, this.questionTmp, this.question_type);
        console.log(arrayTest1pack);

        this.firebaseService.arrayTest1 = arrayTest1pack;     //โดยขึ้นไปใน service เพื่อให้ใช้ได้ทุก component

        //clear
        this.chapterList = null;
        this.questionTmp = [];
        this.array_numOfitem = [];
        this.SelectThisCategory = [];
        this.SelectCategory = "";
        this.SelectTopic = undefined;
        this.SelectNumofItem = "";
        this.InputDescription = "";
      
      // /dashboard/test/test-step2
      this.router.navigate(['dashboard','test','test-step2'])
    }
  }
}
  clearTest1() {
    // alert("clear");
    let c = confirm("confirm to clear this form");
    if (c == true) {
      this.chapterList = null;
      this.questionTmp = [];
      this.array_numOfitem = [];
      this.SelectThisCategory = [];
      this.SelectCategory = "";
      this.SelectTopic = undefined;
      this.SelectNumofItem = "";
      this.InputDescription = "";
    }
  }


  ngOnInit() { }

}
