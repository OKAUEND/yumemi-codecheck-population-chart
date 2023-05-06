export interface ResasSuccess<T> {
  message: string | null;
  result: T;
}

interface ResasError {
  statusCode?: number;
  message: string | null;
  description?: string;
}
export type ResasResponse<T> = ResasSuccess<T> | ResasError;

export type Prefectures = {
  prefCode: number;
  prefName: string;
};

export type Populations = {
  boundaryYear: number;
  data: Category[];
};

export interface Category {
  label: string;
  data: Population[];
}

export type Population = {
  year: number;
  value: number;
  rate?: number;
};
