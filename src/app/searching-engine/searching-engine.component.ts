import { EngineResponseService } from './../engine-response.service';
import { Component, OnInit } from '@angular/core';
import { Config } from '../share/interface/res_conf'
@Component({
  selector: 'app-searching-engine',
  templateUrl: './searching-engine.component.html',
  styleUrls: ['./searching-engine.component.css']
})
export class SearchingEngineComponent implements OnInit {
  response: Array<Config> = [];
  value: string = ''
  no_result = false
  constructor(
    private engineResponseService: EngineResponseService,
  ) { }

  ngOnInit(): void { }

  search(keyword: String): void {
    this.response = []
    this.no_result = false
    this.engineResponseService.getWhRecord(keyword).subscribe(res => {
      if (res.result === false) {
        this.no_result = true
      } else {
        res.data.forEach((element: Config) => {
          this.response.push(element)
        });
      };
    })
  }
}
