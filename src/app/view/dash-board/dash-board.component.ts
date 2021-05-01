import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {Staff} from "../../model/Staff";
import {CartItem} from "../../model/CartItem";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {StepperComponent} from "./stepper/stepper.component";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  currentUser!: Staff;
  currentMenu!: string

  cartItems: Array<CartItem> = [];

  constructor(private dialog: MatDialog,
              public userService: UserService
              ,private router: Router) { }

  ngOnInit(): void {
    this.userService.getAdminUser().subscribe(value => {
      this.currentUser= value;
    },error => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigateByUrl('/main')
    });

    this.loadAllCartItems('S001');
  }

  loadAllCartItems(userId: string){
    for (let i = 0; i<5; i++ ){
      this.cartItems.push({id: '1',name:'Gamperaliya'
        ,year:1995,author:'Martin Wickramasinghe',image:'testImage'});
    }
  }


  openStepper() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(StepperComponent)
  }
}
