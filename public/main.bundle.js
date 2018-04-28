webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/add-test/add-test.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "add-test {\r\n  margin: 30px;\r\n  \r\n}\r\n\r\n.content {\r\n  background-color: white;\r\n}\r\n\r\n.addSubject:hover {\r\n  color: #0066ff;\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n}\r\n.tableShow {\r\n  background-color: #f2f2f2;\r\n}\r\n\r\nu {\r\n  /* text-decoration: underline; */\r\n  border-bottom: double 2px;\r\n}\r\n.buttonForm{\r\n  text-align: center\r\n}\r\n.bntAdd{\r\n  width: 20%;\r\n  margin: 5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/add-test/add-test.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"add-test\">\n  <div class=\"box box-success\">\n    <div class=\"content\">\n\n      <form #SelectManageTest=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"exampleSelect1\">Subject select &nbsp; or &nbsp;\n            <a class=\"AddSubject\" data-toggle=\"modal\" data-target=\"#myModalAddSub\" (click)=\"DefaultModal()\">Add Subject</a>\n          </label>\n          <select class=\"form-control\" id=\"SelectCategory\" name=\"SelectCategory\" (ngModelChange)=\"onChange($event)\" [(ngModel)]=\"SelectSubject\">\n            <option value=\"\" [selected]=\"isSelected\" [disabled]=\"true\"> ----Please choose one---- </option>\n            <option *ngFor=\"let subject of subjectList | async \" [ngValue]=subject [selected]=\"isSelected\">\n              {{subject.code}} : {{subject.name}}\n            </option>\n          </select>\n        </div>\n        <div class=\"form-group\">\n          <label>chapter Name:</label>\n          <input type=\"text\" class=\"form-control\" id=\"chapterName\" name=\"chaptertName\" ngModel [(ngModel)]=\"chapter_Name\" placeholder=\"ex.ระบบนิเวศ\">\n        </div>\n\n        <div class=\"form-group\">\n          <label>Type of Test:</label>\n          <select class=\"form-control\" id=\"SelectTopic\" name=\"SelectTopic\" [(ngModel)]=\"type\">\n            <option value=\"\" [selected]=true [disabled]=\"true\"> ----Please choose one---- </option>\n            <option [ngValue]=1> 1 : คำตอบสั้น </option>\n            <option [ngValue]=2> 2 : คำถามแบบ 2 ตัวเลือก </option>\n            <option [ngValue]=3> 3 : คำตอบสั้น 3 ตัวเลือก </option>\n            <option [ngValue]=4> 4 : คำตอบสั้น 4 ตัวเลือก </option>\n          </select>\n        </div>\n\n        <!-- upload  exel-->\n        <label>upload question file</label>\n        <br>\n        <label class=\"btn btn-default form-group\">\n          <!-- <input type=\"file\" style=\"display: inline-block;\" (change)=\"incomingfile($event)\" placeholder=\"Upload file\" accept=\".xlsx\" name=\"uploadExcel\" [(ngModel)]=\"uploadExcel\" style=\"width:1000\">       -->\n          <input type=\"file\" style=\"display: inline-block;\" (change)=\"incomingfile($event)\" name=\"uploadExcel\" id=\"uploadExcel\" placeholder=\"Upload file\"\n            accept=\".xlsx\" name=\"uploadExcel\" >\n          <!-- button -->\n\n        </label>\n        <button type=\"submit\" class=\"btn btn-default\" (click)=\"Upload();\">Upload</button>\n        <!-- display when no data question to be add -->\n        <br>\n        <br>\n        <ng-container *ngIf=\"isDisplayQuestion\">\n        <div class=\"row\">\n            <div class=\"col-md-12 tableShow\">\n              <p style=\"text-align: center\">\n                <br>\n               --- no data ---    \n      \n              </p>\n            </div>\n          </div>\n        </ng-container>\n        <!--  -->\n        <ng-container *ngIf=\"!isDisplayQuestion\">\n          <table class=\"table tableShow\">\n            <tbody>\n              <tr *ngFor=\"let question_item of question_objDisplay ;let index = index;let i = index;\" class=\"hoverTable\">\n                <td width=\"10px\" align=\"center\">\n                  <b> {{i+1}}) </b>\n                </td>\n                <td>\n                  <!-- content question -->\n                  <div class=\"item\">\n                    <b>{{question_item.question}}</b>\n\n                    <p class=\"display_question_item\" *ngFor=\"let itemChoice of question_item.choice;let i = index\">\n\n                      <!-- {{question_item.choice[0]}} -->\n                      &nbsp;&nbsp;&nbsp; &nbsp; [{{i+1}}]&nbsp;{{itemChoice}}\n                    </p>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                    <u>\n                      <b>answer</b>&nbsp;&nbsp;index [{{question_item.answer}}] </u>\n                  </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <br>\n        </ng-container>\n        <!--end display data question to be add -->\n        <br>\n        <!-- button -->\n        <div class=\"row\">\n          <div class=\"col-md-12 \">\n            <p class=\"buttonForm\">\n              <button type=\"submit\" class=\"btn btn-primary bntAdd\" (click)=\"clearAddTest();\">\n                  <span class=\"glyphicon glyphicon-repeat\"></span> Clear</button>\n              <button type=\"submit\" class=\"btn btn-success  bntAdd\" data-toggle=\"modal\" data-target=\"#createTest\" [disabled]=\"createTestBnt\">\n                  <span class=\"glyphicon glyphicon-ok\"></span> Create</button>\n            </p>\n          </div>\n        </div>\n        <!--  -->\n      </form>\n    </div>\n  </div>\n</div>\n\n\n\n<!-- Modal ADD-->\n<div class=\"modal fade\" id=\"myModalAddSub\" role=\"dialog\">\n  <div class=\"modal-dialog  modal-md\">\n    <!-- Modal size sm,md-->\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <form #NewSubjectForm=\"ngForm\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n          <h4 class=\"modal-title\">ADD NEW SUBJECT</h4>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"form-group\">\n            <label>Subject Code:</label>\n            <input type=\"text\" class=\"form-control\" myNumberOnly  id=\"newSubjectCode\" name=\"newSubjectCode\" ngModel [(ngModel)]=\"newSubjectCode\" placeholder=\"ex. 205100\">\n          </div>\n          <div class=\"form-group\">\n            <label>Subject Name:</label>\n            <input type=\"text\" class=\"form-control\" id=\"newSubjectName\" name=\"newSubjectName\" ngModel [(ngModel)]=\"newSubjectName\" placeholder=\"ex. วิทยาศาสตร์\">\n          </div>\n        </div>\n\n      </form>\n      <div class=\"modal-footer\">\n        <!-- <button type=\"submit\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" data-dismiss=\"modal\"> -->\n        <button type=\"submit\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" (click)=\"addNewSubject(NewSubjectForm);\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-ok-sign\"></span>ADD</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- createTestmodal -->\n<div class=\"modal fade\" id=\"createTest\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n        </button>\n        <h4 class=\"modal-title custom_align\" id=\"Heading\">Create New Test</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"alert alert-warning\">\n          <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to create new test?\n        </div>\n      </div>\n      <div class=\"modal-footer \">\n        <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"createNewTest(SelectManageTest)\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-remove\"></span> No</button>\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>"

/***/ }),

