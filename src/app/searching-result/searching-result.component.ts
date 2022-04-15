import { UpdateConfig } from './../share/interface/update_conf';
import { Config } from '../share/interface/res_conf';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EngineResponseService } from '../engine-response.service';
@Component({
  selector: 'app-searching-result',
  templateUrl: './searching-result.component.html',
  styleUrls: ['./searching-result.component.css']
})
export class SearchingResultComponent implements OnInit {

  @Input() response: Array<Config> = [];

  ngOnInit(): void {
  }

  constructor(
    private engineResponseService: EngineResponseService,
  ) { }


  ids: Array<string> = [];
  editing: { [key: string]: boolean } = {};

  drop(event: CdkDragDrop<UpdateConfig[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      var newIndex = this.caculateNewIndex(event)
      this.update(event.container.data[event.currentIndex], { index: newIndex }, '')
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let newIndex = this.caculateNewIndex(event)
      let currentWhAttribGroup = event.container.data.filter(e => {
        return e['whAttribGroup'] !== event.container.data[event.currentIndex]['whAttribGroup']
      })
      this.update(event.container.data[event.currentIndex], { index: newIndex, whAttribGroup: currentWhAttribGroup[0]['whAttribGroup'] }, '')
    }
  }

  addGroupId(id: number) {
    this.ids.push(id.toString())
    return id
  }

  addRowId(id: number) {
    this.editing[id.toString()] = true
    return id
  }

  editable(bl: boolean, key: string) {
    this.editing[key] = bl;
  }

  update(attr: UpdateConfig, obj: { [key: string]: number | string }, tagId: string) {
    Object.assign(attr, obj)
    this.editing[tagId] = false
    this.engineResponseService.editRecord(attr.id, attr).subscribe(res => {
      console.log(res);
    })
  }

  addNewRow(whAttribGroup: number, index: number) {
    if (whAttribGroup) {
      let params = {
        'whAttribGroup': whAttribGroup,
        'attribs': [
          { 'key': '標題', 'value': '新項目', 'id': null, 'index': index },
        ]
      }
      this.engineResponseService.createWhRecord(params).subscribe(res => {
        this.response.filter(e => {
          e.whAttribGroup === whAttribGroup
        })[0].attribs.push(res.attribs[0])
      })
    }
  }

  addNewRecord(event: Config) {
    this.response.push(event)
  }

  deleteExistedRecord(id: number, groupIndex: number, attrIndex: number) {
    this.engineResponseService.deleteWhRecord(id).subscribe(res => {
    })
    this.response[groupIndex].attribs.splice(attrIndex, 1)
  }

  caculateNewIndex(event: CdkDragDrop<UpdateConfig[]>) {
    var newIndex = 0
    if (event.currentIndex == 0) {
      newIndex = event.container.data[1]['index'] - 1000
    } else if (event.currentIndex == event.container.data.length - 1) {
      newIndex = event.container.data[event.currentIndex - 1]['index'] + 1000
    } else {
      newIndex = (event.container.data[event.currentIndex - 1]['index'] + event.container.data[event.currentIndex + 1]['index']) / 2
    }
    return newIndex
  }
}
