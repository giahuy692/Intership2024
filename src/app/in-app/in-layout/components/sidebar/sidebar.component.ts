import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  isDropdownOpen: boolean = false;

  isHovered: boolean = false;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;

        if (currentUrl.includes('/dashboard/mua-hang') ||
          this.route.snapshot.queryParams['openDropdown'] === 'chinh-sach') {
          this.isDropdownOpen = true;
        } else {
          this.isDropdownOpen = false;
        }
        // const urlTree = this.router.parseUrl(currentUrl);
        // const queryParams = urlTree.queryParams;
      });

    if (this.router.url.includes('/dashboard/mua-hang') ||
      this.route.snapshot.queryParams['openDropdown'] === 'chinh-sach') {
      this.isDropdownOpen = true;
    }
  }


  submenuItems = [
    { label: 'tình trạng hàng hoá', path: '/tinh-trang-hang-hoa' },
    { label: 'phân nhóm khai quan', path: '/phan-nhom-khai-quan' },
    { label: 'quản lý khai quan', path: '/quan-ly-khai-quan' },
    { label: 'đề xuất hàng mới', path: '/de-xuat-hang-moi' },
  ];

  menuList = [
    { label: 'mua hàng nội địa', path: '/mua-hang-noi-dia' },
    { label: 'nhập khẩu hàng hoá', path: '/nhap-khau-hang-hoa' },
    { label: 'báo cáo excel', path: '/bao-cao-excel' },
  ];

}
