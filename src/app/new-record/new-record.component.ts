import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EngineResponseService } from '../engine-response.service';
import { AttrConfig } from '../share/interface/attrib_conf';
@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

  @Output() newRecordEvent = new EventEmitter<any>()

  ngOnInit(): void {
  }
  constructor(
    private engineResponseService: EngineResponseService,
  ) { }

  createNewRecord = false;
  newRecord: object = {
    'whAttribGroup': null,
    'attribs': [
      { 'key': '標題', 'value': '新項目', 'id': null, 'index': 0 },
      { 'key': '數量', 'value': '0', 'id': null, 'index': 1000 }
    ]
  }
  tempRecord: { 'whAttribGroup': null, 'attribs': Array<AttrConfig> } = { 'whAttribGroup': null, 'attribs': [] }

  editing: { [key: string]: boolean } = {};
  newAttrib() {
    this.createNewRecord = true
    this.tempRecord = JSON.parse(JSON.stringify(this.newRecord))
  }

  create() {
    let params = JSON.parse(JSON.stringify(this.tempRecord))
    this.engineResponseService.createWhRecord(params).subscribe(data => {
      this.newRecordEvent.emit(data['data']);
    })
    this.tempRecord = { 'whAttribGroup': null, 'attribs': [] }
    this.createNewRecord = false
  }


  editable(bl: boolean, key: string) {
    this.editing[key] = bl;
  }

  update(attr: AttrConfig, target: any, type: 'key' | 'value', edit: boolean, tagId: string) {
    attr[type] = target.value
    this.editing[tagId] = false
  }

  addNewRow(index: number) {
    this.tempRecord.attribs.push({ 'key': '標題', 'value': '新項目', 'id': null, 'index': index, 'whattribgroup': null })
  }

  removeInitailRecord(index: number) {
    this.tempRecord.attribs.splice(index, 1)
  }
}
