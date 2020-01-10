import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ressource} from '../models/Ressource';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Skill} from '../models/Skill';
import {Leave} from '../models/Leave';

@Injectable()
export class RessourceService {

  constructor(private http: HttpClient) {

  }


  getRessources(){

    return this.http.get<Ressource[]>('/map-web/map/ressource');

  }

  getRessourceById(id){


    return this.http.get<Ressource>('/map-web/map/ressource?id=' + id);


  }


  public addRessource(p){
    return this.http.post<Ressource>('/map-web/map/ressource', p);
  }

  public deleteRessource(id){
    return this.http.get<Ressource>('/map-web/map/ressource/archiver/'+ id);
  }

  public updateRessource(id,p){
    return this.http.put<Ressource>('/map-web/map/ressource/'+ id,p);
  }

  public getEvents(id) {

    let data = this.http.get<Leave>('map-web/map/leave/'+id);
    return (data);

  }

  public deleteLeave(id){

    return this.http.delete('map-web/map/leave/delete/'+id);


  }

  public updateLeave(l,id){

    return this.http.put('map-web/map/leave/'+id,l);


  }



  public addSkill(id,s){

    return this.http.post<Skill>('/map-web/map/skill/'+id, s);


  }

  public getSkillsByRessource(id){

    return this.http.get<Skill>('/map-web/map/skill/'+id);


  }


  public removeSkill(id){

    return this.http.delete<Skill>('/map-web/map/skill/'+id);


  }


}
