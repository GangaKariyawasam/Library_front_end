import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {UserService} from "../../service/user.service";
import {CartItem} from "../../model/CartItem";
import {Student} from "../../model/Student";
import {Router} from "@angular/router";
import {Staff} from "../../model/Staff";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  currentStudentUser!: Student;
  currentStaffUser!: Staff;

  cartItems: Array<CartItem> = [];

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  constructor(public userService: UserService
              ,private router: Router) { }

  ngOnInit(): void {
    this.loadAllCartItems('S001');
    this.getCurrentUser();
  }

  loadAllCartItems(userId: string){
    for (let i = 0; i<5; i++ ){
      this.cartItems.push({id: '1',name:'Gamperaliya'
        ,year:1995,author:'Martin Wickramasinghe',image:'testImage'});
    }
  }

  deleteProfileImage(): void {
    alert('Delete profile image');
  }

  editProfilePhoto(): void {
    alert('Edit profile image');
  }

  logOut() {
      localStorage.removeItem('token');
  }

  getCurrentUser(): void{
    var role = localStorage.getItem('role');
    if(role === 'student'){
      this.userService.getStudentUser().subscribe(value => {
        this.currentStudentUser = value;
      },error => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigateByUrl('/main')
      });
    }else if(role === 'staff'){
      this.userService.getStaffUser().subscribe(value => {
        this.currentStaffUser = value;
      },error => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigateByUrl('/main')
      })
    }
  }
}
