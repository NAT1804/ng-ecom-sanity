import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { SwiperDirective } from '@directives/swiper.directive';
import { PortableTextToHTML } from '@pipes/portable-text.pipe';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { SanityService } from '@services/sanity/sanity.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { Subject, Subscription, switchMap } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CurrencyPipe } from '@angular/common';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { BreadcrumbComponent } from '@components/common/breadcrumb/breadcrumb.component';
import { IBreadcrumb } from '@models/breadcrumb.model';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '@services/canonical/canonical.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

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
    ListCardComponent,
    BreadcrumbComponent,
    NzGridModule,
    NzSkeletonModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private sanityService = inject(SanityService);

  @ViewChild('swiper', { static: true }) swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs', { static: true })
  swiperThumbs!: ElementRef<SwiperContainer>;

  public swiperConfig = signal<SwiperOptions>({
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    thumbs: {
      swiper: '.mySwiper2',
    },
  });

  public swiperThumbsConfig = signal<SwiperOptions>({
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    loop: true,
    navigation: false,
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
  });

  public productData = signal<any>(null);

  private _subs: Subscription;

  public triggerGetProductsOfSpecificCategory = new Subject<string>();

  public relatedData = signal<any>(null);

  public breadcrumbData = signal<IBreadcrumb[]>([]);

  constructor(
    private i18n: NzI18nService,
    private title: Title,
    private meta: Meta,
    private canonicalService: CanonicalService
  ) {
    this.i18n.setLocale(vi_VN);
    this._subs = new Subscription();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.productData.set(this.activedRoute.snapshot.data['productDetail']);

    //#region SEO
    this.title.setTitle(
      `Chi tiết sản phẩm "${this.productData()?.title}" | Ăn vặt Cheri`
    );

    this.meta.updateTag({
      name: 'title',
      content: `Chi tiết sản phẩm "${
        this.productData()?.title
      }" | Ăn vặt Cheri`,
    });

    this.meta.updateTag({
      name: 'description',
      content: `Chi tiết sản phẩm "${
        this.productData()?.title
      }" | Ăn vặt Cheri`,
    });

    this.meta.updateTag({
      name: 'keywords',
      content: `Shop chuyên cấp sỉ lẻ đồ ăn vặt đa dạng, Trang thông tin chi tiết sản phẩm, Chi tiết sản phẩm ${
        this.productData()?.title
      }`,
    });

    this.canonicalService.setCanonicalURL();
    //#endregion

    this.createBreadcrumbData(this.productData);

    const routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.productData.set(this.activedRoute.snapshot.data['productDetail']);
        this.createBreadcrumbData(this.productData);
        this.triggerGetProductsOfSpecificCategory.next(
          this.productData().categories[0].slug.current
        );
      }
    });
    this._subs.add(routeSub);

    const triggerGetProductsSub = this.triggerGetProductsOfSpecificCategory
      .pipe(
        switchMap((category) => {
          return this.sanityService.getProductsOfSpecificCategory(category);
        })
      )
      .subscribe((data) => {
        this.relatedData.set(data);
      });
    this._subs.add(triggerGetProductsSub);
    this.triggerGetProductsOfSpecificCategory.next(
      this.productData().categories[0].slug.current
    );
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  private createBreadcrumbData(productData: any): void {
    // Create breadcrumb data
    this.breadcrumbData.set([
      {
        label: 'Trang chủ',
        link: ['/home'],
      },
      {
        label: productData().categories[0].title,
        link: [`/categories/${productData().categories[0].slug.current}`],
      },
      {
        label: productData().title,
        link: [],
      },
    ]);
  }
}
