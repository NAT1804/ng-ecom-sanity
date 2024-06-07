import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  model,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { SanityService } from '@services/sanity/sanity.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'nat-management-search-products',
  standalone: true,
  imports: [CommonModule, ListCardComponent],
  templateUrl: './management-search-products.component.html',
  styleUrl: './management-search-products.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementSearchComponent implements OnInit, OnDestroy {
  private activedRoute = inject(ActivatedRoute);
  public productsData = signal<any[]>([]);
  private _subs: Subscription;
  private readonly sanityService = inject(SanityService);
  public keyword = signal<string>('');

  constructor() {
    this._subs = new Subscription();
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngOnInit(): void {
    this.productsData.set(
      this.activedRoute.snapshot.data['searchProductsData']
    );

    const queryParamSub = this.activedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.keyword.set(params['s']);
          return this.sanityService.searchProducts(params['s']);
        })
      )
      .subscribe((data) => {
        this.productsData.set(data);
      });
    this._subs.add(queryParamSub);
  }
}
