import { Pipe, PipeTransform, inject } from '@angular/core';

import { PortableTextComponents, toHTML } from '@portabletext/to-html';
import { PortableTextBlock } from '@portabletext/types';
import { SanityImagePipe } from './sanity-image.pipe';
import { SanityService } from '@services/sanity/sanity.service';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

@Pipe({
  standalone: true,
  name: 'portableTextToHTML',
})
export class PortableTextToHTML implements PipeTransform {
  private readonly sanityService = inject(SanityService);

  constructor() {}

  private getImage(value: SanityImageSource, width?: number): string {
    if (width) {
      return this.sanityService
        .getImageUrlBuilder(value)
        .width(width)
        .auto('format')
        .url();
    }
    return this.sanityService.getImageUrlBuilder(value).auto('format').url();
  }

  components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: string }) =>
        '<img src="' + this.getImage(value, 900) + '" />',
    },
  };

  transform(value: PortableTextBlock[]): string {
    return toHTML(value, { components: this.components });
  }
}
