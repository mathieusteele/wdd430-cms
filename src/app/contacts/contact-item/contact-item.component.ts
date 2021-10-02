import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<void>();
  @Input() contact!: Contact;

  constructor() {}

  ngOnInit(): void {}

  setSelectedContact() {
    this.selectedContactEvent.emit();
  }
}
