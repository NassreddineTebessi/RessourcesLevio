import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '../models/Request';
import {Message} from '../models/Message';

@Injectable()
export class RequestService {

  listRequests: Request[] = [];
  constructor(private httpClient: HttpClient) {
  }

  treatRequest(request: Request) {
    return this.httpClient.get('/map-web/map/User/treatClientRequest?requestId=' + request.id).subscribe(data => data, err => console.log('err'));
  }

  sendMessage(message: Message) {
    return this.httpClient.post('/map-web/map/User/sendMsgToClient', message).subscribe();
  }

  deleteRequest(request: Request) {
    return this.httpClient.get('/map-web/map/client/DeleteRequest?id=' + request.id).subscribe(data => data, err => console.log('err'));
  }

  getAllRequests() {
    this.httpClient.get<Request[]>('/map-web/map/User/getAllRequests').subscribe(data => {
      this.listRequests = data;
    });
    return this.listRequests;
  }

  deleteTreatedRequests() {
    return this.httpClient.get('/map-web/map/User/deleteTreatedRequests').subscribe(data => data,err => console.log(err) );
  }

  addRequest(request: Request) {
    this.httpClient.post('/map-web/map/client/AddRequest?clientId=2', request).subscribe();
  }

}
