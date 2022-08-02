import Input from './input';
import { ComponentMeta } from '@storybook/react';
export default {
  title: 'Input 输入框',
  id: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const ADefaultIcons = () => (
  <>
    <Input />
  </>
);
ADefaultIcons.storyName = '默认输入框';
