import { icon, text } from "@fortawesome/fontawesome-svg-core"
import { redoIcon, undoIcon,checkOutlineIcon, trashIcon, minusOutlineIcon } from "@progress/kendo-svg-icons"

export const DataButtonStatus = [
    {id: 0, text: 'Gửi duyệt', icon: redoIcon, status: 'success'},
    {id: 1, text: 'Phê duyệt', icon: checkOutlineIcon, status: 'success'},
    {id: 2, text: 'Trả về', icon: undoIcon, status: 'return'},
    {id: 3, text: 'Ngưng hiển thị', icon: minusOutlineIcon, status: 'danger'},
    {id: 4, text: 'Xóa', icon: trashIcon, status: 'danger'}
]