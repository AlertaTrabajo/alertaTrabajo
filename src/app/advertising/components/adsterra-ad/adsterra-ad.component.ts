import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-adsterra-ad',
  templateUrl: './adsterra-ad.component.html'
})
export class AdsterraAdComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const container = this.el.nativeElement.querySelector('#adContainer');
        if (container) {
          container.id = 'container-2b02d10d4e335b650b262ec4f9498a46';
        }
      }, 0);
    }
  }
}
