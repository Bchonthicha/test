
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Section } from '../inteterfaces/section';

import { Student } from '../inteterfaces/student';
import { StudentCheckBox } from '../inteterfaces/student-check-box';
import * as _ from "lodash";

import { DocumentReference } from '@firebase/firestore-types';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  name: string
  routeSubscribe: any;
  sectionRef: AngularFirestoreDocument<Section>
  sectionObservable: Observable<Section>

  sectionObservable_detail: any

  // Firestore Collection Ref
  SectionCollection: AngularFirestoreCollection<Section>;

  // AngularFire Ref
  studentCollection: AngularFirestoreCollection<Student>;
  // Firestore database observable
  studentsObservable: Observable<Student[]>;

  studentList: StudentCheckBox[];
  //text box mask
  isSelect: boolean

  members: DocumentReference[];
  /////test
  group: any;

  constructor(private route: ActivatedRoute, private router: Router, private afs: AngularFirestore) {

    this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'));
    this.studentsObservable = this.studentCollection.valueChanges();
    this.RefreshStudentList();


    // this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'))
    // this.students = this.studentCollection.valueChanges()

    // this.students.forEach(data => {
    //   //console.log(data);
    //   data.forEach(data1 => {
    //     console.log(data1.code);

    //   })
    // })
  }

  RefreshStudentList() {
    this.studentsObservable.forEach((students: Student[]) => {
      this.studentList = students.map((student: Student) => {
        return <StudentCheckBox>student;
      })
    })
  }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(params => {
      this.name = params['name'];

      console.log(this.name);  //section_name ex 123

      this.sectionRef = this.afs.doc<Section>(`/sections/${this.name}`)
      this.sectionObservable = this.sectionRef.valueChanges()

    });
  }
  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  backGroupListPage() {
    this.router.navigate(['dashboard', 'manage-std-group'])
  }

  delete_group() {
    //delete group
    console.log(this.name);

    this.afs.collection("sections").doc(this.name).delete()

    this.backGroupListPage();

  }

  display_add_student_in_group() {
    this.isSelect = false;
    this.studentList = _.map(this.studentList, (student: StudentCheckBox) => {
      student.selected = false;
      return student;
    });
  }

  createSelectAll() {
    this.studentList = _.map(this.studentList, (student: StudentCheckBox) => {
      student.selected = this.isSelect;
      return student;
    });
  }

  add_student_in_group() {


    //path to update
    const GroupRef = this.afs.doc<Section>(`sections/${this.name}`);
    this.group = GroupRef.valueChanges()

    console.log(this.group);
    this.group.forEach(data => {
      console.log(data.members);

    })
    // need to get members for push new member



    this.members = []
    let selectStudent = _.filter(this.studentList, (student: StudentCheckBox) => {

      return student.selected;
    });


    _.forEach(selectStudent, (student: StudentCheckBox) => {
      let studentDoc: AngularFirestoreDocument<Student> = this.afs.doc<Student>(`/students/${student.code}`)
      console.log(studentDoc.ref);

      this.members.push(studentDoc.ref);
    })

    console.log(this.members);

    // const GroupUpdate = {
    //   members: this.name
    // };

    //update data : members
    //  GroupRef.update(GroupUpdate);

  }
}
