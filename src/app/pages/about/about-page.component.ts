import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About us | Pokemon SRR');
    this.meta.updateTag({ name: 'description', content: 'This is about page'});
    this.meta.updateTag({ name: 'og:title', content: 'This is about page'});
    this.meta.updateTag({ name: 'keywords', content: 'AG, software, Angular, PRO'});
  }
}
