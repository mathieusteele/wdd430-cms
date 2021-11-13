import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId!: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(
        'https://ng-cms-e6f32-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      }),
      (error: any) => {
        console.log(error);
      };
    return this.documents;
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  storeDocuments() {
    this.http
      .put(
        'https://ng-cms-e6f32-default-rtdb.firebaseio.com/documents.json',
        this.documents
      )
      .subscribe((response) => {
        console.log(response);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
