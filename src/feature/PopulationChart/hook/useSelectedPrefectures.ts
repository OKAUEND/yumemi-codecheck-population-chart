import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil';
import { Prefectures } from '@/src/types/Resas.ts';
import { SelectedCheckbox } from '@/src/types/Element';

export const selectedPrefectures = atom<Map<number, Prefectures>>({
  key: 'state/selected-prefectures',
  //atomFamilyでID毎でキャッシュ化させるにしても、取り出すためにインデックスキーが必要なため、
  //Mapと同じ役割であるためMapで選択中の値をキャッシュさせる
  default: new Map(),
});

export const prefecturesMapToArray = selector<Prefectures[]>({
  key: 'convert/prefectures-map',
  get: ({ get }) => {
    const mapPrefectures = get(selectedPrefectures);
    return [...mapPrefectures.values()];
  },
});

export const useSelectedPrefectures = () => {
  const selectedPref = useRecoilValue(prefecturesMapToArray);

  /**
   * チェックボックスのチェック状態により値の追加もしくは削除を行う更新関数
   */
  const selectPrefectures = useRecoilCallback(
    ({ set }) =>
      (target: SelectedCheckbox) => {
        //チェックボックスの状態を確認し追加するか削除するかを確認する
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