/***/ "../../../../../src/app/add-test/add-test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_excel_service__ = __webpack_require__("../../../../../src/app/services/excel.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_xlsx__ = __webpack_require__("../../../../ts-xlsx/lib/main.browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ts_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddTestComponent = (function () {
    function AddTestComponent(xlservice, afs) {
        var _this = this;
        this.xlservice = xlservice;
        this.afs = afs;
        this.message = 'Uploading';
        this.showMessage = false;
        this.chapter_Name = null;
        this.type = "";
        this.question_obj = {};
        this.SelectSubject = "";
        this.isDisplayQuestion = true;
        this.question_objDisplay = [];
        this.createTestBnt = true;
        this.subjectAddcheck = true;
        this.subjectCheck = [];
        console.log(this.file + "file");
        //subject
        var subjectRef = this.afs.collection("/subjects");
        this.subjectList = subjectRef.valueChanges();
        this.subCollection = afs.collection('/subjects');
        this.subjectList.subscribe(function (sub) {
            console.log(sub);
            sub.forEach(function (data) {
                _this.subjectCheck.push(data);
            });
        });
    }
    ;
    AddTestComponent.prototype.ngOnInit = function () {
    };
    //-------function เมื่อเลือกCatagory select
    AddTestComponent.prototype.onChange = function (sub) {
        var _this = this;
        console.log("change");
        this.Subject_Code = sub.code;
        this.Subject_Name = sub.name;
        var chapterRef = this.afs.collection("/subjects/" + this.Subject_Code + "/chapters/");
        this.chapterList = chapterRef.valueChanges();
        console.log(this.chapterList);
        this.chapterList.forEach(function (chap) {
            _this.chapLenght = chap.length;
            // console.log(this.chapLenght);
            if (_this.chapLenght == 0) {
                _this.chapter_Code = "0"; ///makeeeeeeeeeeeeeeeeeeeee
                //make document key in questions
                _this.question_keyAdd = _this.Subject_Code + "_" + _this.chapter_Code;
                console.log(_this.question_keyAdd);
            }
            else {
                _this.chapterCodeLast = chap[chap.length - 1].code;
                _this.chapterCodeLast = +_this.chapterCodeLast; //string to number
                // console.log(this.chapterCodeLast);
                _this.chapter_Code = (_this.chapterCodeLast + 1).toString();
                console.log(_this.chapter_Code);
                _this.question_keyAdd = _this.Subject_Code + "_" + _this.chapter_Code;
                console.log(_this.question_keyAdd);
                // this.chapter_Code = "ch" + this.chapLenght;
                // //make document key in questions
                // this.question_keyAdd = this.Subject_Code + "_" + this.chapter_Code;
                // console.log(this.question_keyAdd);
            }
        });
    };
    AddTestComponent.prototype.DefaultModal = function () {
        console.log("DefaultModal");
        this.newSubjectName = "";
        this.newSubjectCode = "";
    };
    AddTestComponent.prototype.addNewSubject = function (data) {
        var _this = this;
        var count;
        if (this.newSubjectCode == "" || this.newSubjectName == "") {
            __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter all fields.',
            });
        }
        else {
            console.log(this.newSubjectName);
            console.log(this.newSubjectCode);
            //
            console.log(this.subjectCheck);
            //ไม่มีวิชาในระบบ
            if (this.subjectCheck.length == 0) {
                console.log("ไม่มี");
                count = 0;
                this.subjectAddcheck = false;
                //----Add subject detail in subject
                var subjectRef2 = this.afs.doc("/subjects/" + this.newSubjectCode);
                subjectRef2.set(this.subjectAdd);
            }
            else {
                this.subjectCheck.forEach(function (data) {
                    console.log(data.code);
                    if (data.code == _this.newSubjectCode) {
                        count = 1;
                        console.log("ซ้ำ");
                        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
                            type: 'error',
                            title: 'Unsuccessful',
                            text: 'This code already exists.',
                        });
                    }
                    else {
                        _this.subjectAddcheck = false;
                    }
                    //
                });
            }
            if (this.subjectAddcheck == false && count != 1) {
                console.log("โอเค");
                this.subjectAdd = {
                    code: this.newSubjectCode,
                    name: this.newSubjectName
                };
                console.log(this.subjectAdd);
                //----Add subject detail in subject
                var subjectRef2 = this.afs.doc("/subjects/" + this.newSubjectCode);
                subjectRef2.set(this.subjectAdd);
            }
        }
    };
    //---get json data from excel file
    AddTestComponent.prototype.incomingfile = function (event) {
        this.selectedFiles = event.target.files;
        this.file = event.target.files[0];
        console.log(this.file);
        // console.log(this.file.name);
    };
    //--- Upload ecel and display
    AddTestComponent.prototype.Upload = function () {
        var _this = this;
        this.question_objDisplay = [];
        console.log("display question");
        if (this.file == undefined) {
            __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
                type: 'warning',
                title: 'Unsuccessful',
                text: 'Please select file.',
            });
        }
        else {
            this.isDisplayQuestion = false;
            this.createTestBnt = false;
            var fileReader_1 = new FileReader();
            fileReader_1.onload = function (e) {
                _this.arrayBuffer = fileReader_1.result;
                var data = new Uint8Array(_this.arrayBuffer);
                var arr = new Array();
                console.log(data.length);
                for (var i = 0; i != data.length; ++i)
                    arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = __WEBPACK_IMPORTED_MODULE_2_ts_xlsx__["read"](bstr, { type: "binary" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
                _this.question_excel = __WEBPACK_IMPORTED_MODULE_2_ts_xlsx__["utils"].sheet_to_json(worksheet, { raw: true });
                console.log(_this.question_excel);
                _this.question_excel.forEach(function (question, index) {
                    _this.amount = index + 1;
                    console.log(question);
                    console.log(index);
                    _this.question_key = index;
                    console.log(_this.question_excel[index].choice);
                    //make array type of choice
                    var choice_string = (_this.question_excel[index].choice).toString();
                    var re = /\s*,\s*/;
                    var choice_arr = choice_string.split(re);
                    //add sub question
                    _this.sub_question = {
                        "answer": _this.question_excel[index].answer,
                        "choice": choice_arr,
                        "code": _this.question_key,
                        "question": _this.question_excel[index].question
                    };
                    console.log(_this.question_objDisplay);
                    _this.question_objDisplay.push(_this.sub_question);
                    // console.log(this.sub_question);
                    _this.question_obj[_this.question_key] = _this.sub_question;
                    console.log(_this.question_obj);
                });
            };
            fileReader_1.readAsArrayBuffer(this.file);
        }
    };
    //---create new Test
    AddTestComponent.prototype.createNewTest = function () {
        var _this = this;
        if (this.file == undefined || this.chapter_Name == null || this.SelectSubject == "" || this.type == "" || this.chapter_Name == "") {
            __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter all fields.',
            });
        }
        else {
            console.log(this.question_obj);
            //make type string to number
            var type_num = +this.type;
            console.log(type_num);
            this.questionAdd = {
                amount: this.amount,
                question: this.question_obj,
                type: type_num
            };
            console.log(this.questionAdd);
            //----Add data in questions ,document key=subCode_chapterCode
            var questionRef = this.afs.doc("/questions/" + this.question_keyAdd);
            questionRef.set(this.questionAdd);
            var questionDoc = this.afs.doc("/questions/" + this.question_keyAdd);
            console.log(questionDoc.ref);
            console.log(this.chapter_Code);
            this.chapterAdd = {
                code: this.chapter_Code,
                name: this.chapter_Name,
                questions: questionDoc.ref
            };
            console.log(this.chapterAdd);
            //----Add chapter in subject
            var subjectRef = this.afs.doc("/subjects/" + this.Subject_Code + "/chapters/" + this.chapter_Code);
            subjectRef.set(this.chapterAdd).then(function () {
                _this.isDisplayQuestion = true;
                _this.createTestBnt = true;
                _this.question_objDisplay = [];
                _this.SelectSubject = "";
                _this.Subject_Code = null;
                _this.Subject_Name = null;
                _this.chapter_Name = null;
                _this.type = "";
                console.log(_this.file);
                _this.file = undefined;
                console.log(_this.file);
                _this.selectedFiles = null;
            });
            __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
                type: 'success',
                title: 'Successful',
                showConfirmButton: false,
                timer: 1500
            });
        }
        // 
    };
    //---clear Manage Test page
    AddTestComponent.prototype.clearAddTest = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            title: 'Are you sure?',
            text: "clear this form!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!'
        }).then(function (result) {
            if (result.value) {
                _this.isDisplayQuestion = true;
                _this.createTestBnt = true;
                _this.question_objDisplay = [];
                _this.SelectSubject = "";
                _this.Subject_Code = null;
                _this.Subject_Name = null;
                _this.chapter_Name = null;
                _this.type = "";
                console.log(_this.file);
                _this.file = undefined;
                console.log(_this.file);
                _this.selectedFiles = null;
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('uploadExcel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], AddTestComponent.prototype, "uploadExcel", void 0);
    AddTestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-test',
            template: __webpack_require__("../../../../../src/app/add-test/add-test.component.html"),
            styles: [__webpack_require__("../../../../../src/app/add-test/add-test.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_excel_service__["a" /* ExcelService */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], AddTestComponent);
    return AddTestComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_detail_group_detail_component__ = __webpack_require__("../../../../../src/app/group-detail/group-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__student_list_student_list_component__ = __webpack_require__("../../../../../src/app/student-list/student-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__blank_blank_component__ = __webpack_require__("../../../../../src/app/blank/blank.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manage_std_group_manage_std_group_component__ = __webpack_require__("../../../../../src/app/manage-std-group/manage-std-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__test_test_component__ = __webpack_require__("../../../../../src/app/test/test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__manage_test_manage_test_component__ = __webpack_require__("../../../../../src/app/manage-test/manage-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__test_step1_test_step1_component__ = __webpack_require__("../../../../../src/app/test-step1/test-step1.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__test_step2_test_step2_component__ = __webpack_require__("../../../../../src/app/test-step2/test-step2.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__test_step3_test_step3_component__ = __webpack_require__("../../../../../src/app/test-step3/test-step3.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__quiz_quiz_component__ = __webpack_require__("../../../../../src/app/quiz/quiz.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__signup_signup_component__ = __webpack_require__("../../../../../src/app/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__reports_reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ngx_cookie_service__ = __webpack_require__("../../../../ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__add_test_add_test_component__ = __webpack_require__("../../../../../src/app/add-test/add-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__delete_test_delete_test_component__ = __webpack_require__("../../../../../src/app/delete-test/delete-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__edit_test_edit_test_component__ = __webpack_require__("../../../../../src/app/edit-test/edit-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__edit_detail_edit_detail_component__ = __webpack_require__("../../../../../src/app/edit-detail/edit-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__scores_scores_component__ = __webpack_require__("../../../../../src/app/scores/scores.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















// Guard







var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'signup',
        component: __WEBPACK_IMPORTED_MODULE_14__signup_signup_component__["a" /* SignupComponent */]
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__["a" /* DashboardComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]],
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_6__blank_blank_component__["a" /* BlankComponent */],
            },
            {
                path: 'student-list',
                component: __WEBPACK_IMPORTED_MODULE_3__student_list_student_list_component__["a" /* StudentListComponent */],
            },
            {
                path: 'manage-student-group',
                component: __WEBPACK_IMPORTED_MODULE_7__manage_std_group_manage_std_group_component__["a" /* ManageStdGroupComponent */],
            },
            {
                path: 'group/:name',
                component: __WEBPACK_IMPORTED_MODULE_0__group_detail_group_detail_component__["a" /* GroupDetailComponent */]
            },
            {
                path: 'test',
                component: __WEBPACK_IMPORTED_MODULE_8__test_test_component__["a" /* TestComponent */],
                children: [
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_10__test_step1_test_step1_component__["a" /* TestStep1Component */],
                    },
                    {
                        path: 'test-step2',
                        component: __WEBPACK_IMPORTED_MODULE_11__test_step2_test_step2_component__["a" /* TestStep2Component */],
                    },
                    {
                        path: 'test-step3',
                        component: __WEBPACK_IMPORTED_MODULE_12__test_step3_test_step3_component__["a" /* TestStep3Component */],
                    },
                    {
                        path: 'quiz',
                        component: __WEBPACK_IMPORTED_MODULE_13__quiz_quiz_component__["a" /* QuizComponent */],
                    },
                    {
                        path: 'scores',
                        component: __WEBPACK_IMPORTED_MODULE_22__scores_scores_component__["a" /* ScoresComponent */]
                    }
                ]
            },
            {
                path: 'manage-test',
                component: __WEBPACK_IMPORTED_MODULE_9__manage_test_manage_test_component__["a" /* ManageTestComponent */],
                children: [
                    {
                        path: '',
                        //component: DeleteTestComponent,
                        component: __WEBPACK_IMPORTED_MODULE_18__add_test_add_test_component__["a" /* AddTestComponent */],
                    },
                    {
                        path: 'Edit-Test',
                        component: __WEBPACK_IMPORTED_MODULE_20__edit_test_edit_test_component__["a" /* EditTestComponent */]
                    },
                    {
                        path: 'Delete-Test',
                        component: __WEBPACK_IMPORTED_MODULE_19__delete_test_delete_test_component__["a" /* DeleteTestComponent */],
                    },
                    {
                        path: 'edit/:subjectChapCode',
                        component: __WEBPACK_IMPORTED_MODULE_21__edit_detail_edit_detail_component__["a" /* EditDetailComponent */]
                    }
                ]
            },
            {
                path: 'reports',
                component: __WEBPACK_IMPORTED_MODULE_15__reports_reports_component__["a" /* ReportsComponent */],
            }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* RouterModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_17_ngx_cookie_service__["a" /* CookieService */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_cookie_service__ = __webpack_require__("../../../../ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_firebase_config__ = __webpack_require__("../../../../../src/environments/firebase.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__student_list_student_list_component__ = __webpack_require__("../../../../../src/app/student-list/student-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__blank_blank_component__ = __webpack_require__("../../../../../src/app/blank/blank.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipes_nav_route_topic_pipe__ = __webpack_require__("../../../../../src/app/pipes/nav-route-topic.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__manage_test_manage_test_component__ = __webpack_require__("../../../../../src/app/manage-test/manage-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__manage_std_group_manage_std_group_component__ = __webpack_require__("../../../../../src/app/manage-std-group/manage-std-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__quiz_quiz_component__ = __webpack_require__("../../../../../src/app/quiz/quiz.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__test_test_component__ = __webpack_require__("../../../../../src/app/test/test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__test_step1_test_step1_component__ = __webpack_require__("../../../../../src/app/test-step1/test-step1.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__test_step2_test_step2_component__ = __webpack_require__("../../../../../src/app/test-step2/test-step2.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__test_step3_test_step3_component__ = __webpack_require__("../../../../../src/app/test-step3/test-step3.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__signup_signup_component__ = __webpack_require__("../../../../../src/app/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_upload_file_service__ = __webpack_require__("../../../../../src/app/services/upload-file.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_ngx_feature_toggle__ = __webpack_require__("../../../../ngx-feature-toggle/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_ngx_feature_toggle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_ngx_feature_toggle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_excel_service__ = __webpack_require__("../../../../../src/app/services/excel.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__group_detail_group_detail_component__ = __webpack_require__("../../../../../src/app/group-detail/group-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ng_semantic__ = __webpack_require__("../../../../ng-semantic/ng-semantic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ng_semantic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_ng_semantic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__reports_reports_component__ = __webpack_require__("../../../../../src/app/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__add_test_add_test_component__ = __webpack_require__("../../../../../src/app/add-test/add-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__delete_test_delete_test_component__ = __webpack_require__("../../../../../src/app/delete-test/delete-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__edit_test_edit_test_component__ = __webpack_require__("../../../../../src/app/edit-test/edit-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__edit_detail_edit_detail_component__ = __webpack_require__("../../../../../src/app/edit-detail/edit-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__scores_scores_component__ = __webpack_require__("../../../../../src/app/scores/scores.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_primeng_chart__ = __webpack_require__("../../../../primeng/chart.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_primeng_chart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_43_primeng_chart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_primeng_accordion__ = __webpack_require__("../../../../primeng/accordion.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_primeng_accordion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_44_primeng_accordion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__number_directive__ = __webpack_require__("../../../../../src/app/number.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__toverux_ngx_sweetalert2__ = __webpack_require__("../../../../@toverux/ngx-sweetalert2/esm5/toverux-ngx-sweetalert2.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { AngularFireAuth } from 'angularfire2/auth';



//firebase
//import { FormsModule } from '@angular/forms';



//test



//component















//test



// Service

// Guard

//Upload file to firebass

//create graph/chart

//toggle

//download to excel file


// semantic







//


///

//

var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_11__student_list_student_list_component__["a" /* StudentListComponent */],
                __WEBPACK_IMPORTED_MODULE_13__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_14__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_15__blank_blank_component__["a" /* BlankComponent */],
                __WEBPACK_IMPORTED_MODULE_16__pipes_nav_route_topic_pipe__["a" /* NavRouteTopicPipe */],
                __WEBPACK_IMPORTED_MODULE_17__manage_test_manage_test_component__["a" /* ManageTestComponent */],
                __WEBPACK_IMPORTED_MODULE_18__manage_std_group_manage_std_group_component__["a" /* ManageStdGroupComponent */],
                __WEBPACK_IMPORTED_MODULE_19__quiz_quiz_component__["a" /* QuizComponent */],
                __WEBPACK_IMPORTED_MODULE_20__test_test_component__["a" /* TestComponent */],
                __WEBPACK_IMPORTED_MODULE_21__test_step1_test_step1_component__["a" /* TestStep1Component */],
                __WEBPACK_IMPORTED_MODULE_22__test_step2_test_step2_component__["a" /* TestStep2Component */],
                __WEBPACK_IMPORTED_MODULE_23__test_step3_test_step3_component__["a" /* TestStep3Component */],
                __WEBPACK_IMPORTED_MODULE_24__signup_signup_component__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_35__group_detail_group_detail_component__["a" /* GroupDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_37__reports_reports_component__["a" /* ReportsComponent */],
                __WEBPACK_IMPORTED_MODULE_38__add_test_add_test_component__["a" /* AddTestComponent */],
                __WEBPACK_IMPORTED_MODULE_39__delete_test_delete_test_component__["a" /* DeleteTestComponent */],
                __WEBPACK_IMPORTED_MODULE_40__edit_test_edit_test_component__["a" /* EditTestComponent */],
                __WEBPACK_IMPORTED_MODULE_41__edit_detail_edit_detail_component__["a" /* EditDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_42__scores_scores_component__["a" /* ScoresComponent */],
                __WEBPACK_IMPORTED_MODULE_45__number_directive__["a" /* NumberOnlyDirective */]
            ],
            imports: [
                //=> Basic usage
                __WEBPACK_IMPORTED_MODULE_46__toverux_ngx_sweetalert2__["a" /* SweetAlert2Module */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_33_ngx_feature_toggle__["FeatureToggleModule"],
                __WEBPACK_IMPORTED_MODULE_32_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_12__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_26__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_27__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_28__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */],
                //materail
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["p" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["q" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["r" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["s" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["t" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["u" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["v" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["w" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["y" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["x" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["z" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["A" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["C" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["D" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["E" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["F" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["B" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_26__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_7__environments_firebase_config__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_36_ng_semantic__["NgSemanticModule"],
                __WEBPACK_IMPORTED_MODULE_43_primeng_chart__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_44_primeng_accordion__["AccordionModule"],
                __WEBPACK_IMPORTED_MODULE_46__toverux_ngx_sweetalert2__["a" /* SweetAlert2Module */]
            ],
            // providers: [AuthService, AuthGuard],
            providers: [__WEBPACK_IMPORTED_MODULE_25__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_29__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_30__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_31__services_upload_file_service__["a" /* UploadFileService */], __WEBPACK_IMPORTED_MODULE_34__services_excel_service__["a" /* ExcelService */], __WEBPACK_IMPORTED_MODULE_2_ngx_cookie_service__["a" /* CookieService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/blank/blank.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".test {\r\n  margin: 15px;\r\n}\r\n\r\n.createTest {\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  position: absolute;\r\n  width: 56px;\r\n  height: 56px;\r\n  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\r\n  bottom: 24px;\r\n  right: 24px;\r\n}\r\n\r\n.pause-image {\r\n  width: 140px;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n}\r\n\r\n.item_group {\r\n  padding: 5px;\r\n  margin: 10px;\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\r\n  background-color: white;\r\n  height: 160px;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n}\r\n.item_group:hover {\r\n  cursor: pointer;\r\n}\r\n.rowContent {\r\n  margin: 2px;\r\n  background: whitesmoke;\r\n}\r\n\r\n.rowPic {\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n  margin: 2px;\r\n  height: 90px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n  background: #adc2eb;\r\n}\r\n\r\n.content {\r\n  margin-left: 20px;\r\n  margin-right: 20px;\r\n  padding-top: 5px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/blank/blank.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"test\">\r\n\r\n  <div class=\"box box-info\">\r\n    <div class=\"content\">\r\n              <!-- display when no data question to be add -->\r\n              <br>\r\n              <br>\r\n              <ng-container *ngIf=\"!isDisplayPause\">\r\n              <div class=\"row\">\r\n                  <div class=\"col-md-12 tableShow\">\r\n                    <p style=\"text-align: center\">\r\n                      <br>\r\n                     --- No quiz paused. ---    \r\n            \r\n                    </p>\r\n                  </div>\r\n                </div>\r\n              </ng-container>\r\n              <!--  -->\r\n     <!-- <label style=\"background-color: wheat\"><h4>The quiz was paused</h4></label> \r\n      <br> -->\r\n      <!-- Trigger the modal with a button -->\r\n\r\n      <button type=\"button\" class=\"btn btn-primary createTest\" (click)=\"createTest()\">\r\n        <h4>\r\n          <i class=\"fa fa-plus\"></i>\r\n        </h4>\r\n      </button>\r\n\r\n      <ng-container *ngIf=\"isDisplayPause\">\r\n          <div class=\"row\" style=\"background-color: white\">\r\n              <div class=\"col-md-12 tableShow\">\r\n                <p style=\"text-align: center\">\r\n                 --- Quiz paused. ---         \r\n                </p>\r\n                <br>\r\n              </div>\r\n            </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-3\" *ngFor=\"let exam of examPause\">\r\n\r\n          <div class=\"item_group\" (click)=\"goToQuiz(exam.exam_code)\">\r\n            <div class=\"row rowPic\" style=\"text-align: center\">\r\n              <img src=\"assets/dist/img/picP3.PNG\" class=\"pause-image\">\r\n            </div>\r\n\r\n            <div class=\"row rowContent\" style=\"text-align: center\">\r\n              <h5>\r\n                {{exam.exam_code}}\r\n                <br>\r\n                <b> Date: </b>{{exam.date | date :'short'}}\r\n              </h5>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>          \r\n    </ng-container>\r\n    </div>\r\n  </div>"

/***/ }),

/***/ "../../../../../src/app/blank/blank.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlankComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BlankComponent = (function () {
    function BlankComponent(afs, router, firebaseService) {
        //Exam
        var _this = this;
        this.afs = afs;
        this.router = router;
        this.firebaseService = firebaseService;
        this.examPause = [];
        this.isDisplayPause = true;
        var ExamRef = this.afs.collection("/exam");
        this.ExamList = ExamRef.valueChanges();
        this.ExamList.subscribe(function (data) {
            // console.log(data);  
            _this.examPause = [];
            data.forEach(function (d) {
                // console.log(d.status);
                if (d.status == "pause") {
                    // console.log(d);
                    _this.examPause.push(d);
                }
            });
            // console.log(this.examPause.length);
            if (_this.examPause.length == 0) {
                _this.isDisplayPause = false;
            }
        });
    }
    BlankComponent.prototype.ngOnInit = function () {
    };
    BlankComponent.prototype.createTest = function () {
        console.log("createTest");
        this.router.navigate(['dashboard', 'test']);
    };
    BlankComponent.prototype.goToQuiz = function (exam_code) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            title: 'Are you sure?',
            text: "take this Quiz!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, take it!'
        }).then(function (result) {
            if (result.value) {
                console.log(exam_code);
                var examCode = void 0;
                examCode = exam_code;
                _this.firebaseService.Test_id_new = examCode;
                _this.examPause = [];
                //update examStatus
                var statusUpdate = {
                    status: "active"
                };
                var examRef = _this.afs.doc("exam/" + examCode);
                examRef.update(statusUpdate).then(function () {
                    //go to display scores page  
                    _this.examPause = [];
                    _this.router.navigate(['dashboard', 'test', 'quiz']);
                });
            }
        });
    };
    BlankComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-blank',
            template: __webpack_require__("../../../../../src/app/blank/blank.component.html"),
            styles: [__webpack_require__("../../../../../src/app/blank/blank.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */]])
    ], BlankComponent);
    return BlankComponent;
}());



/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".logout-click{\r\n    margin: 15px;\r\n    margin-right: 20;\r\n    color: white;\r\n}\r\n.logout-click:hover {\r\n    cursor: pointer;\r\n    text-decoration:underline;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<body class=\"hold-transition skin-blue sidebar-mini\">\r\n  <div class=\"wrapper\">\r\n    <header class=\"main-header\">\r\n      <!-- Logo -->\r\n      <div class=\"logo\">\r\n        <!-- mini logo for sidebar mini 50x50 pixels -->\r\n        <span class=\"logo-mini\">\r\n          <b>Q</b>UIZ</span>\r\n        <!-- logo for regular state and mobile devices -->\r\n        <span class=\"logo-lg\">\r\n          <b>Online</b>Quiz</span>\r\n      </div>\r\n      <!-- Header Navbar: style can be found in header.less -->\r\n      <nav class=\"navbar navbar-static-top\">\r\n        <!-- Sidebar toggle button-->\r\n        <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"push-menu\" role=\"button\">\r\n          <span class=\"sr-only\">Toggle navigation</span>\r\n        </a>\r\n\r\n        <div class=\"navbar-custom-menu\">\r\n          <ul class=\"nav navbar-nav\">\r\n            <!--  User Account: style can be found in dropdown.less -->\r\n            <li class=\"dropdown user user-menu\">\r\n              <!--   <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                  <img src=\"assets/dist/img/user2-160x160.jpg\" class=\"user-image\" alt=\"User Image\">\r\n                  <span class=\"hidden-xs\">Alexander Pierce</span>\r\n                </a>-->\r\n              <div class=\"logout-click\" (click)=\"signOut()\">\r\n  \r\n                  <img src=\"assets/dist/img/images.png\" class=\"user-image\" alt=\"User Image\">\r\n                  <span class=\"Logout-text\"><b>Logout</b></span>\r\n  \r\n              </div>\r\n              <ul class=\"dropdown-menu\">\r\n                <!-- User image -->\r\n                <li class=\"user-header\">\r\n                  <img src=\"assets/dist/img/images.png\" class=\"img-circle\" alt=\"User Image\">\r\n                </li>\r\n              </ul>\r\n            </li>\r\n            <!-- Control Sidebar Toggle Button -->\r\n          </ul>\r\n        </div>\r\n      </nav>\r\n    </header>\r\n    <!-- Left side column. contains the logo and sidebar -->\r\n    <aside class=\"main-sidebar\">\r\n      <!-- sidebar: style can be found in sidebar.less -->\r\n      <section class=\"sidebar\">\r\n        <!-- Sidebar user panel -->\r\n        <div class=\"user-panel\">\r\n          <div class=\"pull-left image\">\r\n            <img src=\"assets/dist/img/images.png\" class=\"img-circle\" alt=\"User Image\">\r\n          </div>\r\n          <div class=\"pull-left info\">\r\n            <br>\r\n            <!-- <p>\"BBBBB\"</p> -->\r\n            <p> {{thisUser}}</p>\r\n            <br>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- search form -->\r\n        <!-- <form action=\"#\" method=\"get\" class=\"sidebar-form\">\r\n          <div class=\"input-group\">\r\n            <input type=\"text\" name=\"q\" class=\"form-control\" placeholder=\"Search...\">\r\n            <span class=\"input-group-btn\">\r\n              <button type=\"submit\" name=\"search\" id=\"search-btn\" class=\"btn btn-flat\">\r\n                <i class=\"fa fa-search\"></i>\r\n              </button>\r\n            </span>\r\n          </div>\r\n        </form> -->\r\n        <!-- /.search form -->\r\n\r\n        <!-- sidebar menu: : style can be found in sidebar.less -->\r\n        <ul class=\"sidebar-menu\" data-widget=\"tree\">\r\n          <li class=\"header\">MAIN NAVIGATION</li>\r\n          <li class=\"active\">\r\n            <a [routerLink]=\"'/dashboard'\">\r\n              <i class=\"fa fa-dashboard\"></i>\r\n              <span>Dashboard</span>\r\n            </a>\r\n          </li>\r\n          <li>\r\n            <a [routerLink]=\"'/dashboard/student-list'\">\r\n              <i class=\"fa fa-list\"></i>\r\n              <span>Student List</span>\r\n            </a>\r\n          </li>\r\n          <!--  -->\r\n          <!-- <li>\r\n            <a [routerLink]=\"'/dashboard/student-check'\">\r\n              <i class=\"fa fa-check\"></i>\r\n              <span>student check</span>\r\n            </a>\r\n          </li> -->\r\n          <!--  -->\r\n          <li>\r\n            <a [routerLink]=\"'/dashboard/manage-student-group'\">\r\n              <i class=\"fa fa-users\"></i>\r\n              <span>Manage Student Group</span>\r\n            </a>\r\n          </li>\r\n          <li>\r\n            <a [routerLink]=\"'/dashboard/test'\">\r\n              <i class=\"fa fa-check-square-o\"></i>\r\n              <span>Test</span>\r\n            </a>\r\n          </li>\r\n          <li>\r\n            <a [routerLink]=\"'/dashboard/manage-test'\">\r\n              <i class=\"fa fa-th\"></i>\r\n              <span>Manage Test</span>\r\n            </a>\r\n          </li>\r\n\r\n          <li>\r\n            <a [routerLink]=\"'/dashboard/reports'\">\r\n              <i class=\"fa fa-file-text\"></i>\r\n              <span>Reports</span>\r\n            </a>\r\n          </li>\r\n\r\n          <!-- <li class=\"treeview\">\r\n            <a href=\"#\">\r\n              <i class=\"fa fa-file-text\"></i>\r\n              <span>report</span>\r\n              <span class=\"pull-right-container\">\r\n                <i class=\"fa fa-angle-left pull-right\"></i>\r\n              </span>\r\n            </a>\r\n            <ul class=\"treeview-menu\">\r\n              <li>\r\n                <a [routerLink]=\"'/dashboard/report-of-test'\">\r\n                  <i class=\"fa fa-circle-o\"></i> report of test</a>\r\n              </li>\r\n              <li>\r\n                <a [routerLink]=\"'/dashboard/report-of-student'\">\r\n                  <i class=\"fa fa-circle-o\"></i> report of student</a>\r\n              </li>\r\n            </ul>\r\n          </li> -->\r\n        </ul>\r\n      </section>\r\n      <!-- /.sidebar -->\r\n    </aside>\r\n    <!-- Content Wrapper. Contains page content -->\r\n    <div class=\"content-wrapper\">\r\n      <!-- Content Header (Page header) -->\r\n      <section class=\"content-header\">\r\n        <h1>\r\n          {{ currentURL | navRouteTopic }}\r\n        </h1>\r\n        <ol class=\"breadcrumb\">\r\n          <li>\r\n            <a [routerLink]=\"'/dashboard'\">\r\n              <i class=\"fa fa-dashboard\"></i>Home</a>\r\n          </li>\r\n          <li class=\"active\">{{ currentURL | navRouteTopic }}</li>\r\n        </ol>\r\n      </section>\r\n      <!--Call Component -->\r\n      <router-outlet></router-outlet>\r\n    </div>\r\n    <!-- footer -->\r\n    <footer class=\"main-footer\">\r\n      <div class=\"pull-right hidden-xs\">\r\n        <b>Version</b> 1.0.0\r\n      </div>\r\n      <strong>Copyright &copy; 2017-2018 </strong>All rights reserved.\r\n    </footer>\r\n    <!--end footer -->\r\n  </div>\r\n  <!-- ./wrapper -->\r\n</body>"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__ = __webpack_require__("../../../../ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardComponent = (function () {
    function DashboardComponent(afs, route, auth, firebaseService, cookieService) {
        // this.user = auth.currentUser;
        // console.log(this.user)
        this.afs = afs;
        this.route = route;
        this.auth = auth;
        this.firebaseService = firebaseService;
        this.cookieService = cookieService;
        var cookieValue = this.cookieService.get('email');
        console.log(cookieValue);
        this.thisUser = cookieValue;
        /*
        console.log("ชั่ยมั่ยชั่ย?" + this.auth.currentUserId)      //key from login
    
        //get email show
    
        this.userRef = this.afs.doc<User>(`/users/${this.auth.currentUserId}`)
        let test = this.userRef.valueChanges();
    
        test.forEach(data => {
          console.log(data.email);
          this.thisUser = data.email
          this.firebaseService.userLogin = this.thisUser;
        })
      //
    */
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentURL = this.route.url;
        this.route.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.currentURL = _this.route.url;
            }
        });
    };
    DashboardComponent.prototype.signOut = function () {
        console.log("signOut");
        this.thisUser = null;
        this.firebaseService.userLogin = "";
        this.cookieService.set('email', 'UNKNOWN');
        this.cookieService.set('password', 'UNKNOWN');
        // this.cookieService.deleteAll();
        // this.cookieService.delete('email');
        console.log("signOut", this.cookieService.get('email'));
        this.auth.signOut();
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__["a" /* CookieService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/delete-test/delete-test.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "delete-test{\r\n    margin: 30px;  \r\n  }\r\n\r\n\r\n  .content{\r\n    background-color:white;\r\n  }\r\n  .delSub{\r\n    margin-right: 8px;\r\n\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/delete-test/delete-test.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"delete-test\">\n\n  <div class=\"box box-danger\">\n\n    <div class=\"content\">\n      <br>\n      <br>\n      <!--  -->\n      <table class=\"table\">\n\n        <tbody>\n          <tr *ngFor=\"let subject of arrSubDisplay ;let index = index;let i = index;\" class=\"hoverTable\">\n            <td width=\"10px\" align=\"center\">\n              <b> {{i+1}}) </b>\n            </td>\n            <td>\n\n              <!-- tools box -->\n              <div class=\"pull-right box-tools \">\n                <button class=\"btn btn-danger btn-xs delSub\" style=\"font-size: 16px;\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" (click)=\"setRemoveSubjectCode(subject.code,subject.chapter)\">\n                  <span class=\"glyphicon glyphicon-trash\"></span>\n                </button>\n\n              </div>\n              <!-- content question -->\n              <div class=\"item\">\n                <b> {{subject.code}} : {{subject.name}}</b>\n                <table class=\"table table-hover\">\n                  <tbody>\n                    <tr *ngFor=\"let itemchap of subject.chapter;\">\n                      <!-- <td> &nbsp; &nbsp; &bull; {{itemchap.code}} : {{itemchap.name}}</td> -->\n                      <td> &nbsp; &nbsp; &bull; {{itemchap.name}}</td>\n                      <td align=\"right\">\n                        <button class=\"btn btn-warning btn-xs\" style=\"font-size: 16px;\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#deleteChap\" (click)=\"setRemoveChapterCode(subject.code,itemchap.code)\">\n                          <span class=\"glyphicon glyphicon-trash\"></span>\n                        </button>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n    </div>\n  </div>\n</div>\n\n\n<!-- delete modal -->\n<div class=\"modal fade\" id=\"delete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n        </button>\n        <h4 class=\"modal-title custom_align\" id=\"Heading\">Delete this subject</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"alert alert-danger\">\n          <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to delete this subject?\n        </div>\n      </div>\n      <div class=\"modal-footer \">\n        <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"RemoveSubject()\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-remove\"></span> No</button>\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>\n\n\n<!-- delete modal -->\n<div class=\"modal fade\" id=\"deleteChap\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n        </button>\n        <h4 class=\"modal-title custom_align\" id=\"Heading\">Delete this chapter</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"alert alert-danger\">\n          <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to delete this chapter?\n        </div>\n      </div>\n      <div class=\"modal-footer \">\n        <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"RemoveChapter()\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-remove\"></span> No</button>\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>"

/***/ }),

/***/ "../../../../../src/app/delete-test/delete-test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteTestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeleteTestComponent = (function () {
    function DeleteTestComponent(afs) {
        this.afs = afs;
        this.arrSubDisplay = [];
        //subject
        this.Refresh();
    }
    DeleteTestComponent.prototype.Refresh = function () {
        var _this = this;
        this.arrSubDisplay = [];
        var subjectRef = this.afs.collection("/subjects");
        this.subjectList = subjectRef.valueChanges();
        this.subjectList.forEach(function (subject) {
            // console.log(subject);
            subject.forEach(function (sub) {
                // console.log(sub.code);
                var chapterRef = _this.afs.collection("/subjects/" + sub.code + "/chapters/");
                _this.chapterList = chapterRef.valueChanges();
                _this.chapterList.forEach(function (chap) {
                    //  console.log(chap);
                    var objSubDisplay = {
                        code: sub.code,
                        name: sub.name,
                        chapter: chap
                    };
                    // console.log(objSubDisplay);
                    _this.arrSubDisplay.push(objSubDisplay);
                });
                // this.chapterList.forEach(chap => {
                //   console.log(chap);
                // })
            });
        });
    };
    DeleteTestComponent.prototype.ngOnInit = function () {
    };
    DeleteTestComponent.prototype.setRemoveSubjectCode = function (subCode, chapList) {
        this.chapInSubCode_del = chapList;
        this.subCode_del = subCode;
    };
    DeleteTestComponent.prototype.RemoveSubject = function () {
        var _this = this;
        console.log("delll => " + this.subCode_del);
        this.chapInSubCode_del.forEach(function (chapter, index) {
            console.log(chapter.code);
            var SubChapCode = _this.subCode_del + "_" + chapter.code;
            console.log(SubChapCode);
            var subjectRef = _this.afs.doc("/subjects/" + _this.subCode_del + "/chapters/" + chapter.code);
            subjectRef.delete();
            var questionRef = _this.afs.doc("/questions/" + SubChapCode);
            questionRef.delete();
        });
        var subjectRef = this.afs.doc("/subjects/" + this.subCode_del);
        subjectRef.delete().then(function () {
            console.log("RemoveSubject");
            _this.Refresh();
        });
        __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default()({
            type: 'success',
            title: 'Removed',
            showConfirmButton: false,
            timer: 1500
        });
    };
    DeleteTestComponent.prototype.setRemoveChapterCode = function (subCode, ChapCode) {
        console.log(subCode + "====" + ChapCode);
        this.subCode_del = subCode;
        this.chapCode_del = ChapCode;
    };
    DeleteTestComponent.prototype.RemoveChapter = function () {
        var _this = this;
        console.log("delll => " + this.chapCode_del + "in" + this.subCode_del);
        var subjectRef = this.afs.doc("/subjects/" + this.subCode_del + "/chapters/" + this.chapCode_del);
        subjectRef.delete().then(function () {
            console.log("RemoveChapter");
            _this.Refresh();
        });
        var SubChapCode = this.subCode_del + "_" + this.chapCode_del;
        console.log(SubChapCode);
        var questionRef = this.afs.doc("/questions/" + SubChapCode);
        questionRef.delete();
        __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default()({
            type: 'success',
            title: 'Removed',
            showConfirmButton: false,
            timer: 1500
        });
    };
    DeleteTestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-delete-test',
            template: __webpack_require__("../../../../../src/app/delete-test/delete-test.component.html"),
            styles: [__webpack_require__("../../../../../src/app/delete-test/delete-test.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], DeleteTestComponent);
    return DeleteTestComponent;
}());



/***/ }),

/***/ "../../../../../src/app/edit-detail/edit-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "editDetail {\r\n  margin: 30px;\r\n}\r\n\r\n.content {\r\n  background-color: white;\r\n}\r\n\r\n.tableShow {\r\n  background-color: #F6F6F6;\r\n}\r\n\r\nu {\r\n  /* text-decoration: underline; */\r\n  border-bottom: double 2px;\r\n}\r\n.buttonForm{\r\n  text-align: center\r\n}\r\n.bntAdd{\r\n  width: 20%;\r\n  margin: 5px;\r\n}\r\n.tableShow2{\r\nbackground-color: #FFF0F0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/edit-detail/edit-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"editDetail\">\n\n  <div class=\"box box-warning\">\n\n    <div class=\"content\">\n      <!-- <div class=\"button_group\" style=\"float:left\">\n        <button type=\"button\" class=\"btn btn-warning btn-sm\" (click)=\"goBackEditTeste()\">\n          <i class=\"fa fa-chevron-circle-left\"></i> Back</button>\n      </div>\n\n      <br>\n      <br> -->\n\n      <form #edit=\"ngForm\">\n        <div class=\"form-group\">\n          <label>Subject Code:</label>\n          <input type=\"text\" class=\"form-control\" id=\"SubjectCode\" name=\"SubjectCode\" ngModel [(ngModel)]=\"Subject_Code\" disabled>\n        </div>\n        <div class=\"form-group\">\n          <label>Subject Name:</label>\n          <input type=\"text\" class=\"form-control\" id=\"SubjectName\" name=\"SubjectName\" ngModel [(ngModel)]=\"Subject_Name\" disabled>\n        </div>\n\n        <div class=\"form-group\">\n          <label>chapter Name:</label>\n          <input type=\"text\" class=\"form-control\" id=\"chapterName\" name=\"chaptertName\" ngModel [(ngModel)]=\"chapter_Name\">\n        </div>\n\n        <div class=\"form-group\">\n          <label>Type of Test:</label>\n          <select class=\"form-control\" id=\"SelectTopic\" name=\"SelectTopic\" [(ngModel)]=\"type\">\n            <option value=\"\" [disabled]=\"true\"> ----Please choose one---- </option>\n            <option [ngValue]=1> 1 : คำตอบสั้น </option>\n            <option [ngValue]=2> 2 : คำถามแบบ 2 ตัวเลือก </option>\n            <option [ngValue]=3> 3 : คำตอบสั้น 3 ตัวเลือก </option>\n            <option [ngValue]=4> 4 : คำตอบสั้น 4 ตัวเลือก </option>\n          </select>\n        </div>\n        <ng-container *ngIf=\"isDisplayQuestion\">\n        <!-- data question อันเก่า -->\n        <table class=\"table tableShow\">\n          <tbody>\n            <tr *ngFor=\"let question_item of questionAllList ;let index = index;let i = index;\" class=\"hoverTable\">\n              <td width=\"10px\" align=\"center\">\n                <b> {{i+1}}) </b>\n              </td>\n              <td>\n                <!-- content question -->\n                <div class=\"item\">\n                  <b>{{question_item.question}}</b>\n\n                  <p class=\"display_question_item\" *ngFor=\"let itemChoice of question_item.choice;let i = index\">\n\n                    <!-- {{question_item.choice[0]}} -->\n                    &nbsp;&nbsp;&nbsp; &nbsp; [{{i+1}}]&nbsp;{{itemChoice}}\n                  </p>\n                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                  <u>\n                    <b>answer</b>&nbsp;&nbsp;index [{{question_item.answer}}] </u>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        </ng-container>\n\n        <!-- upload  exel-->\n        <label>upload question file</label>\n        <br>\n        <label class=\"btn btn-default form-group\">\n          <!-- <input type=\"file\" style=\"display: inline-block;\" (change)=\"incomingfile($event)\" placeholder=\"Upload file\" accept=\".xlsx\" name=\"uploadExcel\" [(ngModel)]=\"uploadExcel\" style=\"width:1000\">       -->\n          <input type=\"file\" style=\"display: inline-block;\" (change)=\"incomingfile($event)\" name=\"uploadExcel\" id=\"uploadExcel\" placeholder=\"Upload file\"\n            accept=\".xlsx\" name=\"uploadExcel\">\n          <!-- button -->\n\n        </label>\n        <button type=\"submit\" class=\"btn btn-default\" (click)=\"Upload();\">Upload</button>\n        <!-- display when no data question to be add -->\n        <br>\n        <br>\n        <ng-container *ngIf=\"isDisplayQuestion\">\n          <div class=\"row\">\n            <div class=\"col-md-12 tableShow\">\n              <p style=\"text-align: center\">\n                <br> --- no data ---\n\n              </p>\n            </div>\n          </div>\n        </ng-container>\n        <!--  -->\n        <ng-container *ngIf=\"!isDisplayQuestion\">\n          <table class=\"table tableShow2\">\n            <tbody>\n              <tr *ngFor=\"let question_item of question_objDisplay ;let index = index;let i = index;\" class=\"hoverTable\">\n                <td width=\"10px\" align=\"center\">\n                  <b> {{i+1}}) </b>\n                </td>\n                <td>\n                  <!-- content question -->\n                  <div class=\"item\">\n                    <b>{{question_item.question}}</b>\n\n                    <p class=\"display_question_item\" *ngFor=\"let itemChoice of question_item.choice;let i = index\">\n\n                      <!-- {{question_item.choice[0]}} -->\n                      &nbsp;&nbsp;&nbsp; &nbsp; [{{i+1}}]&nbsp;{{itemChoice}}\n                    </p>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                    <u>\n                      <b>answer</b>&nbsp;&nbsp;index [{{question_item.answer}}] </u>\n                  </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <br>\n        </ng-container>\n        <!--end display data question to be add -->\n        <br>\n        <!-- button -->\n        <div class=\"row\">\n          <div class=\"col-md-12 \">\n            <p class=\"buttonForm\">\n              <button type=\"button\" class=\"btn btn-warning bntAdd\" (click)=\"goBackEditTeste()\">\n                <i class=\"fa fa-chevron-circle-left\"></i> Back</button>\n              <button type=\"submit\" class=\"btn btn-success  bntAdd\" data-toggle=\"modal\" data-target=\"#updateTest\">\n                  <span class=\"glyphicon glyphicon-ok-sign\"></span> Update</button>\n            </p>\n          </div>\n        </div>\n        <!--  -->\n      </form>\n\n    </div>\n\n  </div>\n</div>\n\n\n<!-- updateTest modal -->\n<div class=\"modal fade\" id=\"updateTest\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n        </button>\n        <h4 class=\"modal-title custom_align\" id=\"Heading\">Update this Test</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"alert alert-warning\">\n          <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to update this test?\n        </div>\n      </div>\n      <div class=\"modal-footer \">\n        <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"updateTest()\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n          <span class=\"glyphicon glyphicon-remove\"></span> No</button>\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>"

/***/ }),

/***/ "../../../../../src/app/edit-detail/edit-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_excel_service__ = __webpack_require__("../../../../../src/app/services/excel.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ts_xlsx__ = __webpack_require__("../../../../ts-xlsx/lib/main.browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ts_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ts_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditDetailComponent = (function () {
    function EditDetailComponent(xlservice, route, router, afs) {
        var _this = this;
        this.xlservice = xlservice;
        this.route = route;
        this.router = router;
        this.afs = afs;
        this.questionAllList = [];
        this.question_obj = {};
        this.isDisplayQuestion = true;
        this.question_objDisplay = [];
        this.question_objDisplay = [];
        this.Subject_Code = localStorage.getItem("subjectKey");
        this.Subject_Name = localStorage.getItem("subjectName");
        console.log(this.Subject_Code + "*********" + this.Subject_Name);
        this.Chapter_Code = localStorage.getItem("chapterKey");
        this.chapter_Name = localStorage.getItem("chapterName");
        this.questionCode = this.Subject_Code + "_" + this.Chapter_Code;
        console.log(this.questionCode);
        var questionDoc = this.afs.doc("/questions/" + this.questionCode);
        var questions = questionDoc.valueChanges();
        questions.forEach(function (data) {
            console.log(data);
            _this.type = data.type;
            _this.amount = data.amount;
            _this.question = data.question;
            _this.questionAllList = Object.values(data.question);
            console.log(_this.questionAllList);
        });
    }
    EditDetailComponent.prototype.ngOnInit = function () {
    };
    EditDetailComponent.prototype.goBackEditTeste = function () {
        this.router.navigate(['dashboard', 'manage-test', 'Edit-Test']);
    };
    EditDetailComponent.prototype.incomingfile = function (event) {
        this.file = event.target.files[0];
        this.selectedFiles = event.target.files;
    };
    EditDetailComponent.prototype.Upload = function () {
        var _this = this;
        this.question_objDisplay = [];
        console.log("display question");
        if (this.file == undefined) {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'warning',
                title: 'Unsuccessful',
                text: 'Please select file.',
            });
        }
        else {
            this.isDisplayQuestion = false;
            var fileReader_1 = new FileReader();
            fileReader_1.onload = function (e) {
                _this.arrayBuffer = fileReader_1.result;
                var data = new Uint8Array(_this.arrayBuffer);
                var arr = new Array();
                console.log(data.length);
                for (var i = 0; i != data.length; ++i)
                    arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = __WEBPACK_IMPORTED_MODULE_4_ts_xlsx__["read"](bstr, { type: "binary" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
                _this.question_excel = __WEBPACK_IMPORTED_MODULE_4_ts_xlsx__["utils"].sheet_to_json(worksheet, { raw: true });
                console.log(_this.question_excel);
                _this.question_excel.forEach(function (question, index) {
                    _this.amount = index + 1;
                    console.log(question);
                    console.log(index);
                    _this.question_key = index;
                    console.log(_this.question_excel[index].choice);
                    //make array type of choice
                    var choice_string = (_this.question_excel[index].choice).toString();
                    var re = /\s*,\s*/;
                    var choice_arr = choice_string.split(re);
                    //add sub question
                    _this.sub_question = {
                        "answer": _this.question_excel[index].answer,
                        "choice": choice_arr,
                        "code": _this.question_key,
                        "question": _this.question_excel[index].question
                    };
                    console.log(_this.question_objDisplay);
                    _this.question_objDisplay.push(_this.sub_question);
                    // console.log(this.sub_question);
                    _this.question_obj[_this.question_key] = _this.sub_question;
                    console.log(_this.question_obj);
                });
            };
            fileReader_1.readAsArrayBuffer(this.file);
        }
    };
    EditDetailComponent.prototype.updateTest = function () {
        if (this.chapter_Name == "") {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter chapter name.',
            });
        }
        else {
            console.log("UpdateSubject");
            //update data : chapter name
            var chapter_nameUpdate = {
                name: this.chapter_Name
            };
            var subjectRef = this.afs.doc("subjects/" + this.Subject_Code + "/chapters/" + this.Chapter_Code);
            subjectRef.update(chapter_nameUpdate);
            if (this.selectedFiles && this.isDisplayQuestion == false) {
                console.log("เลือก");
                //make type string tp number
                var type_num = +this.type;
                this.questionAdd = {
                    amount: this.amount,
                    question: this.question_obj,
                    type: type_num
                };
                console.log(this.questionAdd);
                var questionRef = this.afs.doc("questions/" + this.questionCode);
                questionRef.update(this.questionAdd);
                this.selectedFiles = null;
            }
            else {
                console.log("ไม่ได้เลือก");
                //update data : chapter name
                var questionUpdate = {
                    amount: this.amount,
                    question: this.question,
                    type: this.type
                };
                var questionRef = this.afs.doc("questions/" + this.questionCode);
                questionRef.update(questionUpdate);
            }
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'success',
                title: 'Successful',
                showConfirmButton: false,
                timer: 1500
            });
            this.goBackEditTeste();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('uploadExcel'),
        __metadata("design:type", Object)
    ], EditDetailComponent.prototype, "myInputVariable", void 0);
    EditDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-detail',
            template: __webpack_require__("../../../../../src/app/edit-detail/edit-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/edit-detail/edit-detail.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_excel_service__["a" /* ExcelService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], EditDetailComponent);
    return EditDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/edit-test/edit-test.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "edit-test{\r\n    margin: 30px;  \r\n  }\r\n\r\n\r\n  .content{\r\n    background-color:white;\r\n  }\r\n  .delSub{\r\n    margin-right: 8px;\r\n  }\r\n  \r\n  .detail:hover{\r\n    cursor: pointer;\r\n    text-decoration: underline; \r\n    }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/edit-test/edit-test.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-test\">\n\n    <div class=\"box box-warning\">\n  \n      <div class=\"content\">\n        <br>\n        <br>\n        <!--  -->\n        <table class=\"table\">\n  \n          <tbody>\n            <tr *ngFor=\"let subject of arrSubDisplay ;let index = index;let i = index;\" class=\"hoverTable\">\n              <td width=\"10px\" align=\"center\">\n                <b> {{i+1}}) </b>\n              </td>\n              <td>\n  \n                <!-- tools box -->\n                <div class=\"pull-right box-tools \">\n                  <button class=\"btn btn-default btn-xs\" style=\"font-size: 16px;\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#editSubject\" (click)=\"setSubjectEdit(subject)\">\n                    <span class=\"glyphicon glyphicon-pencil\"></span>\n                  </button>\n  \n                </div>\n                <!-- content question -->\n                <div class=\"item\">\n                  <b> {{subject.code}} : {{subject.name}}</b>\n                  <table class=\"table table-hover\">\n                    <tbody>\n                      <tr *ngFor=\"let itemchap of subject.chapter;\">\n                          <td> &nbsp; &nbsp; &bull; <a class=\"detail\" (click)=\"goEdiTtestDetail(subject,itemchap)\">{{itemchap.name}}</a></td>\n\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  \n  <!-- edit subject modal -->\n  <div class=\"modal fade\" id=\"editSubject\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n            <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n          </button>\n          <h4 class=\"modal-title custom_align\" id=\"Heading\">Edit Your Subject</h4>\n        </div>\n        <!-- ////// -->\n        <div class=\"modal-body\">\n          <form>\n            <div class=\"form-group\">\n              <label>Subject Code:</label>\n              <input class=\"form-control \" type=\"text\" name=\"SubjectCode\"  [(ngModel)]=\"subjectCodeLocal\" disabled>\n            </div>\n            <div class=\"form-group\">\n              <label>Subject Name:</label>\n              <input class=\"form-control \" type=\"text\" name=\"SubjectName\"  [(ngModel)]=\"subjectNameLocal\">\n            </div>\n          </form>\n        </div>\n\n        <div class=\"modal-footer \">\n          <button type=\"button\" class=\"btn btn-warning btn-lg\" style=\"width: 100%;\" (click)=\"UpdateSubject()\" data-dismiss=\"modal\">\n            <span class=\"glyphicon glyphicon-ok-sign\"></span> Update</button>\n        </div>\n      </div>\n      <!-- /.modal-content -->\n    </div>\n    <!-- /.modal-dialog -->\n  </div>\n\n\n\n  <!-- ไม่ได้ใช้\n  \n    <div class=\"modal fade\" id=\"editChap\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n              <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n            </button>\n            <h4 class=\"modal-title custom_align\" id=\"Heading\">Edit Your Subject</h4>\n          </div>\n     \n          <div class=\"modal-body\">\n            <form (ngSubmit)=\"setSubjectEdit(subjectLocal)\">\n              <div class=\"form-group\">\n                <label>Subject Code:</label>\n                <input class=\"form-control \" type=\"text\" name=\"SubjectCode\" ngModel [(ngModel)]=\"subjectLocal.code\" disabled>\n              </div>\n              <div class=\"form-group\">\n                <label>Subject Name:</label>\n                <input class=\"form-control \" type=\"text\" name=\"SubjectName\" ngModel [(ngModel)]=\"subjectLocal.name\">\n              </div>\n            </form>\n          </div>\n  \n          <div class=\"modal-footer \">\n            <button type=\"button\" class=\"btn btn-warning btn-lg\" style=\"width: 100%;\" (click)=\"UpdateSubject()\" data-dismiss=\"modal\">\n              <span class=\"glyphicon glyphicon-ok-sign\"></span> Update</button>\n          </div>\n        </div>\n\n      </div>\n\n    </div> -->"

/***/ }),

/***/ "../../../../../src/app/edit-test/edit-test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditTestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditTestComponent = (function () {
    function EditTestComponent(afs, router) {
        this.afs = afs;
        this.router = router;
        this.arrSubDisplay = [];
        //subject
        this.Refresh();
    }
    EditTestComponent.prototype.Refresh = function () {
        var _this = this;
        this.arrSubDisplay = [];
        var subjectRef = this.afs.collection("/subjects");
        this.subjectList = subjectRef.valueChanges();
        this.subjectList.forEach(function (subject) {
            // console.log(subject);
            subject.forEach(function (sub) {
                console.log(sub.code);
                var chapterRef = _this.afs.collection("/subjects/" + sub.code + "/chapters/");
                _this.chapterList = chapterRef.valueChanges();
                _this.chapterList.forEach(function (chap) {
                    //  console.log(chap);
                    var objSubDisplay = {
                        code: sub.code,
                        name: sub.name,
                        chapter: chap
                    };
                    // console.log(objSubDisplay);
                    _this.arrSubDisplay.push(objSubDisplay);
                    // console.log(this.arrSubDisplay);
                });
                // this.chapterList.forEach(chap => {
                //   console.log(chap);
                // })
            });
        });
    };
    EditTestComponent.prototype.setSubjectEdit = function (subject) {
        console.log(subject);
        this.subjectNameLocal = subject.name;
        this.subjectCodeLocal = subject.code;
    };
    EditTestComponent.prototype.goEdiTtestDetail = function (subject, Chapter) {
        var subjectCode = subject.code;
        var subjectName = subject.name;
        var ChapterCode = Chapter.code;
        localStorage.setItem('subjectKey', subjectCode);
        localStorage.setItem('subjectName', subjectName);
        localStorage.setItem('chapterKey', ChapterCode);
        localStorage.setItem('chapterName', Chapter.name);
        var subjectChapCode = "Subject" + subjectCode + "Chapter" + ChapterCode;
        this.router.navigate(['dashboard', 'manage-test', 'edit', subjectChapCode]); //ไป path : /dashboard/group/group_name ที่คลิกเลือก
    };
    EditTestComponent.prototype.UpdateSubject = function () {
        var _this = this;
        if (this.subjectNameLocal == "") {
            __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter subject name.',
            });
        }
        else {
            console.log("UpdateSubject");
            var subjectUpdate = {
                name: this.subjectNameLocal
            };
            //path to update
            var subjectRef = this.afs.doc("subjects/" + this.subjectCodeLocal);
            //update data : student_name
            subjectRef.update(subjectUpdate).then(function () {
                console.log("update Subject");
                _this.Refresh();
            });
            __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
                type: 'success',
                title: 'Successful',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    EditTestComponent.prototype.ngOnInit = function () {
    };
    EditTestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-test',
            template: __webpack_require__("../../../../../src/app/edit-test/edit-test.component.html"),
            styles: [__webpack_require__("../../../../../src/app/edit-test/edit-test.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], EditTestComponent);
    return EditTestComponent;
}());



/***/ }),

/***/ "../../../../../src/app/group-detail/group-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".manage-std-group{\r\n    margin: 30px;  \r\n  }\r\n  .row{\r\n    /* height: 50px; */\r\n    margin-top: 20px;\r\n    margin-right: 40px;\r\n    margin-left: 80px;\r\n    \r\n  }\r\n  .item_group{\r\n    padding: 10px;\r\n    margin: 10px;\r\n    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);\r\n    background-color:white;\r\n   height: 50px;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n  }\r\n.item_group_text{\r\n  text-align: center;\r\n  margin-left: 10px;\r\n \r\n}\r\n.item_group:hover {\r\n  background-color: #f2f2f2;\r\n  cursor: pointer;\r\n}\r\n.group_option1{\r\n  float:left;\r\n  border: 2px solid white;\r\n  padding: 2px;\r\n}\r\n.group_option2{\r\n  float:left;\r\n  border: 2px solid  #d9d9d9;\r\n  padding: 2px;\r\n  margin-left: 20px;\r\n}\r\n.button_group{\r\n\r\n  background-color:white;\r\n  margin: 20px;\r\n}\r\n.student-list{\r\n  margin: 30px;  \r\n}\r\n\r\n.container{\r\n  margin-top: 40px;  \r\n}\r\n.picture_show{\r\n  padding: 5px;\r\n}\r\n.picture_show:hover{\r\n  position: absolute;\r\n  cursor: pointer;\r\n  width: 250px;\r\n  transition: width 1s;\r\n  border-radius: 10px;\r\n  box-shadow: -3px -3px 20px #888888;\r\n}\r\n.thisTextCenter{\r\n  text-align: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/group-detail/group-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"manage-std-group\">\r\n    <div class=\"box box-info\"> \r\n      <div class=\"button_group\" style=\"float:left\">\r\n          <div class=\"group_option1\">\r\n            <button type=\"button\" class=\"btn btn-warning btn-sm\" (click)=\"backGroupListPage()\">\r\n              <i class=\"fa fa-chevron-circle-left\"></i> Back</button>\r\n          </div>\r\n          <div class=\"group_option2\">\r\n            &nbsp;\r\n            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#deleteGroup\">\r\n              <span class=\"glyphicon glyphicon-trash\"></span> Delete Group</button>\r\n            &nbsp; &nbsp;\r\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" data-target=\"#AddStd\" (click)=\"preAddStudentDialog()\">\r\n              <i class=\"fa fa-user-plus\"></i> Add new student to Group</button>\r\n            &nbsp;\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"container\">\r\n        <!-- Display student list -->\r\n        <!-- table -->\r\n        <div class=\"row\">\r\n          <div class=\"col-md-10\">\r\n            <div class=\"table-responsive\">\r\n              <!-- table std list -->\r\n              <table class=\"table table-striped\">\r\n                <thead>\r\n                  <tr>\r\n                    <th>\r\n                      #\r\n                      <!-- <input type=\"checkbox\" class=\"checkthis\" /> -->\r\n                      <!-- <input type=\"checkbox\" id=\"checkall\" /> -->\r\n                    </th>\r\n                    <th scope=\"col\">Picture </th>\r\n                    <th scope=\"col\">Student ID</th>\r\n                    <th scope=\"col\">Student Name</th>\r\n                    <th class=\"thisTextCenter\">Delete</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let studentObservable of members; let i=index\">\r\n                    <ng-container *ngIf=\"studentObservable | async as student\">\r\n                      <td>{{i+1}}</td>\r\n                      <img src= {{student.url}} width=\"60 px\" class=\"picture_show img-circle\">\r\n                      <td>{{student.code}}</td>\r\n                      <td>{{student.name}}</td>\r\n                      <td class=\"thisTextCenter\">\r\n                        <p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\">\r\n                          <button class=\"btn btn-danger btn-xs\" style=\"font-size: 16px\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" (click)=\"preRemoveStudent(student.code)\">\r\n                            <span class=\"glyphicon glyphicon-trash\"></span>\r\n                          </button>\r\n                        </p>\r\n                      </td>\r\n                    </ng-container>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n</div>\r\n</div>\r\n</div>\r\n  \r\n  <!-- Add new student to this group -->\r\n  <div class=\"modal fade\" id=\"AddStd\" role=\"dialog\">\r\n    <div class=\"modal-dialog  modal-md\">\r\n      <!-- Modal size sm,md-->\r\n  \r\n      <!-- Modal content-->\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n          <h4 class=\"modal-title\">Add new student to this group</h4>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <!-- table -->\r\n          <div class=\"row\">\r\n            <div class=\"col-md-11\">\r\n              <div class=\"table-responsive\">\r\n                <table class=\"table table-striped\">\r\n                  <thead>\r\n                    <tr>\r\n  \r\n                      <th>\r\n                        <input type=\"checkbox\" class=\"checkthis\" [(ngModel)]=\"isSelect\" (change)=\"addSelectAll();\" />\r\n                        <!-- <input type=\"checkbox\" id=\"checkall\" /> -->\r\n                        <th scope=\"col\">Student ID</th>\r\n                        <th scope=\"col\">Student Name</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n  \r\n                    <tr *ngFor=\"let student of newStudentList\">\r\n                      <td>\r\n                        <input type=\"checkbox\" class=\"checkthis\" [(ngModel)]=\"student.selected\"/>\r\n                      </td>\r\n                      <td>{{student.code}}</td>\r\n                      <td>{{student.name}}</td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- end table -->\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" (click)=\"addStudentGroup()\" data-dismiss=\"modal\">\r\n            <span class=\"glyphicon glyphicon-ok-sign\"></span>ADD</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  \r\n    <!-- respond tab -->\r\n  </div>\r\n  \r\n  <!-- delete Group modal -->\r\n  <div class=\"modal fade\" id=\"deleteGroup\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n            <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\r\n          </button>\r\n          <h4 class=\"modal-title custom_align\" id=\"Heading\">Delete this Group</h4>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <div class=\"alert alert-danger\">\r\n            <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to delete this Group?</div>\r\n        </div>\r\n        <div class=\"modal-footer \">\r\n          <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"deleteGroup()\" data-dismiss=\"modal\">\r\n            <span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n            <span class=\"glyphicon glyphicon-remove\"></span> No</button>\r\n        </div>\r\n      </div>\r\n      <!-- /.modal-content -->\r\n    </div>\r\n  </div>\r\n  \r\n  <!-- delete student in group modal -->\r\n  <div class=\"modal fade\" id=\"delete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n            <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\r\n          </button>\r\n          <h4 class=\"modal-title custom_align\" id=\"Heading\">Delete this student</h4>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <div class=\"alert alert-danger\">\r\n            <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to delete this student?</div>\r\n        </div>\r\n        <div class=\"modal-footer \">\r\n          <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"removeStudent()\" data-dismiss=\"modal\">\r\n            <span class=\"glyphicon glyphicon-ok-sign\"></span>Yes</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n            <span class=\"glyphicon glyphicon-remove\"></span> No</button>\r\n        </div>\r\n      </div>\r\n      <!-- /.modal-content -->\r\n    </div>\r\n  </div>"

/***/ }),

/***/ "../../../../../src/app/group-detail/group-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GroupDetailComponent = (function () {
    function GroupDetailComponent(route, router, afs) {
        this.route = route;
        this.router = router;
        this.afs = afs;
    }
    GroupDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSubscribe = this.route.params.subscribe(function (params) {
            console.log("params" + params + "++++" + params['name']);
            _this.name = params['name']; // ชื่อ section ที่เลือก
            _this.Refresh();
        });
    };
    GroupDetailComponent.prototype.Refresh = function () {
        var _this = this;
        this.studentCollection = this.afs.collection('/students', function (ref) { return ref.orderBy('code'); });
        this.sectionRef = this.afs.doc("/sections/" + this.name);
        this.sectionObservable = this.sectionRef.valueChanges();
        // Extract Ref to Student Object 
        this.sectionObservable.forEach(function (section) {
            if (section && section.members && section.members.length > 0) {
                _this.membersRef = section.members; //member(student)อ้างอิง ที่อยู่ใน section.members
                _this.members = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](section.members, function (student) {
                    // Wait for update to support DocumentRef as input
                    // return this.afs.doc(student).valueChanges()
                    return _this.afs.doc(student.path).valueChanges(); // student/path จาก student member in section ex. student/570510637
                });
            }
            else {
                _this.membersRef = [];
                _this.members = [];
            }
            _this.studentCollection.valueChanges().forEach(function (students) {
                students = __WEBPACK_IMPORTED_MODULE_3_lodash__["remove"](students, function (student) {
                    var result = __WEBPACK_IMPORTED_MODULE_3_lodash__["findIndex"](_this.membersRef, function (stu) {
                        //  console.log(student.code);
                        if (stu.id == student.code) {
                            // console.log(stu.id);
                        }
                        //
                        return stu.id == student.code; //returns ค่า student ที่มีในกลุ่มนั้นๆแล้ว
                    });
                    return result == -1; //returns truthy for and returns an array of the removed elements.
                });
                _this.newStudentList = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](students, function (student) {
                    // console.log(student);   //{code: "570510100", name: "มาลี ดีใจ", url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=e086515b-7369-4c47-a791-7b64ee5f35d3"}
                    return student;
                });
                //  console.log(this.newStudentList)              //Student List ที่ยังไม่ได้ถูก add ในกลุ่มนั้นๆ สามารถเพิ่มเข้ามาในกลุ่ม
            });
        });
        this.currentStudent = null;
        this.newMembers = null;
    };
    GroupDetailComponent.prototype.preAddStudentDialog = function () {
        this.isSelect = false;
    };
    GroupDetailComponent.prototype.addSelectAll = function () {
        var _this = this;
        this.newStudentList = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](this.newStudentList, function (student) {
            student.selected = _this.isSelect;
            console.log("-....-" + student); //student ที่ถูกเลือก
            return student;
        });
    };
    GroupDetailComponent.prototype.addStudentGroup = function () {
        var _this = this;
        console.log("ole mem" + this.membersRef);
        this.newMembers = this.membersRef;
        __WEBPACK_IMPORTED_MODULE_3_lodash__["each"](this.newStudentList, function (student) {
            if (student.selected) {
                var studentDoc = _this.afs.doc("/students/" + student.code);
                _this.newMembers.push(studentDoc.ref);
                console.log(_this.newMembers);
            }
        });
        console.log("new mem" + this.newMembers);
        var section = {
            members: this.newMembers
        };
        this.sectionRef.update(section).then(function () {
            _this.Refresh();
        });
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            type: 'success',
            title: 'Successful',
            showConfirmButton: false,
            timer: 1500
        });
    };
    GroupDetailComponent.prototype.preRemoveStudent = function (studentCode) {
        this.currentStudent = studentCode;
    };
    GroupDetailComponent.prototype.removeStudent = function () {
        var _this = this;
        if (this.currentStudent) {
            this.newMembers = [];
            __WEBPACK_IMPORTED_MODULE_3_lodash__["each"](this.membersRef, function (studentRef) {
                if (studentRef.id != _this.currentStudent) {
                    _this.newMembers.push(studentRef);
                }
            });
            var section = {
                members: this.newMembers
            };
            this.sectionRef.update(section).then(function () {
                _this.Refresh();
            });
        }
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            type: 'success',
            title: 'Removed',
            showConfirmButton: false,
            timer: 1500
        });
    };
    GroupDetailComponent.prototype.deleteGroup = function () {
        this.sectionRef.delete();
        this.backGroupListPage();
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            type: 'success',
            title: 'Removed',
            showConfirmButton: false,
            timer: 1500
        });
    };
    GroupDetailComponent.prototype.ngOnDestroy = function () {
        this.routeSubscribe.unsubscribe();
    };
    GroupDetailComponent.prototype.backGroupListPage = function () {
        this.router.navigate(['dashboard', 'manage-student-group']);
    };
    GroupDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-group-detail',
            template: __webpack_require__("../../../../../src/app/group-detail/group-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/group-detail/group-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], GroupDetailComponent);
    return GroupDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthGuard = (function () {
    function AuthGuard(afAuth, router, authService) {
        this.afAuth = afAuth;
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.authService.authenticated) {
            return true;
        }
        console.log('access denied!');
        this.router.navigate(['']);
        return false;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n/* Form */\r\n.form {\r\n  position: relative;\r\n  z-index: 1;\r\n  background:#E1BEE7;\r\n  max-width: 300px;\r\n  max-height: 3500px;\r\n  margin: 0 auto 10px;\r\n  padding: 30px;\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n  border-bottom-right-radius: 3px;\r\n  text-align: center;\r\n}\r\n.form .thumbnail {\r\n  background: #BA68C8;\r\n  width: 150px;\r\n  height: 150px;\r\n  margin: 0 auto 30px;\r\n  padding: 50px 30px;\r\n  border-top-left-radius: 100%;\r\n  border-top-right-radius: 100%;\r\n  border-bottom-left-radius: 100%;\r\n  border-bottom-right-radius: 100%;\r\n  box-sizing: border-box;\r\n}\r\n.form .thumbnail img {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n.form input {\r\n  outline: 0;\r\n  background: #ffffff;\r\n  width: 100%;\r\n  border: 0;\r\n  margin: 0 0 15px;\r\n  padding: 15px;\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n  border-bottom-right-radius: 3px;\r\n  box-sizing: border-box;\r\n  font-size: 14px;\r\n}\r\n.form .button {\r\n  outline: 0;\r\n  background: #7B1FA2;\r\n  width: 100%;\r\n  border: 0;\r\n  padding: 15px;\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n  border-bottom-right-radius: 3px;\r\n  color: #FFFFFF;\r\n  font-size: 14px;\r\n  transition: all 0.3 ease;\r\n  cursor: pointer;\r\n}\r\n\r\n.container {\r\n  position: relative;\r\n  z-index: 1;\r\n  /*max-width: 300px;*/\r\n  margin: 0 auto;\r\n}\r\n.container:before, .container:after {\r\n  content: \"\";\r\n  display: block;\r\n  clear: both;\r\n}\r\n.container .info {\r\n  margin: 50px auto;\r\n  text-align: center;\r\n}\r\n.container .info h1 {\r\n  margin: 0 0 15px;\r\n  padding: 0;\r\n  font-size: 36px;\r\n  font-weight: 300;\r\n  color: #1a1a1a;\r\n}\r\n.container .info span {\r\n  color: #4d4d4d;\r\n  font-size: 12px;\r\n}\r\n.container .info span a {\r\n  color: #000000;\r\n  text-decoration: none;\r\n}\r\n.container .info span .fa {\r\n  color: #EF3B3A;\r\n}\r\n\r\n/* END Form */\r\n/* Demo Purposes */\r\nbody {\r\n  background: #ccc;\r\n  font-family: \"Roboto\", sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\nbody:before {\r\n  content: \"\";\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  display: block;\r\n  background:#F3E5F5;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.signup-text{\r\n  padding-top: 20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<body>\r\n  <div class=\"container\">\r\n\r\n    <div class=\"info\">\r\n      <h1>Online Quiz System for Multiple Choice and Short Answer Question</h1>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"form\">\r\n\r\n    <div class=\"thumbnail\">\r\n      <img src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg\" >\r\n    </div>\r\n\r\n    <form class=\"login-form\">\r\n      <input type=\"email\" placeholder=\"email\" class=\"form-control\" name=\"emailLogin\" [(ngModel)]=\"emailSignup\" />\r\n      <input type=\"password\" placeholder=\"password\" class=\"form-control\" name=\"passwordLogin\" [(ngModel)]=\"passwordSignup\">\r\n\r\n      <!-- <a [routerLink]=\"'/dashboard'\"><input type =\"submit\" class =\"button\" value=\"login\"></a> -->\r\n      <button type=\"submit\" class=\"button btn btn-primary\" (click)=\"login()\">\r\n        <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\r\n        เข้าสู่ระบบ\r\n      </button>\r\n      <div class=\"col-6 text-center signup-text\">\r\n        <a class=\"text-muted\" [routerLink]=\"['/signup']\">\r\n          สมัครสมาชิกใหม่ ?\r\n        </a>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</body>\r\n<!-- <div class=\"row justify-content-center\">\r\n  <div class=\"col-md-6\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header text-center text-white bg-dark\">\r\n        เข้าสู่ระบบ\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <form>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3 col-form-label\">Email</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"email\" class=\"form-control\" name=\"name\" [(ngModel)]=\"emailSignup\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3 col-form-label\">Password</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"password\" class=\"form-control\" name=\"eiei\" [(ngModel)]=\"passwordSignup\">\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-6 text-left\">\r\n              <a class=\"text-muted\" [routerLink]=\"['/signup']\">\r\n                สมัครสมาชิกใหม่ ?\r\n              </a>\r\n            </div>\r\n            <div class=\"col-6 text-right\">\r\n              <button type=\"submit\" class=\"btn btn-primary\" (click)=\"login()\">\r\n                <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\r\n                เข้าสู่ระบบ\r\n              </button>\r\n              <button type=\"submit\" class=\"btn btn-primary\" (click)=\"logout()\">Log Out</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_cookie_service__ = __webpack_require__("../../../../ngx-cookie-service/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(auth, firebaseService, router, cookieService) {
        this.auth = auth;
        this.firebaseService = firebaseService;
        this.router = router;
        this.cookieService = cookieService;
        this.hide = true;
        var user = this.firebaseService.userLogin;
        // console.log(user);
        var cookieValue_email = this.cookieService.get('email');
        var cookieValue_pass = this.cookieService.get('password');
        // console.log(cookieValue_email);
        if (cookieValue_email != "UNKNOWN") {
            this.auth.emailLogin(cookieValue_email, cookieValue_pass);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        this.auth.emailLogin(this.emailSignup, this.passwordSignup);
    };
    LoginComponent.prototype.logout = function () {
        this.cookieService.set('email', 'UNKNOWN');
        this.cookieService.set('password', 'UNKNOWN');
        this.auth.signOut();
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_4_ngx_cookie_service__["a" /* CookieService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/manage-std-group/manage-std-group.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".manage-std-group {\r\n  margin: 30px;\r\n}\r\n\r\n.row {\r\n  background-color: whitesmoke;\r\n  /* height: 50px; */\r\n  margin: 30px;\r\n}\r\n\r\n.item_group {\r\n  padding: 10px;\r\n  margin: 10px;\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\r\n  background-color: white;\r\n  height: 50px;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center;\r\n}\r\n\r\n.item_group_text {\r\n  text-align: center;\r\n  margin-left: 10px;\r\n}\r\n\r\n.item_group:hover {\r\n  background-color: #f2f2f2;\r\n  cursor: pointer;\r\n}\r\n\r\n.group_option1 {\r\n  float: left;\r\n  border: 2px solid white;\r\n  padding: 2px;\r\n}\r\n\r\n.group_option2 {\r\n  float: left;\r\n  border: 2px solid #d9d9d9;\r\n  padding: 2px;\r\n  margin-left: 20px;\r\n}\r\n\r\n.button_group {\r\n  background-color: white;\r\n  margin: 50px;\r\n}\r\n\r\n.content {\r\n  /* margin-top: 10px; */\r\n  background-color: white;\r\n  margin: 20px;  \r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/manage-std-group/manage-std-group.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"manage-std-group\">\r\n    <div class=\"box box-info\">\r\n        <div class=\"content\">\r\n  <!-- Trigger the modal with a button -->\r\n  <button type=\"button\" class=\"btn btn-primary btn-md\" data-toggle=\"modal\" data-target=\"#addGroup\" (click)=\"StartAddGroupModal()\">\r\n   <span class = \"glyphicon glyphicon-plus-sign\" style=\"font-size: 16px;\"></span> &nbsp; New Student group\r\n  </button>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3\" *ngFor=\"let group of groupList | async\">\r\n      <div class=\"item_group\" (click)=\"goGroupDetail(group.name)\">\r\n        <i class=\"fa fa-folder\" style=\"font-size: 2em; color:\t #999999\"></i>\r\n        <span class=\"item_group_text\">{{group.name}}</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Modal add new student group-->\r\n  <div class=\"modal fade\" id=\"addGroup\" role=\"dialog\">\r\n    <div class=\"modal-dialog  modal-md\">\r\n      <!-- Modal size sm,md-->\r\n\r\n      <!-- Modal content-->\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n          <h4 class=\"modal-title\">Add new student group</h4>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <div class=\"form-group\">\r\n            <label for=\"usr\">Group name:</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"GnameAdd\" ngModel [(ngModel)]=\"groupName\" placeholder=\"ex. section1\">\r\n          </div>\r\n          <!-- table -->\r\n          <div class=\"row\">\r\n            <div class=\"col-md-11\">\r\n              <div class=\"table-responsive\">\r\n                <table class=\"table table-striped\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th>\r\n                        <input type=\"checkbox\" class=\"checkthis\" [(ngModel)]=\"isSelect\" (change)=\"createSelectAll()\" />\r\n                        <th scope=\"col\">Student ID</th>\r\n                        <th scope=\"col\">Student Name</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n\r\n                    <tr *ngFor=\"let student of studentList\">\r\n                      <td>\r\n                        <input type=\"checkbox\" class=\"checkthis\" [(ngModel)]=\"student.selected\" />\r\n                      </td>\r\n                      <td>{{student.code}}</td>\r\n                      <td>{{student.name}}</td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <!-- end table -->\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" (click)=\"createGroup()\" data-dismiss=\"modal\">\r\n            <span class=\"glyphicon glyphicon-ok-sign\"></span>ADD</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- respond tab -->\r\n  </div>\r\n</div>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/manage-std-group/manage-std-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageStdGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ManageStdGroupComponent = (function () {
    function ManageStdGroupComponent(afs, firebaseService, router) {
        var _this = this;
        this.afs = afs;
        this.firebaseService = firebaseService;
        this.router = router;
        this.qroupsCheck = [];
        this.qroupsCheckAdd = true;
        this.qroupsCheck = [];
        this.studentCollection = afs.collection('/students', function (ref) { return ref.orderBy('code'); });
        this.studentsObservable = this.studentCollection.valueChanges();
        this.RefreshStudentList();
        var sectionRef = this.afs.collection("/sections");
        this.groupList = sectionRef.valueChanges();
        this.groupList.forEach(function (data) {
            data.forEach(function (data1) {
                console.log(data1);
                _this.qroupsCheck.push(data1);
            });
        });
    }
    ManageStdGroupComponent.prototype.ngOnInit = function () {
    };
    ManageStdGroupComponent.prototype.RefreshStudentList = function () {
        var _this = this;
        this.studentsObservable.forEach(function (students) {
            _this.studentList = students.map(function (student) {
                return student;
            });
        });
    };
    ManageStdGroupComponent.prototype.StartAddGroupModal = function () {
        this.groupName = "";
        this.isSelect = false;
        this.studentList = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](this.studentList, function (student) {
            student.selected = false;
            return student;
        });
    };
    ManageStdGroupComponent.prototype.createSelectAll = function () {
        var _this = this;
        this.studentList = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](this.studentList, function (student) {
            student.selected = _this.isSelect;
            // console.log(student.code);
            return student;
        });
    };
    ManageStdGroupComponent.prototype.createGroup = function () {
        var _this = this;
        //  console.log(this.qroupsCheck.length)
        var count;
        this.members = [];
        var selectStudent = __WEBPACK_IMPORTED_MODULE_3_lodash__["filter"](this.studentList, function (student) {
            return student.selected;
        });
        console.log(selectStudent.length);
        if (this.groupName == "" || selectStudent.length == 0) {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter all fields or select student.',
            });
        }
        else {
            if (this.qroupsCheck.length == 0) {
                this.qroupsCheckAdd == false;
                count = 0;
            }
            else {
                this.qroupsCheck.forEach(function (data) {
                    if (data.name == _this.groupName) {
                        __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                            type: 'error',
                            title: 'Unsuccessful',
                            text: 'This name already exists.',
                        });
                        _this.qroupsCheckAdd = true;
                        count = 1;
                    }
                    else {
                        _this.qroupsCheckAdd = false;
                    }
                });
            }
            if (this.qroupsCheckAdd == false && count != 1) {
                __WEBPACK_IMPORTED_MODULE_3_lodash__["forEach"](selectStudent, function (student) {
                    var studentDoc = _this.afs.doc("/students/" + student.code);
                    _this.members.push(studentDoc.ref);
                });
                var section = {
                    name: this.groupName,
                    members: this.members
                };
                var sectionRef = this.afs.doc("/sections/" + this.groupName);
                sectionRef.set(section);
                __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                    type: 'success',
                    title: 'Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };
    ManageStdGroupComponent.prototype.goGroupDetail = function (name) {
        console.log("goGroupDetail" + name); //section name ที่ section1
        this.router.navigate(['dashboard', 'group', name]); //ไป path : /dashboard/group/group_name ที่คลิกเลือก
    };
    ManageStdGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-manage-std-group',
            template: __webpack_require__("../../../../../src/app/manage-std-group/manage-std-group.component.html"),
            styles: [__webpack_require__("../../../../../src/app/manage-std-group/manage-std-group.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* Router */]])
    ], ManageStdGroupComponent);
    return ManageStdGroupComponent;
}());



/***/ }),

/***/ "../../../../../src/app/manage-test/manage-test.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".manage-test{\r\n    margin: 30px;  \r\n  }\r\n\r\n\r\n  .content{\r\n    /* margin-top: 10px; */\r\n    background-color:white;\r\n  }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/manage-test/manage-test.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"manage-test\">\r\n\r\n  <div class=\"content\">\r\n    <br>\r\n\r\n    <mat-tab-group>\r\n      <mat-tab label=\"Add new test\">\r\n        <br>\r\n        <app-add-test></app-add-test>\r\n      </mat-tab>\r\n\r\n      <mat-tab label=\"Delete test\">\r\n        <br>\r\n        <app-delete-test></app-delete-test>\r\n      </mat-tab>\r\n\r\n    </mat-tab-group>\r\n\r\n  </div>\r\n\r\n</div> -->\r\n\r\n<div class=\"manage-test\">\r\n    <div class=\"content\">\r\n      <div class=\"btn-group btn-group-justified \">\r\n          <a [routerLink]=\"'/dashboard/manage-test/'\" class=\"btn  addTestBtn bg-success\">ADD NEW TEST</a>\r\n          <a [routerLink]=\"'/dashboard/manage-test/Edit-Test'\" class=\"btn editTestBtn bg-warning\">EDIT TEST</a>\r\n          <a [routerLink]=\"'/dashboard/manage-test/Delete-Test'\" class=\"btn deleteTestBtn bg-danger\">DELETE TEST</a>\r\n        </div>\r\n        <br>\r\n        <br>\r\n\r\n            <!--Call Component -->\r\n            <router-outlet></router-outlet>\r\n    </div>\r\n  \r\n  </div>"

/***/ }),

/***/ "../../../../../src/app/manage-test/manage-test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageTestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ManageTestComponent = (function () {
    function ManageTestComponent() {
    }
    ManageTestComponent.prototype.ngOnInit = function () {
    };
    ManageTestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-manage-test',
            template: __webpack_require__("../../../../../src/app/manage-test/manage-test.component.html"),
            styles: [__webpack_require__("../../../../../src/app/manage-test/manage-test.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], ManageTestComponent);
    return ManageTestComponent;
}());



/***/ }),

/***/ "../../../../../src/app/number.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberOnlyDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NumberOnlyDirective = (function () {
    function NumberOnlyDirective(el) {
        this.el = el;
        // Allow decimal numbers and negative values
        this.regex = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
        // Allow key codes for special events. Reflect :
        // Backspace, tab, end, home
        this.specialKeys = ['Backspace', 'Tab', 'End', 'Home', '-'];
    }
    NumberOnlyDirective.prototype.onKeyDown = function (event) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        var current = this.el.nativeElement.value;
        var next = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NumberOnlyDirective.prototype, "onKeyDown", null);
    NumberOnlyDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[myNumberOnly]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], NumberOnlyDirective);
    return NumberOnlyDirective;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/nav-route-topic.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavRouteTopicPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var NavRouteTopicPipe = (function () {
    function NavRouteTopicPipe() {
    }
    NavRouteTopicPipe.prototype.transform = function (url) {
        if (url) {
            var currentTopic = __WEBPACK_IMPORTED_MODULE_1_lodash__["split"](url, '/').pop();
            return __WEBPACK_IMPORTED_MODULE_1_lodash__["startCase"](currentTopic);
        }
        return '';
    };
    NavRouteTopicPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'navRouteTopic'
        })
    ], NavRouteTopicPipe);
    return NavRouteTopicPipe;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, " .quiz {\r\n   margin: 5px;\r\n }\r\n\r\n .display_list_right {\r\n   padding: 10px;\r\n   background-color: #e6ffee;\r\n   height: 599px;\r\n }\r\n\r\n .header_test_left {\r\n   background: #ffc2b3;\r\n   padding: 10px;\r\n   height: 130px;\r\n }\r\n\r\n .body_test_left {\r\n   padding: 10px;\r\n   background-color: #F1F1F1;\r\n }\r\n\r\n .content-body {\r\n   height: 395px;\r\n   padding: 20px;\r\n }\r\n\r\n .header_numOfTest_right {\r\n   background-color: #FFF4F4;\r\n   height: 110px;\r\n }\r\n\r\n .btnn-header {\r\n   margin: 20px;\r\n }\r\n\r\n .btn {\r\n   margin-right: 4.5%;\r\n }\r\n\r\n #h3 {\r\n   margin: 30px;\r\n }\r\n\r\n .picture_show:hover {\r\n   cursor: pointer;\r\n   position: absolute;\r\n   width: 150px;\r\n   transition: width 1s;\r\n   border-radius: 10px;\r\n   box-shadow: -2px -2px 15px #888888;\r\n }\r\n\r\n\r\n /* .TableList{\r\n  font-size: 12px;\r\n  max-height: 350px;\r\n}\r\n.tableAllList2{\r\n  max-height: 350px;\r\n  table-layout: fixed;\r\n}\r\n.test{\r\n  display: flex;\r\n  flex-direction: column;\r\n  max-height: 200px;\r\n  min-width: 300px;\r\n}\r\n.test2{\r\n  overflow: auto;\r\n  max-height: 500px;\r\n} */\r\n\r\n #table-wrapper {\r\n   position: relative;\r\n }\r\n\r\n #table-scroll {\r\n   height: 590px;\r\n   overflow: auto;\r\n   margin-top: 20px;\r\n }\r\n\r\n #table-wrapper table {\r\n   width: 100%;\r\n }\r\n\r\n /* #table-wrapper table * {\r\n  background:yellow;\r\n  color:black;\r\n} */\r\n\r\n #table-wrapper table thead th .text {\r\n   position: absolute;\r\n   top: -20px;\r\n   z-index: 2;\r\n   height: 20px;\r\n   width: 35%;\r\n   border: 1px solid red;\r\n }\r\n\r\n .buttonForm {\r\n   text-align: center\r\n }\r\n\r\n .bntAdd {\r\n   width: 25%;\r\n   margin: 5px;\r\n }\r\n\r\n .SkipBtn {\r\n   background-color: bisque;\r\n }\r\n\r\n .PauseBtn {\r\n   background-color: #ffe6e6;\r\n }\r\n\r\n /* .SkipBtn :hover{\r\n   background-color: #FFCA8B;\r\n }\r\n\r\n .PauseBtn :hover {\r\n   background-color: #FFBEBE;\r\n } */\r\n.StopBtn{\r\n  background-color: #FFC8C8;\r\n}\r\n/* .StopBtn:hover {\r\n  background-color: #FFBEBE;\r\n} */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/quiz/quiz.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"quiz\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"col-md-8\">\r\n      <div class=\"row header_test_left\">\r\n\r\n        <div class=\"col-md-10\">\r\n          <h4>\r\n            <b> Subject:</b> &nbsp; &nbsp; {{examSubDisplay}} &nbsp; &nbsp;&nbsp; &nbsp;\r\n            <b> Chapter:</b> &nbsp; &nbsp; {{examChapDisplay}}\r\n          </h4>\r\n          <h4>\r\n            <b> Description:</b> &nbsp; &nbsp; {{examDesDisplay}}\r\n          </h4>\r\n          <div class=\"btn-group btn-group-justified \">\r\n              <a  (click)=\"pauseTest()\" class=\"btn PauseBtn\">\r\n                <span class=\"glyphicon glyphicon-pause\"></span> Pause</a>\r\n                <a (click)=\"stopTest()\" class=\"btn StopBtn\">\r\n                    <span class=\"glyphicon glyphicon-stop\"></span> Stop</a>\r\n              <a (click)=\"SkipQuestion()\" class=\"btn SkipBtn\">\r\n                <span class=\"\tglyphicon glyphicon-step-forward\"></span> Skip</a>\r\n            </div>\r\n          <!-- <div class=\"btnn-header\">\r\n            <button type=\"submit\" class=\"btn btn-warning btn-md\" style=\"width: 45%;\" (click)=\"pauseTest()\">\r\n              <span class=\"glyphicon glyphicon-pause\"></span> Pause</button>\r\n            <button type=\"submit\" class=\"btn btn-danger btn-md\" style=\"width: 45%;\" (click)=\"SkipQuestion()\">\r\n              <span class=\"\tglyphicon glyphicon-step-forward\"></span> Skip</button>\r\n          </div> -->\r\n\r\n        </div>\r\n        <div class=\"col-md-2 header_numOfTest_right\">\r\n          <h1>\r\n            {{doing_percent}}%\r\n          </h1>\r\n          <h4>\r\n            {{current_question}}/{{total_num_cal}} ข้อ\r\n          </h4>\r\n\r\n        </div>\r\n      </div>\r\n      <div class=\"row body_test_left\">\r\n        <div class=\"content-body \">\r\n          <h3> <b> ข้อที่ {{current_question+1}}:</b> {{question_show}} </h3>\r\n          <p *ngFor=\"let data of choice_show ; let i=index\">\r\n            <br><h4>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;({{i+1}}.)&nbsp;{{data}}</h4>\r\n          </p>\r\n          <!-- test -->\r\n          <br>\r\n          <!--    <div>\r\n          รหัส:<input type=\"text\" name=\"testttname1\" id=\"testttname1\"[(ngModel)]=\"tesssttext1\">\r\n          คำตอบ:<input type=\"text\" name=\"testttname2\" id=\"testttname2\"[(ngModel)]=\"tesssttext2\">\r\n        <button type=\"submit\" class=\"btn-warning btn-md\" style=\"width: 25%;\"(click)=\"TestStuList()\">\r\n         TestStuList </button>\r\n        </div>\r\n     test end -->\r\n        </div>\r\n       <!-- button -->\r\n<div class=\"row\">\r\n  <div class=\"col-md-12 \">\r\n    <p class=\"buttonForm\">\r\n\r\n      <button type=\"submit\" class=\"btn btn-primary btn-md bntAdd\" (click)=\"ProcessAnswer()\">\r\n        <span class=\"\tglyphicon glyphicon glyphicon-refresh\"></span> Process Answer </button>\r\n      <button type=\"submit\" class=\"btn btn-success btn-md bntAdd\"(click)=\"NextQuestion()\" [disabled]=isValidNext>\r\n        <span class=\"\tglyphicon glyphicon-forward\"></span> Next </button>\r\n    </p>\r\n  </div>\r\n</div>\r\n<!--  -->\r\n          \r\n\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-4 display_list_right \" id=\"table-wrapper\">\r\n      <div class=\"tableAllList tests\" id=\"table-scroll\">\r\n        <table class=\"table table-striped test2 \">\r\n          <thead>\r\n            <tr>\r\n              <th scope=\"col\">#</th>\r\n              <th scope=\"col\">Pic.</th>\r\n              <th scope=\"col\">Name</th>\r\n              <th scope=\"col\">Score</th>\r\n              <th scope=\"col\">Ans.</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody class=\"TableList\">\r\n            <ng-container *ngIf=\"!isprocess\">\r\n              <tr *ngFor=\"let data of array_testList ; let i=index\">\r\n                <th scope=\"row\">{{i+1}}</th>\r\n                <td>\r\n                  <img src=  {{data.url}} width=\"40\" class=\"picture_show img-circle\">\r\n                </td>\r\n                <td>{{data.student_name}}</td>\r\n                <td>{{data.score}}/{{total_num_cal}}</td>\r\n                <td>{{data.answer}}</td>\r\n              </tr>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"isprocess\">\r\n                <tr *ngFor=\"let data of array_testListProcess ; let i=index\">\r\n                  <th scope=\"row\">{{i+1}}</th>\r\n                  <td>\r\n                    <img src= {{data.url}} width=\"40\" class=\"picture_show img-circle\">\r\n                  </td>\r\n                  <td>{{data.student_name}}</td>\r\n                  <td>{{data.score}}/{{total_num_cal}}</td>\r\n                  <td> <img src= {{data.answer}} width=\"30\" ></td>\r\n                </tr>\r\n              </ng-container>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/quiz/quiz.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var QuizComponent = (function () {
    function QuizComponent(router, afs, db, firebaseService) {
        var _this = this;
        this.router = router;
        this.afs = afs;
        this.db = db;
        this.firebaseService = firebaseService;
        this.array_testList = [];
        this.student_temp = [];
        this.array_testListProcess = [];
        this.isprocess = false;
        this.isValidProcess = false;
        this.isValidNext = true;
        this.isExamDataDetailLoaded = false;
        this.array_testListProcess = [];
        this.array_testList = [];
        //list pubilc for test step
        this.receiveTest1 = this.firebaseService.arrayTest1;
        this.receiveTest2 = this.firebaseService.arrayTest2;
        this.receiveTest3 = this.firebaseService.arrayTest3;
        this.receiveTest3_2 = this.firebaseService.arrayTest3_2;
        this.testID = this.firebaseService.Test_id_new;
        console.log(this.receiveTest1);
        // console.log(this.receiveTest2);
        console.log(this.receiveTest3);
        console.log(this.receiveTest3_2);
        console.log(this.testID);
        var examRefLocal = this.afs.doc("/exam/" + this.testID);
        this.examObservable = examRefLocal.valueChanges();
        var answerRefLocal = this.afs.doc("/answers/" + this.testID);
        this.ansObservable = answerRefLocal.valueChanges();
        this.examObservable.subscribe(function (exam) {
            console.log(exam.status);
            _this.examStatus = exam.status;
            //exam data detail
            if (_this.examStatus == "pause") {
                __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
                    type: 'success',
                    title: 'Quiz Paused!'
                }).then(function () {
                    _this.router.navigate(['dashboard']);
                });
            }
            else if (_this.examStatus == "finish") {
                __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
                    type: 'success',
                    title: 'Quiz finished!'
                }).then(function () {
                    _this.router.navigate(['dashboard', 'test', 'scores']);
                });
            }
            else {
                _this.examDataDetail(function (studentList) {
                    _this.afs.doc("/answers/" + _this.testID).valueChanges().forEach(function (element) {
                        // console.log(element);
                        _this.answerProcessList(element);
                        _this.scoreProcess(element);
                    });
                });
            }
        });
        //---
        this.isValidProcess = false;
        this.isValidNext = true;
        this.ansObservable.subscribe(function (ans) {
            console.log(ans);
            _this.AnsObservableResult = ans;
            console.log(_this.AnsObservableResult);
            _this.answerProcessList(_this.AnsObservableResult);
            _this.scoreProcess(_this.AnsObservableResult);
        });
    }
    QuizComponent.prototype.answerProcessList = function (ans) {
        var _this = this;
        // console.log(this.Q_no);
        var array_testList = [];
        // console.log("ans in answerProcessList=", ans);
        var pack_array_testList = {};
        this.student_temp.forEach(function (stu) {
            _this.answer = ans[stu.code][_this.Q_index];
            // console.log(this.answer);
            if (_this.answer != undefined) {
                // console.log(stu.code + "in" + this.Q_no + "==" + this.answer);
                //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
                pack_array_testList = {
                    student_id: stu.code,
                    student_name: stu.name,
                    score: stu.score,
                    url: stu.url,
                    answer: _this.answer
                };
                //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
                //this.array_testList.unshift(this.pack_array_testList);  //unshift เพิ่มเข้าข้างหน้า
                array_testList.push(pack_array_testList); //unshift เพิ่มเข้าข้างหน้า
                // console.log(array_testList);                     //ที่ตรงกับที่กำลังทำ     
            }
        });
        this.array_testList = array_testList;
    };
    QuizComponent.prototype.scoreProcess = function (ans) {
        // console.log("ans in scoreProcess=", ans);
        var _this = this;
        //ค่าผลเฉลยตามชนิดของแบบทดสอบ
        if (this.examType == 1) {
            this.answerCheck = this.answerType1;
        }
        else {
            this.answerCheck = this.Q_answer_index;
        }
        var new_score;
        var array_testListProcess = [];
        this.student_temp.forEach(function (stu) {
            _this.answer = ans[stu.code][_this.Q_index];
            // console.log(this.answer);
            var pack_array_testList = {};
            //ตรวจคำตอบ
            if (_this.answer != undefined) {
                // console.log("input=" + this.answer + "ans= " + this.answerCheck);
                if (_this.answer == _this.answerCheck) {
                    new_score = stu.score + 1; //บวกคะแนนเพิ่ม
                    _this.answerCheckImg = "assets/dist/img/corract.png";
                }
                else {
                    _this.answerCheckImg = "assets/dist/img/incorract.png";
                    new_score = stu.score;
                }
                //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
                pack_array_testList = {
                    student_id: stu.code,
                    student_name: stu.name,
                    // score: stu.score,
                    score: new_score,
                    url: stu.url,
                    answer: _this.answerCheckImg
                };
                // console.log(pack_array_testList);
            }
            else {
                new_score = stu.score;
                //สร้าง obj ใหม่เพื่อไว้สำหรับไปแสดง
                pack_array_testList = {
                    student_id: stu.code,
                    student_name: stu.name,
                    score: new_score,
                    url: stu.url,
                    answer: "assets/dist/img/question.png"
                };
                // console.log(pack_array_testList);
            }
            //array ที่บรรจุค่า obj ในรูปแบบเพิ่มเข้าข้างหน้าเพื่อให้อันล่าสุดอยู่ข้างบน
            array_testListProcess.push(pack_array_testList); //เพิ่มเข้าข้างหลัง
            //console.log(array_testListProcess);     //ที่ตรงกับที่กำลังทำ     
            // this.array_testListProcess = this.array_testList;     //เอาไว้ใช่ในการ update new score ใน DB
        });
        this.array_testListProcess = array_testListProcess;
        // console.log(this.array_testListProcess);
    };
    QuizComponent.prototype.examDataDetail = function (callback) {
        var _this = this;
        console.log("examDataDetail");
        console.log("status   =  " + this.examStatus);
        //---exam data detail
        var examRefLocal = this.afs.doc("/exam/" + this.testID);
        this.examObservable = examRefLocal.valueChanges();
        console.log(this.examObservable);
        this.examObservable.forEach(function (exam) {
            console.log(exam);
            _this.examSubDisplay = exam.subject_name;
            _this.examChapDisplay = exam.chapter_name;
            _this.examDesDisplay = exam.description;
            _this.examType = exam.type;
            _this.examStatus = exam.status;
            _this.current_question = exam.current_question;
            console.log("status   =  " + _this.examStatus);
            console.log(_this.examSubDisplay, _this.examChapDisplay, _this.examDesDisplay);
            _this.total_num = exam.amount;
            _this.total_num_cal = exam.amount;
            if (_this.current_question == 0) {
                _this.doing_percent = 0;
            }
            else {
                _this.doing_percent = ((_this.current_question / _this.total_num_cal) * 100).toFixed(1);
                ;
            }
        });
        //---student in exam
        this.studentExamCollection = this.afs.collection("/exam/" + this.testID + "/students", function (ref) { return ref.orderBy('code'); });
        this.students = this.studentExamCollection.valueChanges();
        this.students.forEach(function (stu) {
            // console.log(stu);
            if (!_this.isExamDataDetailLoaded) {
                stu.forEach(function (data1) {
                    // console.log(data1.code);
                    _this.student_temp.push(data1);
                });
                callback(_this.student_temp);
            }
            _this.isExamDataDetailLoaded = true;
        });
        //---question in exam
        this.questionExamCollection = this.afs.collection("/exam/" + this.testID + "/questions", function (ref) { return ref.orderBy('indax'); });
        this.questions = this.questionExamCollection.valueChanges();
        this.questions.forEach(function (ques) {
            console.log(ques);
            console.log(__WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](ques, ['indax', _this.current_question]));
            _this.questionObj = __WEBPACK_IMPORTED_MODULE_5_lodash__["filter"](ques, ['indax', _this.current_question]);
            _this.question_show = _this.questionObj[0].question;
            _this.Q_no = _this.questionObj[0].code;
            _this.Q_index = _this.questionObj[0].indax;
            // console.log(this.questionObj[0]);
            _this.updateAllInfo();
            console.log("Q_no====" + _this.Q_no);
            console.log("Q_index====" + _this.Q_index);
            if (_this.examType == 1) {
                _this.choice_show = null;
                _this.Q_answer_index = _this.questionObj[0].answer;
                _this.answerType1 = _this.questionObj[0].choice[_this.Q_answer_index];
                // console.log("ans= " + this.answerType1);
            }
            else {
                _this.choice_show = _this.questionObj[0].choice;
                // console.log(this.choice_show);
                _this.Q_answer_index = _this.questionObj[0].answer;
                // console.log("ans= " + this.Q_answer_index);
            }
        });
    };
    QuizComponent.prototype.ngOnInit = function () {
    };
    QuizComponent.prototype.ProcessAnswer = function () {
        var _this = this;
        this.isValidNext = false;
        this.isValidProcess = true;
        this.isprocess = true;
        __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
            type: 'success',
            title: 'processed',
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            //update status
            console.log(_this.Q_no);
            var question_status = {
                status: true
            };
            var examRef = _this.afs.doc("exam/" + _this.testID + "/questions/" + _this.Q_no);
            examRef.update(question_status);
        });
    };
    QuizComponent.prototype.NextQuestion = function () {
        var _this = this;
        console.log(this.array_testListProcess);
        this.array_testListProcess.forEach(function (d, indax) {
            console.log(d.student_id + "=" + d.score);
            //update ค่า score ใน database
            var newScoreUp = {
                score: d.score
            };
            var examRef = _this.afs.doc("exam/" + _this.testID + "/students/" + d.student_id);
            examRef.update(newScoreUp);
            //ต้อง update ค่า score ใน student_temp
            _this.student_temp[indax].score = d.score;
            console.log(_this.student_temp[indax].score);
        });
        console.log(this.student_temp);
        this.array_testList = [];
        this.array_testListProcess = [];
        this.isValidNext = true;
        this.isValidProcess = false;
        this.isprocess = false;
        //เริ่มข้อคำถามใหม่ 
        if (this.current_question < this.total_num - 1) {
            console.log("NextQuestion");
            this.current_question = this.current_question + 1;
            console.log(this.current_question);
            //update current_question
            var newCrrent_question = {
                current_question: this.current_question
            };
            var examRef = this.afs.doc("exam/" + this.testID + "/");
            examRef.update(newCrrent_question);
        }
        else {
            this.current_question = this.current_question + 1;
            this.doing_percent = ((this.current_question / this.total_num_cal) * 100).toFixed(1);
            //update examStatus
            var statusUpdate = {
                status: "finish"
            };
            var examRef = this.afs.doc("exam/" + this.testID);
            examRef.update(statusUpdate).then(function () {
                //go to display scores page
                _this.router.navigate(['dashboard', 'test', 'scores']);
            });
        }
    };
    QuizComponent.prototype.pauseTest = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
            title: 'Are you sure?',
            text: "pause this Quiz!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pause it!'
        }).then(function (result) {
            if (result.value) {
                //update examStatus
                var statusUpdate = {
                    status: "pause"
                };
                var examRef = _this.afs.doc("exam/" + _this.testID);
                examRef.update(statusUpdate).then(function () {
                    //go to dashboard page
                    _this.router.navigate(['dashboard']);
                });
            }
        });
    };
    QuizComponent.prototype.stopTest = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
            title: 'Are you sure?',
            text: "stop this Quiz!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, stop it!'
        }).then(function (result) {
            if (result.value) {
                console.log("stop");
                var statusUpdate = {
                    status: "finish"
                };
                var examRef = _this.afs.doc("exam/" + _this.testID);
                examRef.update(statusUpdate).then(function () {
                    //go to dashboard page
                    _this.router.navigate(['dashboard', 'test', 'scores']);
                });
            }
        });
    };
    QuizComponent.prototype.SkipQuestion = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
            title: 'Are you sure?',
            text: "skip this question!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, skip it!'
        }).then(function (result) {
            console.log(result);
            if (result.value) {
                __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
                    type: 'success',
                    title: 'Skipped',
                    showConfirmButton: false,
                    timer: 1500
                });
                _this.isValidNext = true;
                _this.isValidProcess = false;
                _this.isprocess = false;
                console.log("skip");
                console.log("old " + _this.current_question);
                //update question status
                // let question_status = {
                //   status: false
                // }
                // const examRef = this.afs.doc<QuestionExam>(`exam/${this.testID}/questions/${this.Q_no}`);
                // examRef.update(question_status)
                if (_this.current_question < _this.total_num - 1) {
                    console.log("new " + _this.current_question);
                    _this.current_question = _this.current_question + 1;
                    console.log(_this.current_question);
                    // //update current_question
                    var newCrrent_question = {
                        current_question: _this.current_question
                    };
                    var examRef = _this.afs.doc("exam/" + _this.testID + "/");
                    examRef.update(newCrrent_question);
                    //call examDataDetail
                    // this.examDataDetail();
                }
                else {
                    _this.current_question = _this.current_question + 1;
                    console.log(_this.current_question);
                    console.log("finish");
                    _this.doing_percent = ((_this.current_question / _this.total_num_cal) * 100).toFixed(1);
                    //update examStatus
                    var statusUpdate = {
                        status: "finish"
                    };
                    var examRef = _this.afs.doc("exam/" + _this.testID);
                    examRef.update(statusUpdate).then(function () {
                        //go to display scores page
                        _this.router.navigate(['dashboard', 'test', 'scores']);
                    });
                }
            }
        });
    };
    QuizComponent.prototype.updateAllInfo = function () {
        this.answerProcessList(this.AnsObservableResult);
        this.scoreProcess(this.AnsObservableResult);
    };
    QuizComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-quiz',
            template: __webpack_require__("../../../../../src/app/quiz/quiz.component.html"),
            styles: [__webpack_require__("../../../../../src/app/quiz/quiz.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__["a" /* FirebaseService */]])
    ], QuizComponent);
    return QuizComponent;
}());



