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
        content: 'Trang chủ | Ăn vặt Cheri',
      },
      {
        name: 'description',
        content: 'Trang chủ | Ăn vặt Cheri',
      },
      {
        name: 'keywords',
        content: 'Ăn vặt, Ăn vặt Cheri, Đồ ăn vặt, Bánh tráng',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'image', content: './assets/images/logo.jpg' },
      { charset: 'UTF-8' },
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
