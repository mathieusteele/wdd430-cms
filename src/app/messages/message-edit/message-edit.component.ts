import {
  Component,
  OnInit,
  // Output,
  ViewChild,
  ElementRef,
  // EventEmitter,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput', { static: false }) subjectInputRef!: ElementRef;
  @ViewChild('messageInput', { static: false }) messageInputRef!: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '619c58aaba2e87f82fb801ad';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(
      '12345',
      subject,
      message,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
    // this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
