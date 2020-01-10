import {Application} from './Application';
import {Letter} from './Letter';

export class Folder {
  id: number;
  listeLetter: Letter[];
  stateLetter: StateLetter;
  stateFolder: StateFolder;
  stateMinister: StateMinister;
  application: Application;
}
enum StateFolder {
  notComplited, complited

}
enum StateLetter {
  signed, notSigned
}
enum StateMinister {
  notAccepted, Accepted, inPregress, notSend

}
