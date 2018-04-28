import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from '../inteterfaces/subject';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../inteterfaces/chapter';
import { Question } from '../inteterfaces/question';
import swal from 'sweetalert2'

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
  subCode_del: any;
  chapCode_del: any;
  chapInSubCode_del: any;

  constructor(private afs: AngularFirestore) {
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
        // console.log(sub.code);
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
        })

        // this.chapterList.forEach(chap => {
        //   console.log(chap);

        // })
      })

    })
  }
  ngOnInit() {
  }
  setRemoveSubjectCode(subCode, chapList) {
    this.chapInSubCode_del = chapList;
    this.subCode_del = subCode;

  }

  RemoveSubject() {
    console.log("delll => " + this.subCode_del);
    this.chapInSubCode_del.forEach((chapter, index) => {
      console.log(chapter.code);
      const SubChapCode = this.subCode_del + "_" + chapter.code;
      console.log(SubChapCode);

      const subjectRef: AngularFirestoreDocument<Chapter> = this.afs.doc<Chapter>(`/subjects/${this.subCode_del}/chapters/${chapter.code}`)
      subjectRef.delete();

      const questionRef: AngularFirestoreDocument<Question> = this.afs.doc<Question>(`/questions/${SubChapCode}`)
      questionRef.delete();

    })
    const subjectRef: AngularFirestoreDocument<Subject> = this.afs.doc<Subject>(`/subjects/${this.subCode_del}`)
    subjectRef.delete().then(() => {
      console.log("RemoveSubject");

      this.Refresh()
    });
    swal({
      type: 'success',
      title: 'Removed',
      showConfirmButton: false,
      timer: 1500
    })
  }
  setRemoveChapterCode(subCode, ChapCode) {
    console.log(subCode + "====" + ChapCode);
    this.subCode_del = subCode;
    this.chapCode_del = ChapCode;

  }
  RemoveChapter() {
    console.log("delll => " + this.chapCode_del + "in" + this.subCode_del);

    const subjectRef: AngularFirestoreDocument<Chapter> = this.afs.doc<Chapter>(`/subjects/${this.subCode_del}/chapters/${this.chapCode_del}`)
    subjectRef.delete().then(() => {
      console.log("RemoveChapter");

      this.Refresh()
    })

    const SubChapCode = this.subCode_del + "_" + this.chapCode_del;
    console.log(SubChapCode);

    const questionRef: AngularFirestoreDocument<Question> = this.afs.doc<Question>(`/questions/${SubChapCode}`)
    questionRef.delete();
    swal({
      type: 'success',
      title: 'Removed',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
