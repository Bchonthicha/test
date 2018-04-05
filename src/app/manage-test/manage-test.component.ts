import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { NgForm } from '@angular/forms';
import * as XLSX from 'ts-xlsx';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls: ['./manage-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageTestComponent implements OnInit {
  message = 'Uploading';
  showMessage: boolean = false;

  //value of ngModel
  Subject_Code:any;
  Subject_Name: any;
  chapter_Name: any;
  type = "";
  // uploadExcel: any;

  //excel convert
  arrayBuffer: any;
  file: File;
  array_excel = [];
  question_excel: any;

  @ViewChild('uploadExcel')
  myInputVariable: any;
  constructor(private xlservice: ExcelService) { }

  ngOnInit() {
  }
  //---get json data from excel file
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  //---create new Test
  createNewTest(data: NgForm) {
    this.array_excel = [];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      // this.question_excel =XLSX.utils.sheet_to_json(worksheet, { raw: true });
      XLSX.utils.sheet_to_json(worksheet, { raw: true }).forEach(data1 => {
        this.array_excel.push(data1);
      })
    }
    fileReader.readAsArrayBuffer(this.file);
    console.log(data.value);
    // console.log(this.question_excel);

    console.log(this.array_excel);

    this.clearManageTest();
  }

  //---clear Manage Test page
  clearManageTest() {
    this.Subject_Code = null;
    this.Subject_Name = null;
    this.chapter_Name = null;
    this.type = "";
    // this.myInputVariable.nativeElement.value = "";
  }


}
