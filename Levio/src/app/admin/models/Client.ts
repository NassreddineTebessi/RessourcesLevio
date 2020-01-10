export class Client {

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  adress: string;
  type: clientType;
  category: clientCategory;
  note: string;
  
}
export enum clientType { newClient, currentClient, finishedProject }
export enum clientCategory { privateCat, publicCat }
