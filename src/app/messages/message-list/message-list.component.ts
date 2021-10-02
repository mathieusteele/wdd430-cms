import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'Homework', 'Do your homework', 'Brother'),
    new Message(2, 'Test', 'Study for the test', 'Brother'),

    new Message(3, 'Help', 'Find a tutor for help', 'Sister'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
