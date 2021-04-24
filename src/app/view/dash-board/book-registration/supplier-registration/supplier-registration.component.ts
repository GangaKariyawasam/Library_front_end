import { Component, OnInit } from '@angular/core';
import {BookRegistrationService} from "../../../../service/book-registration.service";
import {Supplier} from "../../../../model/Supplier";
import {ConfigService} from "../../../../service/config.service";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.scss']
})
export class SupplierRegistrationComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef,
              public bookRegistrationService: BookRegistrationService
              ,private configService: ConfigService) { }

  ngOnInit(): void {
  }

  onFormClose(){
    this.bottomSheetRef.dismiss();
  }
  saveSupplier(name: string) {
    if (name!==''){
      for (const supplier of this.bookRegistrationService.dropdownList){
        if (supplier.name=== name){
          this.bookRegistrationService.isTakenSupplierName=true;
          return
        }
      }

    this.bookRegistrationService.saveSupplier(name).subscribe(value => {
      this.bookRegistrationService.getAllSupplier().subscribe(value1 => {
        this.bookRegistrationService.dropdownList = value1;
        let selectSupplier: Array<Supplier> = [];
        for (const supplier of value1){
          if(supplier.name === name){
            selectSupplier.push(supplier);
            this.bookRegistrationService.selectedItems =selectSupplier;
          }
        }
      },error => {
        this.configService.toastMixin.fire({
          icon: 'error',
          title: 'Supplier added,but failed to load'
        });
      });
      this.configService.toastMixin.fire({
        icon: 'success',
        title: 'supplier added'
      });
      this.onFormClose();
    },error => {
      this.configService.toastMixin.fire({
        icon: 'error',
        title: 'Failed to save supplier'
      });
    });
    }
  }
}
