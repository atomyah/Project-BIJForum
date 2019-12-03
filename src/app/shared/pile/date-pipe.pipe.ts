import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(date: number): string {
    moment.locale("ja");
    return moment(date).format('LLLL');
  }

}
