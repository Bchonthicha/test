import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

import { FileUpload } from '../student-list/fileupload';
import { Student } from '../inteterfaces/student';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';



@Injectable()
export class UploadFileService {

  constructor(private afs: AngularFirestore) {}

  private basePath = '/students';
  // pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}, studentCode:string) {
  pushFileToStorage(fileUpload: FileUpload, studentCode:string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${studentCode}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        // progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        this.updateImageDb(fileUpload.url, studentCode)
      }
    );
  }

  private updateImageDb(url: string, studentCode:string) {
    const studentRef:AngularFirestoreDocument<Student> = this.afs.doc(`/students/${studentCode}`)
    studentRef.update({
      url: url
    })
  }


  //delete
  delteUserImage(studentCode:string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${studentCode}`).delete()
  }

}