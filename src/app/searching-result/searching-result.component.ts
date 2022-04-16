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
      console.log(newIndex);
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
      this.checkHaveAttribs(Number(event.previousContainer.id))
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
    let params = {
      'whAttribGroup': whAttribGroup,
      'attribs': [
        { 'key': '標題', 'value': '新項目', 'id': null, 'index': index },
      ]
    }
    this.engineResponseService.createWhRecord(params).subscribe(res => {
      this.response.filter(e => {
        return e.whAttribGroup === whAttribGroup
      })[0].attribs.push(res.data.attribs[0])
      this.editable(true, 'key' + res.data.attribs[0].id)
    })
  }

  addNewRecord(event: Config) {
    this.response.push(event)
  }

  deleteExistedRecord(id: number, groupIndex: number, attrIndex: number) {
    this.engineResponseService.deleteWhRecord(id).subscribe(res => {
    })
    this.response[groupIndex].attribs.splice(attrIndex, 1)
    this.checkHaveAttribs(groupIndex)
  }

  caculateNewIndex(event: CdkDragDrop<UpdateConfig[]>) {
    var newIndex = 0
    if (event.container.data.length === 1) {
      return newIndex
    }
    if (event.currentIndex == 0) {
      newIndex = event.container.data[1]['index'] - 1000
    } else if (event.currentIndex == event.container.data.length - 1) {
      newIndex = event.container.data[event.currentIndex - 1]['index'] + 1000
    } else {
      let tempIndex = (event.container.data[event.currentIndex - 1]['index'] + event.container.data[event.currentIndex + 1]['index']) / 2
      newIndex = Math.floor(tempIndex)
    }
    return newIndex
  }

  checkHaveAttribs(whAttribGroup: number) {
    let checkingIndex = this.response.findIndex(e => {
      return e.whAttribGroup === whAttribGroup && e.attribs.length === 0
    })
    console.log(checkingIndex);

    if (checkingIndex >= 0) {
      this.response.splice(checkingIndex, 1)
    }
  }
}
