import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { SwiperDirective } from '@directives/swiper.directive';
import { PortableTextToHTML } from '@pipes/portable-text.pipe';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { SanityService } from '@services/sanity/sanity.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { Subscription, switchMap } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'nat-product-detail',
  standalone: true,
  imports: [
    CarouselComponent,
    SwiperDirective,
    NzButtonModule,
    SanityImagePipe,
    PortableTextToHTML,
    NzTabsModule,
    CurrencyPipe,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // private sanityService = inject(SanityService);
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('swiper', { static: true }) swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs', { static: true })
  swiperThumbs!: ElementRef<SwiperContainer>;

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    thumbs: {
      swiper: '.mySwiper2',
    },
  };

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    loop: true,
    navigation: false,
    // navigation: {
    //   nextEl: '#carousel-next-btn',
    //   prevEl: '#carousel-prev-btn',
    // },
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    updateOnWindowResize: true,
    breakpoints: {
      100: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 6,
      },
    },
  };

  productData: any = null;

  _subs: Subscription;

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(vi_VN);
    this._subs = new Subscription();
  }
  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.productData = this.activedRoute.snapshot.data['productDetail'];

    const routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.productData = this.activedRoute.snapshot.data['productDetail'];
      }
    });
    this._subs.add(routeSub);
  }
}
