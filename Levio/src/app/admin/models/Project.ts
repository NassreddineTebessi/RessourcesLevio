import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {Client} from "./Client";

export class Project{
  id: number;
  name: string;
  adress: string;
  photo: string;
  type: projectType;
  num_ressource_all: number;
  num_ressource_levio: number;
  start_date: Date;
  end_date: Date;
  archived: boolean;
  client: Client;

}

export enum projectType { runningProject, newProject, finishedProject }
