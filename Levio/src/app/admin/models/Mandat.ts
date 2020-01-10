import {Ressource} from './Ressource';
import {Project} from './Project';

export class Mandat {
    id: number;
    startDate: Date;
    endDate: Date;
    montant: any;
    archived: Boolean;
    ressource: Ressource;
    project: Project;
}
