import { Student } from './../inteterfaces/student';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  studentRef: AngularFirestoreDocument<Student>
  // Firestore database observable
  students: Observable<Student[]>;


  studentNameLocal: any;
  studentFullNameLocal: any;
  studentCodeLocal: any;
  removeCode: string;

  // Form ngModel
  newStudentCode: string;
  newStudentName: string;
  newFullName: string;
  //upload file
  selectedFiles: FileList
  currentFileUpload: FileUpload
  // progress: { percentage: number } = { percentage: 0 }
  studentsCode = [];
  studentsCheck = [];
  studentAddcheck: boolean = true;

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private uploadService: UploadFileService) {
    this.studentsCheck = [];
    this.studentsCode = [];

    this.studentCollection = afs.collection<Student>('/students', ref => ref.orderBy('code'))
    this.students = this.studentCollection.valueChanges()

    this.students.forEach(data => {
      //console.log(data);
      data.forEach(data1 => {
        // console.log(data1.code);
        this.studentsCheck.push(data1);
        this.studentsCode.push(data1.code)
      })
    })

  }

  getStudent() {

  }

  DefaultModal() {
    this.newStudentCode = "";
    this.newStudentName = "";
    this.newFullName = "";
  }

  //upload file picture student
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  addNewStudent() {
    let count;
    let splitted;
    let nickname;

    if (this.selectedFiles == undefined || this.newStudentCode == "" || this.newFullName == "") {
      swal({
        type: 'error',
        title: 'Unsuccessful',
        text: 'Please enter all fields.',
        // showConfirmButton: false,
        // timer: 1500
      })
    } else {
      //Add item with Custom IDs In Firebase
      //ไม่มีวิชาในระบบ
      nickname = this.newStudentName;
      if (this.newStudentName == "") {
        splitted = this.newFullName.split(" ", 2)
        nickname = splitted[0];
      }
      if (this.studentsCheck.length == 0) {
        this.studentAddcheck == false;
        count = 0;

      } else {
        this.studentsCheck.forEach(data => {


          if (data.code == this.newStudentCode) {
            swal({
              type: 'error',
              title: 'Unsuccessful',
              text: 'This code already exists.',
              // showConfirmButton: false,
              // timer: 1500
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
          name: this.newFullName,
          nickname: nickname,
          url: null
        }

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

    this.studentNameLocal = student.nickname;
    this.studentFullNameLocal = student.name;

    this.studentCodeLocal = student.code;
  }

  // Update student name or picture file this key
  UpdateStudent() {
    let nickname;

    if (this.studentFullNameLocal == "") {
      swal({
        type: 'error',
        title: 'Unsuccessful',
        text: 'Please enter subject name.',
        // showConfirmButton: false,
        // timer: 1500
      })
    } else {
      nickname = this.studentNameLocal;
      
      if (this.studentNameLocal == "" ||this.studentNameLocal== undefined) {
        let splitted = this.studentFullNameLocal.split(" ", 2)
        nickname = splitted[0];
      }
      
      const studentUpdate = {
        name: this.studentFullNameLocal,
        nickname: nickname
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
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  deleteAll() {
    //console.log( this.studentsCheck);

    this.studentsCode.forEach(code => {
      // console.log(code);
      let stuRef = this.afs.doc<Student>(`/students/${code}`)
      stuRef.delete().then(() => {

      })
    })
    swal({
      type: 'success',
      title: 'Successful',
      showConfirmButton: false,
      timer: 1500
    })
  }
  uploadFile() {
    console.log("uploadFile");

  }
}