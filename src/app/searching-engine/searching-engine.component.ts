import { EngineResponseService } from './../engine-response.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searching-engine',
  templateUrl: './searching-engine.component.html',
  styleUrls: ['./searching-engine.component.css']
})
export class SearchingEngineComponent implements OnInit {
  response: Array<{
    'attribGroup': number,
    'attribs': Array<{ 'key': String, 'value': String, 'id': number }>
  }> = [];
  constructor(
    private engineResponseService: EngineResponseService,
  ) { }

  ngOnInit(): void { }

  search(keyword: String): void {
    this.response = []
    this.engineResponseService.getWhRecord(keyword).forEach(e => {
      this.response.push(e)
    });
  }
}
