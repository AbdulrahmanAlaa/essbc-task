import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'es-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {
  @Input()
  public user: User;
  ngOnInit(): void {
    this.user.avatar_url = this.user.avatar_url || 'assets/images/male.png';
  }


}
