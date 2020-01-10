import {Test} from './Test';

export class Question {
  id: number;
  subject: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  validChoise: string;
  listTest: Test[];
}
