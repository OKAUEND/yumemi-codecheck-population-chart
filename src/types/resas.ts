export interface ResasSuccess<T> {
  message: string | null;
  result: T;
}

interface ResasError {
  statusCode: number;
  message: string;
  description: string;
}
export type ResasResponse<T> = ResasSuccess<T> | ResasError;

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
