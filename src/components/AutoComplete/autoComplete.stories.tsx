import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutoComplete, DataSourceType, AutoCompleteProps } from './autoComplete';

interface LakerPlayerProps {
  value: string;
  number: number;
}

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
    return lakers.filter((name) => name.includes(query)).map((name) => ({ value: name }));
  };
  return <AutoComplete {...args} fetchSuggestions={handleFetch} placeholder="输入湖人队球员英文名试试" />;
};
ASimpleComplete.storyName = '基本的搜索';

export const BCustomComplete = (args: AutoCompleteProps) => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    );
  };
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="输入湖人队球员英文,自定义下拉模版"
      renderOption={renderOption}
    />
  );
};
BCustomComplete.storyName = '自定义搜索结果模版';
