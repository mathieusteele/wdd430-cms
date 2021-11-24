import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];

  constructor(private http: HttpClient) {}

  getDocuments(): Document[] {
    this.http
      .get<{ message: string; documents: Document[] }>(
        'http://localhost:3000/documents'
      )
      .subscribe((responseData) => {
        this.documents = responseData.documents;
        // .pipe(
        //   map((documentData) => {
        //     return documentData.documents.map((document) => {
        //       return {
        //         id: document._id,
        //         name: document.name,
        //         description: document.description,
        //         url: document.url,
        //       };
        //     });
        //   })
        // )
        // .subscribe((transformedDocuments) => {
        //   this.documents = transformedDocuments;
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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let position = this.documents.findIndex(
      (d) => d.id === originalDocument.id
    );

    if (position < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe(() => {
        this.documents[position] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const position = this.documents.findIndex((d) => d.id === document.id);

    if (position < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe(() => {
        const updatedDocuments = this.documents.filter((filteredDocument) => {
          return filteredDocument.id !== document.id;
        });
        this.documents = updatedDocuments;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
