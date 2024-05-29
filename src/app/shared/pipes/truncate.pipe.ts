import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    let newValue = value.trim();
    return newValue.length > limit ? newValue.substring(0, limit) + '...' : value;
  }
}
