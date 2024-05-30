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
    if (items && items.length > 0) {
      const latestItem = items[items.length - 1];
      if (latestItem.type.indexOf('image') !== -1) {
        const blob = latestItem.getAsFile() as Blob;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageData = e.target.result;
          this.imagePasted.emit(imageData);
        };
        reader.readAsDataURL(blob);
        event.preventDefault(); // 防止默認行為
      }
    }
  }

}
