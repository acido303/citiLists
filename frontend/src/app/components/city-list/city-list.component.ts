import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { City } from '../../models/city.model';
import { PagedResponse } from '../../models/paged-response.model';

@Component({
  selector: 'app-city-list',
  standalone: true,
  template: `
    <div class="panel" id="panel-cities">
      <div class="panel-title">Cities</div>
      <div class="scroll">
        @if (pagedCities(); as data) {
          @for (city of data.content; track city.id) {
            <div class="item"
                 [class.active]="selectedId === city.id"
                 (click)="citySelected.emit(city.id)">
              {{ city.name }}
            </div>
          } @empty {
            <p class="empty">No cities found.</p>
          }
        } @else {
          <p class="empty">Select a country.</p>
        }
      </div>
      @if (pagedCities() && pagedCities()!.totalPages > 1) {
        <div class="pagination">
          <button [disabled]="page === 0" (click)="prev()">&#8592; Prev</button>
          <span>{{ page + 1 }} / {{ pagedCities()!.totalPages }}</span>
          <button [disabled]="page >= pagedCities()!.totalPages - 1" (click)="next()">Next &#8594;</button>
        </div>
      }
    </div>
  `,
})
export class CityListComponent implements OnChanges {
  private api = inject(ApiService);

  @Input() countryId: number | null = null;
  @Input() selectedId: number | null = null;
  @Output() citySelected = new EventEmitter<number>();

  pagedCities = signal<PagedResponse<City> | null>(null);
  page = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['countryId']) {
      this.page = 0;
      this.load();
    }
  }

  load() {
    if (this.countryId === null) {
      this.pagedCities.set(null);
      return;
    }
    this.api.getCities(this.countryId, this.page, 5).subscribe(data => this.pagedCities.set(data));
  }

  prev() { this.page--; this.load(); }
  next() { this.page++; this.load(); }
}
