import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Student } from '../inteterfaces/student';
import { StudentCheckBox } from '../inteterfaces/student-check-box';
import * as _ from "lodash";
import { Section } from '../inteterfaces/section';
import { DocumentReference } from '@firebase/firestore-types';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-manage-std-group',
  templateUrl: './manage-std-group.component.html',
  styleUrls: ['./manage-std-group.component.css']
})
export class ManageStdGroupComponent implements OnInit {
  // AngularFire Ref
  studentCollection: AngularFirestoreCollection<Student>;
  // Firestore database observable
  studentsObservable: Observable<Student[]>;

  studentList: StudentCheckBox[];
  studentSelect: Student[];
  members: DocumentReference[];

  groupList: Observable<Section[]>;

  // Modal Bind
  groupName: string
  isSelect: boolean

  qroupsCheck = [];
  qroupsCheckAdd: boolean = true;

  ngOnInit() {
  }

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private router: Router) {
    this.qroupsCheck = [];
    this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'));
    this.studentsObservable = this.studentCollection.valueChanges();
    this.RefreshStudentList();

    const sectionRef: AngularFirestoreCollection<Section> = this.afs.collection<Section>(`/sections`);
    this.groupList = sectionRef.valueChanges()
    this.groupList.forEach(data => {

      data.forEach(data1 => {
        console.log(data1);
        this.qroupsCheck.push(data1)
      })
    })
  }

  RefreshStudentList() {
    this.studentsObservable.forEach((students: Student[]) => {
      this.studentList = students.map((student: Student) => {
        return <StudentCheckBox>student;
      })
    })
  }

  StartAddGroupModal() {
    this.groupName = ""
    this.isSelect = false;
    this.studentList = _.map(this.studentList, (student: StudentCheckBox) => {
      student.selected = false;
      return student;
    });
  }

  createSelectAll() {
    this.studentList = _.map(this.studentList, (student: StudentCheckBox) => {
      student.selected = this.isSelect;
      // console.log(student.code);

      return student;
    });
  }

  createGroup() {
    //  console.log(this.qroupsCheck.length)
    let count;
    this.members = []
    let selectStudent = _.filter(this.studentList, (student: StudentCheckBox) => {

      return student.selected;
    });
    console.log(selectStudent.length);

    if (this.groupName == "" || selectStudent.length == 0) {
      swal({
        type: 'error',
        title: 'Unsuccessful',
        text: 'Please enter all fields or select student.',
        // showConfirmButton: false,
        // timer: 1500
      })
    } else {
      if (this.qroupsCheck.length == 0) {
        this.qroupsCheckAdd == false;
        count = 0;

      } else {
        this.qroupsCheck.forEach(data => {

          if (data.name == this.groupName) {
            // alert("Unsuccessful : This code already exists.");
            swal({
              type: 'error',
              title: 'Unsuccessful',
              text: 'This name already exists.',
              // showConfirmButton: false,
              timer: 1500
            })
            this.qroupsCheckAdd = true;
            count = 1;
          } else {
            this.qroupsCheckAdd = false;
          }
        })
      }
      if(this.qroupsCheckAdd == false && count != 1){
            _.forEach(selectStudent, (student: StudentCheckBox) => {
          let studentDoc: AngularFirestoreDocument<Student> = this.afs.doc<Student>(`/students/${student.code}`)
          this.members.push(studentDoc.ref);
        })

        let section: Section = {
          name: this.groupName,
          members: this.members
        }
        const sectionRef: AngularFirestoreDocument<Section> = this.afs.doc<Section>(`/sections/${this.groupName}`);
        sectionRef.set(section);

        swal({
          type: 'success',
          title: 'Successful',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  goGroupDetail(name: string) {
    console.log("goGroupDetail" + name);    //section name ที่ section1

    this.router.navigate(['dashboard', 'group', name]) //ไป path : /dashboard/group/group_name ที่คลิกเลือก
  }
}