import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImage.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-carDetail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages: CarImage[] = [];
  carImagePaths: string[] = [];
  car: CarDetail;
  dataLoaded = false;
  imageUrl = "https://localhost:44334/";
  constructor(private carService: CarService,
    private carImageService: CarImageService, 
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }
    })

    this.setCarouselConfigs();
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImages(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}