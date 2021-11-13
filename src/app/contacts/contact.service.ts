import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;

  private contacts: Contact[] = [];
  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http
      .get<Contact[]>(
        'https://ng-cms-e6f32-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      }),
      (error: any) => {
        console.log(error);
      };
    return this.contacts;
  }

  getContact(id: string): Contact | null {
    let matches = this.contacts.filter((contact) => contact.id === id);
    return matches.length ? matches[0] : null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.map((contact) => {
      if (+contact.id > maxId) {
        maxId = +contact.id;
      }
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let position = this.contacts.indexOf(originalContact);

    if (position < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const position = this.contacts.indexOf(contact);
    if (position < 0) {
      return;
    }
    this.contacts.splice(position, 1);
    this.storeContacts();
  }

  storeContacts() {
    this.http
      .put(
        'https://ng-cms-e6f32-default-rtdb.firebaseio.com/contacts.json',
        this.contacts
      )
      .subscribe((response) => {
        console.log(response);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
