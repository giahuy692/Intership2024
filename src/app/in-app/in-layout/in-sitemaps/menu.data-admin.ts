import { LayoutDefaultComponent } from '../layout-default/layout-default.component';


export const ModuleDataAdmin: Array<any> = [
    //PARTNER
    {
        Code: 'config',
        Name: 'CẤU HÌNH',
        Link: 'config/config001-hamper-request',
        Path: 'config',
        LoadChildren: () => import('../../in-config/in-config.module').then(m => m.InConfigModule),
        component: LayoutDefaultComponent,
        ListMenu: [
            {
                Name: "Cấu hình",
                Code: "config001-hamper-request",
                Link: "/config/config001-hamper-request",
                Type: 'function',
                ModuleID: "config001-hamper-request",
                LstChild: [],
                disabled: false,
            },
            
        ]
    },
]