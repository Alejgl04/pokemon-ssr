import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact us | Pokemon SRR');
    this.meta.updateTag({ name: 'description', content: 'This is contact page'});
    this.meta.updateTag({ name: 'og:title', content: 'This is contact page'});
    this.meta.updateTag({ name: 'keywords', content: 'AG, software, Angular, PRO'});
  }
}
