import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  template: `
    <div class="panel" id="panel-detail">
      <div class="panel-title">Details</div>
      @if (city(); as c) {
        <div class="detail">
          <h2>{{ c.name }}</h2>
          <div class="country-name">{{ countryName() }}</div>
          <div class="field">
            <span class="label">City ID</span>
            <span>{{ c.id }}</span>
          </div>
          <div class="field">
            <span class="label">Country</span>
            <span>{{ countryName() }}</span>
          </div>
        </div>
      } @else {
        <p class="empty">Select a city to see its details.</p>
      }
    </div>
  `,
})
export class CityDetailComponent implements OnChanges {
  private api = inject(ApiService);

  @Input() cityId: number | null = null;
  @Input() countries: Country[] = [];

  city = signal<City | null>(null);

  countryName(): string {
    const c = this.city();
    return c ? (this.countries.find(co => co.id === c.countryId)?.name ?? '') : '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cityId']) {
      if (this.cityId !== null) {
        this.api.getCity(this.cityId).subscribe(c => this.city.set(c));
      } else {
        this.city.set(null);
      }
    }
  }
}
