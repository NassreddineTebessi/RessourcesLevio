import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../models/JobOffer';
import {Test} from '../models/Test';

@Injectable()
export class TestService {

  constructor(private http: HttpClient) { }
  getAllTest() {
    return this.http.get<Test[]>('/map-web/map/test/getalltest');

  }
  AddTest(test) {
    return this.http.post<Test>('/map-web/map/test', test);

  }
  assignTest(idApp, idTest) {
return this.http.get<string>('/map-web/map/test/assigntest/' + idApp + '/' + idTest);
  }
}
