import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class EngineResponseService {
  response =
    [
      {
        attribGroup: 1,
        attribs: [
          { key: 'title', value: 'book', id: 1 },
          { key: 'count', value: '10', id: 2 }
        ]
      },
      {
        attribGroup: 2,
        attribs: [
          { key: 'title', value: 'book', id: 3 },
          { key: 'count', value: '10', id: 4 }
        ]
      }
    ]
  api = 'http://localhost:3000/warehouses/'
  constructor(
    private httpClient: HttpClient
  ) { }

  createWhRecord(params: Object): Observable<any> {
    return this.httpClient.post(this.api, params)
  }

  getWhRecord(keyword: String): Observable<any> {
    return this.httpClient.get(this.api + keyword)
  }

  editRecord(params: Object) {
    this.httpClient.post(this.api, params)
  }

  deleteWhRecord(id: number): Observable<any> {
    let params = { 'id': id }
    return this.httpClient.post(this.api, params)
  }
}

