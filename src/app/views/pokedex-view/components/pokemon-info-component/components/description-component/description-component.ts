import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-component',
  imports: [],
  templateUrl: './description-component.html',
  styleUrl: './description-component.css',
})
export class DescriptionComponent {
  @Input() description = '';
}
