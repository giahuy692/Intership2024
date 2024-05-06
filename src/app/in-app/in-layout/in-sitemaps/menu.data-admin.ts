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
                LstChild: [
                    {
                        Name: "Chi tiết hamper",
                        Code: "config001-hamper-detail",
                        Link: "/config/config001-hamper-detail",
                        Type: 'function',
                        ModuleID: "config001-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config002-hamper-detail",
                        Link: "/config/config002-hamper-detail",
                        Type: 'function',
                        ModuleID: "config002-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config003-hamper-detail",
                        Link: "/config/config003-hamper-detail",
                        Type: 'function',
                        ModuleID: "config003-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config004-hamper-detail",
                        Link: "/config/config004-hamper-detail",
                        Type: 'function',
                        ModuleID: "config004-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config005-hamper-detail",
                        Link: "/config/config005-hamper-detail",
                        Type: 'function',
                        ModuleID: "config005-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    }
                ]
                
            },
            {
                Name: "Quản lý đối tác",
                Code: "config002-partner-management",
                Link: "/config/config002-partner-management",
                Type: 'function',
                Icon:'k-i-files',
                ModuleID: "config002-partner-management",
                Actived: false,
                disabled: false,
                LstChild: []
            },

        ]
    }
]