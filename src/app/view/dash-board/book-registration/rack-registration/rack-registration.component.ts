import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookRegistrationComponent} from "../book-registration.component";
import {BookRegistrationService} from "../../../../service/book-registration.service";
import {ConfigService} from "../../../../service/config.service";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-rack-registration',
  templateUrl: './rack-registration.component.html',
  styleUrls: ['./rack-registration.component.scss']
})
export class RackRegistrationComponent implements OnInit {

  @ViewChild('rackNo')
  rackNo!: ElementRef

  constructor(public bookService: BookRegistrationService
              ,private configService: ConfigService
              ,private bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  saveRack(rackNo: string,shellNo: string) {
    for (const rack of this.bookService.dropdownListRack) {
      if(rackNo === rack.rackNo && shellNo === rack.shellNo){
        this.bookService.isTakenRackNo = true;
        (this.rackNo.nativeElement as HTMLInputElement).focus();
        return;
      }
    }
    this.bookService.saveRack(rackNo,shellNo).subscribe(value => {
      this.bookService.getAllRack().subscribe(value1 => {
        this.bookService.dropdownListRack = value1;
      });
      for (const rack of this.bookService.dropdownListRack) {
        if(rackNo === rack.rackNo && shellNo === rack.shellNo){
          this.bookService.selectedItemsRack.push(rack);
        }
      }
      this.onFormClose();
      this.configService.toastMixin.fire({
        icon: "success",
        title: "Rack Saved"
      });
    },error => {
      this.configService.toastMixin.fire({
        icon: "error",
        title: "Failed to save the rack"
      });
    });
  }

  onFormClose(){
    this.bottomSheetRef.dismiss();
  }
}
