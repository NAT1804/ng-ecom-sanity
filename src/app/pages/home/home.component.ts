import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { PaginationComponent } from '@components/common/pagination/pagination.component';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSelectorComponent,
    CarouselComponent,
    ListCardComponent,
    PaginationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  
}