/***/ }),

/***/ "../../../../../src/app/reports/reports.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".reports{\r\n    margin: 30px;  \r\n  }\r\n\r\n\r\n  .content{\r\n    margin-top: 20px;\r\n    background-color:white;\r\n  }\r\n\r\n  .header{\r\n    background: #d8e9f3;\r\n    padding: 15px;\r\n    height: 120px;\r\n  }\r\n  .reft_content{\r\n    background:#F8F8FF;\r\n\r\n  }\r\n  .right_content{\r\n    background: white;\r\n\r\n  }\r\n  #table-wrapper {\r\n    position:relative;\r\n  }\r\n  #table-scroll {\r\n    height:590px;\r\n    overflow:auto;  \r\n    margin-top:20px;\r\n  }\r\n  #table-wrapper table {\r\n    width:100%;\r\n  \r\n  }\r\n  .table-hover{\r\n\r\n    margin-top: 40px;\r\n  }\r\n  .scores {\r\n    margin: 5px;\r\n  }\r\n  .bntAdd1{\r\n    width: 40%;\r\n    margin: 5px;\r\n    background-color: #008000;\r\n    color: whitesmoke\r\n  }\r\n  .bntAdd2{\r\n    width: 40%;\r\n    margin: 5px;\r\n    background-color: #BD2819;\r\n    color: white\r\n  }\r\n  ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"reports\">\n  <div class=\"box box-info\">\n    <div class=\"content\" id = \"content\">\n      <br>\n\n      <form #SelectManageTest=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"exampleSelect1\">Subject select;</label>\n          <select class=\"form-control\" id=\"SelectCategory\" name=\"SelectCategory\" (ngModelChange)=\"onChange($event)\" [(ngModel)]=\"SelectSubject\">\n            <option value=\"\" [selected]=\"isSelected\" [disabled]=\"true\"> ----Please choose one---- </option>\n            <option *ngFor=\"let data of ExamListShow \" [ngValue]=data [selected]=\"isSelected\">\n              <b> {{data.exam_code}} :</b> {{data.description}}\n            </option>\n          </select>\n        </div>\n      </form>\n        <!-- display when no data question to be add -->\n        <ng-container *ngIf=\"!isdataExam\">\n          <div class=\"scores\">\n        <div class=\"row\" style=\"background-color: white\">\n            <div class=\"col-md-12 tableShow\">\n              <p style=\"text-align: center\">\n                <br>\n               --- no data ---    \n              </p>\n            </div>\n          </div>\n        </div>\n        </ng-container>\n        <!--  -->\n      <div class=\"scores\" *ngIf=\"isdataExam\">\n        <div class=\"row\">\n          <div class=\"col-md-12 header\">\n            <!-- <h4> -->\n              <p>\n                <b> exem code:</b> &nbsp; &nbsp; {{exam_code}} &nbsp; &nbsp;&nbsp; &nbsp;\n                <b> subject name:</b> &nbsp; &nbsp; {{subject_name}} &nbsp; &nbsp;&nbsp; &nbsp;\n                <b> chapter name:</b> &nbsp; &nbsp; {{chapter_name}}\n              </p>\n              <p>\n                <b> description:</b> &nbsp; &nbsp; {{description}} &nbsp; &nbsp;&nbsp; &nbsp;\n                <b> type:</b> &nbsp; &nbsp; {{type}}\n              </p>\n              <p>\n                <b> amount:</b> &nbsp; &nbsp; {{doing}}/{{amount}} &nbsp; &nbsp;&nbsp; &nbsp;\n                <b> date:</b> &nbsp; &nbsp; {{date | date :'short'}}\n              </p>\n\n            <!-- </h4> -->\n          </div>\n\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-7 reft_content\">\n            <table class=\"table table-hover\">\n              <thead>\n                <tr>\n                  <td colspan='5' align=\"center\">\n\n                    <ng-container *ngIf=\"isbar\">\n                      <p-chart type=\"bar\" [data]=\"data1\"  [options]=\"options\" ></p-chart>\n                    </ng-container>\n                    <ng-container *ngIf=\"isline\">\n                      <p-chart type=\"line\" [data]=\"data2\"  [options]=\"options\" ></p-chart>\n                    </ng-container>\n                    <div class=\"btn-group btn-group-justified \">\n                      <a class=\"btn  addTestBtn bg-info\" (click)=\"barBtn()\"> Bar</a>\n                      <a class=\"btn editTestBtn bg-danger\" (click)=\"lineBtn()\"> Line </a>\n                    </div>\n                  </td>\n                </tr>\n                <tr>\n                  <td></td>\n                </tr>\n                <tr>\n                  <td>\n                    <b> Max : </b> {{max}} </td>\n                  <td>\n                    <b> Min : </b> {{min}}</td>\n                </tr>\n                <tr>\n                  <td>\n                    <b> Average : </b>{{avg}}</td>\n                  <td>\n                    <b> Standard Deviation : </b> {{std}} </td>\n                </tr>\n              </thead>\n            </table>\n          </div>\n          <div class=\"col-md-5 right_content table-scroll\">\n            <table class=\"table table-hover\">\n              <thead>\n                <tr>\n                  <th> #\n                  </th>\n                  <th scope=\"col\">Student ID</th>\n                  <th scope=\"col\">Student Name</th>\n                  <th scope=\"col\">Score</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let data of studentShow; let i=index\">\n                  <td>{{i+1}}</td>\n                  <td>{{data.code}}</td>\n                  <td>{{data.name}}</td>\n                  <td>{{data.score}}</td>\n                </tr>\n                <tr>\n                  <td colspan='4' align=\"center\">\n                    <button (click)=\"exportToExcel()\" class=\"btn bntAdd1\">\n                        <span class=\"glyphicon glyphicon-export\"></span>&nbsp;Export to excel</button>\n                    <button (click)=\"generatePDF()\" class=\"btn bntAdd2\">\n                        <span class=\"glyphicon glyphicon-export\"></span>&nbsp;Export to PDF</button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n      <!-- Tabs report -->\n      <!-- <mat-tab-group>\n      <mat-tab label=\"report of test\">\n        <br>\n        <app-report-of-test></app-report-of-test>\n      </mat-tab>\n\n      <mat-tab label=\"report of student\">\n        <br>\n        <app-report-of-student></app-report-of-student>\n      </mat-tab>\n\n    </mat-tab-group> -->\n      <!-- end Tab report -->\n\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/reports/reports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_excel_service__ = __webpack_require__("../../../../../src/app/services/excel.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_html2canvas__ = __webpack_require__("../../../../html2canvas/dist/npm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_html2canvas___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_html2canvas__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReportsComponent = (function () {
    function ReportsComponent(afs, excelService) {
        var _this = this;
        this.afs = afs;
        this.excelService = excelService;
        //
        this.isdataExam = false;
        this.ExamListShow = [];
        this.SelectSubject = "";
        //สลับการแสดงผลระหว่างแบบ bar และแบบ line
        this.isbar = true;
        this.isline = false;
        //array ที่ใช้เอาไปแสดงผล
        this.studentShow = [];
        this.scoreGraph = [];
        this.codeGraph = [];
        this.studentExportObj = [];
        this.studentExportObj = [];
        //สำหรับใช้ export excel
        this.excelService = excelService;
        //Exam
        var ExamRef = this.afs.collection("/exam");
        this.ExamList = ExamRef.valueChanges();
        this.ExamListShow = [];
        this.ExamList.subscribe(function (data) {
            // console.log(data);
            data.forEach(function (d) {
                // console.log(d.status);
                if (d.status == "finish") {
                    // console.log(d);
                    _this.ExamListShow.push(d);
                }
            });
            // console.log(data.status);
        });
        this.options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }
                ]
            }
        };
    }
    ReportsComponent.prototype.ngOnInit = function () {
    };
    ReportsComponent.prototype.onChange = function (dataExam) {
        var _this = this;
        this.studentExportObj = [];
        this.doing = 0;
        // console.log("change");
        // console.log(dataExam);
        this.isdataExam = true;
        this.studentShow = [];
        this.scoreGraph = [];
        this.codeGraph = [];
        //รายละเอียดส่วนหัวของรายงาน
        this.amount = dataExam.amount;
        this.subject_name = dataExam.subject_name;
        this.chapter_name = dataExam.chapter_name;
        this.description = dataExam.description;
        // console.log(dataExam.type);
        switch (dataExam.type) {
            case 1: {
                //statements; 
                this.type = "คำตอบสั้น";
                break;
            }
            case 2: {
                //statements; 
                this.type = "คำถามแบบ 2 ตัวเลือก ";
                break;
            }
            case 3: {
                //statements; 
                this.type = "คำตอบสั้น 3 ตัวเลือก";
                break;
            }
            case 4: {
                //statements; 
                this.type = "คำตอบสั้น 4 ตัวเลือก";
                break;
            }
        }
        this.date = dataExam.date;
        this.exam_code = dataExam.exam_code;
        //---question in exam
        this.questionExamCollection = this.afs.collection("/exam/" + this.exam_code + "/questions");
        this.questions = this.questionExamCollection.valueChanges();
        this.questions.subscribe(function (ques) {
            // console.log(ques);
            ques.forEach(function (data) {
                // console.log(data.status);
                if (data.status == true) {
                    _this.doing = _this.doing + 1;
                }
            });
        });
        //---student in exam
        this.studentExamCollection = this.afs.collection("/exam/" + this.exam_code + "/students", function (ref) { return ref.orderBy('score'); });
        this.students = this.studentExamCollection.valueChanges();
        this.students.subscribe(function (stu) {
            // console.log(stu);
            stu.forEach(function (data, index) {
                // console.log(data);
                _this.studentShow.push(data);
                // console.log(data.score);
                _this.sum = 0;
                _this.scoreGraph.push(data.score);
                _this.codeGraph.push(data.code);
                //test show sort score
                _this.studentShow.sort(function (obj1, obj2) {
                    // มากไปน้อย
                    return obj2.score - obj1.score;
                });
                // console.log(this.scoreGraph);
                // console.log("คำนวณ");
                //คำนวน MAX, MIN
                // console.log(this.scoreGraph);
                _this.max = dataExam.max;
                // this.max = Math.max.apply(null, this.scoreGraph);
                // console.log("Max = " + this.max);
                _this.min = dataExam.min;
                // this.min = Math.min.apply(null, this.scoreGraph);
                // console.log("Min = " + this.min);
                // console.log(Math.sqrt(this.variance(hii)));
                _this.sum = _this.scoreGraph.reduce(function (previous, current) { return current += previous; });
                // console.log("sum" + this.sum);
                // this.avg = (this.sum / this.scoreGraph.length).toFixed(2);
                _this.avg = dataExam.avg;
                // console.log("AVG = " + this.avg);
                _this.std = dataExam.sd;
                // this.std = this.standardDeviation().toFixed(2)
                // console.log("STD = " + this.std);
                // console.log(index, this.std.length - 1);
                //bar
                _this.data1 = {
                    labels: _this.codeGraph,
                    datasets: [
                        {
                            label: 'Test scores bar',
                            backgroundColor: '#86c5f9',
                            borderColor: '#3da2f5',
                            data: _this.scoreGraph
                        },
                    ]
                };
                //line
                _this.data2 = {
                    labels: _this.codeGraph,
                    datasets: [
                        {
                            label: 'Test scores line',
                            backgroundColor: '#ffcce6',
                            borderColor: '#ff80bf',
                            data: _this.scoreGraph
                        },
                    ]
                };
            });
        });
    };
    /*
      //-------function หาค่า SD
      standardDeviation() {
        var avg = this.avg;
    
        var squareDiffs = this.scoreGraph.map(function (value) {
          var diff = value - avg;
          var sqrDiff = diff * diff;
          return sqrDiff;
        });
    
        var avgSquareDiff = this.average(squareDiffs);
    
        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
      }
    
      average(data) {
        var sum = data.reduce(function (sum, value) {
          return sum + value;
        }, 0);
    
        var avg = sum / data.length;
        return avg;
      }
    */
    //-------function สลับการแสดงผลรหว่างกราฟ
    ReportsComponent.prototype.barBtn = function () {
        this.isbar = true;
        this.isline = false;
    };
    ReportsComponent.prototype.lineBtn = function () {
        this.isline = true;
        this.isbar = false;
    };
    //-------function export เป็น excel file
    ReportsComponent.prototype.exportToExcel = function (event) {
        var _this = this;
        // console.log(event);
        // console.log(this.studentExportObj);
        //to data export
        this.studentShow.forEach(function (data, indax) {
            // console.log(data);
            // console.log(data.code);
            var studentExport = {
                student_id: data.code,
                student_name: data.name,
                score: data.score
            };
            _this.studentExportObj.push(studentExport);
            // console.log(this.studentExportObj);
        });
        //
        this.excelService.exportAsExcelFile(this.studentExportObj, this.exam_code);
    };
    ReportsComponent.prototype.generatePDF = function () {
        // console.log(this.exam_code);
        var temp = this.exam_code + '.pdf';
        // console.log(temp);
        __WEBPACK_IMPORTED_MODULE_3_html2canvas__(document.getElementById('content')).then(function (canvas) {
            document.body.appendChild(canvas);
            var pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addHTML(canvas, function () {
                pdf.save(temp);
            });
        });
    };
    ReportsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-reports',
            template: __webpack_require__("../../../../../src/app/reports/reports.component.html"),
            styles: [__webpack_require__("../../../../../src/app/reports/reports.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2__services_excel_service__["a" /* ExcelService */]])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/scores/scores.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".scores {\r\n    margin: 5px;\r\n  }\r\n\r\n  .header{\r\n    background: #d8e9f3;\r\n    padding: 15px;\r\n    height: 120px;\r\n  }\r\n  .reft_content{\r\n    background:#F8F8FF;\r\n    /* height: 480px; */\r\n  }\r\n  .right_content{\r\n    background: white;\r\n    /* height: 480px; */\r\n  }\r\n  #table-wrapper {\r\n    position:relative;\r\n  }\r\n  #table-scroll {\r\n    height:590px;\r\n    overflow:auto;  \r\n    margin-top:20px;\r\n  }\r\n  #table-wrapper table {\r\n    width:100%;\r\n  \r\n  }\r\n  /* #table-wrapper table * {\r\n    background:yellow;\r\n    color:black;\r\n  } */\r\n  #table-wrapper table thead th .text {\r\n    position:absolute;   \r\n    top:-20px;\r\n    z-index:2;\r\n    height:20px;\r\n    width:35%;\r\n    border:1px solid red;\r\n  }\r\n  .table-hover{\r\n\r\n    margin-top: 40px;\r\n  }\r\n  .bntAdd{\r\n    width: 85%;\r\n    margin: 5px;\r\n    /* background-color: #FF8460;\r\n    color: whitesmoke */\r\n  }\r\n  .bntAdd1{\r\n    width: 40%;\r\n    margin: 5px;\r\n    background-color: #008000;\r\n    color: whitesmoke\r\n  }\r\n  .bntAdd2{\r\n    width: 40%;\r\n    margin: 5px;\r\n    background-color: #BD2819;\r\n    color: white\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/scores/scores.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"scores\" id = \"content\">\n  <div class=\"row\">\n    <div class=\"col-md-12 header\">\n      <h4>\n        <p>\n          <b> exem code:</b> &nbsp; &nbsp; {{exam_code}} &nbsp; &nbsp;&nbsp; &nbsp;\n          <b> subject name:</b> &nbsp; &nbsp; {{subject_name}} &nbsp; &nbsp;&nbsp; &nbsp;\n          <b> chapter name:</b> &nbsp; &nbsp; {{chapter_name}}\n        </p>\n        <p>\n          <b> description:</b> &nbsp; &nbsp; {{description}} &nbsp; &nbsp;&nbsp; &nbsp;\n          <b> type:</b> &nbsp; &nbsp; {{type}}\n        </p>\n        <p>\n          <b> amount:</b> &nbsp; &nbsp; {{doing}}/{{amount}} &nbsp; &nbsp;&nbsp; &nbsp;\n          <b> date:</b> &nbsp; &nbsp;  {{date | date :'short'}} \n        </p>\n\n      </h4>\n    </div>\n\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-7 reft_content\">\n      <table class=\"table table-hover\">\n        <thead>\n          <tr>\n            <td colspan='5' align=\"center\">\n\n              <ng-container *ngIf=\"isbar\">\n                <p-chart type=\"bar\" [data]=\"data1\"  [options]=\"options\"></p-chart>\n              </ng-container>\n              <ng-container *ngIf=\"isline\">\n                <p-chart type=\"line\" [data]=\"data2\"  [options]=\"options\"></p-chart>\n              </ng-container>\n              <div class=\"btn-group btn-group-justified \">\n                <a class=\"btn  addTestBtn bg-info\" (click)=\"barBtn()\"> Bar</a>\n                <a class=\"btn editTestBtn bg-danger\" (click)=\"lineBtn()\"> Line </a>\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td></td>\n          </tr>\n          <tr>\n            <td>\n              <b> Max : </b> {{max}} </td>\n            <td>\n              <b> Min : </b> {{min}}</td>\n          </tr>\n          <tr>\n            <td>\n              <b> Average : </b>{{avg}}</td>\n            <td>\n              <b> Standard Deviation : </b> {{std}} </td>\n          </tr>\n        </thead>\n      </table>\n    </div>\n    <div class=\"col-md-5 right_content table-scroll\">\n      <table class=\"table table-hover\">\n        <thead>\n          <tr>\n            <th> #\n            </th>\n            <th scope=\"col\">Student ID</th>\n            <th scope=\"col\">Student Name</th>\n            <th scope=\"col\">Score</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let data of studentShow; let i=index\">\n            <td>{{i+1}}</td>\n            <td>{{data.code}}</td>\n            <td>{{data.name}}</td>\n            <td>{{data.score}}</td>\n          </tr>\n          <tr>\n            <td colspan='4' align=\"center\">\n              <button (click)=\"exportToExcel()\" class=\"btn bntAdd1\">\n                <span class=\"glyphicon glyphicon-export\"></span>  Export to excel</button>\n                <button (click)=\"generatePDF()\" class=\"btn bntAdd2\">\n                  <span class=\"glyphicon glyphicon-export\"></span>&nbsp;Export to PDF</button>\n            </td>\n          </tr>\n            <tr>\n            <td colspan='4' align=\"center\">\n                <button (click)=\"exitTest()\" class=\"btn btn-primary bntAdd\">\n                    <span class=\"glyphicon glyphicon-off\"></span> Close </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/scores/scores.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoresComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_excel_service__ = __webpack_require__("../../../../../src/app/services/excel.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_html2canvas__ = __webpack_require__("../../../../html2canvas/dist/npm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_html2canvas___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_html2canvas__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScoresComponent = (function () {
    function ScoresComponent(afs, router, excelService, firebaseService) {
        var _this = this;
        this.afs = afs;
        this.router = router;
        this.excelService = excelService;
        this.firebaseService = firebaseService;
        //สลับการแสดงผลระหว่างแบบ bar และแบบ line
        this.isbar = true;
        this.isline = false;
        //array ที่ใช้เอาไปแสดงผล
        this.studentShow = [];
        this.scoreGraph = [];
        this.codeGraph = [];
        this.studentExportObj = [];
        this.options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }
                ]
            }
        };
        //สำหรับใช้ export excel
        this.studentExportObj = [];
        this.doing = 0;
        this.excelService = excelService;
        this.testID = this.firebaseService.Test_id_new;
        //this.testID = "205100_0_18658896000";   //รหัสแบบทดสอบนั้น
        // this.testID="205100_0_1523986758534";
        //---data in exam
        this.ExamDoc = this.afs.doc("/exam/" + this.testID);
        this.dataExam = this.ExamDoc.valueChanges();
        this.dataExam.take(1).subscribe(function (data) {
            //รายละเอียดส่วนหัวของรายงาน
            console.log(data);
            _this.amount = data.amount;
            _this.subject_name = data.subject_name;
            _this.chapter_name = data.chapter_name;
            _this.description = data.description;
            console.log(data.type);
            switch (data.type) {
                case 1: {
                    //statements; 
                    _this.type = "คำตอบสั้น";
                    break;
                }
                case 2: {
                    //statements; 
                    _this.type = "คำถามแบบ 2 ตัวเลือก ";
                    break;
                }
                case 3: {
                    //statements; 
                    _this.type = "คำตอบสั้น 3 ตัวเลือก";
                    break;
                }
                case 4: {
                    //statements; 
                    _this.type = "คำตอบสั้น 4 ตัวเลือก";
                    break;
                }
            }
            _this.date = data.date;
            _this.exam_code = data.exam_code;
        });
        //---question in exam
        this.questionExamCollection = this.afs.collection("/exam/" + this.testID + "/questions");
        this.questions = this.questionExamCollection.valueChanges();
        this.questions.take(1).subscribe(function (ques) {
            _this.doing = 0;
            console.log(ques);
            ques.forEach(function (data) {
                console.log(data.status);
                if (data.status == true) {
                    _this.doing = _this.doing + 1;
                    console.log("doing" + _this.doing);
                }
            });
        });
        //---student in exam
        this.studentExamCollection = this.afs.collection("/exam/" + this.testID + "/students", function (ref) { return ref.orderBy('score'); });
        this.students = this.studentExamCollection.valueChanges();
        this.students.take(1).subscribe(function (stu) {
            console.log(stu);
            stu.forEach(function (data, index) {
                console.log(data);
                _this.studentShow.push(data);
                console.log(data.score);
                _this.sum = 0;
                _this.scoreGraph.push(data.score);
                _this.codeGraph.push(data.code);
                //test show sort score
                _this.studentShow.sort(function (obj1, obj2) {
                    // มากไปน้อย
                    return obj2.score - obj1.score;
                });
                console.log(_this.scoreGraph);
                console.log("คำนวณ");
                //คำนวน MAX, MIN
                console.log(_this.scoreGraph);
                _this.max = Math.max.apply(null, _this.scoreGraph);
                console.log("Max = " + _this.max);
                _this.min = Math.min.apply(null, _this.scoreGraph);
                console.log("Min = " + _this.min);
                // console.log(Math.sqrt(this.variance(hii)));
                _this.sum = _this.scoreGraph.reduce(function (previous, current) { return current += previous; });
                console.log("sum" + _this.sum);
                _this.avg = (_this.sum / _this.scoreGraph.length).toFixed(2);
                console.log("AVG = " + _this.avg);
                _this.std = _this.standardDeviation().toFixed(2);
                console.log("STD = " + _this.std);
                ///add to DB
                var cal = {
                    max: _this.max,
                    min: _this.min,
                    sd: _this.std,
                    average: _this.avg
                };
                var ExamRef = _this.afs.doc("/exam/" + _this.testID);
                ExamRef.update(cal);
                console.log(index, _this.std.length - 1);
                //bar
                _this.data1 = {
                    labels: _this.codeGraph,
                    datasets: [
                        {
                            label: 'Test scores bar',
                            backgroundColor: '#86c5f9',
                            borderColor: '#3da2f5',
                            data: _this.scoreGraph
                        },
                    ]
                };
                //line
                _this.data2 = {
                    labels: _this.codeGraph,
                    datasets: [
                        {
                            label: 'Test scores line',
                            backgroundColor: '#ffcce6',
                            borderColor: '#ff80bf',
                            data: _this.scoreGraph
                        },
                    ]
                };
            });
        });
    }
    //-------function หาค่า SD
    ScoresComponent.prototype.standardDeviation = function () {
        var avg = this.avg;
        var squareDiffs = this.scoreGraph.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });
        var avgSquareDiff = this.average(squareDiffs);
        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    };
    ScoresComponent.prototype.average = function (data) {
        var sum = data.reduce(function (sum, value) {
            return sum + value;
        }, 0);
        var avg = sum / data.length;
        return avg;
    };
    //-------function สลับการแสดงผลรหว่างกราฟ
    ScoresComponent.prototype.barBtn = function () {
        this.isbar = true;
        this.isline = false;
    };
    ScoresComponent.prototype.lineBtn = function () {
        this.isline = true;
        this.isbar = false;
    };
    //-------function export เป็น excel file
    ScoresComponent.prototype.exportToExcel = function (event) {
        var _this = this;
        console.log(event);
        console.log(this.studentExportObj);
        //to data export
        this.studentShow.forEach(function (data, indax) {
            console.log(data);
            console.log(data.code);
            var studentExport = {
                student_id: data.code,
                student_name: data.name,
                score: data.score
            };
            _this.studentExportObj.push(studentExport);
            console.log(_this.studentExportObj);
        });
        //
        this.excelService.exportAsExcelFile(this.studentExportObj, this.exam_code);
    };
    ScoresComponent.prototype.exitTest = function () {
        this.router.navigate(['dashboard', 'test']);
    };
    ScoresComponent.prototype.ngOnInit = function () {
    };
    ScoresComponent.prototype.generatePDF = function () {
        console.log(this.exam_code);
        var temp = this.exam_code + '.pdf';
        console.log(temp);
        __WEBPACK_IMPORTED_MODULE_5_html2canvas__(document.getElementById('content')).then(function (canvas) {
            document.body.appendChild(canvas);
            var pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addHTML(canvas, function () {
                pdf.save(temp);
            });
        });
    };
    ScoresComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-scores',
            template: __webpack_require__("../../../../../src/app/scores/scores.component.html"),
            styles: [__webpack_require__("../../../../../src/app/scores/scores.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_excel_service__["a" /* ExcelService */], __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */]])
    ], ScoresComponent);
    return ScoresComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__("../../../../firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_cookie_service__ = __webpack_require__("../../../../ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthService = (function () {
    function AuthService(afAuth, firebaseService, cookieService, afs, router) {
        var _this = this;
        this.afAuth = afAuth;
        this.firebaseService = firebaseService;
        this.cookieService = cookieService;
        this.afs = afs;
        this.router = router;
        this.cookieValue = 'UNKNOWN';
        this.authState = null;
        this.afAuth.authState.subscribe(function (auth) {
            _this.authState = auth;
        });
    }
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.authState !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return this.authenticated ? this.authState : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserObservable", {
        get: function () {
            return this.afAuth.authState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserId", {
        get: function () {
            return this.authenticated ? this.authState.uid : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserDisplayName", {
        get: function () {
            if (!this.authState) {
                return 'Guest';
            }
            else {
                return this.authState['displayName'] || 'User without a Name';
            }
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.emailSignUp = function (email, password) {
        var _this = this;
        this.cookieService.set('password', password);
        this.cookieValue = this.cookieService.get('password');
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
            _this.authState = user;
            _this.updateUserData();
            _this.cookieService.set('email', email);
            _this.cookieValue = _this.cookieService.get('email');
            // this.firebaseService.userLogin == email;
            _this.router.navigate(['dashboard']);
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_7_sweetalert2___default()({ type: 'error', text: error }); });
    };
    AuthService.prototype.emailLogin = function (email, password) {
        var _this = this;
        console.log(password);
        this.cookieService.set('password', password);
        this.cookieValue = this.cookieService.get('password');
        console.log("I am logging in");
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            _this.authState = user;
            _this.updateUserData();
            // this.firebaseService.userLogin = email;
            _this.cookieService.set('email', email);
            _this.cookieValue = _this.cookieService.get('email');
            _this.router.navigate(['dashboard']);
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_7_sweetalert2___default()({ type: 'error', text: error }); });
    };
    AuthService.prototype.resetPassword = function (email) {
        var fbAuth = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]();
        return fbAuth.sendPasswordResetEmail(email)
            .then(function () { return console.log('email sent'); })
            .catch(function (error) { return console.log(error); });
    };
    AuthService.prototype.getCurrentLoggedIn = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (auth) {
            if (auth) {
                _this.router.navigate(['/']);
            }
        });
    };
    AuthService.prototype.signOut = function () {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
        this.cookieValue = 'UNKNOWN';
        this.cookieService.set('email', 'UNKNOWN');
        this.cookieService.set('password', 'UNKNOWN');
        console.log(this.cookieService.get('email'));
    };
    AuthService.prototype.updateUserData = function () {
        var user = {
            email: this.authState.email,
        };
        this.userRef = this.afs.doc("users/" + this.currentUserId);
        this.userRef.set(user, { merge: true });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_6_ngx_cookie_service__["a" /* CookieService */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/services/excel.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExcelService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xlsx__ = __webpack_require__("../../../../xlsx/xlsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EXCEL_EXTENSION = '.xlsx';


var ExcelService = (function () {
    //ref = firebase.storage().ref(`${this.basePath}/excel`);   //ชื่อ file excel save
    function ExcelService(afs, http) {
        this.afs = afs;
        this.http = http;
        //ref for uploadFile to firestore  
        this.basePath = '/ExcelFile'; //ชื่อ fodel in storage
    }
    //-----function export as ExcelFile by json object
    ExcelService.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = __WEBPACK_IMPORTED_MODULE_1_xlsx__["utils"].json_to_sheet(json);
        var workbook = __WEBPACK_IMPORTED_MODULE_1_xlsx__["utils"].book_new();
        __WEBPACK_IMPORTED_MODULE_1_xlsx__["utils"].book_append_sheet(workbook, worksheet, 'Student');
        __WEBPACK_IMPORTED_MODULE_1_xlsx__["writeFile"](workbook, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    ExcelService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], ExcelService);
    return ExcelService;
}());



/***/ }),

