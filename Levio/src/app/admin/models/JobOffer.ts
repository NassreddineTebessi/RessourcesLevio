import {Application} from './Application';

export class Skill {
  id: number;
  name: string;
  rating: number;
  jobOffer: JobOffer;


}

export class JobOffer {
  id: number;
  mission: string;
  required_profile: string;
  beginning: Date;
  experience: string;
  function: string;
  nbPoste: number;
  listSkills: Skill[];
  listApplicant: Application[];
}
