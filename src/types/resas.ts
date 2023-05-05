export interface ResasResponse<T> {
  message: string;
  result: T;
}

export type Prefectures = {
  prefCode: number;
  prefName: string;
};

export type Populations = {
  boundaryYear: number;
  data: Population[];
};

type Population = {
  year: number;
  value: number;
};
