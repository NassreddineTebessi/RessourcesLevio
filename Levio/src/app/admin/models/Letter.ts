import {Folder} from './Folder';

export class Letter {
  id: number;
  type: Typel;
  contratType: string;
  salary: number;
  folder: Folder;
}
enum Typel {
  user, admin

}
