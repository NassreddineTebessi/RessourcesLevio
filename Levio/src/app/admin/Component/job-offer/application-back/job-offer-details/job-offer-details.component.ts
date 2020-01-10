import {Component, Input, OnInit} from '@angular/core';
import {JobOffer} from '../../../../models/JobOffer';

@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.css']
})
export class JobOfferDetailsComponent implements OnInit {

  @Input()
  JOffer: JobOffer = new JobOffer();
  constructor() { }

  ngOnInit() {
  }

}
