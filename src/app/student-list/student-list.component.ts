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

  studentLocal: Student = { code: null, name: null, url: null };
  removeCode: string;

  // Form ngModel
  newStudentCode: string;
  newStudentName: string;
  //upload file
  selectedFiles: FileList
  currentFileUpload: FileUpload
  // progress: { percentage: number } = { percentage: 0 }

  studentsCheck = [];
  studentAddcheck: boolean = true;

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private uploadService: UploadFileService) {

    this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'))
    this.students = this.studentCollection.valueChanges()

    this.students.forEach(data => {
      //console.log(data);
      data.forEach(data1 => {
        // console.log(data1.code);
        // this.studentsCheck.push(data1);
      })
    })
  }

  getStudent() {

  }

  DefaultModal() {
    this.newStudentCode = "";
    this.newStudentName = "";
  }

  //upload file picture student
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  addNewStudent() {

    if (this.selectedFiles == undefined || this.newStudentCode == "" || this.newStudentName == "") {
      alert("Unsuccessful : Please enter all fields.");
    } else {
      //Add item with Custom IDs In Firebase
      // console.log(this.newStudentCode);
      // this.studentsCheck.forEach(data => {
      //   if (data.code == this.newStudentCode) {
      //     alert("Unsuccessful : This code already exists.");
      //   } else {
      //     this.studentAddcheck = false;
      //   }
      // })
      // if (this.studentAddcheck == false) {
        const id = this.newStudentCode;
        const student: Student = {
          code: this.newStudentCode,
          name: this.newStudentName,
          url: null
        }
        console.log(student);
        console.log(this.selectedFiles);

        const studentCollection = this.afs.collection<Student>('students');
        studentCollection.doc(id).set(student);

        //upload picture file
        if (this.selectedFiles) {
          const file = this.selectedFiles.item(0)
          this.currentFileUpload = new FileUpload(file)
          // this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, id)
          this.uploadService.pushFileToStorage(this.currentFileUpload, id)
          this.selectedFiles = null;
        }
      }

    // }

  }

  //----Update

  //Set data Edit to modal
  setModalData(student: Student) {
    //console.log(student);   //this student display ex. {code: "570510100", name: "มาลี ดีใจ", url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=e086515b-7369-4c47-a791-7b64ee5f35d3"}
    this.studentLocal = student;
  }

  // Update student name or picture file this key
  UpdateStudent() {

    const studentUpdate = {
      name: this.studentLocal.name
    };

    // console.log(studentUpdate); //obj student name (ex. {name: "มาลี ดีใจ"})
    // console.log(this.studentLocal.code);   //this student code (ex. 570510100)

    //path to update
    const studentRef = this.afs.doc<Student>(`students/${this.studentLocal.code}`);
    //update data : student_name
    studentRef.update(studentUpdate);

    //upload picture file
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.studentLocal.code);
      this.selectedFiles = null;
    }
  }

  //----Delete
  //Set data delete to modal
  setRemoveCode(code) {
    //student code to delete (ex. 570510100)
    this.removeCode = code
  }

  removeStudent() {
    //delete student
    this.studentCollection.doc(this.removeCode).delete()
    //Delete picture
    this.uploadService.delteUserImage(this.removeCode);
  }

}