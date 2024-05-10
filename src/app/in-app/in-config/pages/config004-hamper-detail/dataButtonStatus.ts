import { icon, text } from "@fortawesome/fontawesome-svg-core"
import { redoIcon, undoIcon,checkOutlineIcon, trashIcon, minusOutlineIcon } from "@progress/kendo-svg-icons"

export const DataButtonStatus = [
    {id: 0, text: 'Gửi duyệt', icon: redoIcon, status: 'success', dataShow: [0, 4]},
    {id: 1, text: 'Phê duyệt', icon: checkOutlineIcon, status: 'success', dataShow: [1, 3]},
    {id: 2, text: 'Trả về', icon: undoIcon, status: 'return', dataShow: [1,3]},
    {id: 3, text: 'Ngưng hiển thị', icon: minusOutlineIcon, status: 'danger', dataShow: [2]},
    {id: 4, text: 'Xóa hamper', icon: trashIcon, status: 'danger', dataShow: [0]}
]