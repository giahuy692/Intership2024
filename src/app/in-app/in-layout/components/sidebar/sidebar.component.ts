import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { event } from 'jquery';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }

  activeGroup: string | null = 'chinh-sach';
  activeSubmenuPath: string = '';
  clickedItem: string | null = null;

  toggleGroup(name: string) {
    this.activeGroup = this.activeGroup === name ? null : name;
    this.clickedItem = name;
  }

  ngOnInit(): void {
    this.checkActiveRoute(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
      this.checkActiveRoute(event.urlAfterRedirects || event.url);
      });
  }

  private checkActiveRoute(url: string): void {
    if (url.includes('/tinh-trang-hang-hoa')) {
      this.activeGroup = 'chinh-sach';
      this.activeSubmenuPath = '/tinh-trang-hang-hoa';
      this.clickedItem = '/tinh-trang-hang-hoa';
    } else if (url.includes('/phan-nhom-khai-quan')) {
      this.activeGroup = 'chinh-sach';
      this.activeSubmenuPath = '/phan-nhom-khai-quan';
      this.clickedItem = '/phan-nhom-khai-quan';
    } else if (url.includes('/quan-ly-khai-quan')) {
      this.activeGroup = 'chinh-sach';
      this.activeSubmenuPath = '/quan-ly-khai-quan';
      this.clickedItem = '/quan-ly-khai-quan';
    } else if (url.includes('/de-xuat-hang-moi')) {
      this.activeGroup = 'chinh-sach';
      this.activeSubmenuPath = '/de-xuat-hang-moi';
      this.clickedItem = '/de-xuat-hang-moi';
    } else {
      this.activeSubmenuPath = url;
      this.clickedItem = url;
    }
  }

  // onItemHover(path: string): void {
  //   this.hoveredItem = path;
  // }

  // onItemLeave(): void {
  //   this.hoveredItem = null;
  // }
  onItemClick(path: string): void {
    this.clickedItem = path;
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
