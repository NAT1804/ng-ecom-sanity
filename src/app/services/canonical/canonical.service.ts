import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string) {
    const canURL = url == undefined ? this.dom.URL : url;
    this.dom.querySelector('link[rel="canonical"]')?.remove();
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}
