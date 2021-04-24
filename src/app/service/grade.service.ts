import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../model/Grade";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http:HttpClient) { }

  getAllGrades(): Observable<Array<Grade>>{
    return this.http.get<Array<Grade>>(`http://localhost:8080/api/v1/grades`);
  }
}
