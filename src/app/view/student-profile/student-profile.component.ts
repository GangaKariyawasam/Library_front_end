import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {UserService} from "../../service/user.service";
import {CartItem} from "../../model/CartItem";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  cartItems: Array<CartItem> = [];

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.loadAllCartItems('S001');
  }

  loadAllCartItems(userId: string){
    for (let i = 0; i<5; i++ ){
      this.cartItems.push({id: '1',name:'Gamperaliya'
        ,year:1995,author:'Martin Wickramasinghe',image:'testImage'});
    }
  }

  logOut() {
      localStorage.removeItem('token');
  }
}