/***/ "../../../../../src/app/services/firebase.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseService = (function () {
    // public Test_id_new = "205100_1_1524330147111";
    // public TestScore_id_new:any;
    function FirebaseService(db, afs) {
        this.db = db;
        this.afs = afs;
        this.userLogin = "";
    }
    FirebaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], FirebaseService);
    return FirebaseService;
}());



/***/ }),

/***/ "../../../../../src/app/services/upload-file.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadFileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__("../../../../firebase/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadFileService = (function () {
    function UploadFileService(afs) {
        this.afs = afs;
        this.basePath = '/students';
    }
    // pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}, studentCode:string) {
    UploadFileService.prototype.pushFileToStorage = function (fileUpload, studentCode) {
        var _this = this;
        var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
        var uploadTask = storageRef.child(this.basePath + "/" + studentCode).put(fileUpload.file);
        uploadTask.on(__WEBPACK_IMPORTED_MODULE_1_firebase__["storage"].TaskEvent.STATE_CHANGED, function (snapshot) {
            // in progress
            var snap = snapshot;
            // progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        }, function (error) {
            // fail
            console.log(error);
        }, function () {
            // success
            fileUpload.url = uploadTask.snapshot.downloadURL;
            _this.updateImageDb(fileUpload.url, studentCode);
        });
    };
    UploadFileService.prototype.updateImageDb = function (url, studentCode) {
        var studentRef = this.afs.doc("/students/" + studentCode);
        studentRef.update({
            url: url
        });
    };
    //delete
    UploadFileService.prototype.delteUserImage = function (studentCode) {
        var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
        storageRef.child(this.basePath + "/" + studentCode).delete();
    };
    UploadFileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], UploadFileService);
    return UploadFileService;
}());



