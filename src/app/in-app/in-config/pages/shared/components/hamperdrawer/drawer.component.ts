import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { SVGIcon } from '@progress/kendo-svg-icons';
import { DrawerComponent } from '@progress/kendo-angular-layout';

/**Drawer Component
 * - To add content to drawer use directives drawer-content
 * - param expanded boolean varaiable for open/close drawer
 * - param titleIcon SVGIcon varaiable for icon of title
 * - param titleText string varaiable for text of title
 * For example: 
 * <app-drawer> <div drawer-content> THIS IS CUSTOMIZE DRAWER CONTENT </div> </app-drawer>
**/

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-hamper-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class HamperDrawerComponent implements OnChanges, AfterViewInit{
  
  
  @ViewChild('drawerElement', { static: false }) drawerElement: DrawerComponent;
  private drawerInitialized = false;
  @Input() expanded : boolean = false;

  @Input() titleIcon ?: SVGIcon;
  @Input() titleText : string = '';

  @Output() private openDrawer : EventEmitter<any> = new EventEmitter<any>();
  @Output() closeDrawer : EventEmitter<any> = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.drawerElement) {
      this.drawerInitialized = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.drawerInitialized && changes['expanded'] && this.drawerElement){
      this.toggleDrawer()
    }
  }

  toggleDrawer(){
    if(this.expanded){
      this.showDrawer();
    }else{
      this.hideDrawer();
    }
  }

  showDrawer(){
    this.drawerElement.toggle()
    this.openDrawer.emit()
  }

  hideDrawer(){
    this.drawerElement.toggle(false)
    this.closeDrawer.emit()
  }
}
