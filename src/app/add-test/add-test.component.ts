import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { NgForm } from '@angular/forms';
import * as XLSX from 'ts-xlsx';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

import * as _ from "lodash";
import { ViewChild } from '@angular/core';
import { subQuestion } from '../inteterfaces/questionObjAdd';
import { Question } from '../inteterfaces/question';
import { Chapter } from '../inteterfaces/chapter';
import { Subject } from '../inteterfaces/subject';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentReference } from '@firebase/firestore-types';
import { log } from 'util';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddTestComponent implements OnInit {
  message = 'Uploading';
  showMessage: boolean = false;

  //value of ngModel
  Subject_Code: any;
  Subject_Name: any;
  chapter_Name: any;
  type = "";
  // uploadExcel: any;

  //excel convert
  arrayBuffer: any;
  file: File;
  array_excel = [];
  question_excel: subQuestion[];
  question_key: any;
  sub_question: subQuestion;
  questionAdd: Question;
  question_obj = {};
  amount: number;
  chapterAdd: Chapter;

  question_keyAdd: any;
  chapter_Code: any;
  @ViewChild('uploadExcel')
  myInputVariable: any;
  subjectAdd: Subject;
  subjectList: Observable<Subject[]>;           //ชื่อsubjectที่นำไปแสดง
  SelectSubject = "";
  chapterList: Observable<Chapter[]>;

  chapArr: Array<any>;
  chapLenght: any;

  newSubjectName: any;
  newSubjectCode: any;
  subCollection: AngularFirestoreCollection<Subject>;
  chapterCodeLast: any;
  
  constructor(private xlservice: ExcelService, private afs: AngularFirestore) {
    //subject
    const subjectRef: AngularFirestoreCollection<Subject> = this.afs.collection<Subject>(`/subjects`);
    this.subjectList = subjectRef.valueChanges()
    this.subCollection = afs.collection<Subject>('/subjects')
  }

  ngOnInit() {
  }
  //-------function เมื่อเลือกCatagory select
  onChange(sub) {
    console.log("change");
    this.Subject_Code = sub.code;
    this.Subject_Name = sub.name;

    const chapterRef: AngularFirestoreCollection<Chapter> = this.afs.collection<Chapter>(`/subjects/${this.Subject_Code}/chapters/`);
    this.chapterList = chapterRef.valueChanges()
    console.log(this.chapterList);

    this.chapterList.forEach(chap => {
      this.chapLenght = chap.length;
      
      // console.log(this.chapLenght);
      if (this.chapLenght == 0) {
        this.chapter_Code = "0";      ///makeeeeeeeeeeeeeeeeeeeee
        //make document key in questions
        this.question_keyAdd = this.Subject_Code + "_" + this.chapter_Code;
        console.log(this.question_keyAdd);
      } else {
        this.chapterCodeLast = chap[chap.length-1].code;
        this.chapterCodeLast = +this.chapterCodeLast;   //string to number
        // console.log(this.chapterCodeLast);
        this.chapter_Code = (this.chapterCodeLast + 1).toString();
        console.log(this.chapter_Code);
        this.question_keyAdd = this.Subject_Code + "_" + this.chapter_Code;
        console.log(this.question_keyAdd);
        // this.chapter_Code = "ch" + this.chapLenght;
        // //make document key in questions
        // this.question_keyAdd = this.Subject_Code + "_" + this.chapter_Code;
        // console.log(this.question_keyAdd);
      }
    })
  }
  DefaultModal() {
    console.log("DefaultModal")
    this.newSubjectName = "";
    this.newSubjectCode = "";
  }
  addNewSubject(data: NgForm) {
    console.log(this.newSubjectName);
    console.log(this.newSubjectCode);
    this.subjectAdd = {
      code: this.newSubjectCode,
      name: this.newSubjectName
    }
    //----Add subject detail in subject
    const subjectRef2: AngularFirestoreDocument<Subject> = this.afs.doc<Subject>(`/subjects/${this.newSubjectCode}`);
    subjectRef2.set(this.subjectAdd);
  }
  //---get json data from excel file
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  //---create new Test
  createNewTest() {

    //this.subCollection.doc("null").delete()

    this.array_excel = [];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.question_excel = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(this.question_excel);

      this.question_excel.forEach((question, index) => {
        this.amount = index + 1;
        console.log(question);
        console.log(index);
        this.question_key = index;
        console.log(this.question_excel[index].choice);

        //make array type of choice
        let choice_string = (this.question_excel[index].choice).toString();
        var re = /\s*,\s*/;
        var choice_arr = choice_string.split(re);

        //add sub question
        this.sub_question = {
          "answer": this.question_excel[index].answer,
          "choice": choice_arr,
          "key": this.question_key,
          "question": this.question_excel[index].question

        }
        // console.log(this.sub_question);
        this.question_obj[this.question_key] = this.sub_question;
        console.log(this.question_obj);

      })



      //make type string tp number
      let type_num = +this.type;
      //console.log(type_num);

      this.questionAdd = {
        amount: this.amount,
        question: this.question_obj,
        type: type_num
      }
      console.log(this.questionAdd);
      //----Add data in questions ,document key=subCode_chapterCode
      const questionRef: AngularFirestoreDocument<Question> = this.afs.doc<Question>(`/questions/${this.question_keyAdd}`);
      questionRef.set(this.questionAdd);

      let questionDoc: AngularFirestoreDocument<Question> = this.afs.doc<Question>(`/questions/${this.question_keyAdd}`)
      console.log(questionDoc.ref);

      console.log(this.chapter_Code);

      this.chapterAdd = {
        code: this.chapter_Code,
        name: this.chapter_Name,
        questions: questionDoc.ref
      }
      console.log(this.chapterAdd);

      //----Add chapter in subject
      const subjectRef: AngularFirestoreDocument<Chapter> = this.afs.doc<Chapter>(`/subjects/${this.Subject_Code}/chapters/${this.chapter_Code}`)
      subjectRef.set(this.chapterAdd);


    }

    fileReader.readAsArrayBuffer(this.file);
    //this.clearAddTest();
  }
  //---clear Manage Test page
  clearAddTest() {
    this.SelectSubject = "";
    this.Subject_Code = null;
    this.Subject_Name = null;
    this.chapter_Name = null;
    this.type = "";
    // this.myInputVariable.nativeElement.value = "";
  }

}
