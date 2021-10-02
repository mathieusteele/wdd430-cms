import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Output() aContactWasSelected = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(
      'abc1',
      'Frank Gorshen',
      'frank@gorshen.com',
      '555-111-2313',
      '../../assets/images/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg',
      null
    ),
    new Contact(
      'abc2',
      'Holly Woods',
      'actress@tv.com',
      '555-555-1212',
      '../../assets/images/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg',
      null
    ),
    new Contact(
      '1',
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '../../assets/images/barzeer.jpg',
      null
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onContactSelected(contact: Contact) {
    this.aContactWasSelected.emit(contact);
  }
}
