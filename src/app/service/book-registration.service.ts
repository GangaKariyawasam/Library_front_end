import { Injectable } from '@angular/core';
import {BookCustom} from "../model/BookCustom";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../model/Supplier";
import {Rack} from "../model/Rack";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {isElementScrolledOutsideView} from "@angular/cdk/overlay/position/scroll-clip";

@Injectable({
  providedIn: 'root'
})
export class BookRegistrationService {

  book!: BookCustom[];
  dataSource = new MatTableDataSource<BookCustom>()
  dropdownList: Array<Supplier> = [];
  selectedItems: Array<Supplier> = [];
  isTakenSupplierName = false;
  dropdownListRack: Array<Rack> = [];
  selectedItemsRack: Array<Rack> = [];
  isTakenRackNo = false;

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    bookId: new FormControl('',[Validators.required]),
    englishName: new FormControl('',[Validators.required]),
    sinhalaName: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.pattern('^[12][0-9]{3}$')]),
    price: new FormControl('',[Validators.pattern('^[0-9]*$')]),
    medium: new FormControl('',[Validators.required]),
    pages: new FormControl('',[Validators.pattern('^[0-9]*$')]),
    note: new FormControl(''),
    image: new FormControl(''),
    author: new FormControl('',[Validators.required]),
    categories: new FormControl('',[Validators.required]),
  })

  get bookRegisterFormControl(){
    return this.form.controls;
  }

  referanceForm: FormGroup = new FormGroup({
    barcode: new FormControl('',[Validators.required]),
    supplier: new FormControl('',[Validators.required]),
    rackNo: new FormControl('',[Validators.required]),
  })

  get bookReferanceFormControl(){
    return this.referanceForm.controls;
  }

  saveSupplier(name: string): Observable<Supplier>{
    const body: Supplier={
      id:0,
      name:name
    }
    return this.http.post<Supplier>(`http:localhost:8080/api/v1/suppliers`,body);
  }

  getAllSupplier(): Observable<Array<Supplier>>{
    return this.http.get<Array<Supplier>>('http:localhost:8080/api/v1/suppliers');
  }

  saveRack(rackNo: string,shellNo: string): Observable<Rack>{
    const body: Rack={
      id:0,
      rackNo: rackNo,
      shellNo: shellNo
    }
    return this.http.post<Rack>('http:localhost:8080/api/v1/Racks',body);
  }

  getAllRack(): Observable<Array<Rack>>{
    return this.http.get<Array<Rack>>('http:localhost:8080/api/v1/Rack');
  }
}
