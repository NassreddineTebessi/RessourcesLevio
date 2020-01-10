import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../models/JobOffer';
import {Question} from '../models/Question';

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }
  getAllQuestion() {
    return this.http.get<Question[]>('/map-web/map/question/getallquestion');

  }
  addQuestion(question) {
    return this.http.post<Question>('/map-web/map/question', question);

  }

}
