import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Country } from '../../models/country.model';
import { CountryListComponent } from '../country-list/country-list.component';
import { CityListComponent } from '../city-list/city-list.component';
import { CityDetailComponent } from '../city-detail/city-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountryListComponent, CityListComponent, CityDetailComponent],
  template: `
    <header>
      <span>CitiLists</span>
      <div class="user-info">
        @if (auth.user()?.picture) {
          <img [src]="auth.user()!.picture" [alt]="auth.user()!.name" class="avatar">
        }
        <span>{{ auth.user()?.name }}</span>
        <button (click)="auth.logout()">Sign out</button>
      </div>
    </header>
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
  `
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  countries = signal<Country[]>([]);
  selectedCountryId = signal<number | null>(null);
  selectedCityId = signal<number | null>(null);

  ngOnInit(): void {
    this.api.getCountries().subscribe(c => this.countries.set(c));
  }

  onCountrySelected(id: number): void {
    this.selectedCountryId.set(id);
    this.selectedCityId.set(null);
  }

  onCitySelected(id: number): void {
    this.selectedCityId.set(id);
  }
}
