import { Time } from "@angular/common";

export interface Rental{
    rentalId?:number,
    carId:number,
    customerId?:string,
    brandName?:string,
    colorName?:string,
    firstName?:string,
    lastName?:string,
    companyName?:string,
    carModelYear?:number,
    carDailyPrice?:number,
    carDescription?:string,
    rentDate?:Date,
    returnDate?:Date
    rentStartDate:Date,
    rentEndDate:Date,
    totalRentPrice:number
}