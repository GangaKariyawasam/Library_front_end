import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {StudentService} from '../../../service/student.service';
import {ConfigService} from "../../../service/config.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {GradeService} from "../../../service/grade.service";
import {Grade} from "../../../model/Grade";

@Component({
  selector: 'app-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {

  dropdownList: Array<newGrade> = [];
  selectedItems: Array<newGrade> = [];
  dropdownSettings!:IDropdownSettings;

  constructor(private dialogRef: MatDialogRef<StudentRegistrationComponent>,
              public studentService: StudentService
              ,private config: ConfigService
              ,private gradeService: GradeService) { }

  show = true;
  hide: any = true;
  years: number[] = [];
  selectedYear = new Date().getFullYear();
  selectedSection = 'A';
  sections: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'desc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getAllGrades();
  }

  getAllGrades(): void{
    this.gradeService.getAllGrades().subscribe(value => {
      let grades: Array<newGrade> = [];
      for (const grade of value) {
        var obj = {id: grade.id, desc: grade.grade+' '+grade.section+' '+grade.year}
        grades.push(obj);
      }
      this.dropdownList = grades;
    },error => {
      this.config.toastMixin.fire({
        icon: 'error',
        title: 'Failed to load the grades'
      });
    });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  test(): void {
    alert(this.selectedYear);
  }

  deleteProfileImage(): void {
    alert('Delete profile image');
  }

  editProfilePhoto(): void {
    alert('Edit profile image');
  }

  getSection(): void {
    alert(this.selectedSection);
  }
  onFormClose() {
    this.dialogRef.close();
  }

  submitForm() {
    if(this.studentService.form.valid){
      let studentObj = this.studentService.form.value;
      let newGrades = studentObj.grades;
      let grade:Array<Grade> = [];
      for (const newGrade of newGrades) {
        var split = newGrade.desc.split(" ",3);
        let obj = {id:newGrade.id,grade:+split[0],section:split[1],year:+split[2]}
        grade.push(obj);
      }
      if(studentObj.gender === 'male'){
        studentObj.gender = '0';
      }else {
        studentObj.gender = '1';
      }
      studentObj.grades = grade;
      this.studentService.saveStudent(studentObj).subscribe(value => {
        this.studentService.students.unshift(studentObj);
        this.studentService.students.pop();
        this.studentService.dataSource.data = this.studentService.students;
        this.config.toastMixin.fire({
          icon: 'success',
          title: 'Successfully saved the student'
        });
      },error => {
        this.config.toastMixin.fire({
          icon: 'error',
          title: 'Failed to save the student'
        });
      })
    }
  }
}
export interface newGrade {
  id: number,
  desc: string
}
