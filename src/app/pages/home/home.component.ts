import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { BREAKPOINTS } from '@constants';
import { IBanner } from '@models/banner.model';
import { IResponseProductsByCategory } from '@models/base-response.model';
import { BreakpointObserverService } from '@services/breakpoint-observer/breakpoint-observer.service';
import { SanityService } from '@services/sanity/sanity.service';
import { Observable, Subscription } from 'rxjs';

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

  private _subscription: Subscription;
  public size$!: Observable<string>;
  public pageSize = signal<number>(6);
  private isBrowser!: boolean;

  constructor(
    private _breakpointObserverService: BreakpointObserverService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this._subscription = new Subscription();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
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
      .getProductsByCategory()
      .subscribe((data) => {
        this.prodBycategories = data;
      });

    const subBanner = this.sanityService.getAllBanners().subscribe((data) => {
      this.banners = data;
    });

    this._subscription.add(subProd);
    this._subscription.add(subBanner);
  }
}
