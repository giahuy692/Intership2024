export class DTOWarehouse {
	Code: number = 0
	Province: number
	Country: number
	TypeOfWH: number
	WHCode: string = ''
	WH: number
	WHName: string = ''
	ShortName: string = ''
	Channel: number
	ChannelName: string = ''
	AdminName: string = ''
	Address: string = ''
	Phone: string = ''
	Fax: string = ''
	Remark: string = ''
	IsSelected: boolean = false
	Promotion: number
	Partner: number
	TypeData: number
	CreateBy: string = ''
	CreateTime: string = ''
	LastModifiedBy: string = ''
	LastModifiedTime: string = ''
	// constructor(Code: number, Province: number, Country: number, TypeOfWH: number,
	// 	WHCode: string, ShortName: string, WHName: string, Address: string, Phone: string,
	// 	Fax: string, Remark: string, IsSelected: boolean) {
	// 	this.Code = Code
	// 	this.Province = Province
	// 	this.Country = Country
	// 	this.TypeOfWH = TypeOfWH
	// 	this.WHCode = WHCode
	// 	this.ShortName = ShortName
	// 	this.WHName = WHName
	// 	this.Address = Address
	// 	this.Phone = Phone
	// 	this.Fax = Fax
	// 	this.Remark = Remark
	// 	this.IsSelected = IsSelected
	// }

	constructor(wh: number, WHName: string, IsSelected: boolean, ChannelName?: string) {
		this.WH = wh
		this.WHName = WHName
		this.ChannelName = ChannelName
		this.IsSelected = IsSelected
	}
}
