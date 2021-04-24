import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Student} from "../model/Student";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students!: Student[];
  dataSource = new MatTableDataSource<Student>();

  constructor(private http:HttpClient) { }

  form: FormGroup = new FormGroup({
    regNo: new FormControl('',[Validators.required,Validators.minLength(3)]),
    initial: new FormControl(''),
    fname: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
    lname: new FormControl('',[Validators.minLength(3)]),
    guardianName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z][a-zA-z]+')]),
    streetNo: new FormControl(''),
    firstStreet: new FormControl('',[Validators.required,Validators.minLength(3)]),
    secondStreet: new FormControl('',[Validators.required,Validators.minLength(3)]),
    town: new FormControl('',[Validators.minLength(3)]),
    gender: new FormControl('male',[Validators.required]),
    contact: new FormControl('',[Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^0[1-9][0-9]{8}$')]),
    active: new FormControl(true,[Validators.required]),
    role: new FormControl('STUDENT',[Validators.required]),
    grades: new FormControl([],[Validators.required]),
    image: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      regNo: '',
      initial: '',
      fname: '',
      lname: '',
      guardianName: '',
      streetNo: '',
      firstStreet: '',
      secondStreet: '',
      town: '',
      gender: 'male',
      contact: '',
      active: true,
      role: 'STUDENT',
      grades: [],
      image: ''
    });
    this.form.controls['regNo'].enable();
    this.form.controls['active'].disable();
  }

  populateForm(student: Student){
    this.form.setValue({
      regNo: student.regNo,
      initial: student.initial,
      fname: student.fname,
      lname: student.lname,
      guardianName: student.guardianName,
      streetNo: student.streetNo,
      firstStreet: student.firstStreet,
      secondStreet: student.secondStreet,
      town: student.town,
      gender: student.gender.toLowerCase(),
      contact: student.contact,
      active: student.active,
      role: 'STUDENT',
      grades: student.grades,
      image: student.image
    });
    this.form.controls['regNo'].disable();
    this.form.controls['active'].enable();
  }
  get registerFormControl(){
    return this.form.controls;
  }

  getAllStudents(pageIndex: number, pageSize:number): Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`http://localhost:8080/api/v1/students`,{
       params: new HttpParams()
           .set('size',pageSize.toString())
           .set('page',pageIndex.toString())
           .set('sort','createdAt,desc')
    });
  }

  countAllStudents():Observable<number>{
    return this.http.get<number>(`http://localhost:8080/api/v1/students/count/All`);
  }

  saveStudent(student: Student):Observable<Student>{
    return this.http.post<Student>(`http://localhost:8080/api/v1/students`,student);
  }
}
