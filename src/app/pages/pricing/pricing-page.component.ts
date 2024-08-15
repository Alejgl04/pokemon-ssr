import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    // if(!isPlatformServer(this.platform)) {
    //   document.title = 'Pricing services | Pokemon SRR';
    // }

    this.title.setTitle('Pricing services | Pokemon SRR');
    this.meta.updateTag({ name: 'description', content: 'This is pricing page'});
    this.meta.updateTag({ name: 'og:title', content: 'This is pricing page'});
    this.meta.updateTag({ name: 'keywords', content: 'AG, software, Angular, PRO'});
  }
}

