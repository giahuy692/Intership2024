import { LayoutDefaultComponent } from '../layout-default/layout-default.component';


export const ModuleDataAdmin: Array<any> = [
    //PARTNER
    {
        Code: 'config',
        Name: 'CẤU HÌNH',
        Link: 'config/config001-hamper-detail',
        Path: 'config',
        LoadChildren: () => import('../../in-config/in-config.module').then(m => m.InConfigModule),
        // component: LayoutDefaultComponent,
        ListMenu: [
            {
                Name: "Quản lý sản phẩm",
                Code: "config001-product-management",
                Link: "/config/config001-hamper-detail",
                Type: 'group',
                Icon:'k-i-files',
                ModuleID: "config001-hamper-detail",
                Actived: false,
                disabled: false,
                LstChild: []
                
            },
        ]
    }
]