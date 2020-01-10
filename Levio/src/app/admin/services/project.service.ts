import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/Project";
import 'rxjs/add/operator/map';
import {Client} from "../models/Client";

@Injectable()
export class ProjectService {



  constructor(private http: HttpClient) {
  }

  public getAllProjects() {
    return this.http.get<Project[]>('/map-web/map/project/projects/');
  }

  public deleteProject(projectId){
    return this.http.put<Project>('/map-web/map/project/delete/'+projectId , null);
  }

  public addProject(p, id){
    return this.http.post<Project>('/map-web/map/project/add/'+id, p);
  }

  public updateProject(p){
    return this.http.put<Project>('/map-web/map/project/update/', p);

  }
  public  getClients(){
    return this.http.get<Client[]>('/map-web/map/client/clients/');
  }


}
