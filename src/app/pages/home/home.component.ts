import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { BREAKPOINTS } from '@constants';
import { IBanner } from '@models/banner.model';
import { IResponseProductsByCategory } from '@models/base-response.model';
import { BreakpointObserverService } from '@services/breakpoint-observer/breakpoint-observer.service';
import { CanonicalService } from '@services/canonical/canonical.service';
import { SanityService } from '@services/sanity/sanity.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListCardComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private sanityService = inject(SanityService);

  public prodBycategories = signal<IResponseProductsByCategory[]>([]);
  public banners = signal<IBanner[]>([]);
  private _subscription: Subscription;
  public size$!: Observable<string>;
  public pageSize = signal<number>(6);
  private isBrowser = signal<boolean>(false);

  constructor(
    private _breakpointObserverService: BreakpointObserverService,
    @Inject(PLATFORM_ID) platformId: Object,
    private title: Title,
    private meta: Meta,
    private canonicalService: CanonicalService
  ) {
    this._subscription = new Subscription();
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  ngOnInit(): void {
    //#region SEO
    this.title.setTitle('Trang chủ | Ăn vặt Cheri');

    this.meta.addTags([
      {
        name: 'title',
        content:
          'Shop Ăn vặt Cheri chuyên cung cấp các sản phẩm ăn vặt ngon nhất, đổ sỉ lẻ đa dạng các loại đồ ăn',
      },
      {
        name: 'description',
        content: `Ăn vặt Cheri. Ăn là nghiền, không ngon hoàn tiền ^_^.Sau khi mua hàng, các bạn sẽ trở thành VIP MEMBER của Cheri Food và nhận được một tấm thẻ VIP CARD, hãy giữ lấy chúng để trải nghiệm những ưu đãi siêu độc lạ chỉ có ở Cheri Food. Đặc quyền của VIP MEMBER: - Được tham gia Minigame tri ân khách hàng trên INSTAGRAM với giải thưởng lên đến 30 triệu… - Nhận quà bất kì cho các đơn hàng sau nếu đánh giá 5* trên Shopee. Instagram: anvatcheri. Facebook: Ăn Vặt Cheri`,
      },
      {
        name: 'keywords',
        content: 'Ăn vặt, Ăn vặt Cheri, Đồ ăn vặt, Bánh tráng',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'image', content: 'assets/images/logo.webp' },
      { charset: 'UTF-8' },
      {
        name: 'og:title',
        content:
          'Shop chuyên cung cấp các sản phẩm ăn vặt ngon nhất, đổ sỉ lẻ đa dạng các loại đồ ăn | Ăn vặt Cheri',
      },
      {
        name: 'og:locale',
        content: 'vi-VN',
      },
      {
        name: 'og:description',
        content: `Ăn vặt Cheri. Ăn là nghiền, không ngon hoàn tiền ^_^.Sau khi mua hàng, các bạn sẽ trở thành VIP MEMBER của Cheri Food và nhận được một tấm thẻ VIP CARD, hãy giữ lấy chúng để trải nghiệm những ưu đãi siêu độc lạ chỉ có ở Cheri Food. Đặc quyền của VIP MEMBER: - Được tham gia Minigame tri ân khách hàng trên INSTAGRAM với giải thưởng lên đến 30 triệu… - Nhận quà bất kì cho các đơn hàng sau nếu đánh giá 5* trên Shopee. Instagram: anvatcheri. Facebook: Ăn Vặt Cheri`,
      },
      {
        name: 'og:url',
        content: 'https://www.anvatcherry.com/',
      },
      {
        name: 'og:type',
        content: 'website',
      },
      {
        name: 'og:image',
        content: 'https://www.anvatcherry.com/assets/images/logo.webp',
      },
    ]);

    this.canonicalService.setCanonicalURL();
    //#endregion

    if (this.isBrowser()) {
      const subSize = this._breakpointObserverService.size$.subscribe(
        (size) => {
          switch (size) {
            case BREAKPOINTS.XS:
            case BREAKPOINTS.SM:
              this.pageSize.set(2);
              break;
            case BREAKPOINTS.MD:
            case BREAKPOINTS.LG:
            case BREAKPOINTS.XL:
              this.pageSize.set(4);
              break;
            default:
              this.pageSize.set(6);
              break;
          }
        }
      );
      this._subscription.add(subSize);
    }

    const subProd = this.sanityService
      .getProductsOfAllCategory()
      .subscribe((data) => {
        this.prodBycategories.set(data);
      });

    const subBanner = this.sanityService.getAllBanners().subscribe((data) => {
      this.banners.set(data);
    });

    this._subscription.add(subProd);
    this._subscription.add(subBanner);
  }
}
