import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {Chart} from 'chart.js';
import { NotifierService } from 'angular-notifier';
import {NgCircleProgressModule} from 'ng-circle-progress';
// import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  searchWord;
  searchWord2;
  listSkills: Object;
  mostProfitProject: Object;
  mostProfitClient: Object;
  numresmandate: Object;
  numresintermandate: Object;
  numresadmin: Object;
  numreslevio: Object;
  numresfreelance: Object;
  reclamations: Object;
  satisfactions: Object;
  satisfactionRate: Object;
  listresources: Object;
  listprojects: Object;
  listmandates = [];
  skillslabels = [];
  skillsvalues = [];
  skills = [];
  profitProjects = [];
  profitClients = [];
  projectLabels = [];
  projectValues = [];
  clientLabels = [];
  clientValues = [];
  mandatesProgress = [];
  mandateLabels = [];
  mandateValues1 = [];
  mandateValues2 = [];
  profileFirstName;
  profileLastName;
  profileContractType;
  profileState;
  profileSateColor;
  profileEffeciency;
  profilePhoto;
  profileId;
  projectEff;
  listProfitPerMonth=[];
  profitPerMonth=[];
  private readonly notifier: NotifierService;

  constructor(private dashboardService: DashboardService , notifierService: NotifierService) {
    this.notifier = notifierService;
    this.searchWord = '';
    this.searchWord2 = '';
    const calls = [];
    for(let i=1;i<=12;i++){
      calls.push(this.dashboardService.getProfitPerMonth(i));
    }
    Observable.forkJoin(calls).subscribe(response => {
     // console.log(response);
      this.listProfitPerMonth=response;
        let ctx5 = document.getElementById('profitPerMonth');
        this.profitPerMonth=new Chart(ctx5, {
          type: 'line',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              data: this.listProfitPerMonth,
              label: "Profit($)",
              borderColor: "#3e95cd",
              fill: "start"
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Profit Per Month in Dollars'
            }
          }
        });
    });
    console.log(this.listProfitPerMonth);
    this.dashboardService.getSkills().subscribe(
      data => {
        this.listSkills = data;
        // @ts-ignore
        for (let x of this.listSkills) {
          this.skillslabels.push(x[0]);
          this.skillsvalues.push(x[1]);
        }
        let ctx = document.getElementById('skills');
        this.skills = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.skillslabels,
            datasets: [{
              data: this.skillsvalues,
              backgroundColor: ['#3366CCCC', '#DC3912CC', '#FF9900CC', '#109618CC', '#990099CC', '#3B3EACCC', '#0099C6CC', '#DD4477CC', '#66AA00CC', '#B82E2ECC', '#316395CC', '#994499CC', '#22AA99CC', '#AAAA11CC', '#6633CCCC', '#E67300CC', '#8B0707CC', '#329262CC', '#5574A6CC', '#3B3EACCC'],
              hoverBackgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
              borderWidth: 1
            }]
          }
        });
      });
    this.dashboardService.getMostProfitProject().subscribe(
      data => {
        this.mostProfitProject = data;
        // @ts-ignore
        for (let x of this.mostProfitProject) {
          this.projectLabels.push(x[0]);
          this.projectValues.push(x[1]);
        }
        let ctx2 = document.getElementById("profitProjects");
        this.profitProjects = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: this.projectLabels,
            datasets: [{
              label: "Profit($)",
              data: this.projectValues,
              backgroundColor: ['#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC', '#3366CCCC'],
              hoverBackgroundColor: ['#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC', '#3366CC'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }

        });
      });
    this.dashboardService.getMostProfitClient().subscribe(
      data => {
        this.mostProfitClient = data;
        // @ts-ignore
        for (let x of this.mostProfitClient) {
          this.clientLabels.push(x[0]);
          this.clientValues.push(x[1]);
        }
        let ctx3 = document.getElementById("profitClients");
        this.profitClients = new Chart(ctx3, {
          type: 'horizontalBar',
          data: {
            labels: this.clientLabels,
            datasets: [{
              label: "# Resources",
              data: this.clientValues,
              backgroundColor: ['#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC', '#DC3912CC'],
              hoverBackgroundColor: ['#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912', '#DC3912'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  fixedStepSize: 1
                }
              }]
            }
          }

        });
      });
    this.dashboardService.getNumResMandates().subscribe(
      data => {
        this.numresmandate = data;
      });
    this.dashboardService.getNumResInterMandate().subscribe(
      data => {
        this.numresintermandate = data;
      });
    this.dashboardService.getNumResAdmin().subscribe(
      data => {
        this.numresadmin = data;
      });
    this.dashboardService.getNumResLevio().subscribe(
      data => {
        this.numreslevio = data;
      });
    this.dashboardService.getNumResFreelance().subscribe(
      data => {
        this.numresfreelance = data;
      });
    this.dashboardService.getNumReclamations().subscribe(
      data => {
        this.reclamations = data;
      });
    this.dashboardService.getNumSatisfactions().subscribe(
      data => {
        this.satisfactions = data;
      });
    this.dashboardService.getSatisfactionRate().subscribe(
      data => {
        if (typeof data === 'number') {
          this.satisfactionRate = Math.round(data);
        }
      });
    this.dashboardService.getResources().subscribe(
      data => {
        this.listresources = data;
      });
    this.dashboardService.getProjects().subscribe(
      data => {
        this.listprojects = data;
      });
    this.dashboardService.getMandates().subscribe(
      data => {
        // @ts-ignore
        this.listmandates = data;
        for (let i = 0; i < this.listmandates.length; i++) {
          this.mandateLabels.push("Mandate " + this.listmandates[i]["id"] + " (" + this.listmandates[i]["project"]["name"] + ")");
          let d1 = new Date(this.listmandates[i]["endDate"]);
          let d2 = new Date(this.listmandates[i]["startDate"]);
          let d3 = new Date(this.listmandates[i]["actualEndDate"]);
          let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          let diffDays = Math.round(Math.abs((d1.getTime() - d2.getTime()) / (oneDay)));
          let diffDays2 = Math.round(Math.abs((d3.getTime() - d2.getTime()) / (oneDay)));
          this.mandateValues1.push(diffDays);
          this.mandateValues2.push(diffDays2);
        }
        let ctx4 = document.getElementById("mandatesProgress");
        this.mandatesProgress = new Chart(ctx4, {
          type: 'bar',
          data: {
            labels: this.mandateLabels,
            datasets: [{
              label: "Expected duration (days)",
              data: this.mandateValues1,
              backgroundColor: ['#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC', '#756d98CC'],
              hoverBackgroundColor: ['#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98', '#756d98'],
              borderWidth: 1
            },
              {
                label: "Actual duration (days)",
                data: this.mandateValues2,
                backgroundColor: ['#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC', '#e4e8f0CC'],
                hoverBackgroundColor: ['#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0', '#e4e8f0'],
                borderWidth: 1
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }

        });
      });

  }

  ngOnInit() {
  }

  public showProfile(res) {
    this.profileId = res.id;
    this.profileFirstName = res.first_name;
    this.profileLastName = res.last_name;
    this.profileContractType = res.contract_type;
    this.profilePhoto = res.photo;
    if (res.state === 'available') {
      this.profileSateColor = '#00a65a';
      this.profileState = 'Available';
    }
    else if (res.state === 'notAvailable') {
      this.profileSateColor = '#f56954';
      this.profileState = 'Not Available';
    }
    else {
      this.profileSateColor = '#f39c12';
      this.profileState = 'Soon Available';
    }
    this.dashboardService.getResourceEff(res.id).subscribe(
      data => {
        if (typeof data === 'number') {
          this.profileEffeciency = Math.round(data) + ' %';
        }
        else {
          this.profileEffeciency = 'Not assigned';
        }
      }
    );
  }

  public generateReport(id) {
    this.dashboardService.getReport(id).subscribe();
    this.notifier.show( {
      type: 'success',
      message: 'Report generated succefully!',
    } );
  }

  public calculateEff(event, id) {
    this.dashboardService.getProjectEff(id).subscribe(
      data => {
        if (typeof data === 'number') {
          this.projectEff = Math.round(data);
        }
      }
    );
    if (typeof this.projectEff === 'undefined') {
      event.currentTarget.parentElement.innerHTML = 'No mandates yet';

    }
    else {
      if (this.projectEff >= 100)
        event.currentTarget.parentElement.innerHTML = '<div style="color: #00a65a;">' + this.projectEff + ' % </div>';
      else if (this.projectEff > 50 && this.projectEff < 100)
        event.currentTarget.parentElement.innerHTML = '<div style="color: #f39c12">' + this.projectEff + ' % </div>';
      else
        event.currentTarget.parentElement.innerHTML = '<div style="color: #f56954">' + this.projectEff + ' % </div>';
    }

  }
}
