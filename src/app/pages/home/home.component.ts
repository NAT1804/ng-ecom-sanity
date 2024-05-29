import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { IBanner } from '@models/banner.model';
import { IResponseProductsByCategory } from '@models/base-response.model';
import { SanityService } from '@services/sanity/sanity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListCardComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit, OnDestroy {
  prodBycategories: IResponseProductsByCategory[] = [];
  banners: IBanner[] = [];

  private sanityService = inject(SanityService);

  private _subscription: Subscription

  constructor() {
    this._subscription = new Subscription
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe()
  }

  ngOnInit(): void {
    const subProd = this.sanityService.getProductsByCategory().subscribe((data) => {
      this.prodBycategories = data;
    });

    const subBanner = this.sanityService.getAllBanners().subscribe((data) => {
      this.banners = data;
    });

    this._subscription.add(subProd)
    this._subscription.add(subBanner)
  }
}
