import { Component, OnInit } from '@angular/core';
import {BookRegistrationComponent} from "../book-registration.component";
import {BookRegistrationService} from "../../../../service/book-registration.service";

@Component({
  selector: 'app-rack-registration',
  templateUrl: './rack-registration.component.html',
  styleUrls: ['./rack-registration.component.scss']
})
export class RackRegistrationComponent implements OnInit {

  constructor(public bookregistration: BookRegistrationService) { }

  ngOnInit(): void {
  }

}
