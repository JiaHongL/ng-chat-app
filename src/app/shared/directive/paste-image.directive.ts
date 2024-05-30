import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appPasteImage]',
  standalone: true
})
export class PasteImageDirective {
  imagePasted = output<string>();

  constructor() { }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile() as Blob;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePasted.emit(e.target.result);
          };
          reader.readAsDataURL(blob);
          event.preventDefault(); // 防止默認行為
        }
      }
    }
  }

}
