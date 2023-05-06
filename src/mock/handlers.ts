import { rest } from 'msw';
import { prefecturesHandler } from '@/src/feature/PopulationChart/mock/predectures';

export const handlers = [prefecturesHandler()];
