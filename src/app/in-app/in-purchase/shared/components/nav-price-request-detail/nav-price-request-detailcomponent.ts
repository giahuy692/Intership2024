import { Component } from '@angular/core';
import { shareIcon, plusIcon, SVGIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-nav-price-request-detail',
  templateUrl: './nav-price-request-detail.component.html',
  styleUrls: ['./nav-price-request-detail.component.scss']
})
export class NavPriceRequestDetailComponent {
  public shareIcon: SVGIcon = shareIcon;
  public plusIcon: SVGIcon = plusIcon;
}
