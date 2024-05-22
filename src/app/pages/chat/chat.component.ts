import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>chat works!</p>`,
  styleUrl: './chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent { }
