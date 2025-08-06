import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  menuItems = [
    { path: '/dashboard/cau-hinh', label: 'CẤU HÌNH' },
    { path: '/purchase', label: 'MUA HÀNG' },
    { path: '/dashboard/kho-hang', label: 'KHO HÀNG' },
    { path: '/dashboard/dieu-phoi', label: 'ĐIỀU PHỐI' },
    { path: '/dashboard/marketing', label: 'MARKETING' },
    { path: '/dashboard/e-commerce', label: 'E-COMMERCE' },
    { path: '/dashboard/kinh-doanh', label: 'KINH DOANH' },
    { path: '/dashboard/nhan-su', label: 'NHÂN SỰ' },
    { path: '/dashboard/bao-cao', label: 'BÁO CÁO' },
  ];

  selectedTab = 0;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentPath = this.router.url.split('?')[0];
        const matchedIndex = this.menuItems.findIndex(item =>
          currentPath === item.path ||
          currentPath.startsWith(item.path + '/')
        );

        if (matchedIndex !== -1) {
          this.selectedTab = matchedIndex;
        } else {
          this.selectedTab = 0;
        }
      });

    const initialPath = this.router.url.split('?')[0];
    const initialMatchedIndex = this.menuItems.findIndex(item =>
      initialPath === item.path ||
      initialPath.startsWith(item.path + '/')
    );
    if (initialMatchedIndex !== -1) {
      this.selectedTab = initialMatchedIndex;
    }
  }

  selectTab(index: number, event: Event): void {
    event.preventDefault();
    this.selectedTab = index;

    const selectedItem = this.menuItems[index];

    if (selectedItem.path.includes('/')) {
      this.router.navigate([selectedItem.path], {
        queryParams: { openDropdown: 'chinh-sach' },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate([selectedItem.path]);
    }
  }

  activeSection: string = '';

  setActive(section: string) {
    this.activeSection = section;
  }

}

