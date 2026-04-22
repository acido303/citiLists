import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from './services/api.service';
import { Country } from './models/country.model';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountryListComponent, CityListComponent, CityDetailComponent],
  template: `
    <header>CitiLists</header>
    <div class="layout">
      <app-country-list
        [countries]="countries()"
        [selectedId]="selectedCountryId()"
        (countrySelected)="onCountrySelected($event)" />
      <app-city-list
        [countryId]="selectedCountryId()"
        [selectedId]="selectedCityId()"
        (citySelected)="onCitySelected($event)" />
      <app-city-detail
        [cityId]="selectedCityId()"
        [countries]="countries()" />
    </div>
  `,
})
export class AppComponent implements OnInit {
  private api = inject(ApiService);

  countries = signal<Country[]>([]);
  selectedCountryId = signal<number | null>(null);
  selectedCityId = signal<number | null>(null);

  ngOnInit() {
    this.api.getCountries().subscribe(c => this.countries.set(c));
  }

  onCountrySelected(id: number) {
    this.selectedCountryId.set(id);
    this.selectedCityId.set(null);
  }

  onCitySelected(id: number) {
    this.selectedCityId.set(id);
  }
}
