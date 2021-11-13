import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  maxMessageId!: number;

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): Message[] {
    this.http
      .get<Message[]>(
        'https://ng-cms-e6f32-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        // I would sort the messages here chronologically but there is no timestamp on the model.
        this.messageChangedEvent.next(this.messages.slice());
      }),
      (error: any) => {
        console.log(error);
      };
    return this.messages;
  }

  getMessage(id: string): Message | null {
    let matches = this.messages.filter((message) => message.id === id);
    return matches.length ? matches[0] : null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.map((message) => {
      if (+message.id > maxId) {
        maxId = +message.id;
      }
    });
    return maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages() {
    this.http
      .put(
        'https://ng-cms-e6f32-default-rtdb.firebaseio.com/messages.json',
        this.messages
      )
      .subscribe((response) => {
        console.log(response);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
