import { atom, useRecoilCallback, useRecoilValue } from 'recoil';
import { Prefectures } from '@/src/types/resas';
import { SelectedCheckbox } from '@/src/types/Element';

const selectedPrefectures = atom<Map<number, Prefectures>>({
  key: 'state/selected-prefectures',
  default: new Map(),
});

export const useSelectedPrefectures = () => {
  const selectedPref = useRecoilValue(selectedPrefectures);

  const selectPrefectures = useRecoilCallback(
    ({ set }) =>
      (target: SelectedCheckbox) => {
        if (target.checked) {
          set(selectedPrefectures, (prev) => {
            //元のに変更を加えたくないので、クローンを作る
            const clone = new Map(prev);
            //お試しなので、キーと内容を同じにする
            clone.set(target.value, {
              prefCode: target.value,
              prefName: target.name,
            });
            //setter関数へ返す
            return clone;
          });
        } else {
          set(selectedPrefectures, (prev) => {
            //元のに変更を加えたくないので、クローンを作る
            const clone = new Map(prev);
            //クローンに対して、チェックを外した内容を削除する
            clone.delete(target.value);
            //setter関数へ返す
            return clone;
          });
        }
      }
  );

  return [selectedPref, selectPrefectures] as const;
};
