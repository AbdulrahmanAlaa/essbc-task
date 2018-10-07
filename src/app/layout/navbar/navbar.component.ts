import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'es-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) { }

  public ngOnInit(): void {
  }

  /**
     * Change Current Language
     * @param language as de or en represents language name
     */
  languageChanged(language) {
    // Configure the Language to be English by default
    this.translate.use(language);
  }
}
