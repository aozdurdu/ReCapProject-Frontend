import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

import { FakeCard } from '../models/fakeCard';

@Injectable({
  providedIn: 'root'
})
export class FakecardService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:44334/api/fakecards/';

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "iscardexist"
    console.log("Card Exists")
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard:FakeCard){
    let newPath = this.apiUrl + "update"
    this.httpClient.put(newPath,fakeCard)
  }
}