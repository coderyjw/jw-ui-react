import React from 'react';
export interface SubMenuProps {
    index?: string;
    /**下拉菜单选项的文字 */
    title: string;
    /**下拉菜单选型的扩展类名 */
    className?: string;
    children?: React.ReactNode;
    /**选项是否被禁用 */
    disabled?: boolean;
}
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
