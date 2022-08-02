import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutoComplete } from './autoComplete';

export default {
  title: 'AutoComplete 自动完成',
  component: AutoComplete,
  id: 'AutoComplete',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} as ComponentMeta<typeof AutoComplete>;

export const ASimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ];
  const handleFetch = (query: string) => {
    return lakers.filter((name) => name.includes(query));
  };
  return <AutoComplete {...args} fetchSuggestions={handleFetch} placeholder="输入湖人队球员英文名试试" />;
};
ASimpleComplete.storyName = '基本的搜索';
