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

import swal from 'sweetalert2'

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

  studentNameLocal: any;
  studentCodeLocal: any;
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
    this.studentsCheck = [];
    this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'))
    this.students = this.studentCollection.valueChanges()

    this.students.forEach(data => {
      //console.log(data);
      data.forEach(data1 => {
        // console.log(data1.code);
        this.studentsCheck.push(data1);
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
    let count;

    if (this.selectedFiles == undefined || this.newStudentCode == "" || this.newStudentName == "") {
      // alert("Unsuccessful : Please enter all fields.");
      swal({
        type: 'error',
        title: 'Unsuccessful',
        text: 'Please enter all fields.',
        // showConfirmButton: false,
        // timer: 1500
      })
    } else {
      //Add item with Custom IDs In Firebase
      console.log(this.newStudentCode);
      //ไม่มีวิชาในระบบ
      console.log(this.studentsCheck.length);

      if (this.studentsCheck.length == 0) {
        this.studentAddcheck == false;
        count = 0;

      } else {
        this.studentsCheck.forEach(data => {


          if (data.code == this.newStudentCode) {
            // alert("Unsuccessful : This code already exists.");
            swal({
              type: 'error',
              title: 'Unsuccessful',
              text: 'This code already exists.',
              // showConfirmButton: false,
              timer: 1500
            })
            this.studentAddcheck = true;
            count = 1;
          } else {
            this.studentAddcheck = false;
          }
        })
      }

      if (this.studentAddcheck == false && count != 1) {
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
        swal({
          type: 'success',
          title: 'Successful',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }

  }

  //----Update

  //Set data Edit to modal
  setModalData(student: Student) {
    //console.log(student);   //this student display ex. {code: "570510100", name: "มาลี ดีใจ", url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=e086515b-7369-4c47-a791-7b64ee5f35d3"}
    console.log(student);

    this.studentNameLocal = student.name;
    console.log(this.studentNameLocal);

    this.studentCodeLocal = student.code;
  }

  // Update student name or picture file this key
  UpdateStudent() {
    if (this.studentNameLocal == "") {
      // alert("Unsuccessful : Please enter subject name.");
      swal({
        type: 'error',
        title: 'Unsuccessful',
        text: 'Please enter subject name.',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      const studentUpdate = {
        name: this.studentNameLocal
      };

      //path to update
      const studentRef = this.afs.doc<Student>(`students/${this.studentCodeLocal}`);
      //update data : student_name
      studentRef.update(studentUpdate);

      //upload picture file
      if (this.selectedFiles) {
        const file = this.selectedFiles.item(0);
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.studentCodeLocal);
        this.selectedFiles = null;
      }
      swal({
        type: 'success',
        title: 'Updated',
        showConfirmButton: false,
        timer: 1500
      })
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
    swal({
      type: 'success',
      title: 'Removed',
      showConfirmButton: false,
      timer: 1500
    })
  }

  test() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log(result.value);

        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}