import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId!: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    let matches = this.documents.filter((document) => document.id === id);
    return matches.length ? matches[0] : null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.map((document) => {
      if (+document.id > maxId) {
        maxId = +document.id;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let position = this.documents.indexOf(originalDocument);

    if (position < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