/***/ }),

/***/ "../../../../../src/app/signup/signup.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Form */\r\n.form {\r\n    position: relative;\r\n    z-index: 1;\r\n    background:#c2d1f0;\r\n    max-width: 300px;\r\n    max-height: 3500px;\r\n    margin: 0 auto 10px;\r\n    padding: 30px;\r\n    border-top-left-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n    border-bottom-left-radius: 3px;\r\n    border-bottom-right-radius: 3px;\r\n    text-align: center;\r\n  }\r\n  .form .thumbnail {\r\n    background: #3c8dbc;\r\n    width: 150px;\r\n    height: 150px;\r\n    margin: 0 auto 30px;\r\n    padding: 50px 30px;\r\n    border-top-left-radius: 100%;\r\n    border-top-right-radius: 100%;\r\n    border-bottom-left-radius: 100%;\r\n    border-bottom-right-radius: 100%;\r\n    box-sizing: border-box;\r\n  }\r\n  .form .thumbnail img {\r\n    display: block;\r\n    width: 100%;\r\n  }\r\n  .form input {\r\n    outline: 0;\r\n    background: #ffffff;\r\n    width: 100%;\r\n    border: 0;\r\n    margin: 0 0 15px;\r\n    padding: 15px;\r\n    border-top-left-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n    border-bottom-left-radius: 3px;\r\n    border-bottom-right-radius: 3px;\r\n    box-sizing: border-box;\r\n    font-size: 14px;\r\n  }\r\n  .form .button {\r\n    outline: 0;\r\n    background: #0099ff;\r\n    width: 100%;\r\n    border: 0;\r\n    padding: 15px;\r\n    border-top-left-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n    border-bottom-left-radius: 3px;\r\n    border-bottom-right-radius: 3px;\r\n    color: #FFFFFF;\r\n    font-size: 14px;\r\n    transition: all 0.3 ease;\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .container {\r\n    position: relative;\r\n    z-index: 1;\r\n    /*max-width: 300px;*/\r\n    margin: 0 auto;\r\n  }\r\n  .container:before, .container:after {\r\n    content: \"\";\r\n    display: block;\r\n    clear: both;\r\n  }\r\n  .container .info {\r\n    margin: 50px auto;\r\n    text-align: center;\r\n  }\r\n  .container .info h1 {\r\n    margin: 0 0 15px;\r\n    padding: 0;\r\n    font-size: 36px;\r\n    font-weight: 300;\r\n    color: #1a1a1a;\r\n  }\r\n  .container .info span {\r\n    color: #4d4d4d;\r\n    font-size: 12px;\r\n  }\r\n  .container .info span a {\r\n    color: #000000;\r\n    text-decoration: none;\r\n  }\r\n  .container .info span .fa {\r\n    color: #EF3B3A;\r\n  }\r\n  \r\n  /* END Form */\r\n  /* Demo Purposes */\r\n  body {\r\n    background: #ccc;\r\n    font-family: \"Roboto\", sans-serif;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n  }\r\n  body:before {\r\n    content: \"\";\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    display: block;\r\n    background:#ecf0f5;\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n  .login-text{\r\n    padding-top: 20px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "<body>\r\n  <div class=\"container\">\r\n\r\n    <div class=\"info\">\r\n      <h1>Register</h1>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"form\">\r\n\r\n    <div class=\"thumbnail\">\r\n      <img src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg\" />\r\n    </div>\r\n\r\n    <form class=\"login-form\">\r\n      <input type=\"email\" placeholder=\"email\" class=\"form-control\" name=\"emailLogin\" [(ngModel)]=\"emailSignup\" />\r\n      <input type=\"password\" placeholder=\"password\" class=\"form-control\" name=\"passwordLogin\" [(ngModel)]=\"passwordSignup\">\r\n      <!-- <input type=\"name\" placeholder=\"name\" class=\"form-control\" name=\"nameLogin\" [(ngModel)]=\"nameSignup\"> -->\r\n\r\n      <!-- <a [routerLink]=\"'/dashboard'\"><input type =\"submit\" class =\"button\" value=\"login\"></a> -->\r\n      <button type=\"submit\" class=\"btn btn-primary button\" (click)=\"signup()\">\r\n        <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\r\n        สมัครสมาชิก\r\n      </button>\r\n      <div class=\"col-6 text-center login-text\">\r\n        <a class=\"text-muted\" [routerLink]=\"['/']\">\r\n          เข้าสู่ระบบ\r\n        </a>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</body>\r\n\r\n<!-- <div class=\"row justify-content-center\">\r\n  <div class=\"col-md-6\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header text-center text-white bg-dark\">\r\n        สมัครสมาชิก\r\n      </div>\r\n      <div class=\"card-body\">\r\n         <form > -->\r\n            <!-- (ngSubmit)=\"signup()\"  -->\r\n            <!-- [formGroup]=\"userForm\" -->\r\n          <!-- <div class=\"form-group row\">\r\n            <label class=\"col-sm-3 col-form-label\">Email</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"email\" class=\"form-control\" name=\"email\" [(ngModel)]=\"emailSignup\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3 col-form-label\">Password</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"passwordSignup\">\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-6 text-left\">\r\n              <a class=\"text-muted\" [routerLink]=\"['/']\">\r\n                เข้าสู่ระบบ\r\n              </a>\r\n            </div>\r\n            <div class=\"col-6 text-right\">\r\n              <button type=\"submit\" class=\"btn btn-primary\" (click)=\"signup()\">\r\n                <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\r\n                สมัครสมาชิก\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupComponent = (function () {
    function SignupComponent(fb, auth) {
        this.fb = fb;
        this.auth = auth;
    }
    SignupComponent.prototype.ngOnInit = function () {
        //this.buildForm();
    };
    // buildForm(): void {
    //   this.userForm = new FormGroup({
    //     emailSignup: new FormControl('', [
    //       Validators.required,
    //       Validators.email
    //     ]),
    //     passwordSignup: new FormControl('', [
    //       Validators.pattern('^(?=.*[0–9])(?=.*[a-zA-Z])([a-zA-Z0–9]+)$'),
    //       Validators.minLength(6),
    //       Validators.maxLength(25)
    //     ])
    //   });
    // }
    SignupComponent.prototype.signup = function () {
        console.log(this.emailSignup + this.passwordSignup);
        this.auth.emailSignUp(this.emailSignup, this.passwordSignup);
        //this.auth.emailSignUp(this.userForm.value.emailSignup, this.userForm.value.passwordSignup)
    };
    SignupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__("../../../../../src/app/signup/signup.component.html"),
            styles: [__webpack_require__("../../../../../src/app/signup/signup.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "../../../../../src/app/student-list/fileupload.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUpload; });
