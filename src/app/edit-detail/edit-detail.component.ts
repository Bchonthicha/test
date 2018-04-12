import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from "lodash";
import { ExcelService } from '../services/excel.service';
import { Subject } from '../inteterfaces/subject';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../inteterfaces/chapter';
import { Question } from '../inteterfaces/question';
import * as XLSX from 'ts-xlsx';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';
import { subQuestion } from '../inteterfaces/questionObjAdd';
import { ViewChild } from '@angular/core';
import { DocumentReference } from '@firebase/firestore-types';
import { log } from 'util';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditDetailComponent implements OnInit {

  Subject_Code: any;
  Subject_Name: any;
  Chapter_Code: any;
  chapter_Name: any;
  questionCode: any;
  type: any;
  amount: any;
  question: any;

  questionAllList = [];
  //
  arrayBuffer: any;
  file: File;
  question_excel: subQuestion[];
  question_key: any;
  sub_question: subQuestion;
  question_obj = {};
  questionAdd: Question;
  uploadExcel: any;
  @ViewChild('uploadExcel')
  myInputVariable: any;

  selectedFiles: FileList
  constructor(private xlservice: ExcelService, private route: ActivatedRoute, private router: Router, private afs: AngularFirestore) {

    this.Subject_Code = localStorage.getItem("subjectKey");
    this.Subject_Name = localStorage.getItem("subjectName");
    console.log(this.Subject_Code + "*********" + this.Subject_Name);

    this.Chapter_Code = localStorage.getItem("chapterKey");
    this.chapter_Name = localStorage.getItem("chapterName");

    this.questionCode = this.Subject_Code + "_" + this.Chapter_Code;
    console.log(this.questionCode);
    let questionDoc: AngularFirestoreDocument<Question> = this.afs.doc<Question>(`/questions/${this.questionCode}`)
    let questions = questionDoc.valueChanges();
    questions.forEach(data => {
      console.log(data);

      this.type = data.type;
      this.amount = data.amount;
      this.question = data.question;

      this.questionAllList = Object.values(data.question)
      console.log(this.questionAllList);
    });


  }

  ngOnInit() {

  }

  goBackEditTeste() {

    this.router.navigate(['dashboard', 'manage-test', 'Edit-Test'])

  }
  incomingfile(event) {
    this.file = event.target.files[0];
    this.selectedFiles = event.target.files;
  }
  updateTest() {
    console.log("UpdateSubject");
    //update data : chapter name
    const chapter_nameUpdate = {
      name: this.chapter_Name
    };
    const subjectRef = this.afs.doc<Chapter>(`subjects/${this.Subject_Code}/chapters/${this.Chapter_Code}`);
    subjectRef.update(chapter_nameUpdate);

    if (this.selectedFiles) {
      console.log("เลือก");

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
        // console.log(this.question_excel);

        this.question_excel.forEach((question, index) => {
          this.amount = index + 1;
          // console.log(question);
          // console.log(index);
          this.question_key = index;
          // console.log(this.question_excel[index].choice);

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
          // console.log(this.question_obj);

        })

        //make type string tp number
        let type_num = +this.type;
        this.questionAdd = {
          amount: this.amount,
          question: this.question_obj,
          type: type_num
        }
        console.log(this.questionAdd);

        const questionRef = this.afs.doc<Question>(`questions/${this.questionCode}`);
        questionRef.update(this.questionAdd);

      }
      fileReader.readAsArrayBuffer(this.file);

      this.selectedFiles = null;
    } else {

      console.log("ไม่ได้เลือก");

      //update data : chapter name
      const questionUpdate = {
        amount: this.amount,
        question: this.question,
        type: this.type
      };
      const questionRef = this.afs.doc<Question>(`questions/${this.questionCode}`);
      questionRef.update(questionUpdate);
    }

    this.goBackEditTeste();
  }

}
