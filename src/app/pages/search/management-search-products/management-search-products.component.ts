import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { SanityService } from '@services/sanity/sanity.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'nat-management-search-products',
  standalone: true,
  imports: [CommonModule, ListCardComponent],
  templateUrl: './management-search-products.component.html',
  styleUrl: './management-search-products.component.less',
})
export class ManagementSearchComponent implements OnInit, OnDestroy {
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public productsData: any = [];
  private _subs: Subscription;
  private readonly sanityService = inject(SanityService);
  public keyword!: string;

  constructor() {
    this._subs = new Subscription();
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngOnInit(): void {
    this.productsData = this.activedRoute.snapshot.data['searchProductsData'];

    const queryParamSub = this.activedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.keyword = params['s'];
          return this.sanityService.searchProducts(params['s']);
        })
      )
      .subscribe((data) => {
        this.productsData = data;
        console.log(this.productsData);
      });
    this._subs.add(queryParamSub);

    // const routeSub = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.productsData =
    //       this.activedRoute.snapshot.data['searchProductsData'];
    //     console.log(this.productsData);
    //   }
    // });
    // this._subs.add(routeSub);
  }
}
