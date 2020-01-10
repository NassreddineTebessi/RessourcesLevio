import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../models/Client";
import {Project} from "../models/Project";

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) {

  }

  public getAllClients() {
    return this.http.get<Client[]>('/map-web/map/client/clients/');
  }

  public addClient(c){
    return this.http.post<Client>('/map-web/map/client/', c);
  }

  public deleteClient(id){
    return this.http.put<Project>('/map-web/map/client/delete/'+id , null);
  }

}
