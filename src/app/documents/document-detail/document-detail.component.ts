import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  id!: string;
  document?: Document | null;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {}

  ngOnInit() {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
    });
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
    }
    this.router.navigate(['/documents']);
  }
}
