export class DTOMABannerGroup {
	Code: number = 0
	Company: number = 0
	BannerGroup: string = ''
	ListWebPage: number[] = []

	constructor(args = {}) {
		Object.assign(this, args)
	}
}