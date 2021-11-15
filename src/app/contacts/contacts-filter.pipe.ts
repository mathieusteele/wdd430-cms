import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    // console.log(term);
    let filteredContacts: Contact[] = [];

    if (term && term.length > 0) {
      filteredContacts = contacts.filter((contact: Contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    return filteredContacts.length ? filteredContacts : contacts;
  }
}
