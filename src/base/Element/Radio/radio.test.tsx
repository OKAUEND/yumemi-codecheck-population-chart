import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, vi, test } from 'vitest';
import { Radio } from './index';

describe('RadioButton Component', () => {
  test('ラジオボタンがクリックされた時にPropsの関数が呼び出されていること', async () => {
    const onChange = vi.fn();
    render(
      <Radio
        label={'CategoryTypeA'}
        value="Category"
        checked={false}
        categories="Mock"
        changeHandler={onChange}
      />
    );

    const use = useEvent.setup();
    const radioMock = screen.getByLabelText('CategoryTypeA');
    await use.click(radioMock);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('初期状態のラジオボタンはチェック状態ではないこと', () => {
    const onChange = vi.fn();
    render(
      <Radio
        label={'CategoryTypeA'}
        value="Category"
        checked={false}
        categories="Mock"
        changeHandler={onChange}
      />
    );

    const checkboxMock = screen.getByLabelText('CategoryTypeA');
    expect(checkboxMock).not.toBeChecked();
  });
});
