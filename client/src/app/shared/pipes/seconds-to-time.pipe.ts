import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})

export class SecondsToTimePipe implements PipeTransform {
  transform(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds); // specify value for seconds here
    return date.toISOString().substr(14, 5);
  }
}
