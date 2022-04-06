import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-searching-result',
  templateUrl: './searching-result.component.html',
  styleUrls: ['./searching-result.component.css']
})
export class SearchingResultComponent implements OnChanges {
  @Input() response: Array<{
    'attribGroup': number,
    'attribs': Array<{ 'key': String, 'value': String, 'id': number }>
  }> = [];
  ngOnChanges(changes: SimpleChanges): void {
  }
}
