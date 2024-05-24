import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSafeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    let div = document.createElement('div');
    div.innerHTML = value;
    return div.textContent || div.innerText || '';
  }
}
