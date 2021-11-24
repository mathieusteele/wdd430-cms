import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];

  constructor(private http: HttpClient) {}

  getMessages(): Message[] {
    this.http
      .get<{ message: string; messages: Message[] }>(
        'http://localhost:3000/messages'
      )
      .subscribe((responseData) => {
        this.messages = responseData.messages;
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

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    newMessage.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ msg: string; message: Message }>(
        'http://localhost:3000/messages',
        newMessage,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.message);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
