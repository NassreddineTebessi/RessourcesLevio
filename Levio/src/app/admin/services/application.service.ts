import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../models/JobOffer';
import {Application} from '../models/Application';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {

  constructor(private http: HttpClient) { }
  getAllApplication() {
    return this.http.get<Application[]>('/map-web/map/application/getallapplication/');

  }
  getApplication(id) {
    return this.http.get<Application>('/map-web/map/application/getapplication?idapplication=' + id);

  }
  setStateApplication(id, state) {
    return this.http.get<object>('/map-web/map/application/state/' + id + '/' + state).map(res => res);
  }
}
