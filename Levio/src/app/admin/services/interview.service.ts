import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../models/JobOffer';
import {Interview} from '../models/Interview';

@Injectable()
export class InterviewService {

  constructor(private http: HttpClient) { }
  addInterview(interview, idApp) {
    return this.http.post<Interview>('/map-web/map/interview/' + idApp, interview);

  }
updateInterview(interview) {
  const job = JSON.stringify(interview);
  // console.log(job);
  return this.http.put<Interview>('/map-web/map/interview/updatedate', interview);

}
}
