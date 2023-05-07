import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { PopulationInfo, Prefectures } from '@/src/types/resas';
import { colorsUtils } from '@/src/utile/color';

interface Props {
  populationInfo: PopulationInfo[];
  selectedPref: Prefectures[];
}

export const LineChrt = ({ populationInfo, selectedPref }: Props) => {
  return (
    <>
      <ResponsiveContainer width="90%" height={500}>
        <LineChart
          width={700}
          height={300}
          data={populationInfo}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          {selectedPref.map((pref) => {
            return (
              <Line
                key={pref.prefCode}
                type="monotone"
                name={`${pref.prefName}`}
                dataKey={`${pref.prefCode}`}
                stroke={`${colorsUtils[pref.prefCode]}`}
              />
            );
          })}
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};