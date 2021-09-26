import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact(
    'abc1',
    'Frank Gorshen',
    'frank@gorshen.com',
    '555-111-2313',
    '../../assets/images/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg',
    null
  );

  constructor() {}

  ngOnInit(): void {}
}
