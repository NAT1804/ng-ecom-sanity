import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { SwiperDirective } from '@directives/swiper.directive';
import { PortableTextToHTML } from '@pipes/portable-text.pipe';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { SanityService } from '@services/sanity/sanity.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { switchMap } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nat-product-detail',
  standalone: true,
  imports: [
    CarouselComponent,
    SwiperDirective,
    NzButtonModule,
    SanityImagePipe,
    PortableTextToHTML,
    NzTabsModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  // private sanityService = inject(SanityService);
  private activedRoute = inject(ActivatedRoute);

  @ViewChild('swiper', { static: true }) swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs', { static: true })
  swiperThumbs!: ElementRef<SwiperContainer>;

  swiperConfig: SwiperOptions = {
    // modules: [Controller],
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

  slides = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
    'https://swiperjs.com/demos/images/nature-7.jpg',
    'https://swiperjs.com/demos/images/nature-8.jpg',
    'https://swiperjs.com/demos/images/nature-10.jpg',
  ];

  productData: any = null;

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(vi_VN);
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.productData = this.activedRoute.snapshot.data['productDetail'];
    console.log(this.productData);
  //   this.activedRoute.queryParams
  //     .pipe(
  //       switchMap((params: Params) => {
  //         return this.sanityService.getDetailProduct(params['s']);
  //       })
  //     )
  //     .subscribe((data) => {
  //       this.productData = data;
  //     });
  }
}
