import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DashboardService {
  url = 'http://localhost:18080';
  constructor(private http: HttpClient ) { }
  getSkills() {
    return this.http.get(this.url+'/map-web/map/dashboard/skills');
  }
  getMostProfitProject() {
    return this.http.get(this.url+'/map-web/map/dashboard/mostprofitproject');
  }
  getMostProfitClient() {
    return this.http.get(this.url+'/map-web/map/dashboard/mostprofitclient');
  }
  getNumResMandates() {
    return this.http.get(this.url+'/map-web/map/dashboard/numresmandates');
  }
  getNumResInterMandate() {
    return this.http.get(this.url+'/map-web/map/dashboard/getnumempintermand');
  }
  getNumResAdmin() {
    return this.http.get(this.url+'/map-web/map/dashboard/getnumempadmin');
  }
  getNumResLevio() {
    return this.http.get(this.url+'/map-web/map/dashboard/numemployees');
  }
  getNumResFreelance() {
    return this.http.get(this.url+'/map-web/map/dashboard/numfreelancers');
  }
  getNumReclamations() {
    return this.http.get(this.url+'/map-web/map/dashboard/reclamations');
  }
  getNumSatisfactions() {
    return this.http.get(this.url+'/map-web/map/dashboard/satisfactions');
  }
  getSatisfactionRate() {
    return this.http.get(this.url+'/map-web/map/dashboard/satisfactionrate');
  }
  getResources() {
    return this.http.get(this.url+'/map-web/map/ressource');
  }
  getProjects() {
    return this.http.get(this.url+'/map-web/map/project/projects');
  }
  getMandates() {
    return this.http.get(this.url+'/map-web/map/mandate');
  }
  getReport(resourceId) {
    return this.http.get(this.url+'/map-web/map/dashboard/report/'+resourceId);
  }
  getResourceById(resourceId) {
    return this.http.get(this.url+'/map-web/map/ressource?id='+resourceId);
  }
  getResourceEff(resourceId) {
    return this.http.get(this.url+'/map-web/map/dashboard/reseff/'+resourceId);
  }
  getProjectEff(projectId) {
    return this.http.get(this.url+'/map-web/map/dashboard/projecteff/'+projectId);
  }
  getProfitPerMonth(month) {
    return this.http.get('http://localhost:20664/Stat/getProfitPerMonth?month='+month);
  }
}

