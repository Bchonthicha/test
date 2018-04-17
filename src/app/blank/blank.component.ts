import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Exam } from '../inteterfaces/exam';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {
  examPause=[];
  ExamList: Observable<Exam[]>;
  
  constructor(private afs: AngularFirestore, private router: Router, private firebaseService: FirebaseService) { 
    this.examPause=[];
    //Exam
    const ExamRef: AngularFirestoreCollection<Exam> = this.afs.collection<Exam>(`/exam`);
    this.ExamList = ExamRef.valueChanges()

    this.ExamList.subscribe(data => {
      console.log(data);
      data.forEach(d => {
        console.log(d.status);
        if (d.status == "pause") {
          console.log(d);
          this.examPause.push(d);
        }
      })
      // console.log(data.status);

    })
  }

  ngOnInit() {
  }
  createTest(){
    console.log("createTest");
    this.router.navigate(['dashboard','test']) 
    
  }
  goToQuiz(exam_code){

    console.log("goToQuiz");
    console.log(exam_code);
    
    this.firebaseService.Test_id_new = exam_code;
    //update examStatus
    const statusUpdate = {
      status: "active"
    };
    
    const examRef = this.afs.doc<Exam>(`exam/${exam_code}`);
    examRef.update(statusUpdate).then(() => {
      //go to display scores page  
      this.examPause=[];
      this.router.navigate(['dashboard','test','quiz']) 
    });
    
    
    
  }
}
