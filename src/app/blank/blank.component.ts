import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Exam } from '../inteterfaces/exam';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../services/firebase.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {
  examPause = [];
  ExamList: Observable<Exam[]>;

  isDisplayPause: boolean = true;

  constructor(private afs: AngularFirestore, private router: Router, private firebaseService: FirebaseService) {

    //Exam

    const ExamRef: AngularFirestoreCollection<Exam> = this.afs.collection<Exam>(`/exam`);
    this.ExamList = ExamRef.valueChanges()

    this.ExamList.subscribe(data => {
      // console.log(data);  
      this.examPause = [];
      data.forEach(d => {
        // console.log(d.status);
        if (d.status == "pause") {
        
          this.examPause.push(d);
        }
      })

      // console.log(this.examPause.length);
      if (this.examPause.length == 0) {
        this.isDisplayPause = false;
      }
    })
  }

  ngOnInit() {
  }
  createTest() {
    console.log("createTest");
    this.router.navigate(['dashboard', 'test'])

  }
  goToQuiz(exam_code) {

    swal({
      title: 'Are you sure?',
      text: "take this Quiz!",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, take it!'
    }).then((result) => {
      if (result.value) {
        console.log(exam_code);
        let examCode;
        examCode = exam_code
        this.firebaseService.Test_id_new = examCode;
        this.examPause = [];
        //update examStatus
        const statusUpdate = {
          status: "active"
        };

        const examRef = this.afs.doc<Exam>(`exam/${examCode}`);
        examRef.update(statusUpdate).then(() => {
          //go to display scores page  
          this.examPause = [];
          this.router.navigate(['dashboard', 'test', 'quiz'])
        });
      }
    })
  }
}
