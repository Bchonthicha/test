import { StudentCheckBox } from './../inteterfaces/student-check-box';

import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Section } from '../inteterfaces/section';
import * as _ from 'lodash';
import { Student } from '../inteterfaces/student';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  name:string
  routeSubscribe:any
  studentCollection: AngularFirestoreCollection<Student>; 
  sectionRef: AngularFirestoreDocument<Section>
  sectionObservable: Observable<Section>
  membersRef: any
  members: Observable<Student>[]
  
  // Temporary Variable
  newStudentList: any
  currentStudent: any
  newMembers: any
  isSelect:boolean
  constructor(private route: ActivatedRoute, private router: Router, private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.Refresh();
    });
  }

  Refresh(){
    this.studentCollection = this.afs.collection<Student>('/students', ref => ref.orderBy('code'));
    this.sectionRef = this.afs.doc<Section>(`/sections/${this.name}`)
    this.sectionObservable = this.sectionRef.valueChanges()
    // Extract Ref to Student Object 
    this.sectionObservable.forEach(section => {
       if(section && section.members){
         this.membersRef = section.members;
         this.members = _.map(section.members, student => {
           // Wait for update to support DocumentRef as input
           // return this.afs.doc(student).valueChanges()
           return this.afs.doc(student.path).valueChanges() 
         });
       }

      this.studentCollection.valueChanges().forEach(students => {
        students = _.remove(students, student => {
          let result = _.findIndex(this.membersRef, stu => {
            return stu.id == student.code
          })
          return result == -1
        })
        this.newStudentList =  _.map(students, student => {
          return <StudentCheckBox> student;
        })
        console.log(this.newStudentList)
      })
    })

    

    this.currentStudent = null;
    this.newMembers = null;
  }

  preAddStudentDialog(){
    this.isSelect = false
  }

  addSelectAll(){
    this.newStudentList = _.map(this.newStudentList, (student:StudentCheckBox) => {
        student.selected = this.isSelect;
        return student;
    });
  }

  addStudentGroup(){
    this.newMembers = this.membersRef
    _.each(this.newStudentList, (student:StudentCheckBox) => {
      if(student.selected){
        let studentDoc:AngularFirestoreDocument<Student> = this.afs.doc<Student>(`/students/${student.code}`)
        this.newMembers.push(studentDoc.ref)
      }
    });
    const section = {
      members: this.newMembers
    }
    this.sectionRef.update(section).then(() => {
      this.Refresh()
    })
  }

  preRemoveStudent(studentCode){    
    this.currentStudent = studentCode;
  }

  removeStudent(){
    if(this.currentStudent){
      this.newMembers = []
      _.each(this.membersRef, studentRef => {
        if(studentRef.id != this.currentStudent){
          this.newMembers.push(studentRef)
        }
      });
      const section = {
        members: this.newMembers
      }
      this.sectionRef.update(section).then(() => {
        this.Refresh()
      })
    }
  }

  deleteGroup(){
    this.sectionRef.delete()
    this.backGroupListPage();
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  backGroupListPage(){
    this.router.navigate(['dashboard', 'manage-std-group'])
  }

}
