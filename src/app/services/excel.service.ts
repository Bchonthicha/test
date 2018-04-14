import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';

import { Http } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import * as _ from 'lodash';


@Injectable()
export class ExcelService {

  //ref for uploadFile to firestore  
  private basePath = '/ExcelFile';    //ชื่อ fodel in storage
  //ref = firebase.storage().ref(`${this.basePath}/excel`);   //ชื่อ file excel save

  constructor(private afs: AngularFirestore, private http: Http) { }

  //-----function export as ExcelFile by json object
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
    XLSX.writeFile(workbook, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
