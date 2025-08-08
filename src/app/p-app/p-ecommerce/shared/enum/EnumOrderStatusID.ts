export class EnumOrderStatusID {
    /** 17 Lập đơn hàng */
    static Create: number = 17
    /** 6 Khách đặt hàng */
    static Ordered: number = 6
    /** 7 Tiếp nhận đơn hàng */
    static Pickup: number = 7
    /** 8 Soạn hàng */
    static Prepaire: number = 8
    /** 9 Hoàn tất kiểm tra xuất hàng */
    static Scanned: number = 9
    /** 10 Hoàn tất đóng gói */
    static Package: number = 10
    /** 11 Đã giao nhà vận chuyển */
    static Shipping: number = 11
    /** 12 Hoàn tất giao hàng */
    static Shipped: number = 12
    /** 24 Khách hủy */
    static Canceling: number = 24
    /** 25 Khách hủy chờ xác nhận */
    static CancelWaiting: number = 25
    /** 26 Giao hàng - NVC chưa nhận */
    static ShippedNoConfirm: number = 26
    /** 106 In soạn hàng */
    static PrintPrepaire: number = 106
}