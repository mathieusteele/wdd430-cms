import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;

  private contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
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
    this.contactListChangedEvent.next(this.contacts.slice());
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
    this.contactListChangedEvent.next(this.contacts.slice());
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