var FileUpload = (function () {
    function FileUpload(file) {
        this.file = file;
    }
    return FileUpload;
}());



/***/ }),

/***/ "../../../../../src/app/student-list/student-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".student-list{\r\n  margin: 30px;  \r\n}\r\n\r\n.container{\r\n  margin: 20px;  \r\n}\r\n.row{\r\n  margin-top: 20px;\r\n  margin-right: 40px;\r\n  margin-left: 40px;\r\n}\r\n.picture_show:hover{\r\n  position: absolute;\r\n  cursor: pointer;\r\n  width: 250px;\r\n  transition: width 1s;\r\n  border-radius: 10px;\r\n  box-shadow: -3px -3px 20px #888888;\r\n}\r\n\r\n/* ตอนลองตาราง meterail */\r\n.example-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  min-width: 300px;\r\n}\r\n\r\n.mat-table {\r\n  overflow: auto;\r\n  max-height: 500px;\r\n}\r\n.thisTextCenter{\r\n  text-align: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student-list/student-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"student-list\">\r\n  <!-- <button type=\"button\" class=\"btn btn-primary btn-md\" (click)=\"test()\">\r\n    <i class=\"fa fa-user-plus\"></i> Test</button> -->\r\n  <div class=\"box box-info\">\r\n    <div class=\"container\">\r\n      <!-- Trigger the modal with a button New -->\r\n      <button type=\"button\" class=\"btn btn-primary btn-md\" data-toggle=\"modal\" data-target=\"#myModalNewStd\" (click)=\"DefaultModal()\">\r\n        <i class=\"fa fa-user-plus\"></i> NEW STUDENT</button>\r\n      <!-- Modal ADD-->\r\n      <div class=\"modal fade\" id=\"myModalNewStd\" role=\"dialog\">\r\n        <div class=\"modal-dialog  modal-md\">\r\n          <!-- Modal size sm,md-->\r\n          <!-- Modal content-->\r\n          <div class=\"modal-content\">\r\n            <form (ngSubmit)=\"addNewStudent()\" #NewStdForm=\"ngForm\">\r\n              <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                <h4 class=\"modal-title\">ADD NEW STUDENT</h4>\r\n              </div>\r\n              <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                  <label>Student ID:</label>\r\n                  <input type=\"text\" class=\"form-control\" myNumberOnly  name=\"student_id\" ngModel [(ngModel)]=\"newStudentCode\" placeholder=\"ex.570510637\" required>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label>Student Name:</label>\r\n                  <input type=\"text\" class=\"form-control\" id=\"StdName\" name=\"student_name\" ngModel [(ngModel)]=\"newStudentName\" placeholder=\"ex.ชลธิชา บัวตูม\">\r\n                </div>\r\n                <!-- upload file -->\r\n                            <!-- <div *ngIf=\"currentFileUpload\" class=\"progress\" style=\"width:400px\">\r\n      <div class=\"progress-bar progress-bar-info progress-bar-striped\" role=\"progressbar\" attr.aria-valuenow=\"{{progress.percentage}}\"\r\n                    aria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{width:progress.percentage+'%'}\">\r\n                    {{progress.percentage}}%\r\n                  </div> \r\n                </div>-->\r\n\r\n                <label class=\"btn btn-default\">\r\n                  <input type=\"file\" (change)=\"selectFile($event)\" style=\"width:550px\">\r\n                </label>\r\n\r\n                <!-- <button class=\"btn btn-success\" [disabled]=\"!selectedFiles\"\r\n                      (click)=\"upload()\">Upload</button> -->\r\n                <!--  -->\r\n              </div>\r\n\r\n            </form>\r\n            <div class=\"modal-footer\">\r\n              <!-- <button type=\"submit\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" data-dismiss=\"modal\"> -->\r\n              <button type=\"submit\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" (click)=\"addNewStudent(NewStdForm);\" data-dismiss=\"modal\">\r\n                <span class=\"glyphicon glyphicon-ok-sign\"></span>ADD</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Display student list -->\r\n      <!-- table -->\r\n      <div class=\"row\">\r\n        <div class=\"col-md-10\">\r\n          <div class=\"table-responsive\">\r\n            <!-- table std list -->\r\n            <table class=\"table table-hover\">\r\n              <thead>\r\n                <tr>\r\n                  <th>\r\n                    #\r\n                    <!-- <input type=\"checkbox\" class=\"checkthis\" /> -->\r\n                    <!-- <input type=\"checkbox\" id=\"checkall\" /> -->\r\n                  </th>\r\n                  <th >Picture</th>\r\n                  <th scope=\"col\">Student ID</th>\r\n                  <th scope=\"col\">Student Name</th>\r\n                  <th class=\"thisTextCenter\">Edit</th>\r\n                  <th class=\"thisTextCenter\">Delete</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let student of students | async ; let i=index  let index=index\">\r\n                  <td> {{i+1}} </td>\r\n                  <td>\r\n                    <img src= {{student?.url}} width=\"60 px\" class=\"picture_show img-circle\">\r\n                  </td>\r\n                  <td>{{student?.code}}</td>\r\n                  <td>{{student?.name}}</td>\r\n\r\n                  <td class=\"thisTextCenter\">\r\n                    <p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Edit\">\r\n                      <button class=\"btn btn-warning btn-xs\" style=\"font-size: 16px;\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" (click)=\"setModalData(student)\">\r\n                        <span class=\"glyphicon glyphicon-pencil\"></span>\r\n                      </button>\r\n                    </p>\r\n                  </td>\r\n                  <td class=\"thisTextCenter\">\r\n                    <p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\">\r\n                      <!-- <button class=\"btn btn-danger btn-xs\" data-title=\"Delete\" data-toggle=\"modal\" type=\"button\" (click)=\"delStd(data)\"> -->\r\n                      <button class=\"btn btn-danger btn-xs\" data-title=\"Delete\" style=\"font-size: 16px;\" data-toggle=\"modal\" data-target=\"#delete\" (click)=\"setRemoveCode(student.code)\">\r\n                        <span class=\"glyphicon glyphicon-trash\"></span>\r\n                      </button>\r\n                    </p>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- edit modal -->\r\n      <div class=\"modal fade\" id=\"edit\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\r\n              </button>\r\n              <h4 class=\"modal-title custom_align\" id=\"Heading\">Edit Your Detail</h4>\r\n            </div>\r\n            <!-- ////// -->\r\n            <div class=\"modal-body\">\r\n              <form >\r\n                <div class=\"form-group\">\r\n                  <label>Student ID:</label>\r\n                  <input class=\"form-control \" type=\"text\" name=\"studentCode\"  [(ngModel)]=\"studentCodeLocal\" disabled>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label>Student Name:</label>\r\n                  <input class=\"form-control \" type=\"text\" name=\"studentName\"  [(ngModel)]=\"studentNameLocal\">\r\n                </div>\r\n              </form>\r\n\r\n              <label class=\"btn btn-default\">\r\n                <input type=\"file\" (change)=\"selectFile($event)\" style=\"width:1000px\">\r\n              </label>\r\n\r\n              <!-- <button class=\"btn btn-success\" [disabled]=\"!selectedFiles\"\r\n                            (click)=\"upload()\">Upload</button> -->\r\n              <!--  -->\r\n\r\n            </div>\r\n\r\n            <div class=\"modal-footer \">\r\n              <button type=\"button\" class=\"btn btn-warning btn-lg\" style=\"width: 100%;\" (click)=\"UpdateStudent()\" data-dismiss=\"modal\">\r\n                <span class=\"glyphicon glyphicon-ok-sign\"></span> Update</button>\r\n            </div>\r\n          </div>\r\n          <!-- /.modal-content -->\r\n        </div>\r\n        <!-- /.modal-dialog -->\r\n      </div>\r\n\r\n      <!-- delete modal -->\r\n      <div class=\"modal fade\" id=\"delete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\r\n              </button>\r\n              <h4 class=\"modal-title custom_align\" id=\"Heading\">Delete this entry</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <div class=\"alert alert-danger\">\r\n                <span class=\"glyphicon glyphicon-warning-sign\"></span> Are you sure you want to delete this Record?\r\n              </div>\r\n            </div>\r\n            <div class=\"modal-footer \">\r\n              <button type=\"button\" class=\"btn btn-success\" type=\"button\" (click)=\"removeStudent()\" data-dismiss=\"modal\">\r\n                <span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\r\n              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                <span class=\"glyphicon glyphicon-remove\"></span> No</button>\r\n            </div>\r\n          </div>\r\n          <!-- /.modal-content -->\r\n        </div>\r\n        <!-- /.modal-dialog -->\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/student-list/student-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_upload_file_service__ = __webpack_require__("../../../../../src/app/services/upload-file.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fileupload__ = __webpack_require__("../../../../../src/app/student-list/fileupload.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//upload file



var StudentListComponent = (function () {
    function StudentListComponent(afs, firebaseService, uploadService) {
        var _this = this;
        this.afs = afs;
        this.firebaseService = firebaseService;
        this.uploadService = uploadService;
        // progress: { percentage: number } = { percentage: 0 }
        this.studentsCheck = [];
        this.studentAddcheck = true;
        this.studentsCheck = [];
        this.studentCollection = afs.collection('/students', function (ref) { return ref.orderBy('code'); });
        this.students = this.studentCollection.valueChanges();
        this.students.forEach(function (data) {
            //console.log(data);
            data.forEach(function (data1) {
                // console.log(data1.code);
                _this.studentsCheck.push(data1);
            });
        });
    }
    StudentListComponent.prototype.ngOnInit = function () {
    };
    StudentListComponent.prototype.getStudent = function () {
    };
    StudentListComponent.prototype.DefaultModal = function () {
        this.newStudentCode = "";
        this.newStudentName = "";
    };
    //upload file picture student
    StudentListComponent.prototype.selectFile = function (event) {
        this.selectedFiles = event.target.files;
    };
    StudentListComponent.prototype.addNewStudent = function () {
        var _this = this;
        var count;
        if (this.selectedFiles == undefined || this.newStudentCode == "" || this.newStudentName == "") {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter all fields.',
            });
        }
        else {
            //Add item with Custom IDs In Firebase
            console.log(this.newStudentCode);
            //ไม่มีวิชาในระบบ
            console.log(this.studentsCheck.length);
            if (this.studentsCheck.length == 0) {
                this.studentAddcheck == false;
                count = 0;
            }
            else {
                this.studentsCheck.forEach(function (data) {
                    if (data.code == _this.newStudentCode) {
                        __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                            type: 'error',
                            title: 'Unsuccessful',
                            text: 'This code already exists.',
                        });
                        _this.studentAddcheck = true;
                        count = 1;
                    }
                    else {
                        _this.studentAddcheck = false;
                    }
                });
            }
            if (this.studentAddcheck == false && count != 1) {
                var id = this.newStudentCode;
                var student = {
                    code: this.newStudentCode,
                    name: this.newStudentName,
                    url: null
                };
                console.log(student);
                console.log(this.selectedFiles);
                var studentCollection = this.afs.collection('students');
                studentCollection.doc(id).set(student);
                //upload picture file
                if (this.selectedFiles) {
                    var file = this.selectedFiles.item(0);
                    this.currentFileUpload = new __WEBPACK_IMPORTED_MODULE_4__fileupload__["a" /* FileUpload */](file);
                    // this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, id)
                    this.uploadService.pushFileToStorage(this.currentFileUpload, id);
                    this.selectedFiles = null;
                }
                __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                    type: 'success',
                    title: 'Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };
    //----Update
    //Set data Edit to modal
    StudentListComponent.prototype.setModalData = function (student) {
        //console.log(student);   //this student display ex. {code: "570510100", name: "มาลี ดีใจ", url: "https://firebasestorage.googleapis.com/v0/b/online…=media&token=e086515b-7369-4c47-a791-7b64ee5f35d3"}
        console.log(student);
        this.studentNameLocal = student.name;
        console.log(this.studentNameLocal);
        this.studentCodeLocal = student.code;
    };
    // Update student name or picture file this key
    StudentListComponent.prototype.UpdateStudent = function () {
        if (this.studentNameLocal == "") {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter subject name.',
            });
        }
        else {
            var studentUpdate = {
                name: this.studentNameLocal
            };
            //path to update
            var studentRef = this.afs.doc("students/" + this.studentCodeLocal);
            //update data : student_name
            studentRef.update(studentUpdate);
            //upload picture file
            if (this.selectedFiles) {
                var file = this.selectedFiles.item(0);
                this.currentFileUpload = new __WEBPACK_IMPORTED_MODULE_4__fileupload__["a" /* FileUpload */](file);
                this.uploadService.pushFileToStorage(this.currentFileUpload, this.studentCodeLocal);
                this.selectedFiles = null;
            }
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'success',
                title: 'Updated',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    //----Delete
    //Set data delete to modal
    StudentListComponent.prototype.setRemoveCode = function (code) {
        //student code to delete (ex. 570510100)
        this.removeCode = code;
    };
    StudentListComponent.prototype.removeStudent = function () {
        //delete student
        this.studentCollection.doc(this.removeCode).delete();
        //Delete picture
        this.uploadService.delteUserImage(this.removeCode);
        __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
            type: 'success',
            title: 'Removed',
            showConfirmButton: false,
            timer: 1500
        });
    };
    StudentListComponent.prototype.test = function () {
        __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                console.log(result.value);
                __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    };
    StudentListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-student-list',
            template: __webpack_require__("../../../../../src/app/student-list/student-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/student-list/student-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_3__services_upload_file_service__["a" /* UploadFileService */]])
    ], StudentListComponent);
    return StudentListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/test-step1/test-step1.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".buttonForm{\r\n    text-align: center\r\n  }\r\n  .bntAdd{\r\n    width: 20%;\r\n    margin: 5px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/test-step1/test-step1.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"test-step1\">\r\n  <div class=\"content\">\r\n    <form #SelectTestForm=\"ngForm\">\r\n      <!-- Select Category -->\r\n      <div class=\"form-group\">\r\n          <!-- {{now | date :'short'}}  time now -->\r\n        <label for=\"exampleSelect1\">Catagory select</label>\r\n        <select class=\"form-control\" id=\"SelectCategory\" name=\"SelectCategory\" (ngModelChange)=\"onChange($event)\" [(ngModel)]=\"SelectCategory\">\r\n          <option value=\"\" [selected]=\"isSelected\" [disabled]=\"true\"> ----Please choose one---- </option>\r\n          <!-- <option *ngFor=\"let data of arrayVal_cate; let i = index\" [ngValue]=\"i\" [selected]=\"isSelected\">{{data?.category_name}}</option> -->\r\n          <option *ngFor=\"let subject of subjectList | async \" [ngValue]= subject [selected]=\"isSelected\">\r\n              {{subject.code}} : {{subject.name}}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <!-- {{SelectThisCategory}} -->\r\n      <!-- Select Topic -->\r\n      <div class=\"form-group\">\r\n        <label for=\"exampleSelect1\">Chapter select</label>\r\n        <select class=\"form-control\" id=\"SelectTopic\" name=\"SelectTopic\" (ngModelChange)=\"numQuestion($event)\" [(ngModel)]=\"SelectTopic\">\r\n          <option value=\"\" [selected]=\"isSelected\" [disabled]=\"true\"> ----Please choose one---- </option>\r\n          <option *ngFor=\"let chapter of chapterList | async \" [ngValue]= chapter [selected]=\"isSelected\">\r\n              {{chapter.code}} : {{chapter.name}}\r\n            </option>\r\n        </select>\r\n      </div>\r\n\r\n      <!-- Select Number of items -->\r\n      <div class=\"form-group\">\r\n        <label for=\"exampleTextarea\">Number of items</label>\r\n        <select class=\"form-control\" id=\"SelectNumofItem\" name=\"SelectNumofItem\" [(ngModel)]=\"SelectNumofItem\">\r\n          <option *ngFor=\"let number of  array_numOfitem\">{{number}}</option> \r\n        </select>\r\n      </div>\r\n\r\n      <!-- Input Description -->\r\n      <div class=\"form-group\">\r\n        <label for=\"exampleTextarea\">Description</label>\r\n        <textarea class=\"form-control\" id=\"InputDescription\" rows=\"2\" name=\"InputDescription\" [(ngModel)]=\"InputDescription\"></textarea>\r\n      </div>\r\n\r\n        <!-- button -->\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 \">\r\n              <p class=\"buttonForm\">\r\n                <br>\r\n                <br>\r\n                <button type=\"submit\" class=\"btn btn-primary bntAdd\" (click)=\"clearTest1();\">\r\n                    <span class=\"glyphicon glyphicon-repeat\"></span> Clear</button>\r\n                <button type=\"submit\" class=\"btn btn-success  bntAdd\" (click)=\"StartSelectTest(SelectTestForm)\">\r\n                    <span class=\"\tglyphicon glyphicon-forward\"></span> Next Step</button>\r\n              </p>\r\n            </div>\r\n          </div>\r\n          <!--  -->\r\n    </form>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/test-step1/test-step1.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestStep1Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
