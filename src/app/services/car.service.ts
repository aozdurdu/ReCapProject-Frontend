import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44334/api/cars/";

  constructor(private httpClient:HttpClient) { }

  getAllCarDetails():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "getallcardetails"
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrand(brandId:number){
    let newPath = this.apiUrl + "getcarsdetailsbybrand?brandId=" + brandId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
      
  }

  getCarDetailsByColor(colorId:number){
    let newPath = this.apiUrl + "getcarsdetailsbybrand?brandId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(brandId:number, colorId:number){
    let newPath = this.apiUrl + "getcarsdetails?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(carId:number){
    let newPath = this.apiUrl + "getcardetailsbycarid?carid=" + carId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }
}