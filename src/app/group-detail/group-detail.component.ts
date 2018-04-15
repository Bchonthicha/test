import { StudentCheckBox } from './../inteterfaces/student-check-box';
import { Student } from '../inteterfaces/student';
import { Section } from '../inteterfaces/section';

import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';



@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  name: string
  routeSubscribe: any
  studentCollection: AngularFirestoreCollection<Student>;
  sectionRef: AngularFirestoreDocument<Section>
  sectionObservable: Observable<Section>
  membersRef: any
  members: Observable<Student>[]

  // Temporary Variable
  newStudentList: any
  currentStudent: any
  newMembers: any
  isSelect: boolean

  constructor(private route: ActivatedRoute, private router: Router, private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(params => {
      console.log("params" +params+"++++"+params['name']);
      
      this.name = params['name'];   // ชื่อ section ที่เลือก
      this.Refresh();
    });
  }

  Refresh() {
    this.studentCollection = this.afs.collection<Student>('/students', ref => ref.orderBy('code'));
    this.sectionRef = this.afs.doc<Section>(`/sections/${this.name}`)
    this.sectionObservable = this.sectionRef.valueChanges()
    // Extract Ref to Student Object 
    this.sectionObservable.forEach(section => {
       if(section && section.members && section.members.length > 0){
         this.membersRef = section.members;  //member(student)อ้างอิง ที่อยู่ใน section.members
         this.members = _.map(section.members, student => { //syntex : _.map(collection, [iteratee=_.identity])
           // Wait for update to support DocumentRef as input
           // return this.afs.doc(student).valueChanges()
           return this.afs.doc(student.path).valueChanges() // student/path จาก student member in section ex. student/570510637
         });
       }else{
         this.membersRef = []
         this.members = []
       }

      this.studentCollection.valueChanges().forEach(students => {
        students = _.remove(students, student => {    //Removes all elements from array that predicate
          let result = _.findIndex(this.membersRef, stu => {
            //  console.log(student.code);
            if (stu.id == student.code) {             //test to display value
             // console.log(stu.id);
            }
            //
            return stu.id == student.code             //returns ค่า student ที่มีในกลุ่มนั้นๆแล้ว
          })
          return result == -1                         //returns truthy for and returns an array of the removed elements.
        })
        this.newStudentList = _.map(students, student => {
          // console.log(student);   //{code: "570510100", name: "มาลี ดีใจ", url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=e086515b-7369-4c47-a791-7b64ee5f35d3"}

          return <StudentCheckBox>student;
        })
      //  console.log(this.newStudentList)              //Student List ที่ยังไม่ได้ถูก add ในกลุ่มนั้นๆ สามารถเพิ่มเข้ามาในกลุ่ม
      })
    })



    this.currentStudent = null;
    this.newMembers = null;
  }

  preAddStudentDialog() {
    this.isSelect = false
  }

  addSelectAll() {
    this.newStudentList = _.map(this.newStudentList, (student: StudentCheckBox) => {     //syntex : _.map(collection, [iteratee=_.identity])
      student.selected = this.isSelect;
      console.log("-....-"+student);      //student ที่ถูกเลือก
      return student;
    });
  }

  addStudentGroup() {
    console.log("ole mem" + this.membersRef);

    this.newMembers = this.membersRef
    _.each(this.newStudentList, (student: StudentCheckBox) => {
      if (student.selected) {     //ถ้า checkbox ถูกเลือก
        let studentDoc: AngularFirestoreDocument<Student> = this.afs.doc<Student>(`/students/${student.code}`)
        this.newMembers.push(studentDoc.ref)
        console.log(this.newMembers);

      }
    });
    console.log("new mem" + this.newMembers);

    const section = {
      members: this.newMembers
    }
    this.sectionRef.update(section).then(() => {
      this.Refresh()
    })
  }

  preRemoveStudent(studentCode) {
    this.currentStudent = studentCode;
  }

  removeStudent() {
    if (this.currentStudent) {
      this.newMembers = []
      _.each(this.membersRef, studentRef => {
        if (studentRef.id != this.currentStudent) {
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

  deleteGroup() {
    this.sectionRef.delete()
    this.backGroupListPage();
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  backGroupListPage() {
    this.router.navigate(['dashboard', 'manage-student-group'])
  }

}
