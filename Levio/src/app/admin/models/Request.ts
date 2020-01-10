import {Client} from './Client';
export class Request {
  id: number;
  resourceType: string;
  context: string;
  deliveryDate: Date;
  status: number;
  clients: Client[];
}
