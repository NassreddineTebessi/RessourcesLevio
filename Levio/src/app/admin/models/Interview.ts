import {Application} from './Application';

export class Interview {
  id: number;
  dateInterview: Date;
  typeInterview: TypeInterview;
  application: Application;
  stateInterview: StateInterview;

}
export enum TypeInterview {
  interview= 'interview', InterviewTech= 'InterviewTech'

}
export enum StateInterview {
  Request= 'Request', Accepted= 'Accepted', notAccepted= 'notAccepted'

}