// import { FirebaseService } from '../services/firebase.service';
// import { Observable } from 'rxjs/Observable';
//new





var TestStep1Component = (function () {
    function TestStep1Component(afs, db, firebaseService, router) {
        this.afs = afs;
        this.db = db;
        this.firebaseService = firebaseService;
        this.router = router;
        this.array_numOfitem = [];
        this.SelectThisCategory = [];
        this.ADDarrayquestion_id = [];
        this.arrayKey_cate = []; //array สำหับคีย์ของหมวดหมู่นั้น
        this.arrayVal_cate = []; //array สำหรับแสดงหมวดหมู่
        this.arrayTopic_name = [];
        this.arrayNum_question = [];
        this.arrayquestion_id = [];
        this.display_arr_choice_type = [];
        this.questionAllList = [];
        this.amountList = [];
        this.questionTmp = [];
        this.SelectCategory = "";
        /*
            this.CategoryList = this.db.list('/Category');
            this.dataObj = this.CategoryList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            });
        
            let ref = this.db.database.ref('/Category').on("child_added", (snapshotChanges) => {
              console.log(snapshotChanges.key + ":" + snapshotChanges.val());
              this.arrayKey_cate.push(snapshotChanges.key);
              this.arrayVal_cate.push(snapshotChanges.val());
              // console.log(this.arrayKey_cate);
              // console.log(this.arrayVal_cate);
            });
        
            this.dataObj.forEach(data => {
              console.log(data);
              console.log("--------");
            });
        
            //
            this.TestList = this.db.list('/Test');  //Display Student  //เรียงตาม Student ID
            this.dataObj2 = this.TestList.snapshotChanges().map(changes => {    // Use snapshotChanges().map() to store the key
              // console.log("eiei: "+ this.dataObj);
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            });
            // console.log(this.dataObj2);
        
            this.dataObj2.forEach((data, index) => {
              this.numoftestid = data.length + 1;
              console.log(this.numoftestid);
        
            });
            //
            */
        //subject
        var subjectRef = this.afs.collection("/subjects");
        this.subjectList = subjectRef.valueChanges();
        // this.subjectList.forEach(sub=>{
        //   console.log(sub);
        //   console.log(sub.length)
        //   if(sub.length>0 || !null|| !undefined){
        //     console.log(sub[0]);
        //     this.SelectCategory= sub[0].code;
        //     console.log(this.SelectCategory);
        //     this.onChange(sub[0].code);
        //   }
        // })
    }
    //-------function เมื่อเลือกCatagory select
    TestStep1Component.prototype.onChange = function (code) {
        this.SelectTopic = "";
        this.subCode = code.code;
        console.log(this.subCode);
        var chapterRef = this.afs.collection("/subjects/" + this.subCode + "/chapters/");
        this.chapterList = chapterRef.valueChanges();
        this.array_numOfitem = [];
        // this.choice_type = "";
        // this.array_numOfitem = [];
        // this.arrayTopic_name = [];
        // this.arrayNum_question = [];
        // this.display_arr_choice_type = [];
        // this.arrayquestion_id = [];
        // this.SelectTopic = "";
        // this.ADDarrayKey_cate = this.arrayKey_cate[index];
        // console.log(this.arrayKey_cate[index]);
        // this.arrayVal_cate[index].topic_id.forEach(item => {
        //   let path = 'Topics/' + item;
        //   // let tmp = this.db.list(path);
        //   let ref = this.db.database.ref(path).on("child_added", (snapshotChanges) => {
        //     if (snapshotChanges.key == "topic_name") {
        //       this.arrayTopic_name.push(snapshotChanges);
        //       // console.log(this.arrayTopic_name);  
        //     }
        //     else if (snapshotChanges.key == "num_question") {
        //       this.arrayNum_question.push(snapshotChanges);
        //     }
        //     else if (snapshotChanges.key == "choice_type") {
        //       this.choice_type = snapshotChanges.val();
        //       console.log(snapshotChanges.val());
        //       switch (this.choice_type) {
        //         case 1: {
        //           this.display_choice_type = "คำตอบสั้น";
        //           break;
        //         }
        //         case 2: {
        //           this.display_choice_type = "2 ตัวเลือก";
        //           break;
        //         }
        //         case 3: {
        //           this.display_choice_type = "3 ตัวเลือก";
        //           break;
        //         }
        //         case 4: {
        //           this.display_choice_type = "4 ตัวเลือก";
        //           break;
        //         }
        //       }
        //       console.log(this.display_choice_type);
        //       this.display_arr_choice_type.push(this.display_choice_type);
        //     }
        //     else if (snapshotChanges.key == "question_id") {
        //       this.arrayquestion_id.push(snapshotChanges);
        //     }
        //   });
        // });
    };
    //-------function เมื่อเลือก Chapter select แล้วแสดงส่วนของ Number of items
    TestStep1Component.prototype.numQuestion = function (chCode) {
        var _this = this;
        // console.log(chCode);
        // console.log(chCode.code);
        this.chapterCode = chCode.code;
        // console.log(chCode.name);
        var questionPath = chCode.questions.path;
        // console.log(questionPath);
        var questionDoc = this.afs.doc("" + questionPath);
        var questions = questionDoc.valueChanges();
        questions.forEach(function (data) {
            // console.log(data);
            _this.questionData = data;
            _this.amount = data.amount;
            console.log("typeeee" + data.type);
            _this.question_type = data.type;
            ///////////////////////////////////////////////////////////มันผิด
            // console.log(data);
            console.log(data.question);
            // console.log(Object.values(data.question));
            _this.questionAllList = Object.values(data.question);
            //  console.log(data.question[2]);
            // this.questionAllList = Object.values(data.question)   // มันเอามาแต่ value ไม่เอา key มา obj to array ex.:{0: {…}, 1: {…}, 2: {…}, 3: {…}, 4: {…}} => [{…}, {…}, {…}, {…}, {…}]
            console.log(_this.questionAllList);
            _this.amountList = [];
            for (var i = 1; i <= _this.amount; i++) {
                _this.array_numOfitem.push(i);
            }
        });
    };
    TestStep1Component.prototype.StartSelectTest = function (data) {
        var _this = this;
        if (this.SelectCategory == "" || this.SelectTopic == undefined || this.InputDescription == undefined || this.InputDescription == "") {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please enter all fields.',
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                title: 'Are you sure?',
                text: "go to the next step",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, to go!'
            }).then(function (result) {
                if (result.value) {
                    _this.questionTmp = [];
                    console.log(_this.SelectNumofItem);
                    if (_this.SelectNumofItem == "" || _this.SelectNumofItem == undefined) {
                        _this.NumOfItemThis = 1;
                    }
                    else {
                        _this.NumOfItemThis = _this.SelectNumofItem;
                    }
                    if (_this.NumOfItemThis == _this.amount) {
                        _this.questionTmp = _this.questionAllList;
                        console.log(_this.questionTmp);
                    }
                    else {
                        var rand = -1;
                        var i = 0;
                        _this.questionTmp = [];
                        while (i < _this.NumOfItemThis) {
                            // rand = Math.floor(Math.random() * this.numOfitem);
                            while (_this.questionAllList[rand] == 0 || _this.questionAllList[rand] == undefined) {
                                // Math.floor(Math.random() *  max);
                                rand = Math.floor(Math.random() * _this.amount);
                                //  console.log("random: " + rand);
                            }
                            // console.log("this " + this.questionAllList[rand]);
                            // console.log("rand " + rand);
                            _this.questionTmp.push(_this.questionAllList[rand]);
                            console.log(_this.questionTmp);
                            _this.questionAllList[rand] = 0;
                            i++;
                        }
                    }
                    //make type string to number
                    var numOfItemThis_num = +_this.NumOfItemThis;
                    //ต้องการ pack เพื่อส่งในใช้ใน test stap อื่นได้
                    var arrayTest1pack = [];
                    arrayTest1pack.push(_this.SelectCategory, _this.SelectTopic, numOfItemThis_num, _this.InputDescription, _this.questionTmp, _this.question_type);
                    console.log(arrayTest1pack);
                    _this.firebaseService.arrayTest1 = arrayTest1pack; //โดยขึ้นไปใน service เพื่อให้ใช้ได้ทุก component
                    //clear
                    _this.chapterList = null;
                    _this.questionTmp = [];
                    _this.array_numOfitem = [];
                    _this.SelectThisCategory = [];
                    _this.SelectCategory = "";
                    _this.SelectTopic = undefined;
                    _this.SelectNumofItem = "";
                    _this.InputDescription = "";
                    // /dashboard/test/test-step2
                    _this.router.navigate(['dashboard', 'test', 'test-step2']);
                }
            });
        }
    };
    TestStep1Component.prototype.clearTest1 = function () {
        var _this = this;
        // alert("clear");
        __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
            title: 'Are you sure?',
            text: "clear this form!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!'
        }).then(function (result) {
            if (result.value) {
                _this.chapterList = null;
                _this.questionTmp = [];
                _this.array_numOfitem = [];
                _this.SelectThisCategory = [];
                _this.SelectCategory = "";
                _this.SelectTopic = undefined;
                _this.SelectNumofItem = "";
                _this.InputDescription = "";
                __WEBPACK_IMPORTED_MODULE_5_sweetalert2___default()({
                    type: 'success',
                    title: 'cleared',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };
    TestStep1Component.prototype.ngOnInit = function () { };
    TestStep1Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-test-step1',
            template: __webpack_require__("../../../../../src/app/test-step1/test-step1.component.html"),
            styles: [__webpack_require__("../../../../../src/app/test-step1/test-step1.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* Router */]])
    ], TestStep1Component);
    return TestStep1Component;
}());



/***/ }),

