import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../models/JobOffer';
import {Letter} from '../models/Letter';

@Injectable()
export class LetterService {

  constructor(private http: HttpClient) { }
  addLetter(letter, id) {
    return this.http.post<Letter>('/map-web/map/letter/setletteradmin/' + id, letter);

  }
}
