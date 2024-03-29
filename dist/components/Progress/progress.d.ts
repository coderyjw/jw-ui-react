import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: FC<ProgressProps>;
export default Progress;
