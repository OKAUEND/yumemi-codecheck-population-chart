import type { Meta, StoryObj } from '@storybook/react';
import { CheckBoxList } from './index';
import { Prefectures } from '@/src/types/resas';

const meta = {
  title: 'Parts/CheckBoxList',
  component: CheckBoxList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckBoxList>;

export default meta;
type Story = StoryObj<typeof meta>;

const generatePrefectures = (): Prefectures[] => {
  const array = Array.from({ length: 47 }, (_, index) =>
    PrefectureFactory(index)
  );
  return array;
};

const PrefectureFactory = (id: number): Prefectures => {
  return {
    prefCode: id,
    prefName: `都道府県市`,
  };
};

export const Base: Story = {
  args: {
    values: generatePrefectures(),
    checked: false,
    changeHandler: () => {
      return;
    },
  },
};
