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
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { CanonicalService } from '@services/canonical/canonical.service';
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

  constructor(
    private title: Title,
    private meta: Meta,
    private canonicalService: CanonicalService
  ) {
    this._subs = new Subscription();
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngOnInit(): void {
    //#region SEO
    this.title.setTitle('Tìm kiếm sản phẩm | Ăn vặt Cheri');

    this.meta.updateTag({
      name: 'title',
      content: 'Tìm kiếm sản phẩm | Ăn vặt Cheri',
    });

    this.meta.updateTag({
      name: 'description',
      content: 'Tìm kiếm sản phẩm | Ăn vặt Cheri',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Shop chuyên cấp sỉ lẻ đồ ăn vặt đa dạng, Trang tìm kiếm sản phẩm',
    });

    this.canonicalService.setCanonicalURL();
    //#endregion

    this.productsData.set(
      this.activedRoute.snapshot.data['searchProductsData']
    );

    const queryParamSub = this.activedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.keyword.set(params['s']);
          this.meta.updateTag({
            name: 'title',
            content: `Tìm kiếm sản phầm ${params['s']} | Ăn vặt Cheri`,
          });

          this.meta.updateTag({
            name: 'description',
            content: `Shop chuyên cấp sỉ lẻ đồ ăn vặt đa dạng, Tìm kiếm sản phầm ${params['s']}, Trang tìm kiếm sản phẩm`,
          });

          this.meta.updateTag({
            name: 'keywords',
            content: `Shop chuyên cấp sỉ lẻ đồ ăn vặt đa dạng, Tìm kiếm sản phầm ${params['s']}, Trang tìm kiếm sản phẩm`,
          });

          return this.sanityService.searchProducts(params['s']);
        })
      )
      .subscribe((data) => {
        this.productsData.set(data);
      });
    this._subs.add(queryParamSub);
  }
}
