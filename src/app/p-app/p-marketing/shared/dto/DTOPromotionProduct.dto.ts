import { DTOConfig } from "src/app/p-lib"

export default class DTOPromotionProduct {
	Code: number = 0
	StatusID: number = 0
	Category: number
	TypeData: number
	PromotionType: number = 1
	RemainDay: number
	TotalSKU: number
	TotalStore: number
	TotalChannel: number
	PromotionTypeName: string = ''
	CategoryName: string = ''
	PromotionNo: string = ''
	PromotionName: string = ''
	StatusName: string = 'Đang soạn thảo'
	Summary: string = ''
	Description: string = ''
	ImageSetting1: string = ''
	ImageSetting2: string = ''
	ImageSetting3: string = ''
	ImageSetting4: string = ''
	ImageSetting5: string = ''
	StartDate: Date | string = null
	EndDate: Date | string = null
	IsAllApplied: boolean = false; // Tất cả đơn vị
	IsAllChannelApplied: boolean = false; // Tất cả kênh áp dụng
	IsWebMainSelected: boolean = false; // hachihachi.com.vn
	VNDescription: string = ''
	ENDescription: string = ''
	JPDescription: string = ''
	VNPromotion: string = ''
	ENPromotion: string = ''
	JPPromotion: string = ''
	VNSummary: string = ''
	ENSummary: string = ''
	JPSummary: string = ''
	DetermineGift: number	// Enum Cơ sở xác định quà tặng
}

export class DTOPromotionType {
	Code: number = 0
	TypeData: number
	ParentID?: number = null
	PromotionType: string
	IsSelected: boolean = false

	constructor(code: number, promotionType: string) {
		this.Code = code
		this.PromotionType = promotionType
	}
}

export class DTODayOfWeek {
	Code: number = 0
	Config: number
	Promotion?: number = null
	From: string | Date = null
	To: string | Date = null
	DayOfWeek: string = ''
	IsSelected: boolean = false

	constructor(Config: number, DayOfWeek: string, IsSelected: boolean, Promotion: number, From?: string | Date, To?: string | Date) {
		this.Config = Config
		this.Promotion = Promotion
		this.From = From
		this.To = To
		this.DayOfWeek = DayOfWeek
		this.IsSelected = IsSelected
	}
}

export class DTOGroupOfCard {
	Code: number = 0
	Point: number
	Promotion?: number = null
	GroupCard: number
	GroupName: string
	IsSelected: boolean = false
}

export class DTOPromotionDetail {
	VNName: string = ''
	ENName: string = ''
	JPName: string = ''
	WebContentVN: string = ''
	WebContentEN: string = ''
	WebContentJP: string = ''
	WebUsesVN: string = ''
	WebUsesEN: string = ''
	WebUsesJP: string = ''
	StatusName: string = ''
	TBarcode: string = ''
	Barcode: string = ''
	Remark: string = ''
	Code: number = 0
	TypeData: number = 1
	Promotion?: number = null
	PromotionInv: any
	Bundle: number
	PosCode: string = ''
	ImageSetting: string = ''
	Product?: number = null
	DiscountAmount: number = 0
	DiscountPercent: number = 0
	Quantity: number = 0
	MaxQuantity: number = 0
	PriceDiscount: number = 0
	Price: number = 0
	StatusID: number = 1
	StockQty: number = 0
	SellQty: number = 0
	LastDate: Date | string = null
	IsHachi24h: boolean = false
	BannerCard: string = ''
	ListProductInCombo: DTOPromotionDetail[] = []
	ListProduct: DTOPromotionDetail[] = []
	ListImageInCombo: DTOPromotionImage[] = []
	GiftTypeName: String = ""
	GiftType: number = 0
	TypeReceiveGift: number = 0
	ListGift: DTOCOLPromotionGiftCus[] = []
	ListRange: DTOCOPOLPromotionRangeCus[] = []
	DetermineGift: number = 0
	NoOfGift: number = 0

	constructor() {
		this.MaxQuantity = 0
	}
}

export class DTOPromotionInvDetail {
	Code: number = 0
	Promotion: number = 0
	MinInv: number = 0
	MaxInv: number = 0
	ProValue: number = 0
	IsInvAmount: boolean = true
	IsProAmount: boolean = true
}

export class DTOPromotionInv {
	Promotion: number = 0
	IsInvAmount: boolean = true
	IsProAmount: boolean = true
	PromotionDetails: DTOPromotionInvDetail[] = []
}

export class DTOPromotionImage {
	Code: number = 0
	Product?: number = null
	COProduct?: number = null
	COPartnerProduct?: number = null
	ImageName: string = ''
	URLImage: string = ''
	Company: number = 1
	IsDefault: boolean = false
}

export class DTOCOLPromotionGiftCus {
	Code: number = 0;
	PromotionRange?: number = null;
	PromotionDetail?: number = null;
	Promotion?: number = null;
	Product?: number = null;
	CreatedBy: string = "";
	CreatedTime: Date | null = null;
	LastModifiedBy: string = "";
	LastModifiedTime: Date | null = null;
	ProductImage: string = "";
	ProductBarcode: string = "";
	ProductName: string = "";
	ProductPoscode: string = "";
	IsDelete: boolean = false;

	//Trường thêm để xử lý FE
	isNew: boolean = false
}

export class DTOCOPOLPromotionRangeCus {
	Code: number = 0
	Name: string = ""
	Promotion?: number = null
	Range?: number = null
	TypeReceiveGift: number = 0
	NoOfGift: number = 0
	ListGift: DTOCOLPromotionGiftCus[] = []
	IsDelete: boolean = false
	PromotionDetail?: number = 0
}