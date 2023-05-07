import { rest } from 'msw';
import {
  ResasResponse,
  Populations,
  Population,
  Category,
} from '@/src/types/resas';

const path = () =>
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';

export const populationCategories = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

const generatePopulations = (): Populations => {
  const array = populationCategories.map((category) => {
    return categoryFactory(category);
  });
  return {
    boundaryYear: 9999,
    data: array,
  };
};

const categoryFactory = (category: string): Category => {
  const isRate = category != '総人口';
  return {
    label: category,
    data: populationFactory(isRate),
  };
};

const populationFactory = (isRate: boolean): Population[] => {
  const startYear = 1960;
  const elapsedYear = 5;
  const num = Math.floor(Math.random() * 47) + 1;
  const populations = Array.from({ length: 18 }, (_, index) => {
    const year = startYear + elapsedYear * index;
    if (isRate) {
      return {
        year: year,
        value: startYear * index * num,
        rate: 20.5,
      };
    } else {
      return {
        year: year,
        value: startYear * index * num,
      };
    }
  });
  return populations;
};

export const populationsHandler = (
  status: 200 | 400 | 403 | 404 | 500 = 200
) => {
  return rest.get<Populations, { id: string }, ResasResponse<Populations>>(
    path(),
    async (_, res, ctx) => {
      if (status === 400) {
        return res.once(
          ctx.status(400),
          ctx.json({
            statusCode: 400,
            message: 'Bad Request',
            description: '',
          })
        );
      }

      if (status === 500) {
        return res.once(
          ctx.status(500),
          ctx.json({
            statusCode: 500,
            message: 'Bad Request',
            description: '',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          message: null,
          result: generatePopulations(),
        })
      );
    }
  );
};
