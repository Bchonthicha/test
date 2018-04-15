import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirebaseService {
  public userLogin = "";

   public arrayTest1:any;
  // public arrayTest1 = ["category1", "T1", "3", "ทดลอง", ["Q3", "Q4", "Q5"]];    //เดิม
  // public arrayTest1 = [
  //   { code: "205100", name: "วิทยาศาสตร์" },
  //   { code: "0", name: "เซลล์", questions: "questions/205100_0" },
  //   3,
  //   "test na ja",
  //   [
  //     { answer: 2, choice: ["ผนังเซลล์", "แวคิวโอล", "คลอโรพลาสต์", "ไซโทพลาซึม"], code: "0", question: "การที่พืชสังเคราะห์อาหารได้เอง เพราะพืชมีโครงสร้างใด" },
  //     { answer: 3, choice: ["เซลล์เยื่อหอม", "เซลล์สาหร่ายหางกระรอก", "เซลล์ใบว่านกาบหอย", "เซลล์เยื่อบุข้างแก้ม"], code: "3", question: "เซลล์ใดต่อไปนี้มีลักษณะค่อนข้างกลม" },
  //     { answer: 1, choice: ["เยื่อด้านนอกของกาบใบ", "เยื่อด้านในของกาบใบ", "รากหอม", "ลำต้น"], code: "1", question: "“เซลล์เยื่อหอม” หมายถึงส่วนใดของหัวหอม" }
  //   ],
  //   3
  // ];
  public arrayTest2 :any;
  // public arrayTest2 = [
  //   { answer: 2, choice: ["ผนังเซลล์", "แวคิวโอล", "คลอโรพลาสต์", "ไซโทพลาซึม"], code: "0", question: "การที่พืชสังเคราะห์อาหารได้เอง เพราะพืชมีโครงสร้างใด" },
  //   { answer: 1, choice: ["เยื่อด้านนอกของกาบใบ", "เยื่อด้านในของกาบใบ", "รากหอม", "ลำต้น"], code: "1", question: "“เซลล์เยื่อหอม” หมายถึงส่วนใดของหัวหอม" },
  //   { answer: 3, choice: ["เซลล์เยื่อหอม", "เซลล์สาหร่ายหางกระรอก", "เซลล์ใบว่านกาบหอย", "เซลล์เยื่อบุข้างแก้ม"], code: "3", question: "เซลล์ใดต่อไปนี้มีลักษณะค่อนข้างกลม" }
  // ];
  // public arrayTest3 :any;
  public arrayTest3 = [
    {
      code: "570510626",
      name: "กัลยา ใจลูน",
      score: 0,
      url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=10efed90-af71-482d-86ce-727b8cb19e9e"
    },
    {
      code: "570510633",
      name: "จุฑารัตน์ นาคพิทักษ์",
      score: 0,
      url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=aa813e51-bab2-4db8-816c-cbb61827f5af"
    },
    {
      code: "570510637",
      name: "ชลธิชา บัวตูม",
      score: 0,
      url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=120c39e9-00b5-466f-b582-d77680523ff5"
    },
    {
      code: "570510638",
      name: "ชลธิชา พงษ์คำ",
      score: 0,
      url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=18f03834-0a44-41a1-bc05-430538c3c8a7"
    }
  ];
  public arrayTest3_2 :any;
  // public arrayTest3_2 =[
  //   { answer: 2, choice: ["ผนังเซลล์", "แวคิวโอล", "คลอโรพลาสต์", "ไซโทพลาซึม"], code: "0", indax: 0,question: "การที่พืชสังเคราะห์อาหารได้เอง เพราะพืชมีโครงสร้างใด" },
  //   { answer: 1, choice: ["เยื่อด้านนอกของกาบใบ", "เยื่อด้านในของกาบใบ", "รากหอม", "ลำต้น"], code: "1", indax: 2,question: "“เซลล์เยื่อหอม” หมายถึงส่วนใดของหัวหอม" },
  //   { answer: 3, choice: ["เซลล์เยื่อหอม", "เซลล์สาหร่ายหางกระรอก", "เซลล์ใบว่านกาบหอย", "เซลล์เยื่อบุข้างแก้ม"], code: "3",indax: 1, question: "เซลล์ใดต่อไปนี้มีลักษณะค่อนข้างกลม" }
  // ];
  // public Test_id_new:any;
  public Test_id_new = "123412_2_1523771449226";
  // public TestScore_id_new:any;
  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) {

  }

  getStudent() {
    const path = '/Students';
    return this.db.list(path);
  }

  getStudentCheck() {
    const path = '/Student-check';
    return this.db.list(path);
  }

  // getXXX(){
  //   const path = '/Students';
  //   return this.db.list(path, ref => ref.orderByChild('index'));
  // }

  getCategoryList() {
    const path = '/Category';
    return this.db.list(path);
  }
}