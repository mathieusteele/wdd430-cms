import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    {
      id: '1',
      name: 'Application',
      description: 'A PDF Application',
      url: 'https://www.example.com/',
      children: null,
    },
    {
      id: '2',
      name: 'Questionnaire',
      description: 'Ask these questions',
      url: 'https://www.example.com/',
      children: null,
    },
    {
      id: '3',
      name: 'Handbook',
      description: 'A Guide for reference',
      url: 'https://www.example.com/',
    },
    {
      id: '4',
      name: 'Incident Report',
      description: 'Fill this out when something impactful happens',
      url: 'https://www.example.com/',
    },
    {
      id: '5',
      name: 'Syllabus',
      description: 'course learning outcomes and schedule are listed here.',
      url: 'https://www.example.com/',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  onDocumentSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
