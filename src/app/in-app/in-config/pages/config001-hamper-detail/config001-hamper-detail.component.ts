import { Component } from '@angular/core';
import { SVGIcon, folderIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-config001-hamper-detail',
  templateUrl: './config001-hamper-detail.component.html',
  styleUrls: ['./config001-hamper-detail.component.scss']
})
export class Config001HamperDetailComponent {
  public folderSVG: SVGIcon = folderIcon;
  public onButtonClick(): void {
    console.log("click");
  }
}
