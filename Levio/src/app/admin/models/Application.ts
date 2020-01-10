import {JobOffer, Skill} from './JobOffer';
import {Folder} from './Folder';
import {Test} from './Test';
import {Interview} from './Interview';
import {ApplicationTest} from './ApplicationTest';

class Ressource {
  id: number;
  name: string;
  sector: string;
  photo: string;
  first_name: string;
  last_name: string;
  skills: Skill[];
email: string;
}


export class Application {
  id: number;
  date_app: Date;
  state: string;
  folder: Folder;
  listTest: ApplicationTest[];
  listInterview: Interview[];
  description: string;
  jobOffer: JobOffer;
  ressource: Ressource;

}
export enum State {
  notApplay, interview, testTech, interviewTech, testFr, accepted, applicationAccepted, refused
}
