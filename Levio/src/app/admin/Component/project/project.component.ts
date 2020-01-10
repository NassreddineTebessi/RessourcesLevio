import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/Project";
import {NgxSmartModalService} from "ngx-smart-modal";
import {HttpClient} from "@angular/common/http";
import {Client} from "../../models/Client";
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  projects: Project[] = null;
  clients: Client[] = null;
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private projectService : ProjectService, private http:HttpClient,  public ngxSmartModalService: NgxSmartModalService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(data => { this.projects=data});
    this.projectService.getClients().subscribe(res => { this.clients =res});
  }

  deleteProject(id){
    this.projectService.deleteProject(id).subscribe(data => console.log('ok'));
    this.projectService.getAllProjects().subscribe(data => { this.projects=data});
    this.notifier.show( {
      type: 'success',
      message: 'Project successfully deleted',
      id: 'THAT_NOTIFICATION_ID'
    } );
  }

  project: Project = new Project();
  addProject(p, id){
    this.projectService.addProject(p, id).subscribe(data => console.log('ok'));
    this.projectService.getAllProjects().subscribe(data => { this.projects=data});
    this.notifier.show( {
      type: 'success',
      message: 'Project successfully created',
      id: 'THAT_NOTIFICATION_ID'
    } );
  }

  updateProject(pr){
    this.projectService.updateProject(pr).subscribe(data => console.log('ok'));
    this.notifier.show( {
      type: 'success',
      message: 'Project successfully updated',
      id: 'THAT_NOTIFICATION_ID'
    } );
  }

  updateproject: Project = new Project();
  selectproject(p){
    this.updateproject = p;
  }
}
