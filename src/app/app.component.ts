import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cms';
  selectedFeature = 'contacts';

  switchView(feature: string) {
    this.selectedFeature = feature;
  }
}
