import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from '../inteterfaces/subject';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../inteterfaces/chapter';

@Component({
  selector: 'app-delete-test',
  templateUrl: './delete-test.component.html',
  styleUrls: ['./delete-test.component.css']
})
export class DeleteTestComponent implements OnInit {
  subjectList: Observable<Subject[]>;
  chapterList: Observable<Chapter[]>;
  Subject_Code: any;
  arrSubDisplay = [];
  constructor(private afs: AngularFirestore) {
    //subject
    const subjectRef: AngularFirestoreCollection<Subject> = this.afs.collection<Subject>(`/subjects`);
    this.subjectList = subjectRef.valueChanges()
    this.subjectList.forEach(subject => {
      // console.log(subject);
      subject.forEach(sub => {
        // console.log(sub.code);
        const chapterRef: AngularFirestoreCollection<Chapter> = this.afs.collection<Chapter>(`/subjects/${sub.code}/chapters/`);
        this.chapterList = chapterRef.valueChanges()

        this.chapterList.forEach(chap => {
          console.log(chap);
          let objSubDisplay = {
            code: sub.code,
            name: sub.name,
            chapter: chap
          }
          console.log(objSubDisplay);
          
          this.arrSubDisplay.push(objSubDisplay);
        })

        // this.chapterList.forEach(chap => {
        //   console.log(chap);

        // })
      })

    })
  }

  ngOnInit() {
  }
  setRemoveSubjectCode(subCode){
console.log(subCode);

  }
  setRemoveChapterCode(subCode,ChapCode){
console.log(subCode+"===="+ChapCode);

  }
}
