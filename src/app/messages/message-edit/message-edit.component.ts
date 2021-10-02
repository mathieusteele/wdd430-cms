import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput', { static: false }) subjectInputRef!: ElementRef;
  @ViewChild('messageInput', { static: false }) messageInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Mathieu Steele';

  constructor() {}

  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(12345, subject, message, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
