import { Student } from './../inteterfaces/student';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
//upload file

import { UploadFileService } from '../services/upload-file.service';
import { FileUpload } from './fileupload';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  ngOnInit(): void {
  }
  // Firestore Collection Ref
  studentCollection: AngularFirestoreCollection<Student>;
  
  // Firestore database observable
  students: Observable<Student[]>;
  
  studentLocal: Student = {code: null, name: null, url: null};
  removeCode:string;

  // Form ngModel
  newStudentCode: string;
  newStudentName: string;
  //upload file
  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: { percentage: number } = { percentage: 0 }

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private uploadService: UploadFileService) {

    this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'))
    this.students = this.studentCollection.valueChanges()

  }

  getStudent() {

  }

  DefaultModal() {
    this.newStudentCode = "";
    this.newStudentName = "";
  }

  //upload file
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  
  addNewStudent() {
    //Add item with Custom IDs In Firebase
    const id = this.newStudentCode;
    const student: Student = {
      code: this.newStudentCode,
      name: this.newStudentName,
      url: null
    }

    const studentCollection = this.afs.collection<Student>('students');
    studentCollection.doc(id).set(student);

    
    if(this.selectedFiles){
      const file = this.selectedFiles.item(0)
      this.currentFileUpload = new FileUpload(file)
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, id)
      this.selectedFiles = null;
    }
    
  }

  //----Update
  //Set data Edit to modal
  setModalData(student: Student) {
    this.studentLocal = student;
  }
  // Update this key
  UpdateStudent() {
    
    const studentUpdate = {
      name: this.studentLocal.name
    };

    const studentRef = this.afs.doc<Student>(`students/${this.studentLocal.code}`);
    studentRef.update(studentUpdate);

    //upload file
    if(this.selectedFiles){
      const file = this.selectedFiles.item(0);
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.studentLocal.code);
      this.selectedFiles = null;
    }
  }

  //----Delete
  //Set data delete to modal
  setRemoveCode(code) {
    this.removeCode = code
  }

  removeStudent() {
    this.studentCollection.doc(this.removeCode).delete()
    //Delete picture
     this.uploadService.delteUserImage(this.removeCode);
  }

}