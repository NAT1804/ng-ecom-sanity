import { Pipe, PipeTransform } from '@angular/core';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityService } from '@services/sanity/sanity.service';

@Pipe({
  standalone: true,
  name: 'sanityImage',
})
export class SanityImagePipe implements PipeTransform {
  constructor(private sanityService: SanityService) {}

  transform(
    value: SanityImageSource,
    option?: { width?: number; height?: number }
  ): string {
    if (option.width && option.height) {
      return this.sanityService
        .getImageUrlBuilder(value)
        .width(option.width)
        .height(option.height)
        .auto('format')
        .url();
    }
    if (option.width) {
      return this.sanityService
        .getImageUrlBuilder(value)
        .width(option.width)
        .auto('format')
        .url();
    }
    if (option.height) {
      return this.sanityService
        .getImageUrlBuilder(value)
        .height(option.height)
        .auto('format')
        .url();
    }
    return this.sanityService.getImageUrlBuilder(value).auto('format').url();
  }
}
