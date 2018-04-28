import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from '../inteterfaces/subject';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../inteterfaces/chapter';
import { Question } from '../inteterfaces/question';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  arrSubDisplay = [];
  subjectList: Observable<Subject[]>;
  chapterList: Observable<Chapter[]>;
  SubjectName: any;
  SubjectCode: any;

  subjectNameLocal: any;
  subjectCodeLocal: any;

  constructor(private afs: AngularFirestore, private router: Router) {
    //subject
    this.Refresh();
  }
  Refresh() {
    this.arrSubDisplay = [];
    const subjectRef: AngularFirestoreCollection<Subject> = this.afs.collection<Subject>(`/subjects`);
    this.subjectList = subjectRef.valueChanges()
    this.subjectList.forEach(subject => {
      // console.log(subject);
      subject.forEach(sub => {
        console.log(sub.code);
        const chapterRef: AngularFirestoreCollection<Chapter> = this.afs.collection<Chapter>(`/subjects/${sub.code}/chapters/`);
        this.chapterList = chapterRef.valueChanges()

        this.chapterList.forEach(chap => {
          //  console.log(chap);
          let objSubDisplay = {
            code: sub.code,
            name: sub.name,
            chapter: chap
          }
          // console.log(objSubDisplay);

          this.arrSubDisplay.push(objSubDisplay);
          // console.log(this.arrSubDisplay);
          
        })

        // this.chapterList.forEach(chap => {
        //   console.log(chap);

        // })
      })

    })
  }
  setSubjectEdit(subject: Subject) {
console.log(subject);


    this.subjectNameLocal = subject.name;
    this.subjectCodeLocal = subject.code;
  }


  goEdiTtestDetail(subject, Chapter) {
    let subjectCode = subject.code;
    let subjectName = subject.name;
    let ChapterCode = Chapter.code;

    localStorage.setItem('subjectKey', subjectCode);
    localStorage.setItem('subjectName', subjectName);
    localStorage.setItem('chapterKey', ChapterCode);
    localStorage.setItem('chapterName', Chapter.name);

    let subjectChapCode = "Subject" + subjectCode + "Chapter" + ChapterCode;
    this.router.navigate(['dashboard', 'manage-test', 'edit', subjectChapCode]) //ไป path : /dashboard/group/group_name ที่คลิกเลือก

  }
  UpdateSubject() {


    if (this.subjectNameLocal == "") {
      alert("Unsuccessful : Please enter subject name.");
    } else {
      console.log("UpdateSubject");

      const subjectUpdate = {
        name: this.subjectNameLocal
      };
      //path to update
      const subjectRef = this.afs.doc<Subject>(`subjects/${this.subjectCodeLocal}`);
      //update data : student_name
      subjectRef.update(subjectUpdate).then(() => {
        console.log("update Subject");

        this.Refresh()
      });
    }
  }

  ngOnInit() {
  }

}
