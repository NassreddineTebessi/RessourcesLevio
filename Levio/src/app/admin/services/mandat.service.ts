import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Mandat } from '../models/Mandat';
import { Project } from '../models/Project';
import { Ressource } from '../models/Ressource';
import { Observable } from 'rxjs';



@Injectable()
export class MandatService {


  constructor(private http: HttpClient) { }
  getAll() {
     return this.http.get<Mandat[]>('/map-web/map/mandate');
  }
 
  GetMandatById(id: number) {
    return this.http.get<Mandat>('/map-web/map/mandate/mand?id=' + id);
  }
  public addMandat(projtid,resid,sdate,edate){
 //   let data = {projtid: projtid,resid: resid,sdate: sdate,edate: edate};
  let params = new HttpParams();
    params = params.append('projtid', projtid);
    params = params.append('resid', resid);
    params = params.append('sdate', sdate);
    params = params.append('edate', edate);
   
   // return this.http.post<Mandat>('/map-web/map/mandate/assignation', {params});
   let url='/map-web/map/mandate/assignation?projtid='+projtid+'&resid='+resid+'&sdate='+sdate+'&edate='+edate;
    return this.http.post<Mandat>(url,{params});
  }
  public getProject(id){
    return this.http.get<Project>('/map-web/map/mandate/project?id='+ id);
  }
  public getResource(id){
    return this.http.get<Ressource>('/map-web/map/mandate/resource?id='+ id);
  }
  public deleteMandat(id){
    return this.http.post<any>('/map-web/map/mandate/delete?mandateid='+ id,id);
  }

  public updateMandat(id,projtid,resid,sdate,edate){
     
    let url='/map-web/map/mandate/edits?id='+id+'&project='+projtid+'&resource='+resid+'&startdate='+sdate+'&enddate='+edate;
    return this.http.put<Mandat>(url,'');
  }

  getProjects() {
    return this.http.get<Project[]>("/map-web/map/mandate/listproject");
 } 
 getResources() {
  return this.http.get<Ressource[]>("/map-web/map/mandate/listresource");
}

}
