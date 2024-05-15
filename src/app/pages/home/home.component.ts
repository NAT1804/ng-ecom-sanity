import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarouselComponent } from '@components/common/carousel/carousel.component';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { IResponseProductsByCategory } from '@models/base-response.model';
import { SanityService } from '@services/sanity/sanity.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListCardComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  categories: IResponseProductsByCategory[] = [];

  private sanityService = inject(SanityService);

  constructor() {}

  ngOnInit(): void {
    this.sanityService.getProductsByCategory().subscribe((data) => {
      this.categories = data;
    });
  }
}
