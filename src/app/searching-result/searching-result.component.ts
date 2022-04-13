import { AttrConfig } from './attrib_conf';
import { Config } from './../searching-engine/res_conf';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EngineResponseService } from '../engine-response.service';
@Component({
  selector: 'app-searching-result',
  templateUrl: './searching-result.component.html',
  styleUrls: ['./searching-result.component.css']
})
export class SearchingResultComponent implements OnChanges {
  @Input() response: Array<Config> = [];
  ngOnChanges(changes: SimpleChanges): void {
  }
  constructor(
    private engineResponseService: EngineResponseService,
  ) { }

  ids: Array<string> = [];
  editing: { [key: string]: boolean } = { 'newKey0': false, 'newValue0': false, 'newKey1': false, 'newValue1': false };

  drop(event: CdkDragDrop<AttrConfig[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem<AttrConfig>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addId(id: number) {
    this.ids.push(id.toString())
    this.editing[`key${id}`] = true
    this.editing[`value${id}`] = true
    return id
  }

  private editMode = false;
  createNewRecord = false;
  newRecord: Config = {
    'attribGroup': null,
    'attribs': [
      { 'key': '標題', 'value': '新項目', 'id': null },
      { 'key': '數量', 'value': '0', 'id': null }
    ]
  }
  tempRecord: Config = { 'attribGroup': null, 'attribs': [] }


  newAttrib() {
    this.createNewRecord = true
    this.tempRecord = JSON.parse(JSON.stringify(this.newRecord))
  }

  editable(bl: boolean, key: string) {
    this.editing[key] = bl;
    console.log(this.editing);

    console.log(key);

  }

  update(attr: AttrConfig, target: any, type: 'key' | 'value', edit: boolean, tagId: string) {

    attr[type] = target.value
    this.editing[tagId] = false
    if (edit) {
      this.engineResponseService.editRecord(attr)
    }
    console.log(this.tempRecord);
    console.log(this.newRecord);

  }

  create() {
    let params = JSON.parse(JSON.stringify(this.tempRecord))
    this.engineResponseService.createWhRecord(params).subscribe(data => {
      console.log(data);
      this.response.push()
    })
    this.tempRecord = { 'attribGroup': null, 'attribs': [] }
    this.createNewRecord = false
  }
}
