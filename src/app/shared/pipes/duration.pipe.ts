import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const diffMs = <any>new Date(value.checkOut) - <any>new Date(value.checkIn);
    const minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return `${minutes} mins`;
  }

}
