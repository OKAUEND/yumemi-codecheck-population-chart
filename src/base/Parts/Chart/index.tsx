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

import styles from './chart.module.scss';
import { PopulationInfo, Prefectures } from '@/src/types/RESAS';
import { colorsUtils } from '@/src/utile/color';

interface Props {
  populationInfo: PopulationInfo[];
  selectedPref: Prefectures[];
}

export const RechartExtend = ({ populationInfo, selectedPref }: Props) => {
  return (
    <>
      <div className={styles.cart_xAxis_label}>
        {populationInfo.length === 0 ? '' : '人口数'}
      </div>

      <ResponsiveContainer width="100%" height={400}>
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
          <XAxis
            dataKey="year"
            label={{ value: '年度', position: 'bottom', dx: 0 }}
          />
          <YAxis
            width={100}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
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
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="left"
            wrapperStyle={{
              paddingTop: '20px',
              paddingLeft: '100px',
            }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
