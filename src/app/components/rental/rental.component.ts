import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental;
  car:CarDetail;
  startDate:Date;
  endDate:Date;
  rentPrice:number = 0;
  rentable:Boolean = false;

  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
      }
    })
  }
  getCarDetail(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  addRental(){
    if(this.rentable){
      this.rentals = this.rentals;
      console.log(this.rentals)
      this.router.navigate(['/creditcard/', JSON.stringify(this.rentals)]);
      this.toastrService.info("Forwarding payment page...")
    }else{
      this.toastrService.error("Already occupied")
    }
  }

  setRentable(){
    this.rentalService.isRentable(this.rentals).subscribe(response=>{
      this.rentable = response.success
    })
  }

  calculatePrice(){
    if(this.startDate && this.endDate){
      let endDate = new Date(this.endDate.toString())
      let startDate = new Date(this.startDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.carDailyPrice
      if (result>0){
        this.rentals = {carId:this.car.carId,rentStartDate:this.startDate,rentEndDate:this.endDate,totalRentPrice:result};
        console.log(result)
        this.rentPrice = result
        this.setRentable()
      }else{
        this.rentPrice = 0
        this.toastrService.info("Not possible for these date.")
      }
    }
    else{
      this.rentPrice = 0
      this.toastrService.info("Not possible for these date.")
    }
  }


}  