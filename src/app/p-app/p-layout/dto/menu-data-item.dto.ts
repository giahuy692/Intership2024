export class ModuleDataItem {
    Code?: string;
    Name?: string;
    Link?: string;
    Actived: boolean;
    Path?: string;
    LoadChildren?: any;
    ListMenu: Array<MenuDataItem> //= [];
    Icon?: string
    OrderBy?: number
    ID?: number 
}

export class MenuDataItem {
    Code: string;
    Name: string;
    Link?: string;
    Actived: boolean;//todo có cần mặc định true không?
    Type?: string = '' //menu group hoặc function    
    LstChild?: Array<MenuDataItem> //= [];
    Icon?: string
    OrderBy?: number
    ID?: number
    Key?: string
}