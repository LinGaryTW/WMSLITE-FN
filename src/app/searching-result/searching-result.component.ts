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
    } else {
      transferArrayItem<UpdateConfig>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
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

  update(attr: UpdateConfig, target: any, type: 'key' | 'value', edit: boolean, tagId: string) {
    attr[type] = target.value
    this.editing[tagId] = false
    if (edit) {
      this.engineResponseService.editRecord(attr.id, attr).subscribe(res => {
        console.log(res);
      })
    }
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

  deleteExistedRecord(id: number, groupIndex: number, attrIndex: number) {
    this.engineResponseService.deleteWhRecord(id).subscribe(res => {
    })
    this.response[groupIndex].attribs.splice(attrIndex, 1)
  }
}
