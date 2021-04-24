import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {StudentRegistrationComponent} from '../student-registration/student-registration.component';
import {Student} from '../../../model/Student'
import {StudentService} from "../../../service/student.service";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['RegNo', 'Image', 'Name', 'Gender', 'Grade', 'Address', 'Contact'];

  pageIndex: number = 0;
  pageSize: number = 10;
  studentCount = 0;
  selectedStudent!: Student;
  selectedRow!: string;
  isFloatingButtonClicked = false;
  buttonCount = 0;

  constructor(private dialog: MatDialog
              ,public studentService: StudentService
              ,private config: ConfigService) { }

  ngOnInit(): void {

    this.getAllStudent(this.pageIndex,this.pageSize);
    this.countAllStudents();
  }

  getAllStudent(pageIndex: number, pageSize:number): void{
    this.studentService.getAllStudents(pageIndex,pageSize).subscribe(value => {
      this.studentService.students = value;
      this.studentService.dataSource.data = value;
    }, error => {
      this.config.toastMixin.fire({
        icon: 'error',
        title: 'Cannot load the students'
      });
    });
  }

  countAllStudents(): void{
    this.studentService.countAllStudents().subscribe(value => {
      this.studentCount = value;
    },error => {
      this.config.toastMixin.fire({
        icon: 'error',
        title: 'Cannot load the students'
      });
    });
  }

  applyFilterByRegisterNumber(event: Event) {
   /* const filterValue = (event.target as HTMLInputElement).value;
    this.students.length = 0;
    for (const student of this.students) {
      if(student.regNo.trim().toLowerCase().includes(filterValue.trim().toLowerCase())){
        showStudents.push(student);
      }
    }
    this.studentCount = showStudents.length;
    this.dataSource = new MatTableDataSource<Student>(showStudents);*/
  }

  applyFilterByStudentName(event: Event) {
    /*const filterValue = (event.target as HTMLInputElement).value;
    showStudents.length = 0;
    for (const student of allStudents) {
      if(student.initial.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) ||
          student.fname.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) ||
          student.lname.trim().toLowerCase().includes(filterValue.trim().toLowerCase())){
        showStudents.push(student);
      }
    }
    this.dataSource = new MatTableDataSource<Student>(showStudents);*/
  }

  openRegisterForm(){
    this.studentService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(StudentRegistrationComponent,dialogConfig);
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllStudent(this.pageIndex,this.pageSize);
    this.studentService.dataSource = new MatTableDataSource<Student>(this.studentService.students);
  }

  getSelectedStudent(student: Student): void{
    this.selectedStudent = student;
    this.selectedRow = student.regNo;
  }

  floatingIconClick() {
    this.isFloatingButtonClicked = true
    if(this.buttonCount == 0){
      this.buttonCount = 1;
    }else {
      this.buttonCount = 0;
    }
  }

  deleteRow() {
    alert('Delete '+this.selectedStudent.regNo);
  }

  editRow() {
    this.studentService.populateForm(this.selectedStudent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(StudentRegistrationComponent,dialogConfig);
  }

  addRow() {
    this.openRegisterForm();
  }

}
