import { Component, OnInit } from '@angular/core';
import {MandatService} from '../../services/mandat.service';
import {Mandat} from '../../models/Mandat';
import {Ressource} from '../../models/Ressource';
import {Project} from '../../models/Project';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-mandats',
  templateUrl: './mandats.component.html',
  styleUrls: ['./mandats.component.css'],
  providers: [MandatService]
})

export class MandatsComponent implements OnInit {
  selectedValue:Project= new Project(); 
  selectedValue2:Ressource= new Ressource(); 
  UselectedValue:Project= new Project(); 
  UselectedValue2:Ressource= new Ressource(); 
  UpdateProjectName: any;
  UpdateResourceName: any;
  Updateid: any;
  cols: any[]; 
  Objetmandat=new Mandat();
  oldmandat=new Mandat();
  Newmandat : Mandat=new Mandat();
  Updatemandat: Mandat=new Mandat();
  mandat: Mandat;
  _mandat :Mandat[]=[];
  projects :Project[];
  mandats :Mandat[];
  project=new Project(); 
  ressource: Ressource;
  ressources: Ressource[];
  constructor( private mandatService: MandatService ,public ngxSmartModalService: NgxSmartModalService ) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.cols = [
      { field: 'StartDate', header: 'Start Date ' },
      { field: 'EndDate', header: 'End Date' },
      { field: 'ProjectName', header: 'Project Name' },
      { field: 'RessourceName', header: 'Ressource Name' },
      { field: 'Action', header: 'Action' }
  ];
    this.mandat = new Mandat();

     
    this.getAlMandate();

    this.mandatService.getProjects().subscribe(data =>this.projects=data);
    this.mandatService.getResources().subscribe(data =>this.ressources=data);


   
  }
getAlMandate()
{
  this._mandat=[];
  this.mandatService.getAll().subscribe(data => {

    for (let key in data){
      this.mandat=data[key];
      this._mandat.push(this.mandat);
    //  console.log(data[key]);
    }
  //  console.log(this._mandat) 
  }
);
}

  addMandat(projtid,resid,sdate,edate) { 
    console.log(projtid,resid,sdate,edate);
    this.mandatService.addMandat(projtid,resid,sdate,edate).subscribe(data => console.log('ok'));
   this.Objetmandat.startDate=sdate;
    this.Objetmandat.endDate=edate;
   this.mandatService.getProject(projtid).subscribe(data =>this.Objetmandat.project=data);
   this.mandatService.getResource(resid).subscribe(data =>this.Objetmandat.ressource=data);
    
    this._mandat.push(this.Objetmandat);



  }
  deleteMandate(id,m)
  {
    this.mandatService.deleteMandat(id).subscribe(data => console.log('deleted'));
    this._mandat.splice(this._mandat.indexOf(m),1);
  }

  
  public updatepopup(m)
  {
    this.Updatemandat=m;
    this.Updateid=m.id;
    this.UpdateProjectName=m.project.name;
    this.UpdateResourceName=m.ressource.first_name+' '+m.ressource.last_name;
    this.ngxSmartModalService.getModal('myModal2').open() 
  }

  updateMandats(id,projtid,resid,sdate,edate)
  {
  
    this.mandatService.updateMandat(id,projtid,resid,sdate,edate).subscribe(data=>  console.log('updated'));
    this.getAlMandate();
     /*this.oldmandat = this._mandat.find(x => x.id==this.Updateid);
     const index = this._mandat.indexOf(this.oldmandat);

    this.mandatService.GetMandatById(this.Updateid).subscribe(data=>this.Newmandat=data);
    

    console.log(this.Newmandat);
    this._mandat[index] = this.Updatemandat;*/
    this.ngxSmartModalService.getModal('myModal2').close() ;
  }
  onchangeProject(event: any)
  {
   console.log(this.selectedValue); 
  }
}
