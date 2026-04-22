import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-list',
  standalone: true,
  template: `
    <div class="panel" id="panel-countries">
      <div class="panel-title">Countries</div>
      <div class="scroll">
        @for (country of countries; track country.id) {
          <div class="item"
               [class.active]="selectedId === country.id"
               (click)="countrySelected.emit(country.id)">
            {{ country.name }}
          </div>
        }
      </div>
    </div>
  `,
})
export class CountryListComponent {
  @Input() countries: Country[] = [];
  @Input() selectedId: number | null = null;
  @Output() countrySelected = new EventEmitter<number>();
}