/***/ "../../../../../src/app/test-step2/test-step2.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".item {\r\n  background-color: antiquewhite;\r\n  padding: 10px;\r\n}\r\n\r\ntd {\r\n  background-color: antiquewhite;\r\n  border-bottom: 20px solid white;\r\n}\r\n\r\n.item:hover {\r\n  background-color: #ffd1b3;\r\n}\r\n\r\n.display_question_item {\r\n  margin-top: 20px;\r\n  margin-left: 30px;\r\n}\r\n\r\n.buttonForm {\r\n  text-align: center\r\n}\r\n\r\n.bntAdd {\r\n  width: 20%;\r\n  margin: 5px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/test-step2/test-step2.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"table\">\r\n    <!-- <thead class=\"thead\">\r\n          <tr>\r\n              <th>id</th>\r\n              <th>name</th>\r\n              <th>index</th>\r\n              <th></th>\r\n          </tr>\r\n      </thead> -->\r\n    <tbody>\r\n      <tr *ngFor=\"let question_item of question_list_display ;let index = index;let i = index;\" class=\"hoverTable\">\r\n          <td width=\"10px\" align=\"center\"><b> {{i+1}}) </b></td>\r\n        <td>\r\n  \r\n          <!-- tools box -->\r\n          <div class=\"pull-right box-tools\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"moveUp(question_item, index);\">\r\n              <i class=\"fa fa-arrow-up\"></i>\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"moveDown(question_item, index);\">\r\n              <i class=\"fa fa-arrow-down\"></i>\r\n            </button>\r\n          </div>\r\n          <!-- content question -->\r\n          <div class=\"item\"> \r\n            <b>{{question_item.question}} ? </b>\r\n\r\n           <p class=\"display_question_item\" *ngFor=\"let itemChoice of question_item.choice;let i = index\" >\r\n   \r\n               <!-- {{question_item.choice[0]}} -->\r\n              {{i+1}}.  {{itemChoice}}\r\n           </p>\r\n            <!-- <br> name: {{question_item.name}} -->\r\n          </div>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n <!-- button -->\r\n <div class=\"row\">\r\n    <div class=\"col-md-12 \">\r\n      <p class=\"buttonForm\">\r\n        <button type=\"submit\" class=\"btn btn-success bntAdd\"(click)=\"StartSelectQuestion()\">\r\n            <span class=\"\tglyphicon glyphicon-forward\"></span> &nbsp;Next</button>\r\n      </p>\r\n    </div>\r\n  </div>\r\n  <!--  -->\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/test-step2/test-step2.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestStep2Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TestStep2Component = (function () {
    function TestStep2Component(db, firebaseService, router) {
        this.db = db;
        this.firebaseService = firebaseService;
        this.router = router;
        this.Q_answer_index = [];
        this.Q_choice = [];
        this.Q_topic_id = [];
        this.Q_question = [];
        this.tmp = [];
        this.tmpQid = [];
        this.pack_question = [];
        this.question_list_display = [];
        // console.log(this.firebaseService.arrayTest1);
        console.log("______in step 2______");
        this.receiveTest1 = this.firebaseService.arrayTest1;
        console.log(this.receiveTest1);
        console.log(this.receiveTest1[4]);
        this.receiveQuestion = this.receiveTest1[4];
        this.question_list_display = this.receiveQuestion;
    }
    TestStep2Component.prototype.ngOnInit = function () {
    };
    TestStep2Component.prototype.moveUp = function (value, index) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            title: 'Up!',
            showConfirmButton: false,
            timer: 500
        });
        console.log(index);
        console.log(value);
        if (index > 0) {
            console.log("moveUp");
            var tmp = this.question_list_display[index - 1];
            this.question_list_display[index - 1] = this.question_list_display[index];
            this.question_list_display[index] = tmp;
            //update new value index in object
            this.question_list_display[index].i = index;
            this.question_list_display[index - 1].i = index - 1;
            console.log(this.question_list_display);
        }
    };
    TestStep2Component.prototype.moveDown = function (value, index) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            title: 'Down!',
            showConfirmButton: false,
            timer: 500
        });
        console.log(index);
        console.log(this.question_list_display.length);
        if (index < this.question_list_display.length - 1) {
            console.log("moveDown");
            var tmp = this.question_list_display[index + 1];
            this.question_list_display[index + 1] = this.question_list_display[index];
            this.question_list_display[index] = tmp;
            //update new value index in object
            this.question_list_display[index].i = index;
            this.question_list_display[index + 1].i = index + 1;
            console.log(this.question_list_display);
        }
    };
    TestStep2Component.prototype.StartSelectQuestion = function () {
        var _this = this;
        var arrayTest2pack = [];
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()({
            title: 'Are you sure?',
            text: "go to the next step",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, to go!'
        }).then(function (result) {
            if (result.value) {
                _this.question_list_display.forEach(function (element) {
                    console.log(element);
                    arrayTest2pack.push(element);
                });
                // console.log(arrayTest2pack);
                _this.firebaseService.arrayTest2 = arrayTest2pack;
                console.log(_this.firebaseService.arrayTest2);
                _this.router.navigate(['dashboard', 'test', 'test-step3']);
            }
        });
    };
    TestStep2Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-test-step2',
            template: __webpack_require__("../../../../../src/app/test-step2/test-step2.component.html"),
            styles: [__webpack_require__("../../../../../src/app/test-step2/test-step2.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__["a" /* FirebaseService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]])
    ], TestStep2Component);
    return TestStep2Component;
}());



/***/ }),

/***/ "../../../../../src/app/test-step3/test-step3.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selectStd-body {\r\n  margin-top: 10px;\r\n  padding: 20px;\r\n}\r\n\r\n.buttonForm {\r\n  text-align: center\r\n}\r\n\r\n.bntAdd {\r\n  width: 20%;\r\n  margin-left: 5px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/test-step3/test-step3.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- {{now | date :'short'}}  -->\r\n<label for=\"exampleSelect1\">Group select</label>\r\n<select class=\"form-control\" id=\"SelectGroup\" name=\"SelectGroup\" (ngModelChange)=\"onChange($event)\" [(ngModel)]=\"SelectThisGroup\">\r\n  <option value=\"\" [selected]=\"isSelected\" [disabled]=\"true\"> ----Please choose one---- </option>\r\n  <option *ngFor=\"let group of groupList | async  \" [ngValue]= group.name [selected]=\"isSelected\">{{group.name}}</option>\r\n</select>\r\n\r\n <!-- display when no data question to be add -->\r\n <br>\r\n <br>\r\n <ng-container *ngIf=\"!isdataStudent\">\r\n   <div class=\"scores\">\r\n <div class=\"row\" style=\"background-color: white\">\r\n     <div class=\"col-md-12 tableShow\">\r\n       <p style=\"text-align: center\">\r\n         <br>\r\n        --- no data ---    \r\n       </p>\r\n     </div>\r\n   </div>\r\n </div>\r\n </ng-container>\r\n <!--  -->\r\n\r\n<div class=\"selectStd-body\" *ngIf=\"isdataStudent\">\r\n  <table class=\"table table-hover\">\r\n    <thead>\r\n      <tr>\r\n        <th>\r\n          <input type=\"checkbox\" class=\"checkthis\" [(ngModel)]=\"isSelect\" (change)=\"createSelectAll()\" />\r\n          <!-- <input type=\"checkbox\" id=\"checkall\" /> -->\r\n        </th>\r\n        <th scope=\"col\">Student ID</th>\r\n        <th scope=\"col\">Student Name</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let student of studentListAdd\">\r\n\r\n        <td>\r\n          <input type=\"checkbox\" class=\"checkthis\" [(ngModel)]=\"student.selected\" />\r\n        </td>\r\n        <td>{{student.code}}</td>\r\n        <td>{{student.name}}</td>\r\n\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n\r\n<!-- button -->\r\n<div class=\"row\" *ngIf=\"isdataStudent\">\r\n  <div class=\"col-md-12 \">\r\n    <p class=\"buttonForm\">\r\n      <br>\r\n      <br>\r\n      <button type=\"submit\" class=\"btn btn-success bntAdd\" (click)=\"StartSelectStudent()\">\r\n        <span class=\"\tglyphicon glyphicon-forward\"></span> &nbsp;Let Go!</button>\r\n    </p>\r\n  </div>\r\n</div>\r\n<!--  -->"

/***/ }),

/***/ "../../../../../src/app/test-step3/test-step3.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestStep3Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__("../../../../../src/app/services/firebase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
// import { FirebaseService } from '../services/firebase.service';
// import { Observable } from 'rxjs/Observable';
//new






// import { Router } from '@angular/router';
var TestStep3Component = (function () {
    function TestStep3Component(router, afs, db, firebaseService) {
        this.router = router;
        this.afs = afs;
        this.db = db;
        this.firebaseService = firebaseService;
        this.SelectThisGroup = [];
        this.arrayVal_Group = []; //array ของชื่อกลุ่มที่นำไปแสดง
        this.arrayKey_Group = []; //array ของ key ของกลุ่มที่แสดง
        this.arrayStudent_id = [];
        this.arrayStudent_name = [];
        this.std_list_display = [];
        this.studentListAdd = [];
        this.isdataStudent = false;
        this.student_ans = {};
        this.isdataStudent = false;
        console.log("_____________step 3____________");
        console.log(this.firebaseService.arrayTest1);
        console.log(this.firebaseService.arrayTest2);
        this.receiveTest1 = this.firebaseService.arrayTest1;
        this.receiveTest2 = this.firebaseService.arrayTest2;
        //section or group
        var sectionRef = this.afs.collection("/sections");
        this.groupList = sectionRef.valueChanges();
        // console.log(this.receiveTest1[0].code);
        this.subject_code = this.receiveTest1[0].code;
        this.chapter_code = this.receiveTest1[1].code;
    }
    TestStep3Component.prototype.onChange = function (name) {
        var _this = this;
        this.isdataStudent = true;
        this.preAddStudentDialog();
        console.log(name);
        // this.studentCollection = this.afs.collection<Student>('/students', ref => ref.orderBy('code'));
        this.sectionRefLocal = this.afs.doc("/sections/" + name);
        this.sectionObservable = this.sectionRefLocal.valueChanges();
        // Extract Ref to Student Object 
        this.sectionObservable.forEach(function (section) {
            // console.log(section.members);
            section.members.forEach(function (student) {
                // console.log(student.path)   //students/570510637
                _this.studentListLocal = _this.afs.doc("" + student.path);
                _this.studentsObservable = _this.studentListLocal.valueChanges();
                _this.studentsObservable.forEach(function (d) {
                    _this.studentListAdd.push(d);
                    // console.log(d);
                    // console.log(this.studentListAdd);
                });
            });
        });
    };
    TestStep3Component.prototype.preAddStudentDialog = function () {
        this.studentListAdd = [];
        this.isSelect = false;
        this.studentListAdd = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](this.studentListAdd, function (student) {
            student.selected = false;
            return student;
        });
    };
    TestStep3Component.prototype.createSelectAll = function () {
        var _this = this;
        this.studentListAdd = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](this.studentListAdd, function (student) {
            student.selected = _this.isSelect;
            // console.log(student.code);
            return student;
        });
    };
    TestStep3Component.prototype.StartSelectStudent = function () {
        var _this = this;
        var arrayTest3pack = [];
        var arrayTest3pack2 = [];
        //---หา คนใน studentListAdd ที่ selected โดยที่ถ้า selected จะ return true
        var selectStudent = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](this.studentListAdd, function (student) {
            // console.log(student.selected);
            return student.selected;
        });
        console.log(selectStudent.length);
        if (selectStudent.length == 0) {
            __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
                type: 'error',
                title: 'Unsuccessful',
                text: 'Please select students.',
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default()({
                title: 'Are you sure?',
                text: "go to the Quiz",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, to go!'
            }).then(function (result) {
                if (result.value) {
                    console.log(selectStudent);
                    //set timestamp
                    _this.now = Date.now();
                    console.log(_this.now); // shows current timestamp
                    //set exam code 
                    _this.subject_code = _this.receiveTest1[0].code;
                    _this.chapter_code = _this.receiveTest1[1].code;
                    _this.exam_code = _this.subject_code + "_" + _this.chapter_code + "_" + _this.now;
                    console.log(_this.exam_code);
                    _this.firebaseService.Test_id_new = _this.exam_code; //subject_chapter_timestamp : 205100_ch0_1523089877262
                    _this.examData = {
                        amount: _this.receiveTest1[2],
                        chapter_code: _this.receiveTest1[1].code,
                        chapter_name: _this.receiveTest1[1].name,
                        current_question: 0,
                        date: _this.now,
                        description: _this.receiveTest1[3],
                        exam_code: _this.exam_code,
                        status: "active",
                        subject_code: _this.receiveTest1[0].code,
                        subject_name: _this.receiveTest1[0].name,
                        type: _this.receiveTest1[5],
                        max: null,
                        min: null,
                        sd: null,
                        average: null
                    };
                    console.log(_this.examData);
                    //---add data detail in exam
                    var examRef = _this.afs.doc("/exam/" + _this.exam_code);
                    examRef.set(_this.examData);
                    //---หา student ที่ selectStudent มีค่าเป็น true
                    __WEBPACK_IMPORTED_MODULE_4_lodash__["forEach"](selectStudent, function (student) {
                        // console.log(student.code, student.name, student.url);
                        _this.studentExam = {
                            code: student.code,
                            name: student.name,
                            score: 0,
                            url: student.url
                        };
                        console.log(_this.studentExam);
                        //---add students in exam
                        var StudentExamRef = _this.afs.doc("/exam/" + _this.exam_code + "/students/" + student.code);
                        StudentExamRef.set(_this.studentExam);
                        arrayTest3pack.push(_this.studentExam);
                        //---add students code in answers
                        // this.question_obj[student.code] = null;
                        _this.student_ans[student.code] = {};
                        var AnswersRef = _this.afs.doc("/answers/" + _this.exam_code + "/");
                        AnswersRef.set(_this.student_ans);
                    });
                    console.log(arrayTest3pack);
                    _this.receiveTest2.forEach(function (question, index) {
                        console.log(question, index);
                        _this.questionExam = {
                            answer: question.answer,
                            choice: question.choice,
                            // code: question.key,
                            code: question.code,
                            indax: index,
                            question: question.question,
                            status: false
                        };
                        console.log(_this.questionExam);
                        //---add questions in exam
                        var QuestionExamRef = _this.afs.doc("/exam/" + _this.exam_code + "/questions/" + question.code);
                        QuestionExamRef.set(_this.questionExam);
                        arrayTest3pack2.push(_this.questionExam);
                    });
                    _this.firebaseService.arrayTest3 = arrayTest3pack;
                    console.log(arrayTest3pack);
                    _this.firebaseService.arrayTest3_2 = arrayTest3pack2;
                    console.log(arrayTest3pack2);
                    _this.router.navigate(['dashboard', 'test', 'quiz']);
                }
            });
        }
    };
    TestStep3Component.prototype.ngOnInit = function () { };
    TestStep3Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-test-step3',
            template: __webpack_require__("../../../../../src/app/test-step3/test-step3.component.html"),
            styles: [__webpack_require__("../../../../../src/app/test-step3/test-step3.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */]])
    ], TestStep3Component);
    return TestStep3Component;
}());



/***/ }),

/***/ "../../../../../src/app/test/test.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".test{\r\n    margin: 30px;  \r\n  }\r\n  .content{\r\n    margin-top: 20px;\r\n    background-color:white;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/test/test.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"test\">\r\n  <div class=\"content\">\r\n          <!--Call Component -->\r\n          <router-outlet></router-outlet>\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/test/test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    TestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-test',
            template: __webpack_require__("../../../../../src/app/test/test.component.html"),
            styles: [__webpack_require__("../../../../../src/app/test/test.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TestComponent);
    return TestComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/environments/firebase.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    apiKey: "AIzaSyCLse5gKEaasVFQ6q1xnIG3HhJYRrKea8s",
    authDomain: "onlinequizproject-cmu57.firebaseapp.com",
    databaseURL: "https://onlinequizproject-cmu57.firebaseio.com",
    projectId: "onlinequizproject-cmu57",
    storageBucket: "onlinequizproject-cmu57.appspot.com",
    messagingSenderId: "77004843076"
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-il": "../../../../moment/locale/en-il.js",
	"./en-il.js": "../../../../moment/locale/en-il.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mn": "../../../../moment/locale/mn.js",
	"./mn.js": "../../../../moment/locale/mn.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./mt": "../../../../moment/locale/mt.js",
	"./mt.js": "../../../../moment/locale/mt.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./tg": "../../../../moment/locale/tg.js",
	"./tg.js": "../../../../moment/locale/tg.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./ug-cn": "../../../../moment/locale/ug-cn.js",
	"./ug-cn.js": "../../../../moment/locale/ug-cn.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map